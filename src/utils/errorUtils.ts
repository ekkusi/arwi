type GenericError = Error & {
  [key: string]: any;
};

// Custom error handler. Fetches originalError from GraphQLResponse structure, if exists. Otherwise returns normal error
export const getErrorMessage = (err: GenericError) => {
  if (err.response?.errors?.length > 0) {
    const graphQLError = err.response.errors[0];

    // Try fetch originalError from extensions and return it's message if exists.
    if (graphQLError.extensions?.originalError.message) {
      return graphQLError.extensions.originalError.message;
    }

    // Otherwise return generic error message, probably will be 'Unexpected error'
    return graphQLError.message;
  }
  return err.message;
};
