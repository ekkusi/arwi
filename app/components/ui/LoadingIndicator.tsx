import { ActivityIndicator } from "react-native";
import { useMemo } from "react";
import { COLORS } from "../../theme";
import CView, { CViewProps } from "../primitives/CView";
import { hexToRgbA } from "../../helpers/color";
import { getColor } from "../../theme/utils";
import { CViewStyle } from "../../theme/types";

type LoadingIndicatorProps = CViewProps & {
  type?: "inline" | "cover" | "overlay";
  color?: string;
  overlayOpacity?: number;
};

export default function LoadingIndicator({
  style,
  children,
  type = "cover",
  overlayOpacity = 0.6,
  color: indicatorColor,
  ...rest
}: LoadingIndicatorProps) {
  const { backgroundColor, ...restStyle } = style ?? {};

  const bgColor = useMemo(() => {
    if (type === "inline") return backgroundColor;
    const colorOrKey = backgroundColor ?? COLORS.white;
    const color = getColor(colorOrKey) || colorOrKey;
    return hexToRgbA(color, overlayOpacity);
  }, [backgroundColor, overlayOpacity, type]);

  const positionStyles: CViewStyle = useMemo(() => {
    switch (type) {
      case "inline":
        return {
          paddingVertical: "lg",
        };
      case "cover":
        return {
          width: "100%",
          height: "100%",
        };
      default:
        return {
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: 1,
        };
    }
  }, [type]);

  return (
    <CView
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
        ...positionStyles,
        ...restStyle,
      }}
      {...rest}
    >
      <ActivityIndicator size="large" color={indicatorColor || COLORS.primary} />
      {children}
    </CView>
  );
}
