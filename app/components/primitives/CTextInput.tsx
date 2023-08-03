import React, { forwardRef, useMemo } from "react";
import { KeyboardAvoidingView, TextInput, TextInputProps } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";
import { CTextStyle } from "../../theme/types";
import { createStyles, createTextStyles } from "../../theme/utils";

export type CTextInputProps = Omit<TextInputProps, "style"> & {
  error?: boolean;
  errorStyle?: CTextStyle;
  lightTheme?: boolean;
  style?: CTextStyle;
  as?: "input" | "textarea";
};

export default forwardRef<TextInput, CTextInputProps>((props, ref) => {
  const { error: hasError = false, errorStyle, lightTheme = false, style, as = "input", ...rest } = props;
  const allStyles = useMemo(() => {
    const error = {
      ...styles.errorInputStyle,
      ...errorStyle,
    };
    return createTextStyles({
      ...styles.regularInputStyle,
      ...(hasError ? error : {}),
      ...(as === "textarea" ? styles.textAreaStyle : {}),
      ...(lightTheme ? styles.lightThemeStyle : {}),
      ...style,
    });
  }, [errorStyle, style, hasError, as, lightTheme]);
  return (
    <TextInput
      multiline={as === "textarea"}
      ref={ref}
      style={allStyles}
      placeholderTextColor={lightTheme ? COLORS.white : COLORS.lightgray}
      {...rest}
    />
  );
});

const styles = createStyles({
  regularInputStyle: {
    borderBottomWidth: 1,
    color: "darkgray",
    borderColor: "gray",
    height: 54,
    width: "100%",
    fontSize: "md",
    fontWeight: "300",
  },
  textAreaStyle: {
    height: 150,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgray",
    textAlignVertical: "top",
    paddingVertical: "sm",
    paddingHorizontal: "lg",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  lightThemeStyle: {
    color: "white",
    borderColor: "white",
  },
  titleStyle: {
    fontSize: "sm",
    fontWeight: "700",
    color: "darkgray",
  },
  errorInputStyle: {
    borderBottomWidth: 2,
    borderColor: "error",
  },
});
