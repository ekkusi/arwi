import { CColor, CFontSize } from "../theme/types";
import CText from "./primitives/CText";
import CView from "./primitives/CView";

export default function CircledNumber({
  size = 70,
  value,
  valueString,
  decimals = 1,
  borderWidth = 1,
  borderColor = "lightgray",
  title,
}: {
  size?: number;
  value?: number;
  valueString?: string;
  decimals?: number;
  borderWidth?: number;
  borderColor?: CColor;
  title?: string;
}) {
  let fontSize: CFontSize = "title";
  if (size < 45) fontSize = "sm";
  else if (size < 55) fontSize = "md";
  else if (size < 60) fontSize = "lg";

  let valueText = "-";
  if (value) {
    valueText = Number.isNaN(value) ? "-" : value.toFixed(decimals);
  } else if (valueString) {
    valueText = valueString;
  }
  return (
    <CView style={{ justifyContent: "center", alignItems: "center", gap: 5 }}>
      {title && <CText style={{ fontSize: "xs", fontWeight: "500", width: 100, textAlign: "center" }}>{title}</CText>}
      <CView
        style={{
          width: size || 70,
          height: size || 70,
          borderRadius: size ? size / 2 : 35,
          borderWidth,
          borderColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CText style={{ fontSize, fontWeight: "700" }}>{valueText}</CText>
      </CView>
    </CView>
  );
}
