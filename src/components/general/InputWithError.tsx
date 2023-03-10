"use client";

import { FormErrorMessageProps, InputProps } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { Box, Input, Text } from "../chakra";

type InputWithErrorProps = Omit<InputProps, "value" | "onChange" | "onBlur"> & {
  value?: string;
  debounced?: boolean;
  validate?: (value: string) => string | undefined;
  errorMessageProps?: FormErrorMessageProps;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    isValid: boolean
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement>,
    isValid: boolean
  ) => void;
};

export default function InputWithError({
  debounced = true,
  onChange: validatedOnChange,
  onBlur: validatedOnBlur,
  value: initialValue,
  validate,
  errorMessageProps,
  ...rest
}: InputWithErrorProps) {
  const [error, setError] = useState<string | undefined>();
  const [value, setValue] = useState<string | undefined>(() => {
    return initialValue;
  });

  const defaultValidate = (newValue: string) => {
    if (newValue.length <= 0) {
      return "Tämä kenttä ei voi olla tyhjä";
    }
    return undefined;
  };

  // Debounce changeNotes function to prevent preformance issues
  const debouncedOnChange = useMemo(
    () => validatedOnChange && debounce(validatedOnChange, 300),
    [validatedOnChange]
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    const validateFunc = validate || defaultValidate;

    const errorMessage = validateFunc(newValue);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(undefined);
    }
    if (debounced) debouncedOnChange?.(event, !errorMessage);
    else validatedOnChange?.(event, !errorMessage);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    validatedOnBlur?.(event, !error);
  };

  return (
    <Box>
      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={!!error}
        {...rest}
      />
      {error && (
        <Text color="error" {...errorMessageProps}>
          {error}
        </Text>
      )}
    </Box>
  );
}
