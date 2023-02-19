"use client";

import { Button } from "@/components/chakra";
import { ButtonProps } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type LogoutButtonProps = ButtonProps;

export default function LogoutButton({ children, ...rest }: LogoutButtonProps) {
  const router = useRouter();
  const handleSignOut = async () => {
    const callbackUrl = `/auth/login`;
    await signOut({ callbackUrl, redirect: false });

    router.push("/auth/login");
  };
  return (
    <Button onClick={handleSignOut} {...rest}>
      {children}
    </Button>
  );
}
