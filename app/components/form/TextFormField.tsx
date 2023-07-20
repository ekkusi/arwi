import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { CViewStyle } from "../../theme/types";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";
import FormField, { FormFieldProps } from "./FormField";

export type TextFormFieldProps = Omit<CTextInputProps, "onChange" | "error"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    validate?: (text: string) => string | undefined;
    containerStyle?: CViewStyle;
    onChange?: (text: string, originalEvent: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  };

export default function TextFormField(props: TextFormFieldProps) {
  const { validate, title, containerStyle, errorTextStyle, titleStyle, onChange, error: errorOverride, ...rest } = props;
  const [_error, setError] = useState<string | undefined>(undefined);
  const onChangeWithValidate = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (validate) {
      const newError = validate(event.nativeEvent.text);
      setError(newError);
    }
    onChange?.(event.nativeEvent.text, event);
  };

  const error = errorOverride || _error;

  return (
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} {...containerStyle}>
      <CTextInput onChange={onChangeWithValidate} error={!!error} {...rest} />
    </FormField>
  );
}
