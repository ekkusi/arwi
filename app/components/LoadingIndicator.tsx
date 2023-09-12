import { ActivityIndicator } from "react-native";
import { COLORS, FONT_SIZES } from "../theme";
import CView, { CViewProps } from "./primitives/CView";

type LoadingIndicatorProps = CViewProps;

export default function LoadingIndicator({ style, children, ...rest }: LoadingIndicatorProps) {
  return (
    <CView style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "100%", ...style }} {...rest}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {children}
    </CView>
  );
}
