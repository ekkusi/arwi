import { forwardRef, useMemo } from "react";
import { ViewProps } from "react-native";
import Animated, { AnimateProps } from "react-native-reanimated";
import { CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";

export type CAnimatedViewProps = Omit<AnimateProps<ViewProps>, "style"> & {
  style?: CViewStyle;
};

const CAnimatedView = forwardRef<Animated.View, CAnimatedViewProps>(({ style, ...rest }, ref) => {
  const styles = useMemo(() => style && createViewStyles(style), [style]);

  return <Animated.View ref={ref} style={styles} {...rest} />;
});

export default CAnimatedView;
