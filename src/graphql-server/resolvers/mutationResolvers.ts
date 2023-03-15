import revalidateIfProd from "@/utils/revalidate";
import { compare, hash } from "bcryptjs";
import ValidationError from "../errors/ValidationError";
import { MutationResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";
import {
  mapUpdateGroupInput,
  mapUpdateStudentInput,
} from "../utils/dataMappers";

const BRCRYPT_SALT_ROUNDS = 12;

const resolvers: MutationResolvers<CustomContext> = {
  register: async (_, { data }, { prisma }) => {
    const { password, email } = data;
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (matchingTeacher)
      throw new ValidationError(`Sähköposti '${email}' on jo käytössä`);
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacher = await prisma.teacher.create({
      data: {
        email,
        passwordHash,
      },
    });
    return teacher;
  },
  login: async (_, { email, password }, { prisma }) => {
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (!matchingTeacher)
      throw new ValidationError(
        `Käyttäjää ei löytynyt sähköpostilla '${email}'`
      );
    const isValidPassword = await compare(
      password,
      matchingTeacher.passwordHash
    );
    if (!isValidPassword)
      throw new ValidationError(`Annettu salasana oli väärä.`);
    return {
      teacher: matchingTeacher,
    };
  },
  createGroup: async (_, { data }, { prisma, res }) => {
    const { students, ...rest } = data;
    const group = await prisma.group.create({
      data: {
        ...rest,
        students: students
          ? {
              createMany: { data: students },
            }
          : undefined,
      },
    });

    await revalidateIfProd(res, `/${group.teacherId}`);
    return group;
  },
  createCollection: async (_, { data, groupId }, { prisma, res }) => {
    const { evaluations, ...rest } = data;
    const createdCollection = await prisma.evaluationCollection.create({
      data: {
        ...rest,
        groupId,
        // Create evaluations if there are some in input
        evaluations: evaluations
          ? {
              createMany: {
                data: evaluations,
              },
            }
          : undefined,
      },
    });
    // TODO: teacher info should probably come from context
    const teacher = await prisma.teacher.findFirstOrThrow({
      where: { groups: { some: { id: groupId } } },
    });
    await revalidateIfProd(res, `/${teacher.id}/group/${groupId}`);
    return createdCollection;
  },
  updateEvaluations: async (_, { data, collectionId }, { prisma, res }) => {
    const promises = data.map((it) => {
      const { id, ...rest } = it;
      return prisma.evaluation.update({
        where: { id },
        data: {
          ...rest,
          evaluationCollectionId: collectionId,
        },
      });
    });
    const results = await Promise.all(promises);

    // TODO: teacher info should probably come from context
    const teacher = await prisma.teacher.findFirstOrThrow({
      where: {
        groups: {
          some: { evaluationCollections: { some: { id: collectionId } } },
        },
      },
    });
    await revalidateIfProd(res, `/${teacher.id}/collection/${collectionId}`);

    return results.length;
  },
  updateStudent: async (_, { data, studentId }, { prisma }) => {
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: mapUpdateStudentInput(data),
    });
    // TODO: Revalidate student page
    return updatedStudent;
  },
  updateGroup: async (_, { data, groupId }, { prisma }) => {
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: mapUpdateGroupInput(data),
    });
    // TODO: Revalidate group page
    return updatedGroup;
  },
  deleteStudent: async (_, { studentId }, { prisma }) => {
    await prisma.student.delete({
      where: { id: studentId },
    });
    return true;
  },
  deleteGroup: async (_, { groupId }, { prisma }) => {
    await prisma.group.delete({
      where: { id: groupId },
    });
    return true;
  },
};

export default resolvers;
