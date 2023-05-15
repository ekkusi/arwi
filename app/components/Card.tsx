import { forwardRef, LegacyRef } from "react";
import { View, ViewProps, StyleSheet } from "react-native";

export type CardProps = ViewProps & { innerViewProps?: ViewProps };

export default forwardRef((props: CardProps, ref: LegacyRef<View>) => {
  const { innerViewProps, ...rest } = props;
  return (
    <View {...rest} style={[styles.shadow, rest.style]}>
      <View ref={ref} {...innerViewProps} style={[styles.defaultCard, innerViewProps?.style]}>
        {rest.children}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  defaultCard: {
    flex: 1,
    borderRadius: 10,
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
    borderRadius: 10,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
});
