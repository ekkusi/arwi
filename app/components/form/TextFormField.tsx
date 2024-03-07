import React, { forwardRef, useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from "react-native";
import { CViewStyle } from "../../theme/types";
import CTextInput, { CTextInputProps } from "../primitives/CTextInput";
import FormField, { FormFieldProps } from "./FormField";
import SecretInput from "./SecretInput";

export type TextFormFieldProps = Omit<CTextInputProps, "onChange" | "error" | "ref"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    validate?: (text: string) => string | undefined;
    containerStyle?: CViewStyle;
    onChange?: (text: string, originalEvent: NativeSyntheticEvent<TextInputChangeEventData>) => void;
    isSecret?: boolean;
  };

export default forwardRef<TextInput, TextFormFieldProps>((props: TextFormFieldProps, ref) => {
  const { validate, title, containerStyle, errorTextStyle, titleStyle, onChange, error: errorOverride, isSecret, ...rest } = props;
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
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} style={containerStyle}>
      {isSecret ? (
        <SecretInput ref={ref} onChange={onChangeWithValidate} error={!!error} {...rest} />
      ) : (
        <CTextInput ref={ref} onChange={onChangeWithValidate} error={!!error} {...rest} />
      )}
    </FormField>
  );
});
