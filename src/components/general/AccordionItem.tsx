import {
  AccordionButton,
  AccordionButtonProps,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import { forwardRef } from "react";

type AccordionItemProps = ChakraAccordionItemProps & {
  title: string;
  titleProps?: AccordionButtonProps;
  titleIcons?: React.ReactNode;
};

export default forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, titleProps, titleIcons, ...rest }: AccordionItemProps, ref) => {
    return (
      <ChakraAccordionItem fontSize="lg" {...rest} ref={ref}>
        <Text as="h3" mb="0">
          <AccordionButton {...titleProps}>
            <Text fontSize="md" as="span" flex="1" textAlign="left">
              {rest.title}
            </Text>
            {titleIcons}
            <AccordionIcon ml="1" />
          </AccordionButton>
        </Text>
        <AccordionPanel fontSize="sm" pb={4}>
          {children as any}
        </AccordionPanel>
      </ChakraAccordionItem>
    );
  }
);
