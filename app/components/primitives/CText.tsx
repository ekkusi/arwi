import { useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { CStyles, CTextStyle, CViewStyle } from "../../theme/types";
import { createTextStyles } from "../../theme/utils";

export type CTextProps = Omit<TextProps, "style"> & {
  style?: CTextStyle;
};

export default function CText({ style, ...rest }: CTextProps) {
  const styles = useMemo(() => style && createTextStyles(style), [style]);
  console.log(styles);

  return <Text {...rest} />;
}
