import React, { useState } from "react";
import { CViewStyle } from "../../theme/types";
import FormField, { FormFieldProps } from "./FormField";
import Select, { OptionType, SelectProps } from "./Select";

export type SelectFormFieldProps = Omit<SelectProps, "title" | "error"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    validate?: (option: OptionType) => string | undefined;
    containerStyle?: CViewStyle;
  };

export default function SelectFormField(props: SelectFormFieldProps) {
  const { validate, title, containerStyle, errorTextStyle, titleStyle, onSelect, error: errorOverride, ...rest } = props;
  const [_error, setError] = useState<string | undefined>(undefined);
  const onSelectWithValidate = (newOption: OptionType) => {
    if (validate) {
      const newError = validate(newOption);
      setError(newError);
    }
    onSelect?.(newOption);
  };

  const error = errorOverride || _error;

  return (
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} {...containerStyle}>
      <Select onSelect={onSelectWithValidate} error={!!error} {...rest} />
    </FormField>
  );
}
