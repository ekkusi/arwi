import { Prisma } from "@prisma/client";
import { Resolver, ResolverFn, Resolvers } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import mutationResolvers from "./mutationResolvers";
import queryResolvers from "./queryResolvers";
import typeResolvers from "./typeResolvers";
import NotFoundError from "../../errors/NotFoundError";

function withErrorHandling(resolver: ResolverFn<CustomContext, {}, {}, {}>): Resolver<CustomContext> {
  return async (parent, args, context, info) => {
    try {
      return await resolver(parent, args, context, info);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw new NotFoundError();
      }
      throw error;
    }
  };
}

function wrapResolversWithErrorHandler(resolvers: Resolvers) {
  const resolversWithErrors = { ...resolvers };
  Object.keys(resolversWithErrors).forEach((type) => {
    if (type === "Query" || type === "Mutation") {
      Object.keys(resolversWithErrors[type]!).forEach((field) => {
        const resolver = (resolversWithErrors[type] as any)[field];
        (resolversWithErrors[type] as any)[field] = withErrorHandling(resolver);
      });
    }
  });
  return resolversWithErrors;
}

const resolvers: Resolvers = wrapResolversWithErrorHandler({
  ...typeResolvers,
  Query: queryResolvers,
  Mutation: mutationResolvers,
});

export default resolvers;
