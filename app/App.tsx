import { Suspense, useEffect } from "react";
import { Logs } from "expo";
// import ErrorBoundary from "react-native-error-boundary";
import MatomoTracker, { MatomoProvider, useMatomo } from "matomo-tracker-react-native";
import { LogBox, Platform } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { KeyboardProvider } from "react-native-keyboard-controller";
import * as Sentry from "sentry-expo";
import Main from "./Main";
import { AuthProvider } from "./hooks-and-providers/AuthProvider";

import "./i18n";
import "react-native-url-polyfill/auto";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorView from "./app/ErrorView";
import ApolloProvider from "./hooks-and-providers/ApolloProvider";

Logs.enableExpoCliLogging();
const SENTRY_URL = process.env.EXPO_PUBLIC_SENTRY_URL;

if (!SENTRY_URL) console.warn("EXPO_PUBLIC_SENTRY_URL not set, error reporting disabled");

Sentry.init({
  dsn: SENTRY_URL,
  // enableInExpoDevelopment: true,

  // debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

// iOS dev build on iOS simulator causes the following warning: Overriding previous layout animation with new one before the first began...
// There seems to be no way to fix this as this comes simply from using KeyboardAvoidingView so logs are ignored.
// Keep an eye on terminal logs for other relevant warnings.
if (Platform.OS === "ios") LogBox.ignoreAllLogs();

function AppContent() {
  const { trackAppStart } = useMatomo();

  const onError = (error: Error, componentStack: string) => {
    Sentry.Native.captureException(error);
    console.error(error, componentStack);
  };

  useEffect(() => {
    trackAppStart({});
  }, [trackAppStart]);

  return (
    <ErrorBoundary FallbackComponent={ErrorView} onError={onError}>
      <AuthProvider>
        <ApolloProvider>
          <KeyboardProvider>
            <Suspense fallback={<LoadingIndicator />}>
              <Main />
            </Suspense>
          </KeyboardProvider>
        </ApolloProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const SITE_ID = process.env.EXPO_PUBLIC_MATOMO_SITE_ID ? Number(process.env.EXPO_PUBLIC_MATOMO_SITE_ID) : 1;
const MATOMO_BASE_URL = process.env.EXPO_PUBLIC_MATOMO_BASE_URL;

if (!MATOMO_BASE_URL) console.warn("EXPO_PUBLIC_MATOMO_BASE_URL not set, analytics disabled");

const instance =
  MATOMO_BASE_URL &&
  new MatomoTracker({
    urlBase: MATOMO_BASE_URL,
    siteId: SITE_ID,
    disabled: __DEV__,
  });

export default function App() {
  return instance ? (
    <MatomoProvider instance={instance}>
      <AppContent />
    </MatomoProvider>
  ) : (
    <AppContent />
  );
}
