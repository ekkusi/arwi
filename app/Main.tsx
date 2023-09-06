import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { MenuProvider } from "react-native-popup-menu";
import * as SplashScreen from "expo-splash-screen";
import { ACCESS_TOKEN_KEY, useAuth } from "./hooks-and-providers/AuthProvider";
import { COLORS } from "./theme";
import AuthStack from "./app/auth/_stack";
import { graphql } from "./gql";
import ModalProvider from "./hooks-and-providers/ModalProvider";
import HomeStack from "./app/home/_stack";
import { STORAGE_LANG_KEY } from "./i18n";
import PopupProvider from "./hooks-and-providers/PopupProvider";

const Main_GetCurrentUser_Query = graphql(`
  query Main_GetCurrentUser {
    getCurrentUser {
      email
      id
    }
  }
`);

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const { authState, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const { ready: i18nReady, i18n } = useTranslation(); // i18n works weirdly with Gridly connection. For some initial screen is not rendered if this is not checked here.

  const client = useApolloClient();

  // Fetch token and current user and set them to global state if they exist
  const setUserInfo = useCallback(async () => {
    const { data } = await client.query({ query: Main_GetCurrentUser_Query });
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (data && token) {
      await setUser(token, data.getCurrentUser);
    }
    // Fetch lang from storage and set it to i18n
    const storedLang = await SecureStore.getItemAsync(STORAGE_LANG_KEY);
    if (storedLang) i18n.changeLanguage(storedLang);
  }, [client, i18n, setUser]);

  useEffect(() => {
    setUserInfo()
      .catch((err) => {
        console.info(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUserInfo]);

  const onRootLayout = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  if (loading || !i18nReady) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onRootLayout}>
      <StatusBar backgroundColor={COLORS.green} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MenuProvider>
          <ModalProvider>
            <PopupProvider>
              <NavigationContainer>{authState.authenticated ? <HomeStack /> : <AuthStack />}</NavigationContainer>
            </PopupProvider>
          </ModalProvider>
        </MenuProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
