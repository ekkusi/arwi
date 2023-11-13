import React from "react";
import { CViewStyle } from "../../theme/types";
import FormField, { FormFieldProps } from "./FormField";
import { SelectProps, SingleSelect } from "./Select";

export type SelectFormFieldProps<CustomOptionType = unknown> = Omit<SelectProps<CustomOptionType, false>, "title" | "error" | "isMulti"> &
  Pick<FormFieldProps, "title" | "titleStyle" | "errorTextStyle" | "error"> & {
    containerStyle?: CViewStyle;
  };

export default function SelectFormField<CustomOptionType = unknown>(props: SelectFormFieldProps<CustomOptionType>) {
  const { title, containerStyle, errorTextStyle, titleStyle, error, ...rest } = props;

  return (
    <FormField title={title} error={error} errorTextStyle={errorTextStyle} titleStyle={titleStyle} {...containerStyle}>
      <SingleSelect error={!!error} title={title} {...rest} />
    </FormField>
  );
}
