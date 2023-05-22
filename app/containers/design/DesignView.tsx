import { Text, View } from "react-native";
import CText from "../../components/primitives/CText";
import CView from "../../components/primitives/CView";

export default function DesignView() {
  return (
    <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CText>Tyylit</CText>
    </CView>
  );
}
