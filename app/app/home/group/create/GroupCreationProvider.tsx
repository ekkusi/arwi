import { ClassYearInfo } from "arwi-backend/src/types";
import { SubjectMinimal } from "arwi-backend/src/utils/subjectUtils";
import { createContext, useCallback, useContext, useState } from "react";

export type GroupMinimal = {
  name: string;
  class?: ClassYearInfo;
  subject?: SubjectMinimal;
  students: string[];
};

type GroupContextParams = {
  group: GroupMinimal;
  setGroup: (group: GroupMinimal) => void;
};
const GroupCreationContext = createContext<GroupContextParams>({ group: { name: "", students: [] }, setGroup: () => {} });

const { Provider } = GroupCreationContext;

export const useGroupCreationContext = () => {
  const context = useContext(GroupCreationContext);
  if (!context) {
    throw new Error("useGroupCreationContext must be used within an GroupCreationProvider");
  }
  return context;
};

const initialGroup: GroupMinimal = { name: "", students: [] };

function GroupCreationProvider({ children }: React.PropsWithChildren<{}>) {
  const [group, setGroup] = useState<GroupMinimal>(initialGroup);

  return <Provider value={{ group, setGroup }}>{children}</Provider>;
}

export { GroupCreationContext, GroupCreationProvider };
