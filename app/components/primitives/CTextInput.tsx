import React, { useMemo } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, FONT_SIZES } from "../../theme";
import { CTextStyle } from "../../theme/types";
import { createStyles, createTextStyles } from "../../theme/utils";

export type CTextInputProps = Omit<TextInputProps, "style"> & {
  error?: boolean;
  errorStyle?: CTextStyle;
  lightTheme?: boolean;
  style?: CTextStyle;
};

export default function CTextInput(props: CTextInputProps) {
  const { error: hasError = false, errorStyle, lightTheme = false, style, ...rest } = props;
  const allStyles = useMemo(() => {
    const error = {
      ...styles.errorInputStyle,
      ...errorStyle,
    };
    return createTextStyles({
      ...styles.regularInputStyle,
      ...style,
      ...(hasError ? error : {}),
      ...(lightTheme ? styles.lightThemeStyle : {}),
    });
  }, [errorStyle, style, hasError, lightTheme]);
  return <TextInput style={allStyles} placeholderTextColor={lightTheme ? COLORS.white : COLORS.lightgray} {...rest} />;
}

const styles = createStyles({
  regularInputStyle: {
    borderBottomWidth: 1,
    color: "darkgray",
    borderColor: "gray",
    height: 54,
    width: "100%",
    fontSize: "lg",
    fontWeight: "300",
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
