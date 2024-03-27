import { IMiddleware, IMiddlewareFunction } from "graphql-middleware";
import queryResolvers from "../resolvers/queryResolvers";
import AuthenticationError from "../errors/AuthenticationError";
import mutationResolvers from "../resolvers/mutationResolvers";
import { Mutation, Query } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import { SESSION_NAME } from "../../config";
import { checkIsUserVerified } from "@/utils/auth";

const checkIsAuthenticated: IMiddlewareFunction<any, CustomContext> = async (resolve, parent, args, context, info) => {
  if (!context.req.session?.userInfo) {
    context.res.clearCookie(SESSION_NAME);
    throw new AuthenticationError();
  } else if (!checkIsUserVerified(context.req.session.userInfo)) {
    throw new AuthenticationError("EMAIL_NOT_VERIFIED");
  }

  return resolve(parent, args, context, info);
};

const PUBLIC_MUTATION_RESOLVERS: (keyof Mutation)[] = [
  "login",
  "logout",
  "register",
  "mPassIDLogin",
  "verifyPasswordResetCode",
  "updatePassword",
  "requestPasswordReset",
  "sendRegisterVerificationEmail",
];
const PUBLIC_QUERY_RESOLVERS: (keyof Query)[] = ["getAppMetadata", "getMPassIDOrganizations", "getCurrentUser"];

const mutationResolverKeys: (keyof Mutation)[] = Object.keys(mutationResolvers) as (keyof Mutation)[];

const mutationMiddleware: { [key: string]: IMiddlewareFunction } = {};

mutationResolverKeys.forEach((it) => {
  if (!PUBLIC_MUTATION_RESOLVERS.includes(it)) mutationMiddleware[it] = checkIsAuthenticated;
});

const queryResolverKeys: (keyof Query)[] = Object.keys(queryResolvers) as (keyof Query)[];

const queryMiddleware: { [key: string]: IMiddlewareFunction } = {};

queryResolverKeys.forEach((it) => {
  if (!PUBLIC_QUERY_RESOLVERS.includes(it)) queryMiddleware[it] = checkIsAuthenticated;
});

// Middleware, like annotations, can be applied to specific graph fields
// Here I want to apply attribute-based access control to the `inviteUser` on its own
const isAuthenticatedMiddleware: IMiddleware = {
  Query: queryMiddleware,
  Mutation: mutationMiddleware,
};

export default isAuthenticatedMiddleware;
