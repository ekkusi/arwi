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
    const { students: studentInputs, yearCode, ...rest } = data;
    const group = await prisma.group.create({
      data: {
        ...rest,
        currentYearCode: yearCode,
      },
    });
    await prisma.classYear.create({
      data: {
        code: yearCode,
        groupId: group.id,
        students: {
          create: studentInputs.map((it) => ({
            groupId: group.id,
            ...it,
          })),
        },
      },
    });

    return group;
  },
  createCollection: async (_, { data, classYearId }, { prisma }) => {
    await validateCreateCollectionInput(data);
    const { evaluations, ...rest } = data;
    const createdCollection = await prisma.evaluationCollection.create({
      data: {
        ...rest,
        classYearId,
        type: "",
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

    return createdCollection;
  },
  createStudent: async (_, { data, classYearId }, { prisma }) => {
    await validateCreateStudentInput(data, classYearId);
    const classYear = await prisma.classYear.findUniqueOrThrow({
      where: { id: classYearId },
    });
    const createdStudent = await prisma.student.create({
      data: {
        ...data,
        groupId: classYear.groupId,
        classYears: {
          connect: { id: classYearId },
        },
      },
    });
    return createdStudent;
  },
  updateEvaluations: async (_, { data }) => {
    const promises = data.map((it) => updateEvaluation(it));
    const results = await Promise.all(promises);

    return results.length;
  },
  updateEvaluation: async (_, { data }) => {
    const updatedEvaluation = await updateEvaluation(data);
    return updatedEvaluation;
  },
  updateCollection: async (_, { data, collectionId }, { prisma }) => {
    await validateUpdateCollectionInput(data);
    const { evaluations, ...rest } = data;
    if (evaluations) {
      const promises = evaluations.map((it) => updateEvaluation(it));
      await Promise.all(promises);
    }

    const updatedCollection = await prisma.evaluationCollection.update({
      data: mapUpdateCollectionInput(rest),
      where: { id: collectionId },
    });

    return updatedCollection;
  },
  updateStudent: async (_, { data, studentId }, { prisma }) => {
    await validateUpdateStudentInput(data, studentId);
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: mapUpdateStudentInput(data),
    });
    return updatedStudent;
  },
  updateGroup: async (_, { data, groupId }, { prisma }) => {
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: mapUpdateGroupInput(data),
    });

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
  deleteCollection: async (_, { collectionId }, { prisma }) => {
    await prisma.evaluationCollection.delete({
      where: { id: collectionId },
    });
    return true;
  },
  changeGroupYear: async (_, { groupId, newYearCode }, { prisma }) => {
    let existingYear = await prisma.classYear.findFirst({
      where: { groupId, code: newYearCode },
    });
    if (!existingYear) {
      existingYear = await prisma.classYear.create({
        data: {
          code: newYearCode,
          groupId,
        },
      });
    }
    const updatedGroup = await prisma.group.update({
      data: {
        currentYearCode: newYearCode,
      },
      where: { id: groupId },
    });
    return updatedGroup;
  },
};

export default resolvers;
