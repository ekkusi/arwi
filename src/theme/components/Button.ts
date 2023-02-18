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
    px: 8,
  },
  variants: {
    outline: ({ colorScheme }) => ({
      border: "2px",
      borderColor: "black",
      boxShadow: "custom",
      color: "black",
      bg: `${colorScheme}.100`,
    }),
  },
  defaultProps: {
    variant: "outline",
  },
});

export default Button;
