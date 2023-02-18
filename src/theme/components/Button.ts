import {
  ComponentSingleStyleConfig,
  defineStyleConfig,
} from "@chakra-ui/react";

const Button: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    textTransform: "uppercase",
    // border: "2px",
    borderRadius: "3xl",
    py: 5,
    px: 10,
    fontWeight: "bold",
  },
  variants: {
    outline: ({ colorScheme }) => ({
      border: "2px",
      borderColor: `${colorScheme}.800`,
      color: `${colorScheme}.800`,
      bg: "inherit",
    }),
    solid: ({ colorScheme }) => ({
      border: "2px",
      borderColor: "black",
      boxShadow: "custom",
      color: "black",
      bg: `${colorScheme}.100`,
    }),
  },
  sizes: {
    md: {
      py: 5,
      px: 10,
    },
  },
  defaultProps: {
    variant: "solid",
  },
});

export default Button;
