"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import { useTranslation } from "@/i18n/client";
import { LanguageOption } from "@/i18n/settings";
import { ApolloWrapper } from "../../apollo/ApolloWrapper";
import { AuthProvider } from "../../hooks-and-providers/AuthProvider";

type ProvidersProps = {
  theme: ChakraProviderProps["theme"];
  initialIsAuthenticated: boolean;
} & LanguageProviderProps;

type LanguageProviderProps = {
  lng: LanguageOption;
  children: JSX.Element;
};

function LanguageProvider({ lng, children }: LanguageProviderProps) {
  useTranslation(lng);
  return children;
}

// @ts-ignore
if (typeof window !== "undefined") window.builderNoTrack = true;

export default function Providers({ theme, initialIsAuthenticated, ...rest }: ProvidersProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider initialIsAuthenticated={initialIsAuthenticated}>
          <ApolloWrapper>
            <LanguageProvider {...rest} />
          </ApolloWrapper>
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
