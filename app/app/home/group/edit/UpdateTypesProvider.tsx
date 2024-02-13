import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { CollectionType } from "arwi-backend/src/types";

export type CollectionTypeFull = Pick<CollectionType, "name" | "weight" | "category"> & { id: string | undefined };

type CollectionTypesUpdateContextParams = {
  types: CollectionTypeFull[];
  setTypes: Dispatch<SetStateAction<CollectionTypeFull[]>>;
};
const UpdateTypesContext = createContext<CollectionTypesUpdateContextParams>({ types: [], setTypes: () => {} });

const { Provider } = UpdateTypesContext;

export const useUpdateTypesContext = () => {
  const context = useContext(UpdateTypesContext);
  if (!context) {
    throw new Error("useUpdateTypesContext must be used within an UpdateTypesProvider");
  }
  return context;
};

function UpdateTypesProvider({ children, initialTypes }: React.PropsWithChildren & { initialTypes: CollectionTypeFull[] }) {
  const [types, setTypes] = useState<CollectionTypeFull[]>([...initialTypes]);

  return <Provider value={{ types, setTypes }}>{children}</Provider>;
}

export { UpdateTypesContext, UpdateTypesProvider };
