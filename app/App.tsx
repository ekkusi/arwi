import { Suspense, useEffect } from "react";
import { Logs } from "expo";
// import ErrorBoundary from "react-native-error-boundary";
import MatomoTracker, { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import { LogBox, Platform } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import Main from "./Main";
import { AuthProvider } from "./hooks-and-providers/AuthProvider";

import "./i18n";
import "react-native-url-polyfill/auto";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorView from "./app/ErrorView";
import ApolloProvider from "./hooks-and-providers/ApolloProvider";

Logs.enableExpoCliLogging();

// iOS dev build on iOS simulator causes the following warning: Overriding previous layout animation with new one before the first began...
// There seems to be no way to fix this as this comes simply from using KeyboardAvoidingView so logs are ignored.
// Keep an eye on terminal logs for other relevant warnings.
if (Platform.OS === "ios") LogBox.ignoreAllLogs();

function AppContent() {
  const { trackAppStart } = useMatomo();
  const onError = (error: Error, componentStack: string) => {
    console.error(error, componentStack);
    // TODO: Log error to error reporting service
  };

  useEffect(() => {
    trackAppStart({});
  }, [trackAppStart]);

  return (
    <ErrorBoundary FallbackComponent={ErrorView} onError={onError}>
      <AuthProvider>
        <ApolloProvider>
          <Suspense fallback={<LoadingIndicator />}>
            <Main />
          </Suspense>
        </ApolloProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const SITE_ID = process.env.EXPO_PUBLIC_MATOMO_SITE_ID ? Number(process.env.EXPO_PUBLIC_MATOMO_SITE_ID) : 1;
const MATOMO_BASE_URL = process.env.EXPO_PUBLIC_MATOMO_BASE_URL;

if (!MATOMO_BASE_URL)
  throw new Error("Missing Matomo base url env variable, define EXPO_PUBLIC_MATOMO_BASE_URL in .env (or root .env.production in production)");

const instance = new MatomoTracker({
  urlBase: MATOMO_BASE_URL,
  siteId: SITE_ID,
  disabled: __DEV__,
});

export default function App() {
  return (
    <MatomoProvider instance={instance}>
      <AppContent />
    </MatomoProvider>
  );
}
