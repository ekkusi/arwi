import React, { useMemo } from "react";
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ColorKey, CTextStyle, CViewStyle } from "../../theme/types";
import { createStyles, createViewStyles } from "../../theme/utils";
import CText from "./CText";

export type CButtonProps = Omit<TouchableOpacityProps, "style"> & {
  loading?: boolean;
  title?: string;
  variant?: "filled" | "outline" | "empty";
  colorScheme?: ColorKey;
  textStyle?: CTextStyle;
  style?: CViewStyle;
  shadowed?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function CButton({
  loading,
  title,
  colorScheme = "green",
  variant = "filled",
  textStyle,
  children,
  style,
  rightIcon,
  leftIcon,
  disabled,
  shadowed = false,
  ...rest
}: CButtonProps) {
  if (children && title)
    console.warn("CButton children overrides title prop, title prop won't be rendered. You should only define one of these two.");
  const buttonVariantStyles: CViewStyle = useMemo(() => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colorScheme,
        };
      case "empty":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
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
      ...(disabled || loading ? styles.disabled : {}),
      ...style,
    });
  }, [buttonVariantStyles, shadowed, disabled, loading, style]);

  const titleStyle = useMemo(
    () => ({
      ...styles.title,
      ...textVariantStyles,
      ...textStyle,
    }),
    [textStyle, textVariantStyles]
  );

  const Button = (
    <TouchableOpacity disabled={disabled || loading} style={buttonStyle} {...rest}>
      {loading ? (
        <ActivityIndicator color={titleStyle.color} size="large" />
      ) : (
        <>
          {leftIcon}
          {children || (title && <CText style={titleStyle}>{title}</CText>)}
          {/* {title && <CText style={titleStyle}>{title}</CText>} */}
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );

  return Button;
}

const styles = createStyles({
  disabled: {
    opacity: 0.7,
  },
  container: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    paddingHorizontal: "xl",
    overflow: "hidden",
    flexDirection: "row",
    gap: "md",
  },
  title: {
    color: "white",
    fontSize: "md",
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
    marginHorizontal: "xs",
  },
});
