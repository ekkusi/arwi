import { useTranslation } from "react-i18next";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";

export default function DesignView() {
  const { t } = useTranslation();
  return (
    <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CText>Tyylit</CText>
    </CView>
  );
}
