import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../hooks-and-providers/AuthProvider";

export default function LandingStack() {
  const { authState } = useAuth();
  return !authState.authenticated ? <Stack initialRouteName="welcome" screenOptions={{ headerShown: false }} /> : <Redirect href="/" />;
}
