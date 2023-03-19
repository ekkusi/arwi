/* eslint-disable no-console */
import { Button, Text } from "@chakra-ui/react";
import ModalTemplate from "@/components/general/ModalTemplate";
import { useEffect, useState } from "react";

export default function ServiceWorkerProvider() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // This hook only run once in browser after the component is rendered for the first time.
  // It has same effect as the old componentDidMount lifecycle callback.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      // add event listeners to handle PWA lifecycle events
      wb.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("waiting", (event) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        // https://developer.chrome.com/docs/workbox/handling-service-worker-updates/#the-code-to-put-in-your-page
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
        setIsModalOpen(true);
      });

      wb.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      // never forget to call register as automatic registration is turned off in next.config.js
      wb.register();
    }
  }, []);

  const update = () => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      console.log("Updating service worker...");
      setIsModalOpen(false);

      wb.addEventListener("controlling", () => {
        console.log("New service worker has taken over");
      });

      // Send a message to the waiting service worker, instructing it to activate.
      wb.messageSkipWaiting();
      window.location.reload();
    } else {
      console.error("Service worker not found, cannot update");
    }
  };

  return (
    <ModalTemplate
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
    >
      <Text>Uusi päivitys saatavilla!</Text>
      <Text>Päivitä sovellus klikkaamalla alta.</Text>
      <Button onClick={update}>Päivitä</Button>
    </ModalTemplate>
  );
}
