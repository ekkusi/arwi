import { useMemo } from "react";
import { View, ViewProps, ViewStyle } from "react-native";

export type CViewProps = Omit<ViewProps, "style"> & {
  style?: ViewStyle;
};

export default function CView({ style, ...rest }: CViewProps) {
  const styles = useMemo(
    () => ({
      ...style,
    }),
    [style]
  );

  return <View style={styles} {...rest} />;
}
