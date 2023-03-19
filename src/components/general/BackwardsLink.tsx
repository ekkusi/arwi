import { Icon, Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

type BackwardsLinkProps = TextProps & {
  href: string;
};

export default function BackwardsLink({
  children,
  href,
  ...rest
}: BackwardsLinkProps) {
  return (
    <Text
      as={Link}
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
