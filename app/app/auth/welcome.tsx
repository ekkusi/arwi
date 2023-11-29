import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as WebBrowser from "expo-web-browser";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { useFocusEffect } from "@react-navigation/native";
import CButton from "../../components/primitives/CButton";
import CImage from "../../components/primitives/CImage";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import LandingComponent from "./LandingComponent";
import { AuthStackParams } from "./types";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import { useMPassIDAuth } from "../../hooks-and-providers/mPassID";
import { useThrowCatchableError } from "../../hooks-and-providers/error";
import LoadingIndicator from "../../components/LoadingIndicator";

const BACKEND_API_URL = process.env.EXPO_PUBLIC_BACKEND_API_URL;
if (!BACKEND_API_URL) throw new Error("Backend API URL not defined, define EXPO_PUBLIC_BACKEND_API_URL in .env");

const REDIRECT_URI = "arwi-app://auth";

export default function LandingPage({ navigation }: NativeStackScreenProps<AuthStackParams, "welcome">) {
  const { login } = useMPassIDAuth(REDIRECT_URI);
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const throwError = useThrowCatchableError();

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
  }, []);

  useFocusEffect(onFocusEffect);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const handleMPassIDLogin = async () => {
    setLoading(true);
    try {
      const loginResult = await login();
      if (loginResult) await setUser(loginResult.payload.userData);
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setAdjustResize();
    } catch (error) {
      throwError(error);
    }
    setLoading(false);
  };

  const { t } = useTranslation();
  return (
    <LandingComponent headerSize="big" headerPlacement="top" notWrappedChildren={loading ? <LoadingIndicator type="overlay" /> : undefined}>
      <CView
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingBottom: "3xl",
          paddingTop: "2xl",
          paddingHorizontal: "xl",
        }}
      >
        <CView style={{ width: "100%", gap: 15 }}>
          <CButton
            colorScheme="secondary"
            variant="outline"
            title={t("login", "Kirjaudu sisään")}
            style={{ width: "100%" }}
            onPress={() => {
              navigation.navigate("login");
            }}
          />
          <CButton
            colorScheme="secondary"
            variant="outline"
            title={t("register", "Rekisteröidy")}
            style={{ width: "100%" }}
            onPress={() => {
              navigation.navigate("signup");
            }}
          />
        </CView>
        {__DEV__ && (
          <CView style={{ width: "100%", borderTopWidth: 1, borderColor: "lightgray", paddingTop: "2xl" }}>
            <CView style={{ width: "100%" }}>
              <CText style={{ fontSize: "sm", textAlign: "center", marginBottom: "sm", color: "gray", fontWeight: "600" }}>
                {t("authenticate-with-mpassid", "Tunnistaudu palveluun MPASSid:llä")}
              </CText>
              <CButton
                title="MPASSid"
                leftIcon={<CImage variant="fixed" source={require("../../assets/mpassid-minimal-white.png")} width={25} height={25} />}
                onPress={handleMPassIDLogin}
              />
            </CView>
          </CView>
        )}
      </CView>
    </LandingComponent>
  );
}
