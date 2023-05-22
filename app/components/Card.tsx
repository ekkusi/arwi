import { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import CView, { CViewProps } from "./primitives/CView";

export type CardProps = CViewProps & { innerViewProps?: CViewProps };

export default forwardRef<View, CardProps>((props, ref) => {
  const { innerViewProps, ...rest } = props;
  return (
    <CView {...rest} style={{ ...styles.shadow, ...rest.style }}>
      <CView ref={ref} {...innerViewProps} style={{ ...styles.defaultCard, ...innerViewProps?.style }}>
        {rest.children}
      </CView>
    </CView>
  );
});

const styles = StyleSheet.create({
  defaultCard: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    overflow: "hidden",
  },
  shadow: {
    marginHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});
