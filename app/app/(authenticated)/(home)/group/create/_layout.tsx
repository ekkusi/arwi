import { SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
import { Stack } from "expo-router";
import { createContext, useMemo, useState } from "react";
import { ClassYearInfo } from "../../../../../gql/graphql";

export type GroupMinimal = {
  name: string;
  class?: ClassYearInfo;
  subject?: SubjectMinimal;
  students: string[];
};

type GroupContextParams = {
  group: GroupMinimal;
  setGroup: React.Dispatch<React.SetStateAction<GroupMinimal>>;
};
export const GroupCreationContext = createContext<GroupContextParams>({ group: { name: "", students: [] }, setGroup: () => {} });

export default function GroupCreationStack() {
  const [group, setGroup] = useState<GroupMinimal>({ name: "", students: [] });

  const contextValue = useMemo(
    () => ({
      group,
      setGroup,
    }),
    [group]
  );
  return (
    <GroupCreationContext.Provider value={contextValue}>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
    </GroupCreationContext.Provider>
  );
}
