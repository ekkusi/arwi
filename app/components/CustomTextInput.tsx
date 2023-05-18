import React, { useState } from "react";
import { Text, StyleSheet, StyleProp, TextStyle, TextInputProps, NativeSyntheticEvent, TextInputChangeEventData, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, FONT_SIZES } from "../theme";

type CustomTextInputProps = TextInputProps & {
  textValidation?: (text: string) => string | undefined;
  title?: string;
  errorStyle?: StyleProp<TextStyle>;
};

export default function CustomTextInput(props: CustomTextInputProps) {
  const { textValidation, errorStyle, title, ...generalProps } = props;
  const [errorText, setError] = useState<string | undefined>(undefined);
  const allStyles = errorText
    ? [styles.regularInputStyle, generalProps.style, styles.errorInputStyle, errorStyle]
    : [styles.regularInputStyle, generalProps.style];
  const validateText = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (textValidation) {
      const newError = textValidation(event.nativeEvent.text);
      setError(newError);
    }
  };
  return (
    <View style={{ width: "100%" }}>
      {title && <Text style={styles.titleStyle}>{title}</Text>}
      <TextInput onChange={validateText} {...generalProps} style={allStyles} placeholderTextColor={COLORS.lightgray} />
      {errorText && <Text style={{ color: COLORS.error, fontWeight: "600", fontSize: FONT_SIZES.small }}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  regularInputStyle: {
    borderBottomWidth: 1,
    color: COLORS.darkgray,
    borderColor: COLORS.lightgray,
    height: 54,
    width: "100%",
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
  },
  titleStyle: {
    fontSize: FONT_SIZES.small,
    fontWeight: "700",
    color: COLORS.darkgray,
  },
  errorInputStyle: {
    borderBottomWidth: 2,
    borderColor: COLORS.error,
  },
});
