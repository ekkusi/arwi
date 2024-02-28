"use client";

import { Box, BoxProps, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { graphql } from "@/graphql";
import Link, { LinkProps } from "../primitives/Link";
import { useAuth } from "../../hooks-and-providers/AuthProvider";

export type HeaderProps = Omit<BoxProps, "children"> & {
  logoProps?: Omit<LinkProps, "href">;
};

const Header_Logout_Mutation = graphql(`
  mutation Header_Logout {
    logout
  }
`);

export default function Header({ logoProps, ...rest }: HeaderProps) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [logoutMutate, { loading: logoutLoading }] = useMutation(Header_Logout_Mutation);
  const router = useRouter();

  const logout = async () => {
    await logoutMutate();
    setIsAuthenticated(false);
    router.refresh();
  };

  const { t } = useTranslation();
  return (
    <Box
      as="header"
      pl={{ base: "5", md: "6" }}
      py={{ base: "4", md: "5" }}
      position="relative"
      display="flex"
      justifyContent="space-between"
      {...rest}
    >
      <Link href="/" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="light" lineHeight="1" {...logoProps}>
        arwi
      </Link>
      {isAuthenticated && (
        <Button
          onClick={() => logout()}
          isLoading={logoutLoading}
          variant="link"
          fontSize="xl"
          textDecoration="none"
          fontWeight="light"
          mr="6"
          mt="1"
        >
          {t("logout", "Kirjaudu ulos")}
        </Button>
      )}
    </Box>
  );
}
