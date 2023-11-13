import { useMemo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CTextStyle } from "../../theme/types";
import { createTextStyles } from "../../theme/utils";

type CTouchableOpacityProps = Omit<TouchableOpacityProps, "style"> & {
  style?: CTextStyle;
};

export default function CTouchableOpacity({ style, disabled, ...rest }: CTouchableOpacityProps) {
  const styles = useMemo(() => style && createTextStyles({ opacity: disabled ? 0.7 : 1, ...style }), [disabled, style]);
  return <TouchableOpacity style={styles} disabled={disabled} {...rest} />;
}
