/* eslint-disable */

"use client";

import { Box, Button, Text } from "@/components/chakra";
import useSpeechRecognition from "@/hooks-and-providers/useSpeechRecognition";
import { useEffect, useState } from "react";

export default function TestPageContent() {
  const { speechRecognition, active, result } = useSpeechRecognition();

  const toggleSpeechRecognition = () => {
    if (!speechRecognition) return;
    console.log("toggleSpeechRecognition");
    if ("webkitSpeechRecognition" in window) {
      // Speech Recognition Stuff goes here
      if (active) speechRecognition.stop();
      else speechRecognition.start();
    } else {
      console.error("Speech Recognition Not Available");
    }
  };

  return (
    <Box>
      <Text as="h1">Test page</Text>
      <Box>
        <Text as="h2">Speech recognition</Text>
        <Button
          onClick={toggleSpeechRecognition}
          colorScheme={active ? "red" : "green"}
        >
          {active ? "Stop" : "Record"}
        </Button>
        <Text as="h3">Result:</Text>
        <Text>{result}</Text>
      </Box>
    </Box>
  );
}
