import { IMiddleware, IMiddlewareFunction } from "graphql-middleware";
import AuthenticationError from "../errors/AuthenticationError";
import mutationResolvers from "../resolvers/mutationResolvers";
import { Mutation } from "../types";
import { CustomContext } from "../types/contextTypes";

const checkIsAuthenticated: IMiddlewareFunction<any, CustomContext> = async (resolve, parent, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError();
  }

  return resolve(parent, args, context, info);
};

const PUBLIC_RESOLVERS: (keyof Mutation)[] = ["login", "register"];

const mutationResolverKeys: (keyof Mutation)[] = Object.keys(mutationResolvers) as (keyof Mutation)[];

const mutationMiddleware: { [key: string]: IMiddlewareFunction } = {};

mutationResolverKeys.forEach((it) => {
  if (!PUBLIC_RESOLVERS.includes(it)) mutationMiddleware[it] = checkIsAuthenticated;
});

// Middleware, like annotations, can be applied to specific graph fields
// Here I want to apply attribute-based access control to the `inviteUser` on its own
const isAuthenticatedMiddleware: IMiddleware = {
  Query: checkIsAuthenticated,
  Mutation: mutationMiddleware,
};

export default isAuthenticatedMiddleware;
