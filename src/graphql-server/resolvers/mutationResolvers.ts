import {
  revalidateCollectionData,
  revalidateGroupData,
  revalidateStudentData,
} from "@/graphql-server/utils/revalidate";
import { compare, hash } from "bcryptjs";
import ValidationError from "../errors/ValidationError";
import { MutationResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";
import {
  mapUpdateGroupInput,
  mapUpdateStudentInput,
} from "../utils/dataMappers";
import {
  validateCreateStudentInput,
  validateUpdateStudentInput,
} from "../utils/dataValidators";

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
  createGroup: async (_, { data }, { prisma }) => {
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
    await revalidateGroupData(res, groupId);
    return createdCollection;
  },
  createStudent: async (_, { data, groupId }, { prisma, res }) => {
    await validateCreateStudentInput(data, groupId);
    const createdStudent = await prisma.student.create({
      data: {
        ...data,
        groupId,
      },
    });
    await revalidateGroupData(res, groupId);
    return createdStudent;
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

    await revalidateCollectionData(res, collectionId);

    return results.length;
  },
  updateStudent: async (_, { data, studentId }, { prisma, res }) => {
    await validateUpdateStudentInput(data, studentId);
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: mapUpdateStudentInput(data),
    });
    const revalidatePromises = [];
    revalidatePromises.push(revalidateGroupData(res, updatedStudent.groupId));
    revalidatePromises.push(revalidateStudentData(res, studentId));
    await Promise.all(revalidatePromises);
    return updatedStudent;
  },
  updateGroup: async (_, { data, groupId }, { prisma, res }) => {
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: mapUpdateGroupInput(data),
    });
    await revalidateGroupData(res, groupId);
    return updatedGroup;
  },
  deleteStudent: async (_, { studentId }, { prisma, res }) => {
    const student = await prisma.student.delete({
      where: { id: studentId },
    });
    await revalidateGroupData(res, student.groupId);
    return true;
  },
  deleteGroup: async (_, { groupId }, { prisma }) => {
    await prisma.group.delete({
      where: { id: groupId },
    });
    return true;
  },
  deleteCollection: async (_, { collectionId }, { prisma, res }) => {
    const collection = await prisma.evaluationCollection.delete({
      where: { id: collectionId },
    });
    await revalidateGroupData(res, collection.groupId);
    return true;
  },
};

export default resolvers;
