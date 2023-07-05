/* eslint-disable global-require */
import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import CButton from "../../components/primitives/CButton";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import CTextInput from "../../components/primitives/CTextInput";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import LandingComponent from "./LandingComponent";
import { LandingStackParamList } from "./types";
import CImage from "../../components/primitives/CImage";
import CTouchableOpacity from "../../components/primitives/CTouchableOpacity";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage_Login_Mutation = graphql(`
  mutation LoginPage_Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`);

export default function LoginPage({ navigation }: NativeStackScreenProps<LandingStackParamList, "LoginPage">) {
  const { setToken } = useAuth();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [login] = useMutation(LoginPage_Login_Mutation);

  const handlePasswordChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (generalError) setGeneralError(undefined);
    setPassword(event.nativeEvent.text);
  };

  const handleEmailChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (generalError) setGeneralError(undefined);
    setEmail(event.nativeEvent.text);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { data } = await login({ variables: { email: values.email, password: values.password } });
      const accessToken = data?.login?.accessToken;
      if (!accessToken) throw new Error("Unexpected error");
      setToken(accessToken);
    } catch (error) {
      const msg = getErrorMessage(error);
      setGeneralError(msg);
    }
  };
  return (
    <LandingComponent
      bottomChildren={
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15 }}>
          <CView style={{ flex: 2, width: "90%", gap: 10, justifyContent: "center" }}>
            <CTextInput
              title="Sähköpostiosoite"
              placeholder="arwioija@test.fi"
              textValidation={nameValidator}
              style={{ width: "100%" }}
              onChange={handleEmailChange}
            />
            <CTextInput
              title="Salasana"
              placeholder="password"
              style={{ width: "100%" }}
              textValidation={nameValidator}
              onChange={handlePasswordChange}
            />
            {generalError && <CText style={{ color: "error", fontWeight: "600", fontSize: "md", marginBottom: 30 }}>{generalError}</CText>}
          </CView>
          <CView style={{ flex: 1, width: "90%", gap: 5 }}>
            <CButton
              title="Kirjaudu sisään"
              colorScheme="secondary"
              variant="outline"
              style={{ width: "100%" }}
              disabled={email !== undefined && password !== undefined && generalError !== undefined}
              onPress={() => {
                if (email && password) handleSubmit({ email, password });
              }}
            />
            <CView style={{ flexDirection: "row", justifyContent: "center" }}>
              <CText style={{ fontSize: "md", fontWeight: "600", color: "gray" }}>Eikö sinulla ole vielä käyttäjää? </CText>
              <CTouchableOpacity
                onPress={() => {
                  navigation.navigate("SignupPage", {});
                }}
              >
                <CText style={{ fontSize: "md", fontWeight: "600", color: "primary" }}>Rekisteröidy</CText>
              </CTouchableOpacity>
              <CText style={{ fontSize: 12, fontWeight: "600", color: "gray" }}>.</CText>
            </CView>
          </CView>
        </CView>
      }
      topChildren={
        <CView style={{ width: 300, height: 300 }}>
          <CImage
            source={require("../../assets/arwilogo-transparent-white.png")}
            style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
          />
        </CView>
      }
    />
  );
}