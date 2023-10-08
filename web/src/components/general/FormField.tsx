import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { Field, FieldConfig, FieldProps, GenericFieldHTMLAttributes, useField } from "formik";

type Some = GenericFieldHTMLAttributes & FieldConfig;

type FormFieldProps = Some & {
  label: string;
  inputProps?: InputProps;
  labelProps?: FormLabelProps;
  containerProps?: FormControlProps;
  errorMessageProps?: FormErrorMessageProps;
  render?: (props: FieldProps) => React.ReactNode;
};

function FormField({
  label,
  inputProps,
  labelProps,
  containerProps,
  errorMessageProps,
  validate,
  render,
  as = Input,
  ...rest
}: FormFieldProps): JSX.Element {
  const [{ onChange, ...field }, meta, helpers] = useField({
    validate,
    ...rest,
  });

  const validateField = (value: string) => {
    if (validate) {
      const error = validate(value);
      if (error && typeof error === "string") {
        helpers.setError(error);
      } else {
        helpers.setError("");
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(event);
    validateField(value); // set / clear error message
  };
  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setTouched(true);

    // validate local field only
    validateField(event.target.value);
  };
  return (
    <FormControl isInvalid={!!meta.error && meta.touched} mb="5" {...containerProps}>
      <FormLabel htmlFor={rest.id || rest.name} {...labelProps}>
        {label}
      </FormLabel>
      <Field as={render ? undefined : as} {...rest} {...field} {...inputProps} onChange={handleChange} onBlur={handleBlur}>
        {render ? (props: FieldProps) => render(props) : undefined}
      </Field>
      <FormErrorMessage {...errorMessageProps}>{meta.error || "terve"}</FormErrorMessage>
    </FormControl>
  );
}

export default FormField;
