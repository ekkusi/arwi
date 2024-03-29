import React, { createContext, useState } from "react";
import { ApolloError, FetchResult, useMutation } from "@apollo/client";
import { ResultOf, graphql } from "@/graphql";
import { useThrowCatchableError } from "./error";
import { FeedbackCacheUpdate_Fragment } from "@/helpers/graphql/fragments";

const GenerateFeedbacks_useGeneratedFeedbacks_Mutation = graphql(
  `
    mutation GenerateFeedbacks_useGeneratedFeedbacks_Mutation($groupId: ID!) {
      generateGroupFeedback(groupId: $groupId) {
        feedbacks {
          ...FeedbackCacheUpdate
        }
        usageData {
          id
          monthlyTokensUsed
          warning {
            warning
            threshhold
          }
        }
      }
    }
  `,
  [FeedbackCacheUpdate_Fragment]
);

type GenerateFeedbacksContextType = {
  generatingGroupIds: string[];
  addGeneratingGroupId: (groupId: string) => void;
  removeGeneratingGroupId: (groupId: string) => void;
};

const GenerateFeedbacksContext = createContext<GenerateFeedbacksContextType | null>(null);

const { Provider } = GenerateFeedbacksContext;

export function useGenerateFeedback(groupId: string) {
  const context = React.useContext(GenerateFeedbacksContext);
  const throwCatchableError = useThrowCatchableError();

  const [generateFeedbacks] = useMutation(GenerateFeedbacks_useGeneratedFeedbacks_Mutation, {
    variables: { groupId },
  });

  const isGenerating = context?.generatingGroupIds.includes(groupId);

  const startGenerateFeedbacks = async (
    onSuccess?: (result: FetchResult<ResultOf<typeof GenerateFeedbacks_useGeneratedFeedbacks_Mutation>>) => void,
    onError?: (err: Error) => void
  ) => {
    if (isGenerating) {
      throw new Error("Already generating feedbacks for this group");
    }
    context?.addGeneratingGroupId(groupId);
    try {
      const result = await generateFeedbacks();
      context?.removeGeneratingGroupId(groupId);
      onSuccess?.(result);
      return result;
    } catch (err) {
      context?.removeGeneratingGroupId(groupId);
      if (err instanceof ApolloError) {
        const graphqlError = err.graphQLErrors[0];
        if (graphqlError && graphqlError.extensions?.code === "UNAUTHORIZED") {
          onError?.(err);
          return;
        }
      }
      throwCatchableError(err);
    }
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
