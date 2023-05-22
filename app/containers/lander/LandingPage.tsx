/* eslint-disable global-require */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CButton from "../../components/primitives/CButton";
import CImage from "../../components/primitives/CImage";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import LandingComponent from "./LandingComponent";
import { LandingStackParamList } from "./types";

export default function LandingPage({ navigation }: NativeStackScreenProps<LandingStackParamList, "LandingPage">) {
  return (
    <LandingComponent
      bottomChildren={
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15, marginTop: 20 }}>
          <CButton
            generalStyle="primary"
            outlineStyle
            title="Kirjaudu sisään"
            buttonStyle={{ width: "90%" }}
            onPress={() => {
              navigation.navigate("LoginPage", {});
            }}
          />
          <CButton
            generalStyle="primary"
            outlineStyle
            title="Rekisteröidy"
            buttonStyle={{ width: "90%" }}
            onPress={() => {
              navigation.navigate("SignupPage", {});
            }}
          />
        </CView>
      }
      topChildren={
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CView style={{ width: 300, height: 300 }}>
            <CImage
              source={require("../../assets/arwilogo-transparent-white.png")}
              style={{ width: undefined, height: undefined, resizeMode: "contain", flex: 1 }}
            />
          </CView>
          <CText style={{ color: "white", fontWeight: "200", fontSize: 16, marginTop: -60 }}>{"Laadukkaampaa arviointia".toLocaleUpperCase()}</CText>
        </CView>
      }
    />
  );
}
