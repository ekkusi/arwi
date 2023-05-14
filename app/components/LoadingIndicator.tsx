import { FONT_SIZES } from "../theme";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type LoadingIndicatorProps = CViewProps;

export default function LoadingIndicator({ style, ...rest }: LoadingIndicatorProps) {
  return (
    <CView style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", ...style }} {...rest}>
      <CText style={{ fontSize: FONT_SIZES.large }}>Ladataan...</CText>
    </CView>
  );
}
