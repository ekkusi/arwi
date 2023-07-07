import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";

export default function StudentView() {
  return (
    <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CText>Oppilaan sivu</CText>
    </CView>
  );
}
