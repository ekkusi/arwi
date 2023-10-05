import { Box, BoxProps } from "@chakra-ui/react";
import Link, { LinkProps } from "../primitives/Link";

export type HeaderProps = Omit<BoxProps, "children"> & {
  logoProps?: Omit<LinkProps, "href">;
};

export default function Header({ logoProps, ...rest }: HeaderProps) {
  return (
    <Box as="header" pl={{ base: "5", md: "6" }} py={{ base: "4", md: "5" }} position="relative" {...rest}>
      <Link href="/" fontSize={{ base: "5xl", md: "6xl" }} fontWeight="light" lineHeight="1" {...logoProps}>
        arwi
      </Link>
    </Box>
  );
}
