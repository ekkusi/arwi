import { Suspense } from "react";
import { Logs } from "expo";
import { LogBox, Platform } from "react-native";
import ApolloProvider from "./hooks-and-providers/ApolloProvider";
import Main from "./Main";
import { AuthProvider } from "./hooks-and-providers/AuthProvider";

import "./i18n";
import "react-native-url-polyfill/auto";
import LoadingIndicator from "./components/LoadingIndicator";

Logs.enableExpoCliLogging();

// iOS dev build on iOS simulator causes the following warning: Overriding previous layout animation with new one before the first began...
// There seems to be no way to fix this as this comes simply from using KeyboardAvoidingView so logs are ignored.
// Keep an eye on terminal logs for other relevant warnings.
if (Platform.OS === "ios") LogBox.ignoreAllLogs();

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Suspense fallback={<LoadingIndicator />}>
          <Main />
        </Suspense>
      </ApolloProvider>
    </AuthProvider>
  );
}
