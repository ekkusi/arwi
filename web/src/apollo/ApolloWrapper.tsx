"use client";

import { HttpLink, from } from "@apollo/client";
import { ApolloNextAppProvider, NextSSRInMemoryCache, NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LINK_CONFIG } from "./config";
import { useAuth } from "../hooks-and-providers/AuthProvider";
import { getPathFromRoute } from "../utils/route";
import { useTranslation } from "../i18n/client";
import { LanguageOption } from "../i18n/settings";
import { getPathnameServer } from "../utils/server";

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const { i18n } = useTranslation();
  const pathname = usePathname();
  // This and client (AND logout in AuthProvider) needs to be memoized to prevent infinite render loops.
  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            switch (err.extensions.code) {
              case "UNAUTHENTICATED": {
                console.log("UNAUTHENTICATED client apollo");

                setIsAuthenticated(false);
                const loginPath = getPathFromRoute("/login", i18n.language as LanguageOption);
                if (!loginPath) throw new Error("No login path found");
                router.push(`${loginPath}?${new URLSearchParams({ from_unauthenticated: "true", redirect_uri: pathname })}`);
                return forward(operation);
              }
              default:
                break;
            }
          }
        }
        return forward(operation);
      }),
    [i18n.language, pathname, router, setIsAuthenticated]
  );
  // have a function to create a client for you
  const makeClient = () => {
    return new NextSSRApolloClient({
      // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
      cache: new NextSSRInMemoryCache(),
      link: from([errorLink, new HttpLink(LINK_CONFIG)]),
    });
  };
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
