import {
  ComponentSingleStyleConfig,
  defineStyleConfig,
} from "@chakra-ui/react";

const Radio: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    label: {
      pointerEvents: "none",
    },
  },
});

export default Radio;
