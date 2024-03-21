import { forwardRef } from "react";
import { View } from "react-native";
import { BaseAnimationBuilder } from "react-native-reanimated";
import CAnimatedView from "../primitives/CAnimatedView";
import { createStyles } from "../../theme/utils";
import CView, { CViewProps } from "../primitives/CView";

export type CardProps = CViewProps & {
  enterAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder;
  exitAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder;
  layoutAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder;
  disabled?: boolean;
};

export default forwardRef<View, CardProps>(
  ({ enterAnimation, exitAnimation, layoutAnimation, disabled = false, style = {}, children, ...rest }, ref) => {
    const shadowStyle = disabled ? styles.disabledShadow : styles.shadow;
    return exitAnimation || enterAnimation || layoutAnimation ? (
      <CAnimatedView
        exiting={exitAnimation}
        entering={enterAnimation}
        layout={layoutAnimation}
        {...rest}
        style={{ ...shadowStyle, ...styles.defaultCard, ...style }}
      >
        {children}
      </CAnimatedView>
    ) : (
      <CView ref={ref} {...rest} style={{ ...shadowStyle, ...styles.defaultCard, ...style }}>
        {children}
      </CView>
    );
  }
);

export const styles = createStyles({
  defaultCard: {
    borderRadius: 5,
    paddingHorizontal: "lg",
    paddingVertical: "md",
    marginHorizontal: "xs",
    marginBottom: "sm",
  },
  shadow: {
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  disabledShadow: {
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    opacity: 1,
  },
});

export const cardStyles = { ...styles.shadow, ...styles.defaultCard };
