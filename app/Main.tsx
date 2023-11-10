import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { MenuProvider } from "react-native-popup-menu";
import * as SplashScreen from "expo-splash-screen";
import * as Application from "expo-application";
import { useMatomo } from "matomo-tracker-react-native";
import { useFonts } from "expo-font";
import { useAuth } from "./hooks-and-providers/AuthProvider";
import { COLORS } from "./theme";
import AuthStack from "./app/auth/_stack";
import { graphql } from "./gql";
import ModalProvider from "./hooks-and-providers/ModalProvider";
import HomeStack from "./app/home/_stack";
import { isValidLanguage, STORAGE_LANG_KEY } from "./i18n";
import PopupProvider from "./hooks-and-providers/ToastProvider";
import { isVersionSmaller } from "./helpers/versionUtils";
import NewUpdateAvailableModal from "./components/NewUpdateAvailableModal";

const Main_GetCurrentUser_Query = graphql(`
  query Main_GetCurrentUser {
    getCurrentUser {
      email
      languagePreference
      consentsAnalytics
      id
      isMPassIDConnected
    }
  }
`);

const Main_GetAppMetadata_Query = graphql(`
  query Main_GetAppMetadata {
    getAppMetadata {
      appVersion
    }
  }
`);

SplashScreen.preventAutoHideAsync();

const CURRENT_APP_VERSION = Application.nativeApplicationVersion;

export default function Main() {
  const { trackAppStart, trackScreenView } = useMatomo();
  const { authState, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    "Aileron-Thin": require("./assets/fonts/Aileron-Thin.otf"),
  });
  const { ready: i18nReady, i18n } = useTranslation(); // i18n works weirdly with Gridly connection. For some initial screen is not rendered if this is not checked here.

  const client = useApolloClient();
  const navigationRef = useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);
  const routeNameRef = useRef<string | null>(null);

  const { data: appMetadataResult, loading: loadingAppMetadata } = useQuery(Main_GetAppMetadata_Query);

  const minimumAppVersion = appMetadataResult?.getAppMetadata?.appVersion || null;

  const appReady = !loading && fontsLoaded && i18nReady && !loadingAppMetadata;

  // Fetch token and current user and set them to global state if they exist
  const setUserInfo = useCallback(async () => {
    const { data } = await client.query({ query: Main_GetCurrentUser_Query });
    if (data) {
      await setUser(data.getCurrentUser);
      trackAppStart({
        userInfo: {
          uid: data.getCurrentUser.id,
        },
      });
    }

    // NOTE: If separate separate consent asking is implemented, uncomment this
    // Enable crashlytics and analytics only if user has given consent
    // if (data.getCurrentUser.consentsAnalytics) {
    //   await crashlytics().setCrashlyticsCollectionEnabled(true);
    //   await firebase.analytics().setAnalyticsCollectionEnabled(true);
    // }
    // Fetch lang from storage and set it to i18n
    const storedLang = await SecureStore.getItemAsync(STORAGE_LANG_KEY);
    if (storedLang && i18n.language !== storedLang && isValidLanguage(storedLang)) i18n.changeLanguage(storedLang);
  }, [client, i18n, setUser, trackAppStart]);

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

  const onNavigationStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    const currentUser = authState.user;

    if (currentRouteName && currentUser && previousRouteName !== currentRouteName) {
      trackScreenView({
        name: currentRouteName,
        userInfo: {
          uid: currentUser.id,
        },
      });
    }
    routeNameRef.current = currentRouteName || null;
  };

  if (!appReady) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onRootLayout}>
      <StatusBar backgroundColor={COLORS.green} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NewUpdateAvailableModal isOpen={isVersionSmaller(CURRENT_APP_VERSION, minimumAppVersion)} />
        <MenuProvider>
          <ModalProvider>
            <PopupProvider>
              <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChange}>
                {authState.authenticated ? <HomeStack /> : <AuthStack />}
              </NavigationContainer>
            </PopupProvider>
          </ModalProvider>
        </MenuProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
