import { forwardRef, LegacyRef } from "react";
import { View, ViewProps } from "react-native";

export type CardProps = ViewProps;

export default forwardRef((props: CardProps, ref: LegacyRef<View>) => {
  return (
    <View
      ref={ref}
      style={{
        borderRadius: 10,
        backgroundColor: "white",
        paddingHorizontal: "10",
        paddingVertical: "8",
        width: "100%",
        elevation: 5,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      }}
      {...props}
    />
  );
});
