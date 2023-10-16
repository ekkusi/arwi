import { ComponentSingleStyleConfig, defineStyleConfig } from "@chakra-ui/react";

const Popover: ComponentSingleStyleConfig = defineStyleConfig({
  variants: {
    responsive: {
      popper: {
        maxWidth: "max-content",
        minWidth: "unset !important",
      },
    },
  },
});

export default Popover;
