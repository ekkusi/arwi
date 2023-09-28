"use client";

import { ColorHues, Colors, useToken } from "@chakra-ui/react";
import NextImage, { ImageProps } from "next/image";

export default function Image({ color: colorKey, ...rest }: ImageProps) {
  const color = useToken("colors", colorKey || "");
  // const fill = useToken("colors", fillKey || "");

  return <NextImage color={colorKey ?? color} {...rest} />;
}
