import { useMemo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CTextStyle } from "../../theme/types";
import { createTextStyles } from "../../theme/utils";

type CTouchableOpacityProps = Omit<TouchableOpacityProps, "style"> & {
  style?: CTextStyle;
};

export default function CTouchableOpacity({ style, ...rest }: CTouchableOpacityProps) {
  const styles = useMemo(() => style && createTextStyles(style), [style]);
  return <TouchableOpacity style={styles} {...rest} />;
}
