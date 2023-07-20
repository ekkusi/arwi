import { useTranslation } from "react-i18next";
import { Modal } from "react-native";
import CButton from "./primitives/CButton";
import CText from "./primitives/CText";
import CTouchableOpacity from "./primitives/CTouchableOpacity";
import CView from "./primitives/CView";

export default function PopUpDialog({
  title,
  message,
  acceptButtonText,
  cancelButtonText,
  onAccept,
  onCancel,
}: {
  title?: string;
  message?: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Modal transparent visible>
      <CView style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)" }}>
        <CView style={{ width: "80%", height: "40%", backgroundColor: "white", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
          <CText style={{ flex: 1, color: "darkgray", fontSize: "lg" }}>{title || ""}</CText>
          <CText style={{ flex: 2, color: "gray", fontSize: "md" }}>{message || ""}</CText>
          <CView style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <CButton onPress={onAccept} style={{ width: "40%" }} title={acceptButtonText || t("PopUpDialog.accept", "OK")} />
            <CButton
              onPress={onCancel}
              variant="outline"
              colorScheme="darkgray"
              style={{ width: "40%" }}
              title={acceptButtonText || t("PopUpDialog.cancel", "Cancel")}
            />
          </CView>
        </CView>
      </CView>
    </Modal>
  );
}
