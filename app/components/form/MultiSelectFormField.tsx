import React from "react";
import { CViewStyle } from "../../theme/types";
import FormField, { FormFieldProps } from "./FormField";
import { MultiSelect, SelectProps } from "./Select";

export type MultiSelectFormFieldProps<CustomOptionType = unknown> = Omit<SelectProps<CustomOptionType, true>, "title" | "error" | "isMulti"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    containerStyle?: CViewStyle;
  };

export default function MultiSelectFormField<CustomOptionType = unknown>(props: MultiSelectFormFieldProps<CustomOptionType>) {
  const { title, containerStyle, errorTextStyle, titleStyle, error, ...rest } = props;

  return (
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} style={containerStyle}>
      <MultiSelect error={!!error} title={title} {...rest} />
    </FormField>
  );
}
