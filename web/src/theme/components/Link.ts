import { ComponentSingleStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Link: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    textDecoration: "none",
    color: "primary",
    _hover: {
      textDecoration: "none",
    },
  },
});

export default Link;
