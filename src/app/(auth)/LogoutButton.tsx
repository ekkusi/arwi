"use client";

import { Button } from "@/components/chakra";
import { ButtonProps } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LogoutButtonProps = ButtonProps;

export default function LogoutButton({ children, ...rest }: LogoutButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    const callbackUrl = `/login`;
    setLoading(true);
    await signOut({ callbackUrl, redirect: false });
    setLoading(false);

    router.push("/login");
  };
  return (
    <Button onClick={handleSignOut} isLoading={loading} {...rest}>
      {children}
    </Button>
  );
}
