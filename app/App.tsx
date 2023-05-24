import ApolloProvider from "./hooks-and-providers/ApolloProvider";
import Main from "./Main";
import { AuthProvider } from "./hooks-and-providers/AuthProvider";
import "./i18n";

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Main />
      </ApolloProvider>
    </AuthProvider>
  );
}
