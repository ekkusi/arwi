import { ComponentSingleStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Checkbox: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    label: {
      pointerEvents: "none",
    },
  },
});

export default Checkbox;
