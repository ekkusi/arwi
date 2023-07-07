import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CButton from "../../components/primitives/CButton";
import CImage from "../../components/primitives/CImage";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import LandingComponent from "../../components/LandingComponent";
import { AuthStackParams } from "./types";

export default function LandingPage({ navigation }: NativeStackScreenProps<AuthStackParams, "welcome">) {
  return (
    <LandingComponent
      bottomChildren={
        <CView style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15, marginTop: 20 }}>
          <CButton
            colorScheme="secondary"
            variant="outline"
            title="Kirjaudu sisään"
            style={{ width: "90%" }}
            onPress={() => {
              navigation.navigate("login");
            }}
          />
          <CButton
            colorScheme="secondary"
            variant="outline"
            title="Rekisteröidy"
            style={{ width: "90%" }}
            onPress={() => {
              navigation.navigate("signup");
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
