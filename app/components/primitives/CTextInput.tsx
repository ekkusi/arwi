import React, { useMemo, useState } from "react";
import { StyleSheet, TextInputProps, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, FONT_SIZES } from "../../theme";
import { CTextStyle } from "../../theme/types";
import { createTextStyles } from "../../theme/utils";
import CText from "./CText";
import CView from "./CView";

type CustomTextInputProps = Omit<TextInputProps, "style"> & {
  textValidation?: (text: string) => string | undefined;
  title?: string;
  lightTheme?: boolean;
  errorStyle?: CTextStyle;
  style?: CTextStyle;
};

export default function CTextInput(props: CustomTextInputProps) {
  const { textValidation, errorStyle, title, lightTheme = false, ...generalProps } = props;
  const [errorText, setError] = useState<string | undefined>(undefined);
  const textStyles: CTextStyle = {
    ...styles.titleStyle,
    color: lightTheme ? "white" : styles.titleStyle.color,
  };
  const style = useMemo(() => {
    const error = {
      ...styles.errorInputStyle,
      ...errorStyle,
    };
    return createTextStyles({
      ...styles.regularInputStyle,
      ...generalProps.style,
      ...(errorText ? error : {}),
      ...(lightTheme ? styles.lightThemeStyle : {}),
    });
  }, [errorText, generalProps.style, errorStyle, lightTheme]);
  const validateText = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (textValidation) {
      const newError = textValidation(event.nativeEvent.text);
      setError(newError);
    }
  };
  return (
    <CView style={{ width: "100%" }}>
      {title && <CText style={textStyles}>{title}</CText>}
      <TextInput onChange={validateText} {...generalProps} style={style} placeholderTextColor={lightTheme ? COLORS.white : COLORS.lightgray} />
      {errorText && <CText style={{ color: "error", fontWeight: "600", fontSize: FONT_SIZES.sm }}>{errorText}</CText>}
    </CView>
  );
}

const styles = StyleSheet.create({
  regularInputStyle: {
    borderBottomWidth: 1,
    color: COLORS.darkgray,
    borderColor: COLORS.gray,
    height: 54,
    width: "100%",
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
  },
  lightThemeStyle: {
    color: COLORS.white,
    borderColor: COLORS.white,
  },
  titleStyle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "700",
    color: COLORS.darkgray,
  },
  errorInputStyle: {
    borderBottomWidth: 2,
    borderColor: COLORS.error,
  },
});
