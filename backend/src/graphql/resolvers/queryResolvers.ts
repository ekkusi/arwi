import {
  FEEDBACK_GENERATION_TOKEN_COST,
  MINIMUM_SUPPORTED_APP_VERSION,
  MIN_EVALS_FOR_FEEDBACK,
  MONTHLY_TOKEN_USE_LIMIT,
  TEXT_FIX_TOKEN_COST,
} from "../../config";
import AuthenticationError from "../errors/AuthenticationError";
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
import { fetchOrganizationChildren } from "@/utils/organizationApi";

const resolvers: QueryResolvers<CustomContext> = {
  getAppMetadata: () => {
    if (!process.env.APP_VERSION) throw new Error("Something went wrong, APP_VERSION env var is not set");

    return {
      appVersion: process.env.APP_VERSION,
      minimumSupportedAppVersion: MINIMUM_SUPPORTED_APP_VERSION,
      monthlyTokenUseLimit: MONTHLY_TOKEN_USE_LIMIT,
      feedbackGenerationTokenCost: FEEDBACK_GENERATION_TOKEN_COST,
      textFixTokenCost: TEXT_FIX_TOKEN_COST,
      minimumEvalsForFeedback: MIN_EVALS_FOR_FEEDBACK,
    };
  },
  getCurrentUser: async (_, __, { user }) => {
    if (!user) throw new AuthenticationError();

    return user;
  },
  getCurrentUserUsageData: async (_, __, { user, dataLoaders }) => {
    if (!user) throw new AuthenticationError();

    return dataLoaders.teacherLoader.load(user.id);
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
  getMPassIDOrganizations: (_, { parentOid }) => {
    return fetchOrganizationChildren(parentOid);
  },
};

export default resolvers;
