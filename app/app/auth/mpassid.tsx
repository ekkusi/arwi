import { useMutation } from "@apollo/client";
import { useMemo, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMatomo } from "matomo-tracker-react-native";
import CButton from "../../components/primitives/CButton";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import LandingComponent from "./LandingComponent";
import CImage from "../../components/primitives/CImage";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import { AuthStackParams } from "./types";
import TextFormField from "../../components/form/TextFormField";
import { COLORS } from "../../theme";
import { MATOMO_EVENT_CATEGORIES } from "../../config";

const initialValues = {
  email: "",
  password: "",
};

const MPassIDPage_Login_Mutation = graphql(`
  mutation MPassIDPage_Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export default function MPassIDPage({ navigation }: NativeStackScreenProps<AuthStackParams, "mpassid">) {
  const { trackAppStart, trackEvent } = useMatomo();
  const { setUser } = useAuth();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { t, i18n } = useTranslation();

  const [login] = useMutation(MPassIDPage_Login_Mutation);

  const handlePasswordChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setPassword(text);
  };

  const handleEmailChange = (text: string) => {
    if (generalError) setGeneralError(undefined);
    setEmail(text);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const { data } = await login({ variables: { email: values.email, password: values.password } });
      if (!data) throw new Error("Unexpected error");
      await setUser(data.login.accessToken, data.login.teacher);
      const userInfo = {
        uid: data.login.teacher.email,
      };
      trackEvent({
        category: MATOMO_EVENT_CATEGORIES.AUTH,
        action: "Login",
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

  const mPassIDSource = useMemo(() => {
    console.log(i18n.language);

    switch (i18n.language) {
      case "sv_FI":
        return require("../../assets/mpassid-identification-sv.png");
      case "en_US":
        return require("../../assets/mpassid-identification-en.png");
      default:
        return require("../../assets/mpassid-identification-fi.png");
    }
  }, [i18n]);

  return (
    <LandingComponent>
      <CView style={{ flex: 1, width: "100%", paddingHorizontal: "lg" }}>
        {/* <CText style={{ fontSize: "xl", marginBottom: "2xl", textAlign: "center" }}>{t("login", "Kirjaudu sisään")}</CText> */}
        <CView style={{ width: "100%", alignItems: "center", marginBottom: "-3xl", marginTop: "-4xl" }}>
          <CImage variant="fixed" width={250} height={250} source={mPassIDSource} />
        </CView>
        <CView style={{ justifyContent: "center", width: "100%", gap: "lg", marginBottom: "2xl" }}>
          <TextFormField
            title={t("mpassid-user", "MPASSid-tunnus")}
            placeholder="arwioija"
            validate={nameValidator}
            style={{ width: "100%" }}
            titleStyle={{ fontSize: "md", marginBottom: "-sm", fontWeight: "500" }}
            onChange={handleEmailChange}
          />
          <CView>
            <TextFormField
              title={t("password", "MPASSid-salasana")}
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
          {generalError && <CText style={{ color: "error", fontWeight: "600", fontSize: "md", marginBottom: 30 }}>{generalError}</CText>}
        </CView>
        <CView style={{ width: "100%" }}>
          <CButton
            loading={loading}
            title={t("login", "Kirjaudu sisään")}
            colorScheme="secondary"
            variant="outline"
            style={{ width: "100%", marginBottom: "sm" }}
            disabled={email !== undefined && password !== undefined && generalError !== undefined}
            onPress={() => {
              if (email && password) handleSubmit({ email, password });
            }}
          />
        </CView>
      </CView>
    </LandingComponent>
  );
}
