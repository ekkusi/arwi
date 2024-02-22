import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import Link, { LinkProps } from "./Link";

function LinkButton(props: ButtonProps & LinkProps) {
  return <Button as={Link} {...props} />;
}

export default LinkButton;
