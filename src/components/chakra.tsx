"use client";

import {
  Input as ChakraInput,
  InputProps,
  Text,
  TextProps,
  Box,
  BoxProps,
  forwardRef,
} from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import { KeyboardEvent } from "react";

export * from "@chakra-ui/react";
export { Link as NextLink } from "@chakra-ui/next-js";

// ##### CHAKRA OVERRIDES ######

export const Input = forwardRef<InputProps, "input">(
  (props: InputProps, ref) => (
    <ChakraInput
      ref={ref}
      // Prevent form submission on enter as default onKeyDown handler
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      {...props}
    />
  )
);

// ##### MOTION CHAKRA COMBINATIONS ######

// Chakra components need ref for framer-motion wrapper
const BoxWithRef = forwardRef<BoxProps, "div">((props: BoxProps, ref) => (
  <Box ref={ref} {...props} />
));
const TextWithRef = forwardRef<TextProps, "p">((props, ref) => (
  <Text ref={ref} {...props} />
));

type Merge<P, T> = Omit<P, keyof T> & T;
export type MotionTextProps = Merge<TextProps, HTMLMotionProps<"p">>;
export const MotionText: React.FC<MotionTextProps> = motion(TextWithRef);

export type MotionBoxProps = Merge<BoxProps, HTMLMotionProps<"div">>;
export const MotionBox: React.FC<MotionBoxProps> = motion(BoxWithRef);
