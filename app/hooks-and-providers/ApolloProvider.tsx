import { ApolloClient, ApolloLink, ApolloProvider as ApolloProviderBase, createHttpLink, fromPromise, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import { useMemo } from "react";
import { ACCESS_TOKEN_KEY, useAuth } from "./AuthProvider";
import { getErrorMessage, getGraphqlErrorMessage } from "../helpers/errorUtils";
import { useThrowCatchableError } from "./error";

const BACKEND_API_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
if (!BACKEND_API_URL) throw new Error("Backend API URL not defined, define EXPO_PUBLIC_BACKEND_API_URL in .env");

const GRAPHQL_API_URL = `${BACKEND_API_URL}/graphql`;

/**
 * Apollo Setup
 */
const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL,
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    const { accessToken } = await response.json();
    if (!accessToken) throw new Error("No access token returned from refresh token mutation");
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    return accessToken;
  } catch (err) {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    throw err;
  }
};

const cache = new InMemoryCache({
  typePolicies: {
    AuthPayload: {
      keyFields: ["accessToken"],
    },
    ModuleInfo: {
      keyFields: false,
    },
    LearningObjective: {
      keyFields: false,
    },
    Subject: {
      keyFields: ["code"],
    },
    Environment: {
      keyFields: ["code"],
    },
    Module: {
      fields: {
        info: {
          merge: true,
        },
      },
    },
  },
});

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const throwCatchableError = useThrowCatchableError();

  // This and client (AND logout in AuthProvider) needs to be memoized to prevent infinite render loops.
  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            switch (err.extensions.code) {
              case "UNAUTHENTICATED": {
                const refreshTokenPromise = new Promise((resolve, reject) => {
                  refreshToken()
                    .then((accessToken) => resolve(accessToken))
                    .catch((e) => {
                      logout();
                      reject(e);
                    });
                });
                return fromPromise(refreshTokenPromise)
                  .filter((value) => Boolean(value))
                  .flatMap((accessToken) => {
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${accessToken}`,
                      },
                    });
                    return forward(operation);
                  });
              }
              default:
                break;
            }
          }
          throwCatchableError(new Error(`[GraphQL Error]: ${getGraphqlErrorMessage(graphQLErrors)}`));
        }

        if (networkError) {
          throwCatchableError(new Error(`[Network error]: ${getErrorMessage(networkError)}`));
        }
      }),
    [logout, throwCatchableError]
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: GRAPHQL_API_URL,
        link: ApolloLink.from([authLink, errorLink, httpLink]),
        cache,
      }),
    [errorLink]
  );

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
