"use client";

import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { graphql } from "@/graphql";
import { useIsPreviewing } from "@builder.io/react";
import { useAuth } from "../../hooks-and-providers/AuthProvider";

export type LogoutButtonProps = Omit<ButtonProps, "onClick">;

const LogoutButton_Logout_Mutation = graphql(`
  mutation LogoutButton_Logout {
    logout
  }
`);

export default function LogoutButton({ children, ...rest }: LogoutButtonProps) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const isPreviewing = useIsPreviewing();
  const [logoutMutate, { loading: logoutLoading }] = useMutation(LogoutButton_Logout_Mutation);
  const router = useRouter();

  const logout = async () => {
    await logoutMutate();
    setIsAuthenticated(false);
    router.refresh();
  };

  return isAuthenticated || isPreviewing ? (
    <Button
      onClick={() => logout()}
      isLoading={logoutLoading}
      variant="link"
      textDecoration="none"
      _hover={{ textDecoration: "none", opacity: 0.7 }}
      {...rest}
    >
      {children || <Icon as={LuLogOut} boxSize={8} />}
    </Button>
  ) : null;
}
