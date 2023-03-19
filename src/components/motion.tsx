import { Text, TextProps, Box, BoxProps, forwardRef } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

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
