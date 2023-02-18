import {
  ComponentSingleStyleConfig,
  SystemStyleInterpolation,
} from "@chakra-ui/react";

const inputBaseStyle: SystemStyleInterpolation = ({ colorScheme, theme }) => {
  const focusStyles = {
    border: "1px",
    borderColor: `${colorScheme}.200`,
    boxShadow: `0 0 0 1px ${theme.colors[colorScheme]["200"]}`,
  };
  return {
    field: {
      border: "1px",
      borderRadius: "lg",
      borderColor: "gray.300",
      _focus: {
        ...focusStyles,
      },
      _focusVisible: {
        ...focusStyles,
      },
    },
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
