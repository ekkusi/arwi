"use client";

import { LinkProps } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDesignServices } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Text, Icon, NextLink, SimpleGrid } from "./chakra";

type BotttomNavigationLinkProps = LinkProps & {};

export function BottomNavigationLink({
  href,
  ...rest
}: BotttomNavigationLinkProps) {
  const pathname = usePathname();

  return (
    <NextLink
      href={href}
      display="flex"
      flexDirection="column"
      alignItems="center"
      fontSize="xs"
      color={pathname === href ? "green.500" : "gray.800"}
      _hover={{
        color: "green.500",
      }}
      {...rest}
    />
  );
}

export default function BottomNavigationBar() {
  return (
    <SimpleGrid
      columns={3}
      py="2"
      width="100%"
      position="fixed"
      zIndex="100"
      bottom="0"
      left="0"
      bg="white"
      boxShadow="dark-lg"
      alignItems="center"
      textAlign="center"
    >
      <BottomNavigationLink href="/">
        <Icon as={AiOutlineHome} w={6} h={6} />
        <Text as="span">Home</Text>
      </BottomNavigationLink>
      <BottomNavigationLink href="/profile">
        <Icon as={CgProfile} w={6} h={6} />
        <Text as="span">Profiili</Text>
      </BottomNavigationLink>
      <BottomNavigationLink href="/design">
        <Icon as={MdOutlineDesignServices} w={6} h={6} />
        <Text as="span">Design</Text>
      </BottomNavigationLink>
    </SimpleGrid>
  );
}
