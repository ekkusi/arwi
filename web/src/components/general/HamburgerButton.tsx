"use client";

import { Box, BoxProps, Button, ButtonProps, useBreakpointValue } from "@chakra-ui/react";
import React, { useMemo } from "react";

type HamburgerButtonProps = Omit<ButtonProps, "width" | "height"> & {
  isOpen: boolean;
  width?: number | { base: number; md: number };
  height?: number | { base: number; md: number };
  spacing?: number | { base: number; md: number };
};

export default function HamburgerButton({
  isOpen,
  width: _width = { base: 32, md: 35 },
  spacing: _spacing = { base: 5, md: 6 },
  height: _height = 3,
  ...rest
}: HamburgerButtonProps) {
  const width = useBreakpointValue(typeof _width === "number" ? { base: _width } : _width, { ssr: true, fallback: "base" }) || (_width as number);
  const height =
    useBreakpointValue(typeof _height === "number" ? { base: _height } : _height, { ssr: true, fallback: "base" }) || (_height as number);
  const spacing =
    useBreakpointValue(typeof _spacing === "number" ? { base: _spacing } : _spacing, { ssr: true, fallback: "base" }) || (_spacing as number);
  const allElementStyles: BoxProps = useMemo(
    () => ({
      position: "absolute",
      left: 0,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: rest.color || "text",
      borderRadius: "5px",
      transition: "transform 0.5s ease",
    }),
    [width, height, rest.color]
  );

  const beforeAndAfterStyles: BoxProps = useMemo(
    () => ({
      content: '""',
      ...allElementStyles,
    }),
    [allElementStyles]
  );
  return (
    <Button
      variant="ghost"
      border="none"
      color="inherit"
      cursor="pointer"
      minWidth="auto"
      outline={0}
      py={`${height * 1.5 + spacing * 2}px`}
      px={`${width / 2 + spacing}px`}
      _hover={{ backgroundColor: "transparent" }}
      {...rest}
    >
      <Box
        transform={`translateY(-${height / 2}px)`}
        ml={`${spacing / 2}px`}
        {...allElementStyles}
        _before={{
          top: `${(height + spacing) * -1}px`,
          transform: isOpen ? `translateY(${height + spacing}px)` : undefined,
          ...beforeAndAfterStyles,
        }}
        _after={{
          bottom: `${(height + spacing) * -1}px`,
          transform: isOpen ? `translateY(-${height + spacing}px)` : undefined,
          ...beforeAndAfterStyles,
        }}
      />
    </Button>
  );
}
