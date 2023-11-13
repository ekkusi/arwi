import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMatomo } from "matomo-tracker-react-native";
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { useFocusEffect } from "@react-navigation/native";
import CButton from "../../components/primitives/CButton";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import LandingComponent from "./LandingComponent";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import { AuthStackParams } from "./types";
import TextFormField from "../../components/form/TextFormField";
import { COLORS } from "../../theme";
import { MATOMO_EVENT_CATEGORIES } from "../../config";

const LoginPage_Login_Mutation = graphql(`
  mutation LoginPage_Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userData {
        email
        id
        languagePreference
        consentsAnalytics
        isMPassIDConnected
      }
    }
  }
`);

export default function LoginPage({ navigation }: NativeStackScreenProps<AuthStackParams, "login">) {
  const { trackAppStart, trackEvent } = useMatomo();
  const { setUser } = useAuth();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { t } = useTranslation();

  const [login] = useMutation(LoginPage_Login_Mutation);

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setAdjustResize();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const handlePasswordChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setPassword(text);
  };

  const handleEmailChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setEmail(text);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await login({ variables: { email, password } });
      if (!data) throw new Error("Unexpected error");
      await setUser(data.login.userData);
      const userInfo = {
        uid: data.login.userData.id,
      };
      trackEvent({
        category: MATOMO_EVENT_CATEGORIES.AUTH,
        action: "Login - Custom",
        userInfo,
      });
      trackAppStart({
        userInfo,
      });
    } catch (error) {
      const msg = getErrorMessage(error);

      setGeneralError(msg);
    }
    setLoading(false);
  };
  return (
    <LandingComponent title={t("login", "Kirjaudu sisään")}>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        {/* <CText style={{ fontSize: "xl", marginBottom: "2xl", textAlign: "center" }}>{t("login", "Kirjaudu sisään")}</CText> */}
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <TextFormField
            title={t("email", "Sähköposti")}
            placeholder="arwioija@gmail.com"
            validate={nameValidator}
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleEmailChange}
          />
          <CView>
            <TextFormField
              title={t("password", "Salasana")}
              placeholder={t("password", "Salasana")}
              style={{ width: "100%" }}
              secureTextEntry={secureTextEntry}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              validate={nameValidator}
              onChange={handlePasswordChange}
            />
            <CTouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
            >
              <MaterialCommunityIcon name={secureTextEntry ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
            </CTouchableOpacity>
          </CView>
          {generalError && <CText style={{ color: "error", fontWeight: "600", fontSize: "md" }}>{generalError}</CText>}
        </CView>
        <CView style={{ width: "100%" }}>
          <CButton
            loading={loading}
            title={t("login", "Kirjaudu sisään")}
            colorScheme="secondary"
            variant="outline"
            style={{ width: "100%", marginBottom: "sm" }}
            disabled={email.length === 0 || password.length === 0 || generalError !== undefined}
            onPress={handleSubmit}
          />
          <CView style={{ flexDirection: "row", justifyContent: "center" }}>
            <CText style={{ fontSize: "sm", fontWeight: "500", color: "gray" }}>
              {t("LoginView.noUserYet", "Eikö sinulla ole vielä käyttäjää?")}{" "}
            </CText>
            <CTouchableOpacity
              onPress={() => {
                navigation.navigate("signup");
              }}
            >
              <CText style={{ fontSize: "sm", fontWeight: "500", color: "primary" }}>{t("register", "Rekisteröidy")}</CText>
            </CTouchableOpacity>
            <CText style={{ fontSize: "sm", fontWeight: "500", color: "gray" }}>.</CText>
          </CView>
        </CView>
      </CView>
    </LandingComponent>
  );
}
