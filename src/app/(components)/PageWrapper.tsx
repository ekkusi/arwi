"use client";

import { MotionBox, MotionBoxProps } from "@/components/chakra";
import { motion } from "framer-motion";

type PageWrapperProps = MotionBoxProps & {
  children: React.ReactNode;
};

function PageWrapper({ children, ...rest }: PageWrapperProps) {
  return (
    <MotionBox
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
      p="5"
      bg="light-gray"
      minHeight="100vh"
      width="100%"
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

export default PageWrapper;
