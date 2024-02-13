import { ComponentSingleStyleConfig, SystemStyleInterpolation, Input as _Input, Textarea as _Textarea } from "@chakra-ui/react";
import { KeyboardEvent } from "react";

const baseStyle: SystemStyleInterpolation = ({ colorScheme, theme }) => {
  const focusStyles = {
    border: "1px",
    borderColor: `${colorScheme}.200`,
    boxShadow: `0 0 0 1px ${theme.colors[colorScheme]["200"]}`,
  };
  return {
    border: "1px",
    borderRadius: "lg",
    borderColor: "gray.300",
    _invalid: {
      borderColor: "error",
      boxShadow: `0 0 0 1px ${theme.colors.error}`,
      _focus: {
        borderColor: "error",
        boxShadow: `0 0 0 1px ${theme.colors.error}`,
      },
    },
    _focus: {
      ...focusStyles,
    },
    _focusVisible: {
      ...focusStyles,
    },
  };
};

const inputBaseStyle: SystemStyleInterpolation = (props) => {
  return {
    field: baseStyle(props),
  };
};

const Input: ComponentSingleStyleConfig = {
  variants: {
    outline: inputBaseStyle,
    filled: inputBaseStyle,
    flushed: inputBaseStyle,
    unstyled: inputBaseStyle,
  },
};

export default Input;

_Input.defaultProps = {
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }
  },
};

export const Textarea: ComponentSingleStyleConfig = {
  variants: {
    outline: baseStyle,
    filled: baseStyle,
    flushed: baseStyle,
    unstyled: baseStyle,
  },
};

_Textarea.defaultProps = {
  minHeight: "32",
};
