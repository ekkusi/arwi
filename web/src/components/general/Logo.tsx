import { BoxProps, Text, Flex } from "@chakra-ui/react";
import React from "react";

export type LogoProps = BoxProps;

export default function Logo(props: LogoProps) {
  return (
    <Flex color="primary" flexDirection="row" wrap="wrap" fontSize={{ base: "5xl", md: "6xl" }} fontWeight="200" lineHeight="1" {...props}>
      <Text as="span" marginRight="-0.09em">
        a
      </Text>
      <Text as="span" marginRight="0.02em">
        r
      </Text>
      <Text as="span" marginRight="-0.05em">
        w
      </Text>
      <Text as="span">i</Text>
    </Flex>
  );
}
