import { useCallback, useEffect, useState } from "react";

export type UseSpeechRecognitionProps = {
  onResult: (result: string) => void;
};

export default function useSpeechRecognition({ onResult: _onResult }: UseSpeechRecognitionProps) {
  const [active, setActive] = useState(false);
  const [result, setResult] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | undefined>();

  const onResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      let tempResult = "";
      // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        // If result is final, stop the recognition.
        if (event.results[i].isFinal) {
          const newText = event.results[i][0].transcript;
          tempResult = newText;
          break;
        } else {
          const newText = event.results[i][0].transcript;
          tempResult += newText;
        }
      }
      setResult(tempResult);
      _onResult(tempResult);
    },
    [_onResult]
  );

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      if (!speechRecognition) {
        const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "fi-FI";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = onResult;
        recognition.onend = () => {
          setActive(false);
        };
        recognition.onstart = () => {
          setActive(true);
        };
        setSpeechRecognition(recognition);
      } else {
        speechRecognition.onresult = onResult;
      }
    }
  }, [onResult, speechRecognition]);

  return { speechRecognition, active, result };
}
