import {
  ComponentSingleStyleConfig,
  defineStyleConfig,
  Accordion as _Accordion,
} from "@chakra-ui/react";

const Accordion: ComponentSingleStyleConfig = defineStyleConfig({
  baseStyle: {},
});

_Accordion.defaultProps = {
  allowToggle: true,
};

export default Accordion;
