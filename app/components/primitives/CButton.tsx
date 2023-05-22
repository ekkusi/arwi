import React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";
import { CTextStyle } from "../../theme/types";
import CText from "./CText";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  generalStyle?: "primary" | "secondary" | undefined;
  outlineStyle?: boolean;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: CTextStyle;
  disabled?: boolean;
  children?: JSX.Element;
};

export default function CButton({
  title,
  onPress,
  generalStyle,
  outlineStyle,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
  children,
  disabled = false,
}: CustomButtonProps) {
  const textStyles = [];

  const buttonStyles = [styles.container, buttonStyle, { backgroundColor: buttonColor || "#512DA8" }];
  if (generalStyle) {
    if (generalStyle === "primary") {
      buttonStyles.push(styles.primaryStyle);
      textStyles.push(styles.textStylePrimary);
      if (outlineStyle) {
        buttonStyles.push({
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: COLORS.primary,
        });
        textStyles.push({ color: COLORS.secondary });
      }
    } else {
      buttonStyles.push(styles.secondaryStyle);
      textStyles.push(styles.textStyleSecondary);
      if (outlineStyle) {
        buttonStyles.push({
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: COLORS.secondary,
        });
        textStyles.push({ color: COLORS.secondary });
      }
    }
  }
  if (titleColor) {
    textStyles.push({ color: titleColor });
  }
  if (outlineStyle) {
    buttonStyles.push({
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: COLORS.secondary,
    });
  }

  const text = <CText style={{ ...styles.title, ...textStyle, color: titleColor || "#fff" }}>{title}</CText>;

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled}>
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
    paddingHorizontal: 20,
    overflow: "hidden",
    flexDirection: "row",
    gap: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "700",
  },
  primaryStyle: {
    backgroundColor: COLORS.green,
  },
  secondaryStyle: {
    backgroundColor: COLORS.secondary,
  },
  textStylePrimary: {
    color: COLORS.white,
  },
  textStyleSecondary: {
    color: COLORS.white,
  },
});
