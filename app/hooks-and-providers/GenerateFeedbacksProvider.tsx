import React, { createContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const GenerateFeedbacks_useGeneratedFeedbacks_Mutation = graphql(`
  mutation GenerateFeedbacks_useGeneratedFeedbacks_Mutation($groupId: ID!) {
    startGenerateGroupFeedbacks(groupId: $groupId) {
      id
      monthlyTokensUsed
    }
  }
`);

type GenerateFeedbacksContextType = {
  generatingGroupIds: string[];
  addGeneratingGroupId: (groupId: string) => void;
  removeGeneratingGroupId: (groupId: string) => void;
};

const GenerateFeedbacksContext = createContext<GenerateFeedbacksContextType | null>(null);

const { Provider } = GenerateFeedbacksContext;

export function useGenerateFeedback(groupId: string) {
  const context = React.useContext(GenerateFeedbacksContext);

  const [generateFeedbacks] = useMutation(GenerateFeedbacks_useGeneratedFeedbacks_Mutation, {
    variables: { groupId },
    onCompleted: () => {
      context?.removeGeneratingGroupId(groupId);
    },
    onError: () => {
      context?.removeGeneratingGroupId(groupId);
    },
  });

  const isGenerating = context?.generatingGroupIds.includes(groupId);

  const startGenerateFeedbacks = () => {
    if (isGenerating) {
      return;
    }
    context?.addGeneratingGroupId(groupId);
    return generateFeedbacks();
  };

  if (!context) {
    throw new Error("useGenerateFeedback must be used within an GenerateFeedbacksProvider");
  }

  return {
    generateFeedbacks: startGenerateFeedbacks,
    isGenerating: context.generatingGroupIds.includes(groupId),
  };
}

export default function GenerateFeedbacksProvider({ children }: React.PropsWithChildren<{}>) {
  const [generatingGroupIds, setGeneratingGroupIds] = useState<string[]>([]);

  const addGeneratingGroupId = (groupId: string) => {
    setGeneratingGroupIds((prev) => [...prev, groupId]);
  };

  const removeGeneratingGroupId = (groupId: string) => {
    setGeneratingGroupIds((prev) => prev.filter((id) => id !== groupId));
  };

  return (
    <Provider
      value={{
        generatingGroupIds,
        addGeneratingGroupId,
        removeGeneratingGroupId,
      }}
    >
      {children}
    </Provider>
  );
}
