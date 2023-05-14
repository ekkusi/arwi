import { useMemo } from "react";
import { Text, TextProps, TextStyle } from "react-native";

export type CTextProps = Omit<TextProps, "style"> & {
  style?: TextStyle;
};

export default function CText({ style, ...rest }: CTextProps) {
  const styles = useMemo(
    () => ({
      ...style,
    }),
    [style]
  );

  return <Text style={styles} {...rest} />;
}
