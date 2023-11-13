"use client";

import { Button, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import PageWrapper from "@/components/general/PageWrapper";
import { LocalizedPage } from "@/types/page";
import { formatLocalizedPath } from "@/utils/route";
import Link from "@/components/primitives/Link";

const BACKEND_API_URL = "http://localhost:4000";

export default function LoginPage({ params }: LocalizedPage) {
  const { lng } = params;
  const pathname = usePathname();
  const redirectUrl = `http://localhost:3000${formatLocalizedPath(pathname, lng)}`;

  const handleTest = () => {
    const some = fetch(`${BACKEND_API_URL}/test`, {
      credentials: "include",
    });
  };

  const errorTest = async () => {
    try {
      const errorResult = await fetch(`${BACKEND_API_URL}/error-test`);
      console.log("Result", errorResult);
      console.log("Result", await errorResult.json());
    } catch (error) {
      console.log("Error", error);
    }
  };

  const timeOutTest = async () => {
    try {
      const errorResult = await fetch(`${BACKEND_API_URL}/timeout-test`, {
        credentials: "include",
      });
      console.log("Result", errorResult);
      console.log("Result", await errorResult.text());
    } catch (error) {
      console.log("Error", error);
    }
  };

  const logout = async () => {
    const test = await fetch(`${BACKEND_API_URL}/auth/logout`, {
      credentials: "include",
    });
    console.log(test);
  };

  return (
    <PageWrapper py="5" maxWidth={{ base: "100%", md: "750px", xl: "1000px" }} mx="auto">
      <Text as="h1">Login</Text>
      <Button onClick={handleTest}>Test</Button>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={errorTest}>Error Test</Button>
      <Button onClick={timeOutTest}>Timeout Test</Button>
      <Link noTranslate as="a" display="block" href={`${BACKEND_API_URL}/auth/logout`}>
        Logout link
      </Link>
      <Link noTranslate as="a" display="block" href={`${BACKEND_API_URL}/auth/authorize?${new URLSearchParams({ redirect_uri: redirectUrl })}`}>
        Login link
      </Link>
    </PageWrapper>
  );
}
