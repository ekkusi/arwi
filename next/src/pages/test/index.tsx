import { Box, Button, Text } from "@chakra-ui/react";
import PageWrapper from "@/components/server-components/PageWrapper";
import useSpeechRecognition from "@/hooks-and-providers/useSpeechRecognition";

export default function TestPage() {
  const { speechRecognition, active, result } = useSpeechRecognition({
    onResult: () => {},
  });

  const toggleSpeechRecognition = () => {
    if (!speechRecognition) return;
    if ("webkitSpeechRecognition" in window) {
      // Speech Recognition Stuff goes here
      if (active) speechRecognition.stop();
      else speechRecognition.start();
    } else {
      console.error("Speech Recognition Not Available");
    }
  };

  return (
    <PageWrapper>
      <Box>
        <Text as="h1">Test page</Text>
        <Box>
          <Text as="h2">Speech recognition</Text>
          <Button onClick={toggleSpeechRecognition} colorScheme={active ? "red" : "green"}>
            {active ? "Stop" : "Record"}
          </Button>
          <Text as="h3">Result:</Text>
          <Text>{result}</Text>
        </Box>
      </Box>
    </PageWrapper>
  );
}
