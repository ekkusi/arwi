"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import { useTranslation } from "@/i18n/client";
import { LanguageOption } from "@/i18n/settings";

type ProvidersProps = {
  theme: ChakraProviderProps["theme"];
} & LanguageProviderProps;

type LanguageProviderProps = {
  lng: LanguageOption;
  children: JSX.Element;
};

function LanguageProvider({ lng, children }: LanguageProviderProps) {
  useTranslation(lng);
  return children;
}

export default function Providers({ theme, ...rest }: ProvidersProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <LanguageProvider {...rest} />
      </ChakraProvider>
    </CacheProvider>
  );
}
