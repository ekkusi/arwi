/* eslint-disable global-require */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { COLORS, FONT_SIZES } from "../../theme";
import LandingComponent from "./LandingComponent";
import { LandingStackParamList } from "./types";

export default function LandingPage({ navigation, route }: NativeStackScreenProps<LandingStackParamList, "LandingPage">) {
  const { setTeacherId } = route.params;
  return (
    <LandingComponent
      bottomChildren={
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15, marginTop: 20 }}>
          <CustomButton
            generalStyle="primary"
            outlineStyle
            title="Kirjaudu sisään"
            buttonStyle={{ width: "90%" }}
            onPress={() => {
              navigation.navigate("LoginPage", { handleLogin: setTeacherId });
            }}
          />
          <CustomButton
            generalStyle="primary"
            outlineStyle
            title="Rekisteröidy"
            buttonStyle={{ width: "90%" }}
            onPress={() => {
              navigation.navigate("SignupPage", { handleSignup: setTeacherId });
            }}
          />
        </View>
      }
      topChildren={
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 300, height: 300 }}>
            <Image
              source={require("../../assets/arwilogo-transparent-white.png")}
              style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
            />
          </View>
          <Text style={{ color: COLORS.white, fontWeight: "200", fontSize: 16, marginTop: -60 }}>
            {"Laadukkaampaa arviointia".toLocaleUpperCase()}
          </Text>
        </View>
      }
    />
  );
}
