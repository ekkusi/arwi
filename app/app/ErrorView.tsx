import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import RNExitApp from "react-native-exit-app";
import CButton from "../components/primitives/CButton";
import CImage from "../components/primitives/CImage";
import CText from "../components/primitives/CText";
import CView from "../components/primitives/CView";

export default function ErrorView() {
  const { t } = useTranslation();
  const checkUpdatesString =
    Platform.OS === "ios"
      ? t("check-if-is-updated-ios", "Tarkistaa, onko sovellus päivitetty viimeisimpään versioon App Storessa")
      : t("check-if-is-updated-android", "Tarkistaa, onko sovellus päivitetty viimeisimpään versioon Play-kaupassa");
  return (
    <CView style={{ paddingHorizontal: "lg", paddingVertical: "2xl", flex: 1 }}>
      <CText style={{ fontSize: "3xl", textAlign: "center", marginBottom: "3xl", marginTop: Platform.OS === "ios" ? "4xl" : "3xl" }}>
        {t("oops", "Huppista")}!
      </CText>
      <CText>
        {t(
          "app-crashed-description",
          "Joku applikaation toiminnassa pääsi kaatumaan selittämättömästi. Voit kokeilla seuraavia asioita tämän korjaamiseksi"
        )}
        :
      </CText>
      <CView style={{ marginVertical: "lg" }}>
        <CText style={{}}>{`\u2022 ${checkUpdatesString} `}</CText>
        <CText style={{}}>{`\u2022 ${t(
          "close-and-open-app",
          "Sulje applikaatio kokonaan ja käynnistä uudestaan (voi auttaa tehdä tämä kahteen kertaan)"
        )}.`}</CText>
      </CView>
      <CText style={{ marginBottom: "2xl" }}>
        {/*     TODO: Contact from the app or through website when available     */}
        {t(
          "contact-support-if-problem-persists",
          "Jos ongelma jatkuu edelleen, ota yhteyttä sovelluksen ylläpitoon sähköpostilla osoitteeseen info@arwi.fi"
        )}
        .
      </CText>
      <CView style={{ width: "100%", justifyContent: "center" }}>
        <CButton title={t("close-app", "Sulje sovellus")} onPress={() => RNExitApp.exitApp()} />
      </CView>
      <CView style={{ flex: 1, justifyContent: "flex-end" }}>
        <CView style={{ height: 100, width: "100%" }}>
          <CImage source={require("../assets/logo-text-white.png")} style={{ tintColor: "primary" }} />
        </CView>
      </CView>
    </CView>
  );
}
