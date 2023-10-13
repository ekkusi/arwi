import { Suspense, useEffect } from "react";
import { Logs } from "expo";
import ErrorBoundary from "react-native-error-boundary";
import MatomoTracker, { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import { LogBox, Platform } from "react-native";
import ApolloProvider from "./hooks-and-providers/ApolloProvider";
import Main from "./Main";
import { AuthProvider } from "./hooks-and-providers/AuthProvider";

import "./i18n";
import "react-native-url-polyfill/auto";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorView from "./app/ErrorView";

Logs.enableExpoCliLogging();

// iOS dev build on iOS simulator causes the following warning: Overriding previous layout animation with new one before the first began...
// There seems to be no way to fix this as this comes simply from using KeyboardAvoidingView so logs are ignored.
// Keep an eye on terminal logs for other relevant warnings.
if (Platform.OS === "ios") LogBox.ignoreAllLogs();

function AppContent() {
  const { trackAppStart } = useMatomo();
  const onError = (error: Error, componentStack: string) => {
    console.error(error, componentStack);
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

const instance = new MatomoTracker({
  urlBase: "http://77.83.247.14:9000",
  siteId: 1,
});

export default function App() {
  return (
    <MatomoProvider instance={instance}>
      <AppContent />
    </MatomoProvider>
  );
}
