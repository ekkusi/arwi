import React from "react";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle, View } from "react-native";
import { COLORS, FONT_SIZES } from "../theme";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  children?: JSX.Element;
};

export default function CustomButton({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  children,
  disabled = false,
}: CustomButtonProps) {
  const text = <Text style={[styles.title, textStyle, { color: titleColor || "#fff" }]}>{title}</Text>;
  return (
    <TouchableOpacity style={[styles.container, buttonStyle, { backgroundColor: buttonColor || "#512DA8" }]} onPress={onPress} disabled={disabled}>
      {children}
      {text}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    overflow: "hidden",
    flexDirection: "row",
    gap: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "700",
  },
});
