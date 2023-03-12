"use client";

import { Icon, NextLink } from "@/components/chakra";
import { LinkProps } from "@chakra-ui/next-js";
import { AiOutlineArrowLeft } from "react-icons/ai";

type BackwardsLinkProps = LinkProps;

export default function BackwardsLink({
  children,
  ...rest
}: BackwardsLinkProps) {
  return (
    <NextLink display="inline-flex" alignItems="center" {...rest}>
      <Icon as={AiOutlineArrowLeft} mr="1" />
      {children}
    </NextLink>
  );
}
