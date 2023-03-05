import {
  ComponentSingleStyleConfig,
  defineStyleConfig,
} from "@chakra-ui/react";

const Tag: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    container: {
      textTransform: "uppercase",
      fontWeight: "semibold",
    },
  },
  variants: {
    outline: ({ colorScheme }) => ({
      container: {
        border: "2px",
        borderColor: `${colorScheme}.800`,
        color: `${colorScheme}.900`,
        boxShadow: "none",
        bg: "inherit",
      },
    }),
    solid: ({ colorScheme }) => ({
      container: {
        border: "2px",
        borderColor: "black",
        color: "black",
        boxShadow: "none",
        bg: `${colorScheme}.100`,
      },
    }),
  },
  sizes: {
    sm: {
      container: {
        py: 1,
        px: 3,
        fontSize: "sm",
      },
    },
    md: {
      container: {
        py: 2,
        px: 5,
        fontSize: "md",
      },
    },
    lg: {
      container: {
        py: 4,
        px: 10,
        fontSize: "lg",
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
});

export default Tag;
