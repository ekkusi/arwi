import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";
import { CTextStyle, CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";
import CText from "./CText";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  generalStyle?: "primary" | "secondary" | undefined;
  outlineStyle?: boolean;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: CViewStyle;
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
  const buttonStyles = [styles.container, buttonStyle, { backgroundColor: buttonColor || "#512DA8" }];
  if (generalStyle) {
    if (generalStyle === "primary") {
      buttonStyles.push(styles.primaryStyle);
      if (outlineStyle) {
        buttonStyles.push({
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: COLORS.primary,
        });
      }
    } else {
      buttonStyles.push(styles.secondaryStyle);
      if (outlineStyle) {
        buttonStyles.push({
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: COLORS.secondary,
        });
      }
    }
  }
  if (outlineStyle) {
    buttonStyles.push({
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: COLORS.secondary,
    });
  }

  const style = useMemo(() => {
    const outlineStyles = {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: generalStyle === "primary" ? "primary" : "secondary",
    };
    return createViewStyles({
      ...styles.container,
      ...buttonStyle,
      ...(generalStyle === "primary" ? styles.primaryStyle : styles.secondaryStyle),
      ...(outlineStyle ? outlineStyles : {}),
    });
  }, []);

  const text = (
    <CText
      style={{
        ...styles.title,
        ...textStyle,
        ...(generalStyle === "primary" ? styles.textStylePrimary : styles.textStyleSecondary),
        color: titleColor || outlineStyle ? COLORS.secondary : undefined,
      }}
    >
      {title}
    </CText>
  );

  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
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
    fontSize: FONT_SIZES.md,
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
