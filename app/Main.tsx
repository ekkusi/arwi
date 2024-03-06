import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
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
import { graphql } from "@/graphql";
import ModalProvider from "./hooks-and-providers/ModalProvider";
import HomeStack from "./app/home/_stack";
import { isValidLanguage, STORAGE_LANG_KEY } from "./i18n";
import PopupProvider from "./hooks-and-providers/ToastProvider";
import { isVersionSmaller } from "./helpers/versionUtils";
import NewUpdateAvailableModal from "./components/modals/NewUpdateAvailableModal";
import { useThrowCatchableError } from "./hooks-and-providers/error";
import GenerateFeedbacksProvider from "./hooks-and-providers/GenerateFeedbacksProvider";
import MetadataProvider from "./hooks-and-providers/MetadataProvider";

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
      minimumSupportedAppVersion
      monthlyTokenUseLimit
      feedbackGenerationTokenCost
      textFixTokenCost
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

  const throwError = useThrowCatchableError();
  const navigationRef = useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);
  const routeNameRef = useRef<string | null>(null);

  const throwErrorAndHideSplash = useCallback(
    (err: Error) => {
      SplashScreen.hideAsync();
      throwError(err);
      return null;
    },
    [throwError]
  );

  const { data: appMetadataResult, loading: loadingAppMetadata } = useQuery(Main_GetAppMetadata_Query);

  const [getUser] = useLazyQuery(Main_GetCurrentUser_Query);

  const minimumAppVersion = appMetadataResult?.getAppMetadata.minimumSupportedAppVersion || null;

  const appReady = !loading && fontsLoaded && i18nReady && !loadingAppMetadata;

  // Fetch token and current user and set them to global state if they exist
  const setUserInfo = useCallback(async () => {
    const { data, error } = await getUser();

    if (data) {
      setUser(data.getCurrentUser);
      trackAppStart({
        userInfo: {
          uid: data.getCurrentUser.id,
        },
      });
    } else if (error && error.graphQLErrors[0]?.extensions.code !== "UNAUTHENTICATED") {
      // Don't throw if error is just UNAUTHENTICATED error
      throwErrorAndHideSplash(error);
    }

    // Fetch lang from storage and set it to i18n
    const storedLang = await SecureStore.getItemAsync(STORAGE_LANG_KEY);
    if (storedLang && i18n.language !== storedLang && isValidLanguage(storedLang)) i18n.changeLanguage(storedLang);
  }, [getUser, i18n, setUser, throwErrorAndHideSplash, trackAppStart]);

  useEffect(() => {
    setUserInfo()
      .catch(throwErrorAndHideSplash)
      .finally(() => {
        setLoading(false);
      });
  }, [setUserInfo, throwErrorAndHideSplash]);

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
  if (!appMetadataResult) return throwErrorAndHideSplash(new Error("App metadata not found"));

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onRootLayout}>
      <StatusBar backgroundColor={COLORS.green} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NewUpdateAvailableModal isOpen={isVersionSmaller(CURRENT_APP_VERSION, minimumAppVersion)} />
        <MenuProvider>
          <ModalProvider>
            <PopupProvider>
              <GenerateFeedbacksProvider>
                <MetadataProvider {...appMetadataResult.getAppMetadata}>
                  <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChange}>
                    {authState.authenticated ? <HomeStack /> : <AuthStack />}
                  </NavigationContainer>
                </MetadataProvider>
              </GenerateFeedbacksProvider>
            </PopupProvider>
          </ModalProvider>
        </MenuProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
