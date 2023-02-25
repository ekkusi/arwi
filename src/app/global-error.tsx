"use client";

import { Button, Flex, NextLink, Text } from "@/components/chakra";
import { useEffect } from "react";
import ErrorPageWrapper from "./(components)/ErrorPageWrapper";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset: _ }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head />
      <body>
        <ErrorPageWrapper>
          <Text>Kokeile palata aloitussivulle alta.</Text>
          <Flex justifyContent="center">
            <Button as={NextLink} href="/">
              Siirry aloitussivulle
            </Button>
          </Flex>
        </ErrorPageWrapper>
      </body>
    </html>
  );
}
