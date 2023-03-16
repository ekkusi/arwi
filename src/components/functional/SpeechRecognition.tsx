import useSpeechRecognition from "@/hooks-and-providers/useSpeechRecognition";
import { IconButtonProps } from "@chakra-ui/react";
import { IconButton } from "@/components/chakra";
import { FaMicrophone } from "react-icons/fa";

type SpeechRecognitionProps = Omit<IconButtonProps, "onClick"> & {
  onResult?: (result: string) => void;
  onStart?: () => void;
  onStop?: () => void;
};

export default function SpeechRecognition({
  onResult,
  onStart,
  onStop,
  ...rest
}: SpeechRecognitionProps) {
  const { speechRecognition, active } = useSpeechRecognition({
    onStop: () => {
      onStop?.();
    },
    onResult: (newResult) => {
      onResult?.(newResult);
    },
  });

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
          onStart?.();
        } else speechRecognition.stop();
      }}
      onBlur={() => speechRecognition.stop()}
      {...rest}
    />
  ) : null;
}
