"use client";

import { Flex, FlexProps, useToken } from "@chakra-ui/react";
import React, { useState } from "react";
import { hexToRgbA } from "@/utils/color";
import HamburgerButton from "./HamburgerButton";

type NavigationProps = FlexProps;

function Navigation({ children, ...rest }: NavigationProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const bgColor = useToken("colors", "primary-bg");

  const bgWithOpacity = hexToRgbA(bgColor, 0.97);

  return (
    <>
      <HamburgerButton
        display={{ base: "block", md: "none" }}
        isOpen={isNavOpen}
        onClick={() => setIsNavOpen(!isNavOpen)}
        color={isNavOpen ? "text" : "primary"}
        zIndex={3}
      />
      <Flex
        as="nav"
        display={{ base: isNavOpen ? "flex" : "none", md: "flex" }}
        alignItems="center"
        justifyContent="center"
        position={{ base: "fixed", md: "relative" }}
        top="0"
        left="0"
        bottom="0"
        right="0"
        bg={{ base: bgWithOpacity, md: "transparent" }}
        opacity={{ base: isNavOpen ? 1 : 0, md: 1 }}
        transition="opacity 0.3s ease"
        zIndex={2}
      >
        <Flex
          color="primary"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          textTransform="uppercase"
          fontWeight={{ base: "400", md: "600" }}
          fontSize={{ base: "4xl", md: "lg" }}
          gap={{ base: "2", md: "4" }}
          {...rest}
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
}

export default Navigation;
