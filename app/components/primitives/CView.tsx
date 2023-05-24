import { forwardRef, useMemo } from "react";
import { View, ViewProps } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CViewProps = Omit<ViewProps, "style"> & {
  style?: CViewStyle;
};

const CView = forwardRef<View, CViewProps>(({ style, ...rest }, ref) => {
  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <View ref={ref} style={styles} {...rest} />;
});

export default CView;
