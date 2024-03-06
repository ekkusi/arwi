import React, { createContext } from "react";

type Metadata = {
  minimumSupportedAppVersion: string;
  monthlyTokenUseLimit: number;
  feedbackGenerationTokenCost: number;
  textFixTokenCost: number;
};

const MetadataContext = createContext<Metadata | null>(null);

const { Provider } = MetadataContext;

export const useMetadata = () => {
  const context = React.useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
};

export default function MetadataProvider({ children, ...metadata }: React.PropsWithChildren<Metadata>) {
  return <Provider value={metadata}>{children}</Provider>;
}
