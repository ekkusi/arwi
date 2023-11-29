import { CollectionTypeCategory, CreateCollectionTypeInput, ModuleInfo } from "arwi-backend/src/types";
import { SubjectMinimal } from "arwi-backend/src/types/subject";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCollectionTypeTranslation } from "../../../../helpers/translation";

export type GroupMinimal = {
  name: string;
  module?: ModuleInfo;
  subject?: SubjectMinimal;
  students: string[];
  collectionTypes: CreateCollectionTypeInput[];
};

type GroupContextParams = {
  group: GroupMinimal;
  setGroup: Dispatch<SetStateAction<GroupMinimal>>;
};
const GroupCreationContext = createContext<GroupContextParams>({ group: { name: "", students: [], collectionTypes: [] }, setGroup: () => {} });

const { Provider } = GroupCreationContext;

export const useGroupCreationContext = () => {
  const context = useContext(GroupCreationContext);
  if (!context) {
    throw new Error("useGroupCreationContext must be used within an GroupCreationProvider");
  }
  return context;
};

function GroupCreationProvider({ children }: React.PropsWithChildren) {
  const { t } = useTranslation();
  const [group, setGroup] = useState<GroupMinimal>({
    name: "",
    students: [],
    collectionTypes: [
      {
        category: CollectionTypeCategory.CLASS_PARTICIPATION,
        name: getCollectionTypeTranslation(t, CollectionTypeCategory.CLASS_PARTICIPATION),
        weight: 100,
      },
    ],
  });

  return <Provider value={{ group, setGroup }}>{children}</Provider>;
}

export { GroupCreationContext, GroupCreationProvider };
