import { useMemo } from "react";
import { Text, TextProps } from "react-native";
import { CTextStyle } from "../../theme/types";
import { createTextStyles } from "../../theme/utils";

export type CTextProps = Omit<TextProps, "style"> & {
  style?: CTextStyle;
};

export default function CText({ style, ...rest }: CTextProps) {
  const styles = useMemo(() => style && createTextStyles(style), [style]);

  return <Text style={styles} {...rest} />;
}
