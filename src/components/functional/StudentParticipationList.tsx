import { Box, Button, Flex, Text, BoxProps } from "@chakra-ui/react";
import { useState } from "react";

type StudentParticipationListProps = Omit<BoxProps, "onChange"> & {
  initialParticipations: StudentParticipation[];
  onChange?: (participations: StudentParticipation[]) => void;
  isDisabled?: boolean;
};

export type StudentParticipation = {
  student: {
    id: string;
    name: string;
  };
  wasPresent: boolean;
};

export default function StudentParticipationList({
  initialParticipations,
  onChange,
  isDisabled = false,
  ...rest
}: StudentParticipationListProps) {
  const [participations, setParticipations] = useState<StudentParticipation[]>(
    () => initialParticipations
  );

  const toggleStudentPresent = (participation: StudentParticipation) => {
    // Copy old array -> update matching participation -> set copy as new state
    const participationsCopy = [...participations];
    const matching = participationsCopy.find((it) => it === participation);
    if (!matching) throw new Error("Unexpected error, student not found");
    matching.wasPresent = true;
    setParticipations(participationsCopy);
    onChange?.(participationsCopy);
  };

  const toggleStudentNotPresent = (participation: StudentParticipation) => {
    // Copy old array -> update matching participation -> set copy as new state
    const participationsCopy = [...participations];
    const matching = participationsCopy.find((it) => it === participation);
    if (!matching) throw new Error("Unexpected error, student not found");
    matching.wasPresent = false;
    setParticipations(participationsCopy);
    onChange?.(participationsCopy);
  };

  return (
    <Box {...rest}>
      {participations.map((it, index) => (
        <Flex
          key={`${it.student.name}-${index}`}
          alignItems="center"
          justifyContent="space-between"
          mb="2"
        >
          <Text mr="1">{it.student.name}</Text>
          <Flex wrap="nowrap">
            <Button
              size="xs"
              onClick={() => toggleStudentPresent(it)}
              variant={it.wasPresent ? "solid" : "outline"}
              borderRadius="lg"
              isDisabled={isDisabled} // Disable changing participations until initial participations are set on parent
              mr="2"
            >
              Paikalla
            </Button>
            <Button
              size="xs"
              onClick={() => toggleStudentNotPresent(it)}
              colorScheme="red"
              borderRadius="lg"
              variant={it.wasPresent ? "outline" : "solid"}
              isDisabled={isDisabled}
            >
              Poissa
            </Button>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}
