import React from "react";
import { CViewStyle } from "../../theme/types";
import FormField, { FormFieldProps } from "./FormField";
import Select, { SelectProps } from "./Select";

export type SelectFormFieldProps = Omit<SelectProps<false>, "title" | "error" | "isMulti"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    containerStyle?: CViewStyle;
  };

export default function SelectFormField(props: SelectFormFieldProps) {
  const { title, containerStyle, errorTextStyle, titleStyle, error, ...rest } = props;

  return (
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} {...containerStyle}>
      <Select error={!!error} isMulti={false} title={title} {...rest} />
    </FormField>
  );
}
