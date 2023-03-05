"use client";

import { Button, Flex, Text } from "@/components/chakra";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import ErrorPageWrapper from "./(server-components)/ErrorPageWrapper";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset: _ }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <ErrorPageWrapper>
      <Text>
        Kokeile ensiksi kirjautua uudestaan järjestelmään. Voi olla, että
        sivuston versiosi tai kirjautumisesi ovat vain vanhentuneet.
      </Text>
      <Flex justifyContent="center">
        <Button onClick={handleSignOut}>Siirry kirjautumaan</Button>
      </Flex>
    </ErrorPageWrapper>
  );
}