import { Box, Flex, Text, BoxProps } from "@chakra-ui/react";
import { useState } from "react";
import ParticipationToggle from "./ParticipationToggle";

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

  const onToggle = (participation: StudentParticipation, value: boolean) => {
    // Copy old array -> update matching participation -> set copy as new state
    const participationsCopy = [...participations];
    const matching = participationsCopy.find((it) => it === participation);
    if (!matching) throw new Error("Unexpected error, student not found");
    matching.wasPresent = value;
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
          <ParticipationToggle
            isDisabled={isDisabled}
            initialValue={it.wasPresent}
            onChange={(value) => onToggle(it, value)}
          />
        </Flex>
      ))}
    </Box>
  );
}
