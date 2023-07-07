import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Suspense } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import MainStack from "./app/_stack";
import { useAuth } from "./hooks-and-providers/AuthProvider";
import { COLORS } from "./theme";
import AuthStack from "./app/auth/_stack";

export default function Main() {
  const { authState } = useAuth();

  if (authState.loading) return <LoadingIndicator />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.green} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Suspense fallback={<LoadingIndicator />}>{authState.authenticated ? <MainStack /> : <AuthStack />}</Suspense>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
