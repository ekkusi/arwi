import { useMemo } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CViewProps = Omit<ViewProps, "style"> & {
  style?: CViewStyle;
};

export default function CView({ style, ...rest }: CViewProps) {
  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <View style={styles} {...rest} />;
}
