import AuthenticationError from "../../errors/AuthenticationError";
import ValidationError from "../../errors/ValidationError";
import { QueryResolvers } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import {
  checkAuthenticatedByCollection,
  checkAuthenticatedByEvaluation,
  checkAuthenticatedByGroup,
  checkAuthenticatedByStudent,
  checkAuthenticatedByTeacher,
} from "../utils/auth";

const resolvers: QueryResolvers<CustomContext> = {
  getAppMetadata: () => {
    if (!process.env.APP_VERSION) throw new Error("Something went wrong, APP_VERSION env var is not set");
    return {
      appVersion: process.env.APP_VERSION,
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
