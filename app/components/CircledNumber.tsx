import CText from "./primitives/CText";
import CView from "./primitives/CView";

export default function CircledNumber({ value, title }: { value: number; title?: string }) {
  return (
    <CView style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
      <CText style={{ fontSize: "xs", fontWeight: "500" }}>{title}</CText>
      <CView
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          borderWidth: 1,
          borderColor: "lightgray",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CText style={{ fontSize: "title", fontWeight: "700" }}>{Number.isNaN(value) ? "-" : value.toFixed(1)}</CText>
      </CView>
    </CView>
  );
}
