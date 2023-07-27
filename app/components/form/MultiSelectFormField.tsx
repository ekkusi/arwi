import React from "react";
import { CViewStyle } from "../../theme/types";
import FormField, { FormFieldProps } from "./FormField";
import Select, { SelectProps } from "./Select";

export type MultiSelectFormFieldProps = Omit<SelectProps<true>, "title" | "error" | "isMulti"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    containerStyle?: CViewStyle;
  };

export default function MultiSelectFormField(props: MultiSelectFormFieldProps) {
  const { title, containerStyle, errorTextStyle, titleStyle, error, ...rest } = props;

  return (
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} {...containerStyle}>
      <Select error={!!error} title={title} isMulti {...rest} />
    </FormField>
  );
}
