import { ADMIN_USER, MIN_APP_VERSION } from "../config";
import AuthenticationError from "../errors/AuthenticationError";
import ValidationError from "../errors/ValidationError";
import { QueryResolvers } from "../types";
import { CustomContext } from "../types/contextTypes";
import {
  checkAuthenticatedByCollection,
  checkAuthenticatedByEvaluation,
  checkAuthenticatedByGroup,
  checkAuthenticatedByStudent,
  checkAuthenticatedByTeacher,
} from "../utils/auth";

const resolvers: QueryResolvers<CustomContext> = {
  getAppMetadata: () => {
    return {
      minimumAppVersion: MIN_APP_VERSION,
    };
  },
  getCurrentUser: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError("Not authenticated");
    return user;
  },
  getTeacher: async (_, { id }, { prisma, user }) => {
    checkAuthenticatedByTeacher(user, id);
    const teacher = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });
    if (!teacher) throw new ValidationError(`Opettajaa ei löytynyt id:llä '${id}'`);
    return teacher;
  },
  getTeachers: async (_, __, { prisma, user }) => {
    if (user?.id !== ADMIN_USER.id) throw new AuthenticationError("Admin route");
    const teachers = await prisma.teacher.findMany();
    return teachers;
  },
  getGroups: async (_, { teacherId }, { prisma, user }) => {
    checkAuthenticatedByTeacher(user, teacherId);
    const groups = await prisma.group.findMany({
      where: { teacherId },
    });
    return groups;
  },
  getGroup: async (_, { id }, { prisma, user }) => {
    await checkAuthenticatedByGroup(user, id);
    const group = await prisma.group.findFirstOrThrow({
      where: { id },
    });
    return group;
  },
  getCollection: async (_, { id }, { prisma, user }) => {
    await checkAuthenticatedByCollection(user, id);
    const matchingCollection = await prisma.evaluationCollection.findFirstOrThrow({
      where: { id },
    });

    return matchingCollection;
  },
  getStudent: async (_, { id }, { prisma, user }) => {
    await checkAuthenticatedByStudent(user, id);
    const matchingStudent = await prisma.student.findFirstOrThrow({
      where: { id },
    });
    return matchingStudent;
  },
  getEvaluation: async (_, { id }, { prisma, user }) => {
    await checkAuthenticatedByEvaluation(user, id);
    const matchingEvaluation = await prisma.evaluation.findFirstOrThrow({
      where: { id },
    });
    return matchingEvaluation;
  },
};

export default resolvers;
