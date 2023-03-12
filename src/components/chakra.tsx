"use client";

import { Text, TextProps, Box, BoxProps, forwardRef } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

export * from "@chakra-ui/react";
export { Link as NextLink } from "@chakra-ui/next-js";

// // ##### MOTION CHAKRA COMBINATIONS ######

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
