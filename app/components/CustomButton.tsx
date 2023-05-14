import React from "react";
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled: boolean;
};

export default function CustomButton({ title, onPress, buttonColor, titleColor, buttonStyle, textStyle, disabled = false }: CustomButtonProps) {
  const text = <Text style={[styles.title, textStyle, { color: titleColor || "#fff" }]}>{title}</Text>;
  return (
    <TouchableOpacity style={[styles.container, buttonStyle, { backgroundColor: buttonColor || "#512DA8" }]} onPress={onPress} disabled={disabled}>
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
  },
  title: {
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 20,
  },
});
