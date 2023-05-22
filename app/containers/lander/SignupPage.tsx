/* eslint-disable global-require */
import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, NativeSyntheticEvent, Text, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import CButton from "../../components/primitives/CButton";
import CTextInput from "../../components/primitives/CTextInput";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import { COLORS, FONT_SIZES } from "../../theme";
import LandingComponent from "./LandingComponent";
import { LandingStackParamList } from "./types";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";

const initialValues = {
  email: "",
  password: "",
};

const RegisterPage_Register_Mutation = graphql(`
  mutation RegisterPage_Register($input: CreateTeacherInput!) {
    register(data: $input) {
      accessToken
    }
  }
`);

export default function SignupPage({ navigation }: NativeStackScreenProps<LandingStackParamList, "SignupPage">) {
  const { setToken } = useAuth();
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [register] = useMutation(RegisterPage_Register_Mutation);

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
      const { data } = await register({ variables: { input: { email: values.email, password: values.password } } });
      const accessToken = data?.register?.accessToken;
      if (!accessToken) throw new Error("Unexpected error"); // Should get caught before this
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
            {generalError && (
              <CText style={{ color: COLORS.error, fontWeight: "600", fontSize: FONT_SIZES.medium, marginBottom: 30 }}>{generalError}</CText>
            )}
          </CView>
          <CView style={{ flex: 1, width: "90%", gap: 5 }}>
            <CButton
              title="Rekisteröidy"
              generalStyle="secondary"
              outlineStyle
              buttonStyle={{ width: "100%" }}
              disabled={email !== undefined && password !== undefined && generalError !== undefined}
              onPress={() => {
                if (email && password) handleSubmit({ email, password });
              }}
            />
            <CView style={{ flexDirection: "row", justifyContent: "center", gap: 2, marginBottom: 5 }}>
              <CText style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>Rekisteröitymällä hyväksyt</CText>
              <TouchableOpacity
                onPress={() => {
                  // TODO: show terms
                  console.log("käyttöehdot:)");
                }}
              >
                <CText style={{ fontSize: 12, fontWeight: "600", color: COLORS.primary }}>käyttöehtomme</CText>
              </TouchableOpacity>
              <CText style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>.</CText>
            </CView>
            <CView style={{ flexDirection: "row", justifyContent: "center" }}>
              <CText style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>Oletko jo rekisteröitynyt? </CText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LoginPage", {});
                }}
              >
                <CText style={{ fontSize: 12, fontWeight: "600", color: COLORS.primary }}>Kirjaudu sisään</CText>
              </TouchableOpacity>
              <CText style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>.</CText>
            </CView>
          </CView>
        </CView>
      }
      topChildren={
        <CView style={{ width: 300, height: 300 }}>
          <Image
            source={require("../../assets/arwilogo-transparent-white.png")}
            style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
          />
        </CView>
      }
    />
  );
}
