import { Slot } from "expo-router";
import ApolloProvider from "../hooks-and-providers/ApolloProvider";
import { AuthProvider } from "../hooks-and-providers/AuthProvider";

export default function MainLayout() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <Slot />
      </ApolloProvider>
    </AuthProvider>
  );
}
