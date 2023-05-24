import { ApolloClient, ApolloLink, ApolloProvider as ApolloProviderBase, createHttpLink, fromPromise, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { ACCESS_TOKEN_KEY } from "./AuthProvider";
import { graphql } from "../gql";

const ApolloProvider_RefreshToken_Mutation = graphql(`
  mutation ApolloProvider_RefreshToken {
    refreshToken {
      accessToken
    }
  }
`);

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
  try {
    const refreshResolverResponse = await client.mutate({
      mutation: ApolloProvider_RefreshToken_Mutation,
    });
    const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
    if (!accessToken) throw new Error("No access token returned from refresh token mutation");
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    return accessToken;
  } catch (err) {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    client.clearStore(); // Clear cache as user is logged out
    throw err;
  }
};

/**
 * Apollo Setup
 */

const httpLink = createHttpLink({
  uri: Constants.expoConfig?.extra?.graphqlApiUrl,
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

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED": {
          return fromPromise(refreshToken())
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
  }

  if (networkError) console.warn(`[Network error]: ${networkError}`);
  return forward(operation);
});

const client = new ApolloClient({
  uri: Constants.expoConfig?.extra?.graphqlApiUrl,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
}
