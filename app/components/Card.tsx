import { forwardRef } from "react";
import { View } from "react-native";
import { createStyles } from "../theme/utils";
import CView, { CViewProps } from "./primitives/CView";

export type CardProps = CViewProps;

export default forwardRef<View, CardProps>(({ style, children, ...rest }, ref) => {
  return (
    <CView ref={ref} {...rest} style={{ ...styles.shadow, ...styles.defaultCard, ...style }}>
      {children}
    </CView>
  );
});

const styles = createStyles({
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
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
