import { Suspense } from "react";
import ApolloProvider from "./hooks-and-providers/ApolloProvider";
import Main from "./Main";
import { AuthProvider } from "./hooks-and-providers/AuthProvider";
import "./i18n";
import "react-native-url-polyfill/auto";
import LoadingIndicator from "./components/LoadingIndicator";

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
