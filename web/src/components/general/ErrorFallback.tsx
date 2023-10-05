import { Text } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";

export default function ErrorFallback() {
  // const update = () => {
  //   if (typeof window !== "undefined") {
  //     if ("serviceWorker" in navigator && window.workbox !== undefined) {
  //       const wb = window.workbox;

  //       // Send a message to the waiting service worker, instructing it to activate.
  //       wb.messageSkipWaiting();
  //     } else {
  //       console.error("Service worker not found, skip waiting");
  //     }
  //     window.location.replace("/");
  //   }
  // };

  return (
    <PageWrapper>
      <Text mb="5">Huppista!</Text>
      <Text mb="5">Jotain jännää pääsi tapahtumaan.</Text>
    </PageWrapper>
  );
}
