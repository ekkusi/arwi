import { Prisma } from "@prisma/client";
import * as Sentry from "@sentry/node";
import { Resolver, ResolverFn, Resolvers } from "../../types";
import { CustomContext } from "../../types/contextTypes";
import mutationResolvers from "./mutationResolvers";
import queryResolvers from "./queryResolvers";
import typeResolvers from "./typeResolvers";
import NotFoundError from "../../errors/NotFoundError";
import AuthenticationError from "../errors/AuthenticationError";
import ValidationError from "../errors/ValidationError";
import MissingDataError from "../errors/MissingDataError";
import OpenIDError from "../errors/OpenIDError";
import AuthorizationError from "../errors/AuthorizationError";
import OpenAIGraphQLError from "../errors/OpenAIGraphqlError";
import UsageLimitError from "../errors/UsageLimitError";

function withErrorHandling(resolver: ResolverFn<CustomContext, {}, {}, {}>): Resolver<{}, {}, CustomContext> {
  return async (parent, args, context, info) => {
    try {
      return await resolver(parent, args, context, info);
    } catch (initialError) {
      console.error(initialError);
      let error = initialError;
      let type = "unknown";
      let level: Sentry.SeverityLevel = "error";
      switch (error?.constructor) {
        case NotFoundError:
          type = "not_found";
          level = "warning";
          break;
        case AuthenticationError:
          type = "authentication";
          level = "warning";
          break;
        case AuthorizationError:
          type = "authorization";
          level = "warning";
          break;
        case ValidationError:
          type = "validation";
          level = "warning";
          break;
        case UsageLimitError:
          type = "usage_limit";
          level = "warning";
          break;
        case MissingDataError:
          type = "missing_data";
          break;
        case OpenIDError:
          type = "openid";
          break;
        case OpenAIGraphQLError:
          type = "openai";
          break;
        default:
          type = "unknown";
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        error = new NotFoundError();
        type = "not_found";
        level = "warning";
      }
      Sentry.withScope((scope) => {
        scope.setTag("type", type);
        scope.setLevel(level);
        Sentry.captureException(initialError, { mechanism: { handled: type !== "unknown" } });
      });
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
