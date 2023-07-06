import { Redirect, Slot, SplashScreen, Stack } from "expo-router";
import ApolloProvider from "../hooks-and-providers/ApolloProvider";
import { AuthProvider, useAuth } from "../hooks-and-providers/AuthProvider";
import "../i18n";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

export function MainLayoutContent() {
  const { authState } = useAuth();
  console.log(authState.loading);

  return !authState.loading ? <Slot /> : <SplashScreen />;
}

export default function MainLayout() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <MainLayoutContent />
        {/* <Slot /> */}
      </ApolloProvider>
    </AuthProvider>
  );
}
