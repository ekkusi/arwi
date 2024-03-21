import React, { forwardRef, useMemo } from "react";
import { TextInput, TextInputProps } from "react-native";
import { COLORS } from "../../theme";
import { CTextStyle } from "../../theme/types";
import { createStyles, createTextStyles } from "../../theme/utils";
import CView from "./CView";

export type CTextInputProps = Omit<TextInputProps, "style"> & {
  error?: boolean;
  errorStyle?: CTextStyle;
  lightTheme?: boolean;
  style?: CTextStyle;
  isDisabled?: boolean;
  as?: "input" | "textarea";
  growWithContent?: boolean;
};

export default forwardRef<TextInput, CTextInputProps>((props, ref) => {
  const { error: hasError = false, errorStyle, isDisabled = false, lightTheme = false, style, as = "input", growWithContent, ...rest } = props;
  const baseHeight = as === "textarea" ? 150 : 54;
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
      ...(isDisabled ? styles.disabledInputStyle : {}),
      ...(growWithContent ? { minHeight: baseHeight } : { height: baseHeight }),
      ...style,
    });
  }, [errorStyle, hasError, as, lightTheme, isDisabled, growWithContent, baseHeight, style]);
  return (
    <CView style={{ flex: allStyles.flex, minHeight: allStyles.minHeight, width: allStyles.width, height: allStyles.height }}>
      <TextInput
        multiline={as === "textarea"}
        ref={ref}
        style={allStyles}
        placeholderTextColor={lightTheme ? COLORS.white : COLORS.lightgray}
        pointerEvents={isDisabled ? "none" : "auto"}
        {...rest}
      />
    </CView>
  );
});

const styles = createStyles({
  regularInputStyle: {
    borderBottomWidth: 1,
    color: "darkgray",
    borderColor: "gray",
    width: "100%",
    fontSize: "md",
    fontWeight: "300",
  },
  textAreaStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgray",
    textAlignVertical: "top",
    paddingVertical: "sm",
    paddingHorizontal: "lg",
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
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
  disabledInputStyle: {
    borderBottomWidth: 1,
    opacity: 0.7,
  },
});
