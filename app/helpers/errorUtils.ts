import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

type GenericError = Error & {
  [key: string]: any;
};

// Custom error handler. Fetches originalError from GraphQLResponse structure, if exists. Otherwise returns normal error message
export const getGraphqlErrorMessage = (errors: readonly GraphQLError[]) => {
  if (errors && errors.length > 0) {
    const graphQLError = errors[0];
    console.log("graphQLError", graphQLError);

    // Try fetch originalError from extensions and return it's message if exists.
    // if (graphQLError.extensions?.originalError) {
    //   return graphQLError.extensions.originalError;
    // }

    // Otherwise return generic error message, probably will be 'Unexpected error'
    return graphQLError.message;
  }
  return "Unexpected error";
};

// Custom error handler. Fetches originalError from GraphQLResponse structure, if exists. Otherwise returns normal error message
export const getErrorMessage = (err: GenericError) => {
  const errors = err.response?.errors || err.errors;

  if (errors && errors.length > 0) {
    const graphQLError = errors[0];

    // Try fetch originalError from extensions and return it's message if exists.
    if (graphQLError.extensions?.originalError?.message) {
      return graphQLError.extensions.originalError.message;
    }

    // Otherwise return generic error message, probably will be 'Unexpected error'
    return graphQLError.message;
  }
  return err.message;
};

export function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw error;
  }
}
