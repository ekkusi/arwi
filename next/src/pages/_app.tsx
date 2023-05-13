// TODO: Configure fonts with @next/font
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/glegoo/400.css";

import BottomNavigationBar from "@/components/functional/BottomNavigationBar";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import ServiceWorkerProvider from "@/hooks-and-providers/ServiceWorkerProvider";
import ErrorBoundary from "@/components/general/ErrorBoundary";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Arwi</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <Component session={session} {...pageProps} />
            <BottomNavigationBar />
            <ServiceWorkerProvider />
          </ErrorBoundary>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
