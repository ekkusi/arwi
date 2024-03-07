import { AppMetadata } from "arwi-backend/src/types";
import React, { createContext } from "react";

const MetadataContext = createContext<AppMetadata | null>(null);

const { Provider } = MetadataContext;

export const useMetadata = () => {
  const context = React.useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
};

export default function MetadataProvider({ children, ...metadata }: React.PropsWithChildren<AppMetadata>) {
  return <Provider value={metadata}>{children}</Provider>;
}
