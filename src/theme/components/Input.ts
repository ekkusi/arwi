import {
  ComponentSingleStyleConfig,
  SystemStyleInterpolation,
} from "@chakra-ui/react";

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

export const Textarea: ComponentSingleStyleConfig = {
  variants: {
    outline: baseStyle,
    filled: baseStyle,
    flushed: baseStyle,
    unstyled: baseStyle,
  },
};
