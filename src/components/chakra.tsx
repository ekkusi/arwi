"use client";

import {
  Link as ChakraNextLink,
  LinkProps as ChakraNextLinkProps,
} from "@chakra-ui/next-js";
import {
  BoxProps,
  Box as ChakraBox,
  Text as ChakraText,
  TextProps,
  ListProps,
  List as ChakraList,
  UnorderedList as ChakraUnorderedList,
  OrderedList as ChakraOrderedList,
  ListItemProps,
  ListItem as ChakraListItem,
  Button as ChakraButton,
  ButtonProps,
  Flex as ChakraFlex,
  FlexProps,
  Icon as ChakraIcon,
  IconProps,
  forwardRef,
  SimpleGrid as ChakraSimpleGrid,
  SimpleGridProps,
  SpinnerProps,
  Spinner as ChakraSpinner,
  Input as ChakraInput,
  InputProps,
  FormLabel as ChakraFormLabel,
  FormLabelProps,
  IconButton as ChakraIconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

export const Box = forwardRef<BoxProps, "div">((props: BoxProps, ref) => (
  <ChakraBox ref={ref} {...props} />
));
export const Flex = forwardRef<FlexProps, "div">((props, ref) => (
  <ChakraFlex ref={ref} {...props} />
));
// NOTE: For some reason, with text the same way of exporting results to the following error:
// "Cannot access Text.prototype on the server. You cannot dot into a client module from a server component. You can only pass the imported name through."
// If this gets fixed, change text to the same as the other components.
export { Text } from "@chakra-ui/react";
// With ref anyway for MotionText
const TextWithRef = forwardRef<TextProps, "p">((props, ref) => (
  <ChakraText ref={ref} {...props} />
));

export const List = forwardRef<ListProps, "ul">((props, ref) => (
  <ChakraList ref={ref} {...props} />
));
export const OrderedList = forwardRef<ListProps, "ol">((props, ref) => (
  <ChakraOrderedList ref={ref} {...props} />
));
export const UnorderedList = forwardRef<ListProps, "ul">((props, ref) => (
  <ChakraUnorderedList ref={ref} {...props} />
));
export const ListItem = forwardRef<ListItemProps, "li">((props, ref) => (
  <ChakraListItem ref={ref} {...props} />
));
export const Button = forwardRef<ButtonProps, "button">((props, ref) => (
  <ChakraButton ref={ref} {...props} />
));
export const Input = forwardRef<InputProps, "button">((props, ref) => (
  <ChakraInput ref={ref} {...props} />
));
export const Icon = forwardRef<IconProps, "i">((props, ref) => (
  <ChakraIcon ref={ref} {...props} />
));
export const SimpleGrid = forwardRef<SimpleGridProps, "div">((props, ref) => (
  <ChakraSimpleGrid ref={ref} {...props} />
));
export const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => (
  <ChakraSpinner ref={ref} {...props} />
));
export const NextLink = forwardRef<ChakraNextLinkProps, "a">((props, ref) => (
  <ChakraNextLink ref={ref} {...props} />
));
export const FormLabel = forwardRef<FormLabelProps, "a">((props, ref) => (
  <ChakraFormLabel ref={ref} {...props} />
));
export const IconButton = forwardRef<IconButtonProps, "a">((props, ref) => (
  <ChakraIconButton ref={ref} {...props} />
));

// ##### MOTION CHAKRA COMBINATIONS ######

type Merge<P, T> = Omit<P, keyof T> & T;
export type MotionTextProps = Merge<TextProps, HTMLMotionProps<"p">>;
export const MotionText: React.FC<MotionTextProps> = motion(TextWithRef);

export type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<"div">>;
export const MotionBox: React.FC<MotionBoxProps> = motion(Box);
