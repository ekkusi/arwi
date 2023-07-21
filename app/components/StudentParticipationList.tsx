import { useState } from "react";
import { Switch } from "react-native";
import { COLORS } from "../theme";
import ParticipationToggle from "./ParticipationToggle";
import CFlatList from "./primitives/CFlatList";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type StudentParticipationListProps = Omit<CViewProps, "onChange"> & {
  initialParticipations: StudentParticipation[];
  onChange?: (participations: StudentParticipation[]) => void;
};

export type StudentParticipation = {
  student: {
    id: string;
    name: string;
  };
  wasPresent: boolean;
};

export default function StudentParticipationList({ initialParticipations, onChange, ...rest }: StudentParticipationListProps) {
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
        <CView key={item.student.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "-md" }}>
          <CText>{item.student.name}</CText>
          <Switch
            trackColor={{ false: COLORS.lightgray, true: COLORS.primary }}
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.lightgray}
            onValueChange={(value) => onToggle(item, value)}
            value={item.wasPresent}
          />
        </CView>
      )}
      {...rest}
    />
  );
}
