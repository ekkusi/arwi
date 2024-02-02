import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  from,
  ApolloQueryResult,
  QueryOptions,
  OperationVariables,
  DefaultContext,
  MutationOptions,
  FetchResult,
  ApolloError,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LINK_CONFIG } from "./config";
import { getLocaleServer, getPathnameServer } from "../utils/server";
import { getPathFromRoute } from "../utils/route";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        Cookie: cookies().toString(),
      },
    };
  });
  return forward(operation);
});

const httpLink = new HttpLink(LINK_CONFIG);

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authMiddleware, httpLink]),
  });
});

const client = getClient();

function handleError(error: Error): never {
  if (error instanceof ApolloError) {
    const { graphQLErrors } = error;
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED": {
            const loginPath = getPathFromRoute("/login", getLocaleServer());
            if (!loginPath) throw new Error("No login path found");
            redirect(`${loginPath}?${new URLSearchParams({ from_unauthenticated: "true", redirect_uri: getPathnameServer() })}`);
          }
          // eslint-disable-next-line no-fallthrough
          default:
            break;
        }
      }
    }
  }
  throw error;
}

export async function serverQuery<T = any, TVariables extends OperationVariables = OperationVariables>(
  options: QueryOptions<TVariables, T>
): Promise<ApolloQueryResult<T>> {
  try {
    const result = await client.query(options);

    return result;
  } catch (err) {
    handleError(err);
  }
}

export async function serverMutate<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext extends Record<string, any> = DefaultContext
>(options: MutationOptions<TData, TVariables, TContext>): Promise<FetchResult<TData>> {
  try {
    const result = await client.mutate(options);

    return result;
  } catch (err) {
    handleError(err);
  }
}
