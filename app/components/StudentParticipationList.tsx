import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Switch } from "react-native";
import { COLORS } from "../theme";
import Card from "./Card";
import CFlatList from "./primitives/CFlatList";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

type StudentParticipationListProps<T extends StudentParticipation> = Omit<CViewProps, "onChange"> & {
  initialParticipations: T[];
  onChange?: (participations: T[]) => void;
};

export type StudentParticipation = {
  student: {
    id: string;
    name: string;
  };
  wasPresent: boolean;
};

export default function StudentParticipationList<T extends StudentParticipation>({
  initialParticipations,
  onChange,
  ...rest
}: StudentParticipationListProps<T>) {
  const [participations, setParticipations] = useState<T[]>(() => initialParticipations);

  const { t } = useTranslation();

  const onToggle = (participation: T, value: boolean) => {
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
        <Card key={item.student.id}>
          <CView style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: "md" }}>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{item.student.name}</CText>
            <CView style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingRight: 20 }}>
              <Switch
                trackColor={{ false: COLORS.lightgray, true: COLORS.primary }}
                thumbColor={COLORS.white}
                ios_backgroundColor={COLORS.lightgray}
                onValueChange={(value) => onToggle(item, value)}
                value={item.wasPresent}
                style={{ transform: [{ scale: 1.4 }] }}
              />
            </CView>
          </CView>
        </Card>
      )}
      {...rest}
    />
  );
}
