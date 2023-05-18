/* eslint-disable global-require */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { nameValidator } from "../../helpers/textValidation";
import { COLORS } from "../../theme";
import { LandingStackParamList } from "./types";

const initialValues = {
  email: "",
  password: "",
};

export default function LoginPage({ navigation, route }: NativeStackScreenProps<LandingStackParamList, "LoginPage">) {
  const { handleLogin } = route.params;
  const [generalError, setGeneralError] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    setGeneralError(undefined);
    setLoading(true);
    // TODO: Authentication and get teacherId
    handleLogin("teacherId");
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.green, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", gap: 20 }}>
        <View style={{ width: 300, height: 300 }}>
          <Image
            source={require("../../assets/arwilogo-transparent.png")}
            style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
          />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10, width: "90%" }}>
        <CustomTextInput
          title="Sähköpostiosoite"
          placeholder="arwioija@test.fi"
          textValidation={nameValidator}
          style={{ width: "100%" }}
          onChange={(event) => setEmail(event.nativeEvent.text)}
        />
        <CustomTextInput
          title="Salasana"
          placeholder="Password"
          style={{ width: "100%" }}
          textValidation={nameValidator}
          onChange={(event) => setPassword(event.nativeEvent.text)}
        />
        <CustomButton
          title="Kirjaudu sisään"
          generalStyle="secondary"
          disabled={email !== undefined && password !== undefined && generalError !== undefined}
          onPress={() => {
            if (email && password) handleSubmit({ email, password });
          }}
        />
      </View>
    </View>
  );
}
