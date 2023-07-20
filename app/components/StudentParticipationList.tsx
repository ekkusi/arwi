import { useState } from "react";
import ParticipationToggle from "./ParticipationToggle";
import CFlatList from "./primitives/CFlatList";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type StudentParticipationListProps = Omit<CViewProps, "onChange"> & {
  initialParticipations: StudentParticipation[];
  onChange?: (participations: StudentParticipation[]) => void;
  disabled?: boolean;
};

export type StudentParticipation = {
  student: {
    id: string;
    name: string;
  };
  wasPresent: boolean;
};

export default function StudentParticipationList({ initialParticipations, onChange, disabled = false, ...rest }: StudentParticipationListProps) {
  const [participations, setParticipations] = useState<StudentParticipation[]>(() => initialParticipations);

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
    <CFlatList
      data={participations}
      renderItem={({ item }) => (
        <CView key={item.student.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "sm" }}>
          <CText>{item.student.name}</CText>
          <ParticipationToggle disabled={disabled} initialValue={item.wasPresent} onChange={(value) => onToggle(item, value)} />
        </CView>
      )}
      {...rest}
    />
  );

  // return (
  //   <Box {...rest}>
  //     {participations.map((it, index) => (
  //       <Flex key={`${it.student.name}-${index}`} alignItems="center" justifyContent="space-between" mb="2">
  //         <Text mr="1">{it.student.name}</Text>
  //         <ParticipationToggle isDisabled={isDisabled} initialValue={it.wasPresent} onChange={(value) => onToggle(it, value)} />
  //       </Flex>
  //     ))}
  //   </Box>
  // );
}
