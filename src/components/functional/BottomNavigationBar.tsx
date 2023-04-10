import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDesignServices } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Text, Icon, SimpleGrid, TextProps } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getIsIOS } from "@/utils/deviceUtils";
// import { getIsIOS } from "@/utils/deviceUtils";

type BotttomNavigationLinkProps = TextProps & {
  href: string;
};

export function BottomNavigationLink({
  href,
  ...rest
}: BotttomNavigationLinkProps) {
  const { pathname } = useRouter();

  return (
    <Link href={href}>
      <Text
        display="flex"
        flexDirection="column"
        alignItems="center"
        fontSize="xs"
        color={pathname === href ? "green.500" : "light-text"}
        _hover={{
          color: "green.500",
        }}
        {...rest}
      />
    </Link>
  );
}

const NO_NAVIGATION_BAR_PATHS = [
  "/login",
  "/register",
  "/welcome",
  "/_offline",
  "/error",
];

export default function BottomNavigationBar() {
  const { pathname } = useRouter();
  const [isIOS, setIsIOS] = useState(false);

  // Has to be done in useEffect because navigator (used in getIsIOS) is not available on server side
  useEffect(() => {
    setIsIOS(getIsIOS());
  }, [isIOS]);

  if (NO_NAVIGATION_BAR_PATHS.includes(pathname || "")) return null;

  return (
    <SimpleGrid
      columns={3}
      pt="4"
      pb={isIOS ? "6" : "4"}
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
        <Text as="span">Koti</Text>
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
