import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";
import { ColorKey, CTextStyle, CViewStyle } from "../../theme/types";
import { createViewStyles } from "../../theme/utils";
import CText from "./CText";

export type CButtonProps = Omit<TouchableOpacityProps, "style"> & {
  title?: string;
  variant?: "filled" | "outline";
  colorScheme?: ColorKey;
  textStyle?: CTextStyle;
  style?: CViewStyle;
  shadowed?: boolean;
};

export default function CButton({
  title,
  colorScheme = "green",
  variant = "filled",
  textStyle,
  children,
  style,
  shadowed = false,
  ...rest
}: CButtonProps) {
  const buttonVariantStyles: CViewStyle = useMemo(() => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colorScheme,
        };
      default:
        return {
          backgroundColor: colorScheme,
        };
    }
  }, [colorScheme, variant]);

  const textVariantStyles: CTextStyle = useMemo(() => {
    switch (variant) {
      case "outline":
        return {
          color: colorScheme,
        };
      default:
        return {
          color: "white",
        };
    }
  }, [colorScheme, variant]);

  const buttonStyle = useMemo(() => {
    return createViewStyles({
      ...styles.container,
      ...buttonVariantStyles,
      ...(shadowed ? styles.shadow : {}),
      ...style,
    });
  }, [shadowed, style, buttonVariantStyles]);

  const Button = (
    <TouchableOpacity style={buttonStyle} {...rest}>
      {children}
      {title && (
        <CText
          style={{
            ...styles.title,
            ...textVariantStyles,
            ...textStyle,
          }}
        >
          {title}
        </CText>
      )}
    </TouchableOpacity>
  );

  return Button;
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
  shadow: {
    alignSelf: "center",
    borderRadius: 28,
    // backgroundColor: "transparent",
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
