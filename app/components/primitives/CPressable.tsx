import { useMemo } from "react";
import { Pressable, PressableProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

type CPressableProps = Omit<PressableProps, "style"> & {
  style?: CViewStyle;
};

export default function CPressable({ style, ...rest }: CPressableProps) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);
  return <Pressable style={styles} {...rest} />;
}
