import { useTranslation } from "react-i18next";
import { Linking, Platform } from "react-native";
import CModal from "./CModal";
import CButton from "../primitives/CButton";
import CText from "../primitives/CText";

type NewUpdateAvailableModalProps = {
  isOpen: boolean;
};
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=net.arwi.twa";
const IOS_STORE_URL = "https://apps.apple.com/fi/app/arwi/6446094776";

export default function NewUpdateAvailableModal({ isOpen }: NewUpdateAvailableModalProps) {
  const { t } = useTranslation();
  return (
    <CModal
      isOpen={isOpen}
      closeButton={false}
      closeOnBackgroundPress={false}
      title={t("new-update-available", "Uusi päivitys saatavilla!")}
      innerViewStyles={{ paddingHorizontal: "2xl", paddingTop: "xl", paddingBottom: "xl" }}
    >
      <CText style={{ marginTop: "lg", marginBottom: "xl" }}>
        {t(
          "new-update-description",
          "Sovellukseen on tullut uusi päivitys, jonka lataaminen on välttämätöntä sovelluksen toiminnan varmistamiseksi."
        )}
      </CText>
      {Platform.OS === "ios" ? (
        <CText>{t("download-update-from-testflight", "Lataa uusi päivitys Testflight-sovelluksen kautta ja avaa sovellus uudelleen.")}</CText>
      ) : (
        <CText style={{ marginTop: "lg", marginBottom: "xl" }}>
          {t("download-new-update-below", "Lataa uusi päivitys Play-kaupasta klikkaamalla alta.")}
        </CText>
      )}
      {/*      TODO: Make link for iOS as well when the app is available in App Store      */}
      {Platform.OS === "android" && <CButton title={t("to-play-store", "Play-kauppaan")} onPress={() => Linking.openURL(ANDROID_STORE_URL)} />}
    </CModal>
  );
}
