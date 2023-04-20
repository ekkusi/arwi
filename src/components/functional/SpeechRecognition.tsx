import useSpeechRecognition from "@/hooks-and-providers/useSpeechRecognition";
import { getIsIOS } from "@/utils/deviceUtils";
import { IconButtonProps, IconButton } from "@chakra-ui/react";
import { useCallback } from "react";
import { FaMicrophone } from "react-icons/fa";

type SpeechRecognitionProps = Omit<IconButtonProps, "onClick"> & {
  onResult?: (result: string) => void;
};

export default function SpeechRecognition({
  onResult: _onResult,
  ...rest
}: SpeechRecognitionProps) {
  const onResult = useCallback(
    (value: string) => {
      _onResult?.(value);
    },
    [_onResult]
  );
  const { speechRecognition, active } = useSpeechRecognition({
    onResult,
  });

  // NOTE: This can be removed once IOS supports the SpeechRecognition API
  if (getIsIOS()) return null;

  return speechRecognition ? (
    <IconButton
      variant="link"
      p="3"
      borderRadius="100%"
      bg={active ? "green.100" : "transparent"}
      _hover={{ bg: active ? "green.100" : "transparent" }}
      icon={<FaMicrophone />}
      onClick={() => {
        if (!active) {
          speechRecognition.start();
        } else {
          speechRecognition.stop();
        }
      }}
      onBlur={() => {
        speechRecognition.stop();
      }}
      {...rest}
    />
  ) : null;
}
