import { useEffect, useState } from "react";

export type UseSpeechRecognitionProps = {
  onResult?: (result: string) => void;
  onStop?: () => void;
  onStart?: () => void;
};

export default function useSpeechRecognition(
  props?: UseSpeechRecognitionProps
) {
  const [active, setActive] = useState(false);
  const [result, setResult] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState<
    SpeechRecognition | undefined
  >();

  useEffect(() => {
    if ("webkitSpeechRecognition" in window && !speechRecognition) {
      // eslint-disable-next-line no-console
      console.log("Setting up speech recognition");

      const SpeechRecognition =
        window.SpeechRecognition || webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "fi-FI";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        let tempResult = "";
        // Loop through the results from the speech recognition object.
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          // If result is final, stop the recognition.
          if (event.results[i].isFinal) {
            const newText = event.results[i][0].transcript;
            tempResult = newText;
            // recognition.stop();
            break;
          } else {
            const newText = event.results[i][0].transcript;
            tempResult += newText;
          }
        }
        setResult(tempResult);

        if (props?.onResult) {
          props.onResult(tempResult);
        }
      };
      recognition.onend = () => {
        setActive(false);
        if (props?.onStop) {
          props.onStop();
        }
      };
      recognition.onstart = () => {
        setActive(true);
        if (props?.onStart) {
          props.onStart();
        }
      };
      setSpeechRecognition(recognition);
    }
  }, [props, speechRecognition]);

  return { speechRecognition, active, result };
}
