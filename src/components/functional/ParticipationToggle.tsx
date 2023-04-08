import { Button, Flex, FlexProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type ParticipationToggleProps = Omit<FlexProps, "onChange"> & {
  isDisabled?: boolean;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
  size?: "xs" | "sm" | "md" | "lg";
};

export default function ParticipationToggle({
  isDisabled,
  initialValue = true,
  onChange,
  size = "xs",
  ...rest
}: ParticipationToggleProps) {
  const [value, setValue] = useState(initialValue);

  const toggle = (newValue: boolean) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Flex wrap="nowrap" {...rest}>
      <Button
        size={size}
        onClick={() => toggle(true)}
        variant={value ? "solid" : "outline"}
        borderRadius="lg"
        isDisabled={isDisabled} // Disable changing participations until initial participations are set on parent
        mr="2"
      >
        Paikalla
      </Button>
      <Button
        size={size}
        onClick={() => toggle(false)}
        colorScheme="red"
        borderRadius="lg"
        variant={value ? "outline" : "solid"}
        isDisabled={isDisabled}
      >
        Poissa
      </Button>
    </Flex>
  );
}
