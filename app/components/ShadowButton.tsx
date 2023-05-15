import React from "react";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from "react-native";
import { FONT_SIZES } from "../theme";

// NOTE: THIS COMPONENT IS NOT FINISHED, does not work when set e.g. height to buttonStyle prop.

type ShadowButtonProps = {
  title: string;
  onPress: () => void;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  children?: JSX.Element;
};

export default function ShadowButton({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  children,
  disabled = false,
}: ShadowButtonProps) {
  const text = <Text style={[styles.title, textStyle, { color: titleColor || "#fff" }]}>{title}</Text>;
  return (
    <View style={[styles.outerView, buttonStyle]}>
      <TouchableOpacity style={[styles.container, { backgroundColor: buttonColor || "#512DA8" }]} onPress={onPress} disabled={disabled}>
        {children}
        {text}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    overflow: "hidden",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: FONT_SIZES.medium,
    fontWeight: "700",
  },
  outerView: {
    alignSelf: "center",
    borderRadius: 28,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 3,
  },
});
