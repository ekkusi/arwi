/* eslint-disable global-require */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { COLORS, FONT_SIZES } from "../../theme";
import { LandingStackParamList } from "./types";

export default function LandingPage({ navigation, route }: NativeStackScreenProps<LandingStackParamList, "LandingPage">) {
  const { setTeacherId } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 20,
          borderBottomLeftRadius: 100,
          backgroundColor: COLORS.green,
          width: "100%",
        }}
      >
        <View style={{ width: 300, height: 300 }}>
          <Image
            source={require("../../assets/arwilogo-transparent.png")}
            style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
          />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", width: "100%", justifyContent: "center", gap: 10, backgroundColor: COLORS.white }}>
        <View style={{ position: "absolute", top: 0, right: 0, width: 130, height: 130, backgroundColor: COLORS.green }} />
        <View style={{ position: "absolute", top: 0, right: 0, width: 130, height: 130, backgroundColor: COLORS.white, borderTopRightRadius: 130 }} />
        <CustomButton
          generalStyle="secondary"
          outlineStyle
          title="Kirjaudu sisään"
          onPress={() => {
            navigation.navigate("LoginPage", { handleLogin: setTeacherId });
          }}
        />
        <CustomButton
          generalStyle="secondary"
          outlineStyle
          title="Rekisteröidy"
          onPress={() => {
            navigation.navigate("SignupPage", { handleSignup: setTeacherId });
          }}
        />
      </View>
    </View>
  );
}
