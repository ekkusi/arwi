import { Icon, Text, TextProps } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import NoPrefetchLink from "./NoPrefetchLink";

type BackwardsLinkProps = TextProps & {
  href: string;
  prefetch?: boolean;
};

export default function BackwardsLink({
  children,
  href,
  ...rest
}: BackwardsLinkProps) {
  return (
    <Text
      as={NoPrefetchLink}
      href={href}
      display="inline-flex"
      alignItems="center"
      {...rest}
    >
      <Icon as={AiOutlineArrowLeft} mr="1" />
      {children}
    </Text>
  );
}
