import { MINIMUM_SUPPORTED_APP_VERSION } from "../../config";
import AuthenticationError from "../../errors/AuthenticationError";
import { QueryResolvers } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import {
  checkAuthenticatedByCollection,
  checkAuthenticatedByEvaluation,
  checkAuthenticatedByGroup,
  checkAuthenticatedByStudent,
  checkAuthenticatedByTeacher,
  checkAuthenticatedByType,
} from "../utils/auth";

const resolvers: QueryResolvers<CustomContext> = {
  getAppMetadata: () => {
    if (!process.env.APP_VERSION) throw new Error("Something went wrong, APP_VERSION env var is not set");

    return {
      appVersion: process.env.APP_VERSION,
      minimumSupportedAppVersion: MINIMUM_SUPPORTED_APP_VERSION,
    };
  },
  getCurrentUser: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError("Not authenticated");

    return user;
  },
  getTeacher: (_, { id }, { user, dataLoaders }) => {
    checkAuthenticatedByTeacher(user, id);
    return dataLoaders.teacherLoader.load(id);
  },
  getGroups: (_, { teacherId }, { dataLoaders, user }) => {
    checkAuthenticatedByTeacher(user, teacherId);
    return dataLoaders.groupsByTeacherLoader.load(teacherId);
  },
  getGroup: async (_, { id }, { user, dataLoaders }) => {
    await checkAuthenticatedByGroup(user, id);
    return dataLoaders.groupLoader.load(id);
  },
  getCollection: async (_, { id }, { dataLoaders, user }) => {
    await checkAuthenticatedByCollection(user, id);
    return dataLoaders.collectionLoader.load(id);
  },
  getType: async (_, { id }, { dataLoaders, user }) => {
    await checkAuthenticatedByType(user, id);
    return dataLoaders.collectionTypeLoader.load(id);
  },
  getStudent: async (_, { id }, { user, dataLoaders }) => {
    await checkAuthenticatedByStudent(user, id);
    return dataLoaders.studentLoader.load(id);
  },
  getEvaluation: async (_, { id }, { dataLoaders, user }) => {
    await checkAuthenticatedByEvaluation(user, id);
    return dataLoaders.evaluationLoader.load(id);
  },
};

export default resolvers;
