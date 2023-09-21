import { compare, hash } from "bcryptjs";
import { generateStudentSummary } from "../utils/openAI";
import ValidationError from "../errors/ValidationError";
import { MutationResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";
import { mapUpdateCollectionInput, mapUpdateEvaluationInput, mapUpdateGroupInput, mapUpdateStudentInput } from "../utils/mappers";
import {
  validateCreateCollectionInput,
  validateCreateGroupInput,
  validateCreateStudentInput,
  validateUpdateCollectionInput,
  validateUpdateEvaluationsInput,
  validateUpdateStudentInput,
} from "../utils/validators";
import { updateEvaluation } from "../utils/resolverUtils";
import {
  checkAuthenticatedByCollection,
  checkAuthenticatedByEvaluation,
  checkAuthenticatedByGroup,
  checkAuthenticatedByStudent,
} from "../utils/auth";
import { createRefreshAndAccessTokens, parseAndVerifyToken, REFRESH_TOKEN_KEY } from "../utils/jwt";

const BRCRYPT_SALT_ROUNDS = 12;

const resolvers: MutationResolvers<CustomContext> = {
  register: async (_, { data }, { prisma, res }) => {
    const { password, email } = data;
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (matchingTeacher) throw new ValidationError(`Sähköposti '${email}' on jo käytössä`);
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacher = await prisma.teacher.create({
      data: {
        email,
        passwordHash,
      },
    });
    const token = createRefreshAndAccessTokens(teacher, res);
    return {
      teacher,
      accessToken: token,
    };
  },
  login: async (_, { email, password }, { prisma, res }) => {
    const matchingTeacher = await prisma.teacher.findFirst({
      where: { email },
    });
    if (!matchingTeacher) throw new ValidationError(`Käyttäjää ei löytynyt sähköpostilla '${email}'`);
    const isValidPassword = await compare(password, matchingTeacher.passwordHash);
    if (!isValidPassword) throw new ValidationError(`Annettu salasana oli väärä.`);
    const token = createRefreshAndAccessTokens(matchingTeacher, res);
    return {
      teacher: matchingTeacher,
      accessToken: token,
    };
  },
  logout: async (_, __, { res }) => {
    res.clearCookie(REFRESH_TOKEN_KEY);
    return true;
  },
  refreshToken: async (_, __, { req, res }) => {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
    if (!refreshToken) throw new ValidationError("No refresh token found");
    const user = parseAndVerifyToken(refreshToken, "refresh");
    if (!user) throw new ValidationError("Token is invalid");
    const token = createRefreshAndAccessTokens(user, res);
    return {
      teacher: user,
      accessToken: token,
    };
  },
  createGroup: async (_, { data }, { prisma }) => {
    await validateCreateGroupInput(data);
    const { students: studentInputs, yearCode, ...rest } = data;
    const group = await prisma.group.create({
      data: {
        ...rest,
        currentClassYearId: "",
      },
    });
    const classYear = await prisma.classYear.create({
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
    await prisma.group.update({
      where: {
        id: group.id,
      },
      data: {
        currentClassYearId: classYear.id,
      },
    });
    return group;
  },
  createCollection: async (_, { data, classYearId }, { prisma }) => {
    await validateCreateCollectionInput(data, classYearId);
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
                data: evaluations.map((it) => ({
                  ...it,
                  isStellar: it.isStellar === null ? undefined : it.isStellar,
                })),
              },
            }
          : undefined,
      },
    });
    // Should always only find one group, updateMany only here because of typescript constraint
    await prisma.group.updateMany({
      data: {
        updatedAt: new Date(),
      },
      where: {
        classYears: {
          some: {
            id: classYearId,
          },
        },
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
  updateEvaluations: async (_, { data, collectionId }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    await validateUpdateEvaluationsInput(data, collectionId);
    await prisma.evaluationCollection.update({
      data: {
        evaluations: {
          update: data.map((it) => ({
            data: mapUpdateEvaluationInput(it),
            where: {
              id: it.id,
            },
          })),
        },
      },
      where: { id: collectionId },
    });
    return data.length;
  },
  updateEvaluation: async (_, { data }, { user }) => {
    await checkAuthenticatedByEvaluation(user, data.id);
    const updatedEvaluation = await updateEvaluation(data);
    return updatedEvaluation;
  },
  updateCollection: async (_, { data, collectionId }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    await validateUpdateCollectionInput(data, collectionId);
    const { evaluations, ...rest } = data;
    const updatedCollection = await prisma.evaluationCollection.update({
      data: {
        ...mapUpdateCollectionInput(rest),
        evaluations: evaluations
          ? {
              update: evaluations.map((it) => ({
                data: mapUpdateEvaluationInput(it),
                where: {
                  id: it.id,
                },
              })),
            }
          : undefined,
      },
      where: { id: collectionId },
    });
    return updatedCollection;
  },
  updateStudent: async (_, { data, studentId }, { prisma, user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    await validateUpdateStudentInput(data, studentId);
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: mapUpdateStudentInput(data),
    });
    return updatedStudent;
  },
  updateGroup: async (_, { data, groupId }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: mapUpdateGroupInput(data),
    });
    return updatedGroup;
  },
  deleteStudent: async (_, { studentId }, { prisma, user }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await prisma.student.delete({
      where: { id: studentId },
    });
    return student;
  },
  deleteGroup: async (_, { groupId }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    const group = await prisma.group.delete({
      where: { id: groupId },
    });
    return group;
  },
  deleteCollection: async (_, { collectionId }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, collectionId);
    const collection = await prisma.evaluationCollection.delete({
      where: { id: collectionId },
    });
    return collection;
  },
  changeGroupYear: async (_, { groupId, newYearCode }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    let newYear = await prisma.classYear.findFirst({
      where: { groupId, code: newYearCode },
    });
    const group = await prisma.group.findUniqueOrThrow({
      where: { id: groupId },
    });
    if (!newYear) {
      // Copy students from current year to new year
      const currentYearStudents = await prisma.student.findMany({
        where: {
          classYears: {
            some: {
              id: group.currentClassYearId,
            },
          },
        },
      });
      newYear = await prisma.classYear.create({
        data: {
          code: newYearCode,
          groupId,
          students: {
            connect: currentYearStudents.map((it) => ({ id: it.id })),
          },
        },
      });
    }
    const updatedGroup = await prisma.group.update({
      data: {
        currentClassYearId: newYear.id,
      },
      where: { id: groupId },
    });
    return updatedGroup;
  },
  generateStudentFeedback: async (_, { studentId, classYearId }, { user, prisma }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) throw new Error(`Student with id ${studentId} not found`);
    const evaluations = await prisma.evaluation.findMany({
      where: {
        studentId,
        evaluationCollection: {
          classYearId,
        },
      },
      include: {
        evaluationCollection: {
          select: {
            environmentCode: true,
            date: true,
          },
        },
      },
    });
    const mappedEvaluations = evaluations.map((it) => ({
      ...it,
      environment: it.evaluationCollection.environmentCode,
      date: it.evaluationCollection.date,
    }));
    const summary = await generateStudentSummary(mappedEvaluations);
    return summary;
  },
};

export default resolvers;
