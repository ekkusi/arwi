import { useMutation } from "@apollo/client";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CButton from "../../components/primitives/CButton";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import LandingComponent from "../../components/LandingComponent";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import CImage from "../../components/primitives/CImage";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";
import { AuthStackParams } from "./types";
import TextFormField from "../../components/form/TextFormField";
import { COLORS } from "../../theme";

const initialValues = {
  email: "",
  password: "",
};

const RegisterPage_Register_Mutation = graphql(`
  mutation RegisterPage_Register($input: CreateTeacherInput!) {
    register(data: $input) {
      accessToken
      teacher {
        email
        id
      }
    }
  }
`);

export default function SignupPage({ navigation }: NativeStackScreenProps<AuthStackParams, "signup">) {
  const { setUser } = useAuth();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { t } = useTranslation();

  const [register] = useMutation(RegisterPage_Register_Mutation);

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
      const { data } = await register({ variables: { input: { email: values.email, password: values.password } } });
      const accessToken = data?.register?.accessToken;
      if (!accessToken) throw new Error("Unexpected error"); // Should get caught before this
      setUser(accessToken, data.register.teacher);
    } catch (error) {
      const msg = getErrorMessage(error);
      setGeneralError(msg);
    }
    setLoading(false);
  };
  return (
    <LandingComponent
      bottomChildren={
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15 }}>
          <CView style={{ flex: 2, width: "90%", gap: 10, justifyContent: "center" }}>
            <TextFormField
              title={t("email", "Sähköpostiosoite")}
              placeholder="arwioija@test.fi"
              validate={nameValidator}
              style={{ width: "100%" }}
              titleStyle={{ fontSize: "md", fontWeight: "500" }}
              onChange={handleEmailChange}
            />
            <CView>
              <TextFormField
                title={t("password", "Salasana")}
                placeholder={t("password", "Salasana")}
                style={{ width: "100%" }}
                secureTextEntry={secureTextEntry}
                titleStyle={{ fontSize: "md", fontWeight: "500" }}
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
          <CView style={{ flex: 1, width: "90%", gap: 5 }}>
            <CButton
              loading={loading}
              title={t("register", "Rekisteröidy")}
              colorScheme="secondary"
              variant="outline"
              style={{ width: "100%" }}
              disabled={email !== undefined && password !== undefined && generalError !== undefined}
              onPress={() => {
                if (email && password) handleSubmit({ email, password });
              }}
            />
            <CView style={{ flexDirection: "row", justifyContent: "center", gap: 2, marginBottom: 5 }}>
              <CText style={{ fontSize: "sm", fontWeight: "500", color: "gray" }}>
                {t("SignupView.byRegisteringYouAccept", "Rekisteröitymällä hyväksyt")}
              </CText>
              <CTouchableOpacity
                onPress={() => {
                  // TODO: show terms
                  console.log("käyttöehdot:)");
                }}
              >
                <CText style={{ fontSize: "sm", fontWeight: "500", color: "primary" }}>{t("SignupView.ourConditions", "käyttöehtomme")}</CText>
              </CTouchableOpacity>
              <CText style={{ fontSize: "sm", fontWeight: "500", color: "gray" }}>.</CText>
            </CView>
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
      }
      topChildren={
        <CView style={{ width: 300, height: 300 }}>
          <CImage source={require("../../assets/arwilogo-transparent-white.png")} />
        </CView>
      }
    />
  );
}
