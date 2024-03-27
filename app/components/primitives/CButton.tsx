import React, { useMemo } from "react";
import { ActivityIndicator, Platform, View, TouchableOpacityProps, TouchableOpacity } from "react-native";
import { ColorKey, CTextStyle, CViewStyle } from "../../theme/types";
import { createStyles, createViewStyles } from "../../theme/utils";
import CText from "./CText";

export type CButtonProps = Omit<TouchableOpacityProps, "style"> & {
  loading?: boolean;
  title?: string;
  size?: "large" | "small";
  colorScheme?: ColorKey;
  textStyle?: CTextStyle;
  style?: CViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disableTouchEvent?: boolean;
} & (
    | {
        variant: "empty";
        shadowed?: never;
      }
    | {
        variant?: "filled" | "outline";
        shadowed?: boolean;
      }
  );

export default function CButton({
  loading,
  title,
  colorScheme = "green",
  variant = "filled",
  size = "large",
  textStyle,
  children,
  style,
  rightIcon,
  leftIcon,
  disabled,
  disableTouchEvent,
  shadowed = false,
  ...rest
}: CButtonProps) {
  if (children && title)
    console.warn("CButton children overrides title prop, title prop won't be rendered. You should only define one of these two.");
  const buttonSizeStyles: CViewStyle = useMemo(() => {
    switch (size) {
      case "large":
        return {
          paddingHorizontal: "xl",
          paddingVertical: "lg",
          borderRadius: 24,
        };
      default:
        return {
          paddingHorizontal: "lg",
          paddingVertical: "md",
          borderRadius: 18,
        };
    }
  }, [size]);
  const buttonVariantStyles: CViewStyle = useMemo(() => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "white",
          borderWidth: size === "large" ? 2 : 1.5,
          borderColor: colorScheme,
        };
      case "empty":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
        };
      default:
        return {
          backgroundColor: colorScheme,
        };
    }
  }, [colorScheme, size, variant]);

  const textSizeStyles: CTextStyle = useMemo(() => {
    switch (size) {
      case "large":
        return {
          fontSize: "md",
          fontWeight: "700",
        };
      default:
        return {
          fontSize: "sm",
          fontWeight: "500",
        };
    }
  }, [size]);

  const textVariantStyles: CTextStyle = useMemo(() => {
    switch (variant) {
      case "outline":
        return {
          color: colorScheme,
          fontWeight: "700",
        };
      case "empty":
        return {
          color: colorScheme,
          fontWeight: "600",
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
      ...buttonSizeStyles,
      ...buttonVariantStyles,
      ...(shadowed ? styles.shadow : {}),
      ...(disabled || loading ? styles.disabled : {}),
      ...style,
    });
  }, [buttonSizeStyles, buttonVariantStyles, shadowed, disabled, loading, style]);

  const titleStyle = useMemo(
    () => ({
      ...styles.title,
      ...textSizeStyles,
      ...textVariantStyles,
      ...textStyle,
    }),
    [textSizeStyles, textStyle, textVariantStyles]
  );

  const Button = disableTouchEvent ? (
    <View style={buttonStyle}>
      {loading ? (
        <ActivityIndicator color={titleStyle.color} size={Platform.OS === "ios" ? "small" : "large"} />
      ) : (
        <>
          {leftIcon}
          {children || (title && <CText style={titleStyle}>{title}</CText>)}
          {/* {title && <CText style={titleStyle}>{title}</CText>} */}
          {rightIcon}
        </>
      )}
    </View>
  ) : (
    <TouchableOpacity disabled={disabled || loading} style={buttonStyle} {...rest}>
      {loading ? (
        <ActivityIndicator color={titleStyle.color} size={Platform.OS === "ios" ? "small" : "large"} />
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
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
      height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: "xs",
  },
});
