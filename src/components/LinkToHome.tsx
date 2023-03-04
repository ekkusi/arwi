"use client";

import { LinkProps } from "@chakra-ui/next-js";
import { useSession } from "next-auth/react";
import { NextLink } from "./chakra";

type LinkToHomeProps = Omit<LinkProps, "href">;

export default function LinkToHome(props: LinkToHomeProps) {
  const { data } = useSession();
  return <NextLink href={data ? `${data.user.id}` : "/"} {...props} />;
}
