import { Icon, Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

type BackwardsLinkProps = TextProps & {
  href: string;
  prefetch?: boolean;
};

export default function BackwardsLink({
  children,
  href,
  prefetch,
  ...rest
}: BackwardsLinkProps) {
  return (
    <Text
      as={Link}
      prefetch={prefetch}
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
