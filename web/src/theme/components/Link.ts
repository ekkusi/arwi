import { ComponentSingleStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Link: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    textDecoration: "none",
    color: "primary",
    _hover: {
      textDecoration: "none",
    },
  },
});

export default Link;
