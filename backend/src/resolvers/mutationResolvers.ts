import { compare, hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getEnvironment } from "../utils/subjectUtils";
import { generateStudentSummary } from "../utils/openAI";
import ValidationError from "../errors/ValidationError";
import { MutationResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";
import { mapUpdateCollectionInput, mapUpdateEvaluationInput, mapUpdateGroupInput, mapUpdateStudentInput } from "../utils/mappers";
import {
  validateChangeGroupLevelInput,
  validateCreateCollectionInput,
  validateCreateGroupInput,
  validateCreateStudentInput,
  validateRegisterInput,
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
    const { password, ...rest } = data;
    await validateRegisterInput(data);
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);
    const teacher = await prisma.teacher.create({
      data: {
        passwordHash,
        ...rest,
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
    const { students: studentInputs, educationLevel, learningObjectiveGroupKey, ...rest } = data;
    const groupId = uuidv4();
    const moduleId = uuidv4();
    const groupCreate = prisma.group.create({
      data: {
        ...rest,
        id: groupId,
        currentModuleId: moduleId,
      },
    });
    const moduleCreate = prisma.module.create({
      data: {
        id: moduleId,
        educationLevel,
        learningObjectiveGroupKey,
        groupId,
        students: {
          create: studentInputs.map((it) => ({
            groupId,
            ...it,
          })),
        },
      },
    });
    const [group] = await prisma.$transaction([groupCreate, moduleCreate]);
    return group;
  },
  createCollection: async (_, { data, moduleId }, { prisma }) => {
    await validateCreateCollectionInput(data, moduleId);
    const { evaluations, ...rest } = data;
    const createdCollection = await prisma.evaluationCollection.create({
      data: {
        ...rest,
        moduleId,
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
        modules: {
          some: {
            id: moduleId,
          },
        },
      },
    });
    return createdCollection;
  },
  createStudent: async (_, { data, moduleId }, { prisma }) => {
    await validateCreateStudentInput(data, moduleId);
    const module = await prisma.module.findUniqueOrThrow({
      where: { id: moduleId },
    });
    const createdStudent = await prisma.student.create({
      data: {
        ...data,
        groupId: module.groupId,
        modules: {
          connect: { id: moduleId },
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
  changeGroupModule: async (_, { data, groupId }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, groupId);
    await validateChangeGroupLevelInput(data, groupId);
    let newYear = await prisma.module.findFirst({
      where: { groupId, educationLevel: data.newEducationLevel, learningObjectiveGroupKey: data.newLearningObjectiveGroupKey },
    });
    const group = await prisma.group.findUniqueOrThrow({
      where: { id: groupId },
    });
    if (!newYear) {
      // Copy students from current year to new year
      const currentYearStudents = await prisma.student.findMany({
        where: {
          modules: {
            some: {
              id: group.currentModuleId,
            },
          },
        },
      });
      newYear = await prisma.module.create({
        data: {
          educationLevel: data.newEducationLevel,
          learningObjectiveGroupKey: data.newLearningObjectiveGroupKey,
          groupId,
          students: {
            connect: currentYearStudents.map((it) => ({ id: it.id })),
          },
        },
      });
    }
    const updatedGroup = await prisma.group.update({
      data: {
        currentModuleId: newYear.id,
      },
      where: { id: groupId },
    });
    return updatedGroup;
  },
  generateStudentFeedback: async (_, { studentId, moduleId }, { user, prisma }) => {
    await checkAuthenticatedByStudent(user, studentId);
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) throw new Error(`Student with id ${studentId} not found`);
    const evaluations = await prisma.evaluation.findMany({
      where: {
        studentId,
        evaluationCollection: {
          moduleId,
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
      environmentLabel: getEnvironment(it.evaluationCollection.environmentCode)?.label.fi,
      date: it.evaluationCollection.date,
    }));
    const summary = await generateStudentSummary(mappedEvaluations);
    return summary;
  },
};

export default resolvers;
