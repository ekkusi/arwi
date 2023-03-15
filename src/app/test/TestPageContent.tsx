/* eslint-disable */

"use client";

import { Box, Button, Text } from "@/components/chakra";
import { useEffect, useState } from "react";

export default function TestPageContent() {
  const [speechRecognitionActive, setSpeechRecognitionActive] = useState(false);
  const [speechRecognitionResult, setSpeechRecognitionResult] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState<
    SpeechRecognition | undefined
  >();

  useEffect(() => {
    if ("webkitSpeechRecognition" in window && !speechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "fi-FI";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        // Create the interim transcript string locally because we don't want it to persist like final transcript
        console.log("Running onresult");

        let result = "";
        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
          console.log("Index of result: ", i);

          if (event.results[i].isFinal) {
            const newText = event.results[i][0].transcript;
            result = newText;
            console.log("iS FINAL", newText);
            break;
          } else {
            const newText = event.results[i][0].transcript;
            console.log("iS interim", newText);
            result += newText;
          }
        }
        console.log("Setting result to: ", result);
        setSpeechRecognitionResult(result);
      };
      recognition.onend = (event) => {
        console.log("Ending speech recognition");

        setSpeechRecognitionActive(false);
      };
      recognition.onstart = (event) => {
        console.log("Starting speech recognition");
      };
      setSpeechRecognition(recognition);
    }
  }, [speechRecognition]);

  const toggleSpeechRecognition = () => {
    if (!speechRecognition) return;
    console.log("toggleSpeechRecognition");
    if ("webkitSpeechRecognition" in window) {
      // Speech Recognition Stuff goes here
      if (speechRecognitionActive) speechRecognition.stop();
      else speechRecognition.start();
      setSpeechRecognitionActive(!speechRecognitionActive);
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
          colorScheme={speechRecognitionActive ? "red" : "green"}
        >
          {speechRecognitionActive ? "Stop" : "Record"}
        </Button>
        <Text as="h3">Result:</Text>
        <Text>{speechRecognitionResult}</Text>
      </Box>
    </Box>
  );
}
