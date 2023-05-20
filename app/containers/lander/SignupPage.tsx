/* eslint-disable global-require */
import { useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { graphql } from "../../gql";
import { getGraphqlErrorMessage } from "../../helpers/errorUtils";
import { nameValidator } from "../../helpers/textValidation";
import { useAuth } from "../../hooks-and-providers/AuthProvider";
import { COLORS } from "../../theme";
import LandingComponent from "./LandingComponent";
import { LandingStackParamList } from "./types";

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

  const handleSubmit = async (values: typeof initialValues) => {
    setGeneralError(undefined);
    // TODO: Authentication and get teacherId
    const { data, errors } = await register({ variables: { input: { email: values.email, password: values.password } } });
    const accessToken = data?.register?.accessToken;
    if (errors) {
      setGeneralError(getGraphqlErrorMessage(errors));
    }
    if (!accessToken) {
      throw new Error("Unexpected error");
    }
    setToken(accessToken);
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
              onChange={(event) => setEmail(event.nativeEvent.text)}
            />
            <CustomTextInput
              title="Salasana"
              placeholder="password"
              style={{ width: "100%" }}
              textValidation={nameValidator}
              onChange={(event) => setPassword(event.nativeEvent.text)}
            />
          </View>
          <View style={{ flex: 1, width: "90%", gap: 5 }}>
            <CustomButton
              title="Rekisteröidy"
              generalStyle="secondary"
              outlineStyle
              buttonStyle={{ width: "100%" }}
              disabled={email !== undefined && password !== undefined && generalError !== undefined}
              onPress={() => {
                if (email && password) handleSubmit({ email, password });
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 2, marginBottom: 5 }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>Rekisteröitymällä hyväksyt</Text>
              <TouchableOpacity
                onPress={() => {
                  // TODO: show terms
                  console.log("käyttöehdot:)");
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.primary }}>käyttöehtomme</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>.</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.gray }}>Oletko jo rekisteröitynyt? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LoginPage", {});
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: COLORS.primary }}>Kirjaudu sisään</Text>
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
