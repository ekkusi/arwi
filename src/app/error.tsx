"use client";

import { Button, Flex, Text } from "@/components/chakra";
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

  const update = () => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;

      // Send a message to the waiting service worker, instructing it to activate.
      wb.messageSkipWaiting();
    } else {
      console.error("Service worker not found, skip waiting");
    }
    window.location.reload();
  };

  return (
    <ErrorPageWrapper>
      <Text mb="5">
        Kokeile päivittää sovellus alta. Voi olla, että sivuston versiosi on
        vanhentunut.
      </Text>
      <Flex justifyContent="center">
        <Button onClick={update}>Päivitä sivusto</Button>
      </Flex>
    </ErrorPageWrapper>
  );
}
