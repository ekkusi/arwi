import {
  BoxProps,
  FormErrorMessageProps,
  InputProps,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

type InputWithErrorProps = Omit<
  InputProps,
  "onChange" | "onBlur" | "name" | "value"
> & {
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
  containerProps?: BoxProps;
  name: string;
};

export type InputWithErrorHandlers = {
  clear: () => void;
};

export default forwardRef<InputWithErrorHandlers, InputWithErrorProps>(
  (
    {
      debounced = false,
      onChange: validatedOnChange,
      onBlur: validatedOnBlur,
      validate,
      errorMessageProps,
      containerProps,
      name,
      defaultValue = "",
      ...rest
    }: InputWithErrorProps,
    ref
  ) => {
    const [error, setError] = useState<string | undefined>();
    const inputRef = useRef<HTMLInputElement>(null);

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
      if (event.target.value === defaultValue) return;
      validatedOnBlur?.(event, !error);
    };

    useImperativeHandle(ref, () => ({
      clear() {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setError(undefined);
      },
    }));

    return (
      <Box {...containerProps}>
        <Input
          ref={inputRef}
          key={`${name}-${defaultValue}`}
          defaultValue={defaultValue}
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
);
