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
  mapUpdateCollectionInput,
  mapUpdateGroupInput,
  mapUpdateStudentInput,
} from "../utils/mappers";
import {
  validateCreateCollectionInput,
  validateCreateGroupInput,
  validateCreateStudentInput,
  validateUpdateCollectionInput,
  validateUpdateStudentInput,
} from "../utils/validators";
import { updateEvaluation } from "../utils/resolverUtils";

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
    await validateCreateGroupInput(data);
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
    await validateCreateCollectionInput(data);
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
    const promises = data.map((it) => updateEvaluation(it));
    const results = await Promise.all(promises);
    await prisma.evaluationCollection.update({
      data: {
        group: {
          update: {
            updatedAt: new Date(),
          },
        },
      },
      where: { id: collectionId },
    });

    await revalidateCollectionData(res, collectionId);

    return results.length;
  },
  updateEvaluation: async (_, { data }, { res }) => {
    const updatedEvaluation = await updateEvaluation(data);
    await revalidateCollectionData(
      res,
      updatedEvaluation.evaluationCollectionId
    );
    await revalidateStudentData(res, updatedEvaluation.studentId);
    return updatedEvaluation;
  },
  updateCollection: async (_, { data, collectionId }, { prisma, res }) => {
    await validateUpdateCollectionInput(data);
    const { evaluations, ...rest } = data;
    let updatedStudentIds: string[] = [];
    if (evaluations) {
      const promises = evaluations.map((it) => updateEvaluation(it));
      const updatedEvaluations = await Promise.all(promises);
      updatedStudentIds = updatedEvaluations.map((it) => it.studentId);
    }

    const updatedCollection = await prisma.evaluationCollection.update({
      data: mapUpdateCollectionInput(rest),
      where: { id: collectionId },
    });

    // Revalidate all the possibly updated pages
    const revalidatePromises = [];
    revalidatePromises.push(
      revalidateCollectionData(res, updatedCollection.id)
    );
    revalidatePromises.push(
      revalidateGroupData(res, updatedCollection.groupId)
    );
    const revalidateStudentPromises = updatedStudentIds.map((it) =>
      revalidateStudentData(res, it)
    );
    await Promise.all([revalidatePromises, ...revalidateStudentPromises]);

    return updatedCollection;
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
