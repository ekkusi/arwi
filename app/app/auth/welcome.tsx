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
      <CView
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingBottom: "3xl",
          paddingTop: "2xl",
          paddingHorizontal: "xl",
        }}
      >
        <CView style={{ width: "100%", gap: 15 }}>
          <CButton
            colorScheme="secondary"
            variant="outline"
            title={t("login", "Kirjaudu sisään")}
            style={{ width: "100%" }}
            onPress={() => {
              navigation.navigate("login");
            }}
          />
          <CButton
            colorScheme="secondary"
            variant="outline"
            title={t("register", "Rekisteröidy")}
            style={{ width: "100%" }}
            onPress={() => {
              navigation.navigate("signup");
            }}
          />
        </CView>
        <CView style={{ width: "100%", borderTopWidth: 1, borderColor: "lightgray", paddingTop: "2xl" }}>
          <CView style={{ width: "100%" }}>
            <CText style={{ fontSize: "sm", textAlign: "center", marginBottom: "sm", color: "gray", fontWeight: "600" }}>
              {t("authenticate-with-mpassid", "Tunnistaudu palveluun MPASSid:llä")}
            </CText>
            <CButton
              title="MPASSid"
              leftIcon={<CImage variant="fixed" source={require("../../assets/mpassid-minimal-white.png")} width={25} height={25} />}
              onPress={() => navigation.navigate("mpassid")}
            />
          </CView>
        </CView>
      </CView>
    </LandingComponent>
  );
}
