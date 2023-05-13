import {
  ComponentSingleStyleConfig,
  defineStyleConfig,
} from "@chakra-ui/react";

const FormLabel: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {
    fontFamily: "heading",
    fontSize: { base: "lg", md: "xl" },
  },
});

export default FormLabel;
