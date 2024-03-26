import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import CModal from "./CModal";
import CButton from "../primitives/CButton";
import CText from "../primitives/CText";
import { ANDROID_STORE_URL, IOS_STORE_URL } from "@/config";

type NewUpdateAvailableModalProps = {
  isOpen: boolean;
};

export default function NewUpdateAvailableModal({ isOpen }: NewUpdateAvailableModalProps) {
  const { t } = useTranslation();
  const updateButtonTitle =
    Platform.OS === "ios" ? t("update-in-app-store", "Päivitä App Storessa") : t("update-in-play-store", "Päivitä Play-kaupassa");
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
      <CButton title={updateButtonTitle} onPress={() => Linking.openURL(Platform.OS === "ios" ? IOS_STORE_URL : ANDROID_STORE_URL)} />
    </CModal>
  );
}
