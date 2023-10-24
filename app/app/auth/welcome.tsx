import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import CButton from "../../components/primitives/CButton";
import CImage from "../../components/primitives/CImage";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";
import LandingComponent from "./LandingComponent";
import { AuthStackParams } from "./types";

export default function LandingPage({ navigation }: NativeStackScreenProps<AuthStackParams, "welcome">) {
  const { t } = useTranslation();
  return (
    <LandingComponent headerSize="big" headerPlacement="top">
      <CView style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 15, marginTop: 20 }}>
        <CButton
          colorScheme="secondary"
          variant="outline"
          title={t("login", "Kirjaudu sisään")}
          style={{ width: "90%" }}
          onPress={() => {
            navigation.navigate("login");
          }}
        />
        <CButton
          colorScheme="secondary"
          variant="outline"
          title={t("register", "Rekisteröidy")}
          style={{ width: "90%" }}
          onPress={() => {
            navigation.navigate("signup");
          }}
        />
      </CView>
    </LandingComponent>
  );
}
