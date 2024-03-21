import { forwardRef, useMemo } from "react";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { View } from "react-native";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CKeyboardStickyViewProps = Omit<React.ComponentProps<typeof KeyboardStickyView>, "style"> & {
  style?: CViewStyle;
};

const CKeyboardStickyView = forwardRef<View, CKeyboardStickyViewProps>(({ style, ...rest }, ref) => {
  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <KeyboardStickyView ref={ref} style={styles} {...rest} />;
});

export default CKeyboardStickyView;
