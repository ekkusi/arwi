/* eslint-disable global-require */
import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, NativeSyntheticEvent, Text, TextInputChangeEventData, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { graphql } from "../../gql";
import { getErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import { COLORS, FONT_SIZES } from "../../theme";
import LandingComponent from "./LandingComponent";
import { LandingStackParamList } from "./types";

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15 }}>
          <View style={{ flex: 2, width: "90%", gap: 10, justifyContent: "center" }}>
            <CustomTextInput
              title="Sähköpostiosoite"
              placeholder="arwioija@test.fi"
              textValidation={nameValidator}
              style={{ width: "100%" }}
              onChange={handleEmailChange}
            />
            <CustomTextInput
              title="Salasana"
              placeholder="password"
              style={{ width: "100%" }}
              textValidation={nameValidator}
              onChange={handlePasswordChange}
            />
            {generalError && (
              <Text style={{ color: COLORS.error, fontWeight: "600", fontSize: FONT_SIZES.medium, marginBottom: 30 }}>{generalError}</Text>
            )}
          </View>
          <View style={{ flex: 1, width: "90%", gap: 5 }}>
            <CustomButton
              title="Kirjaudu sisään"
              generalStyle="secondary"
              outlineStyle
              buttonStyle={{ width: "100%" }}
              disabled={email !== undefined && password !== undefined && generalError !== undefined}
              onPress={() => {
                if (email && password) handleSubmit({ email, password });
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>Eikö sinulla ole vielä käyttäjää? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignupPage", {});
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.primary }}>Rekisteröidy</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>.</Text>
            </View>
          </View>
        </View>
      }
      topChildren={
        <View style={{ width: 300, height: 300 }}>
          <Image
            source={require("../../assets/arwilogo-transparent-white.png")}
            style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
          />
        </View>
      }
    />
  );
}
