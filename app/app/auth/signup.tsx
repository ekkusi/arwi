import { useMutation } from "@apollo/client";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import WebView from "react-native-webview";
import { useMatomo } from "matomo-tracker-react-native";
import Checkbox from "expo-checkbox";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import LandingComponent from "./LandingComponent";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import { AuthStackParams } from "./types";
import TextFormField from "../../components/form/TextFormField";
import { COLORS, SPACING } from "../../theme";
import CModal from "../../components/CModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import { MATOMO_EVENT_CATEGORIES } from "../../config";

const RegisterPage_Register_Mutation = graphql(`
  mutation RegisterPage_Register($input: CreateTeacherInput!) {
    register(data: $input) {
      accessToken
      teacher {
        email
        id
        languagePreference
        consentsAnalytics
      }
    }
  }
`);

const PRIVACY_POLICY_URL = "https://arwi.fi/tietosuojaseloste";
const TERMS_AND_CONDITIONS_URL = "https://arwi.fi/kayttoehdot";

export default function SignupPage({ navigation }: NativeStackScreenProps<AuthStackParams, "signup">) {
  const { trackAppStart, trackEvent } = useMatomo();
  const { setUser } = useAuth();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);
  const [passwordAgainSecureTextEntry, setPasswordAgainSecureTextEntry] = useState(true);
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);
  const [isTermsAndConditionsOpen, setIsTermsAndConditionsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [register] = useMutation(RegisterPage_Register_Mutation);

  const handlePasswordChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setPassword(text);
  };

  const handlePasswordAgainChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setPasswordAgain(text);
  };

  const handleEmailChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setEmail(text);
  };

  const handleTermsAndConditionsChange = (value: boolean) => {
    if (generalError) setGeneralError(undefined);
    setTermsAndConditionsAccepted(value);
  };

  const handleSubmit = async () => {
    if (password !== passwordAgain) {
      setGeneralError(t("signup.passwords-dont-match", "Salasanat eivät täsmää"));
      return;
    }
    if (!termsAndConditionsAccepted) {
      setGeneralError(t("signup.accept-terms-and-conditions-needed", "Rekisteröityäksesi sinun täytyy hyväksyä käyttöehdot"));
      return;
    }
    setLoading(true);
    try {
      const { data } = await register({
        mutation: RegisterPage_Register_Mutation,
        variables: { input: { email, password, consentsAnalytics: true, languagePreference: i18n.language } },
      });

      const accessToken = data?.register?.accessToken;
      if (!accessToken) throw new Error("Unexpected error"); // Should get caught before this
      setUser(accessToken, data.register.teacher);
      const userInfo = {
        uid: data.register.teacher.email,
      };
      trackEvent({
        category: MATOMO_EVENT_CATEGORIES.AUTH,
        action: "Register",
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
    <>
      <CModal
        isOpen={isTermsAndConditionsOpen}
        onClose={() => setIsTermsAndConditionsOpen(false)}
        placement="bottom"
        headerStyles={{
          paddingHorizontal: "md",
          position: "absolute",
          zIndex: 1,
          paddingRight: "xl",
          paddingTop: "md",
        }}
        innerViewStyles={{ height: "95%", maxHeight: "95%", paddingHorizontal: 0 }}
      >
        <WebView source={{ uri: TERMS_AND_CONDITIONS_URL }} startInLoadingState renderLoading={() => <LoadingIndicator />} />
      </CModal>
      <CModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
        placement="bottom"
        headerStyles={{
          paddingHorizontal: "md",
          position: "absolute",
          zIndex: 1,
          paddingRight: "xl",
          paddingTop: "md",
        }}
        innerViewStyles={{ height: "95%", maxHeight: "95%", paddingHorizontal: 0 }}
      >
        <WebView source={{ uri: PRIVACY_POLICY_URL }} startInLoadingState renderLoading={() => <LoadingIndicator />} />
      </CModal>
      <LandingComponent title={t("register", "Rekisteröidy")}>
        <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
          <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "xl" }}>
            <TextFormField
              title={t("email", "Sähköpostiosoite")}
              placeholder="arwioija@gmail.com"
              validate={nameValidator}
              style={{ width: "100%" }}
              titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
              onChange={handleEmailChange}
            />
            <CView style={{ marginBottom: "md" }}>
              <TextFormField
                title={t("password", "Salasana")}
                placeholder={t("password", "Salasana")}
                style={{ width: "100%" }}
                secureTextEntry={passwordSecureTextEntry}
                titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
                onChange={handlePasswordChange}
              />
              <CTouchableOpacity
                onPress={() => setPasswordSecureTextEntry(!passwordSecureTextEntry)}
                style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
              >
                <MaterialCommunityIcon name={passwordSecureTextEntry ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
              </CTouchableOpacity>
            </CView>
            <CView style={{ marginBottom: "md" }}>
              <TextFormField
                title={t("password-again", "Salasana uudelleen")}
                placeholder={t("password", "Salasana")}
                style={{ width: "100%" }}
                secureTextEntry={passwordAgainSecureTextEntry}
                titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
                onChange={handlePasswordAgainChange}
              />
              <CTouchableOpacity
                onPress={() => setPasswordAgainSecureTextEntry(!passwordAgainSecureTextEntry)}
                style={{ position: "absolute", right: 0, bottom: 0, justifyContent: "center", alignItems: "center", height: 54, width: 54 }}
              >
                <MaterialCommunityIcon name={passwordAgainSecureTextEntry ? "eye" : "eye-off"} size={25} color={COLORS.darkgray} />
              </CTouchableOpacity>
            </CView>
            <CView style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
              <Checkbox value={termsAndConditionsAccepted} onValueChange={handleTermsAndConditionsChange} style={{ marginRight: SPACING.sm }} />
              <CTouchableOpacity
                onPress={() => handleTermsAndConditionsChange(!termsAndConditionsAccepted)}
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <CText style={{ fontSize: "sm" }}>{t("signup.i-accept", "Hyväksyn Arwin")} </CText>
                <CTouchableOpacity
                  onPress={() => {
                    setIsTermsAndConditionsOpen(true);
                  }}
                >
                  <CText style={{ fontSize: "sm", fontWeight: "500", color: "primary" }}>{t("signup.conditions", "käyttöehdot")}</CText>
                </CTouchableOpacity>
                <CText style={{ fontSize: "sm" }}> {t("and", "ja")} </CText>
                <CTouchableOpacity
                  onPress={() => {
                    setIsPrivacyPolicyOpen(true);
                  }}
                >
                  <CText style={{ fontSize: "sm", fontWeight: "500", color: "primary" }}>{t("signup.privacy-policy", "tietosuojaselosteen")}.</CText>
                </CTouchableOpacity>
              </CTouchableOpacity>
            </CView>
            {generalError && <CText style={{ color: "error", fontWeight: "500", fontSize: "md" }}>{generalError}</CText>}
          </CView>
          <CView style={{ flex: 1, width: "90%", gap: 5 }}>
            <CButton
              loading={loading}
              title={t("register", "Rekisteröidy")}
              colorScheme="secondary"
              variant="outline"
              style={{ width: "100%", marginBottom: "sm" }}
              disabled={email.length === 0 || password.length === 0 || generalError !== undefined}
              onPress={() => {
                if (email.length > 0 && password.length > 0) handleSubmit();
              }}
            />
            <CView style={{ flexDirection: "row", justifyContent: "center" }}>
              <CText style={{ fontSize: "sm", fontWeight: "500", color: "gray" }}>
                {t("SignupView.haveYouAlreadyRegistered", "Oletko jo rekisteröitynyt?")}{" "}
              </CText>
              <CTouchableOpacity
                onPress={() => {
                  navigation.navigate("login");
                }}
              >
                <CText style={{ fontSize: "sm", fontWeight: "500", color: "primary" }}>{t("login", "Kirjaudu sisään")}</CText>
              </CTouchableOpacity>
              <CText style={{ fontSize: "sm", fontWeight: "500", color: "gray" }}>.</CText>
            </CView>
          </CView>
        </CView>
      </LandingComponent>
    </>
  );
}
