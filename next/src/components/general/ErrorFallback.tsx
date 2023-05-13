import { Button, Flex, Text } from "@chakra-ui/react";
import ErrorPageWrapper from "@/components/server-components/ErrorPageWrapper";

export default function ErrorFallback() {
  const update = () => {
    if (typeof window !== "undefined") {
      if ("serviceWorker" in navigator && window.workbox !== undefined) {
        const wb = window.workbox;

        // Send a message to the waiting service worker, instructing it to activate.
        wb.messageSkipWaiting();
      } else {
        console.error("Service worker not found, skip waiting");
      }
      window.location.replace("/");
    }
  };

  return (
    <ErrorPageWrapper>
      <Text mb="5">
        Kokeile päivittää sovellus alta. Voi olla, että sivuston versiosi on
        vain vanhentunut.
      </Text>
      <Flex justifyContent="center">
        <Button onClick={update}>Päivitä sivusto</Button>
      </Flex>
    </ErrorPageWrapper>
  );
}
