import { Box, Button, Flex, Text, BoxProps } from "@chakra-ui/react";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { StudentParticipationList_StudentFragment as StudentFragmentType } from "@/gql/graphql";
import { useEffect, useState } from "react";

const StudentParticipationList_StudentFragment = graphql(`
  fragment StudentParticipationList_Student on Student {
    id
    name
  }
`);

type StudentParticipationListProps = Omit<BoxProps, "onChange"> & {
  students: FragmentType<typeof StudentParticipationList_StudentFragment>[];
  onChange?: (participations: StudentParticipation[]) => void;
  isDisabled?: boolean;
};

export type StudentParticipation = {
  student: StudentFragmentType;
  wasPresent: boolean;
};

export default function StudentParticipationList({
  students: stundentFragments,
  onChange,
  isDisabled = false,
  ...rest
}: StudentParticipationListProps) {
  const students = getFragmentData(
    StudentParticipationList_StudentFragment,
    stundentFragments
  );
  const [participations, setParticipations] = useState<StudentParticipation[]>(
    () => {
      // eslint-disable-next-line
      console.log("setting initial students", students);

      return students.map((it) => ({
        student: it,
        wasPresent: true,
      }));
    }
  );
  const [initialParticipationsSet, setInitialParticipationsSet] =
    useState(false);

  // Set initial participations to parent
  useEffect(() => {
    if (!initialParticipationsSet) {
      setInitialParticipationsSet(true);
      onChange?.(participations);
    }
  }, [initialParticipationsSet, onChange, participations]);

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
              size="sm"
              onClick={() => toggleStudentPresent(it)}
              variant={it.wasPresent ? "solid" : "outline"}
              borderRadius="lg"
              isDisabled={!initialParticipationsSet || isDisabled} // Disable changing participations until initial participations are set on parent
              mr="2"
            >
              Paikalla
            </Button>
            <Button
              size="sm"
              onClick={() => toggleStudentNotPresent(it)}
              colorScheme="red"
              borderRadius="lg"
              variant={it.wasPresent ? "outline" : "solid"}
              isDisabled={!initialParticipationsSet || isDisabled}
            >
              Poissa
            </Button>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}
