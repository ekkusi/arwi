"use client";

import { Button } from "@/components/chakra";
import { ButtonProps } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

type LoginButtonProps = ButtonProps;

export default function LoginButton({ children, ...rest }: LoginButtonProps) {
  return (
    <Button onClick={() => signIn()} {...rest}>
      {children}
    </Button>
  );
}
