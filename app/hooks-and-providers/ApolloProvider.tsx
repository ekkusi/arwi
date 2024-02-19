import { ApolloClient, ApolloLink, ApolloProvider as ApolloProviderBase, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { asyncMap } from "@apollo/client/utilities";
import { useAuth } from "./AuthProvider";
import { getErrorMessage, getGraphqlErrorMessage } from "../helpers/errorUtils";
import { useThrowCatchableError } from "./error";
import { getSessionId, setSessionId } from "../helpers/session";

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

const asyncAuthLink = setContext(async (_, { headers = {} }) => {
  const sessionId = await getSessionId();
  return {
    headers: {
      ...headers,
      "x-session-id": sessionId,
      "x-session-type": "header",
    },
  };
});

const authAfterWareLink = new ApolloLink((operation, forward) => {
  return asyncMap(forward(operation), async (response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    const sessionId = headers.get("x-session-id");
    if (sessionId) {
      await setSessionId(sessionId);
    }

    return response;
  });
});

const cache = new InMemoryCache({
  typePolicies: {
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
    EvaluationCollection: {
      fields: {
        evaluations: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Student: {
      fields: {
        currentModuleEvaluations: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Module: {
      fields: {
        info: {
          merge: true,
        },
        evaluationCollections: {
          merge(_, incoming) {
            return incoming;
          },
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
          let shouldThrow = false;
          for (const err of graphQLErrors) {
            switch (err.extensions.code) {
              case "UNAUTHENTICATED": {
                logout();
                return forward(operation);
              }
              case "UNAUTHORIZED": {
                shouldThrow = true;
                break;
              }
              // Don't throw generic error page from validation errors, these should be handled in whereever they occur.
              case "VALIDATION_ERROR": {
                shouldThrow = false;
                break;
              }
              // Don't throw generic error page from openid errors, these should be handled in whereever they occur.
              case "OPENID_ERROR": {
                shouldThrow = false;
                break;
              }
              default:
                break;
            }
          }
          if (shouldThrow) throwCatchableError(new Error(`[GraphQL Error]: ${getGraphqlErrorMessage(graphQLErrors)}`));
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
        link: ApolloLink.from([asyncAuthLink, errorLink, authAfterWareLink, httpLink]),
        cache,
      }),
    [errorLink]
  );

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
