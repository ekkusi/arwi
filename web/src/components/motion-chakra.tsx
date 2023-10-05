import { TextProps, Text, BoxProps, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionText = motion<Omit<TextProps, "transition">>(Text);
export const MotionBox = motion<Omit<BoxProps, "transition">>(Box);
