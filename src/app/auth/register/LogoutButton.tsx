"use client";

import { Button } from "@/components/chakra";
import { ButtonProps } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

type LogoutButtonProps = ButtonProps;

export default function LogoutButton({ children, ...rest }: LogoutButtonProps) {
  return (
    <Button onClick={() => signOut()} {...rest}>
      {children}
    </Button>
  );
}
