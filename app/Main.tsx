import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import LoadingIndicator from "./components/LoadingIndicator";
import LandingStack from "./app/(lander)/LandingStack";
import MainStack from "./app/_layout";
import { ACCESS_TOKEN_KEY, useAuth } from "./hooks-and-providers/AuthProvider";
import { COLORS } from "./theme";

export default function Main() {
  const { authState, setToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY).then((accessToken) => {
      if (accessToken) {
        setToken(accessToken);
      }
      setLoading(false);
    });
  }, [setToken]);

  if (loading) return <LoadingIndicator />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.green} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>{authState.authenticated ? <MainStack /> : <LandingStack />}</NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
