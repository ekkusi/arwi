"use client";

import { Box, Button, NextLink, Text } from "@/components/chakra";
import { FragmentType, graphql, useFragment } from "@/gql";
import { UpdateEvaluationCard_EvaluationFragment as EvaluationFragment } from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getErrorMessage } from "@/utils/errorUtils";
import { BoxProps, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateEvaluationCard from "./UpdateEvaluationCard";

const UpdateEvaluationsPageContent_CollectionFragment = graphql(`
  fragment UpdateEvaluationsPageContent_Collection on EvaluationCollection {
    id
    evaluations {
      id
      wasPresent
      skillsRating
      behaviourRating
      notes
      ...UpdateEvaluationCard_Evaluation
    }
  }
`);

const UpdateEvaluationsPageContent_UpdateEvaluationsMutation = graphql(`
  mutation UpdateEvaluationsPageContent_UpdateEvaluations(
    $updateEvaluationsInput: [UpdateEvaluationInput!]!
    $collectionId: ID!
  ) {
    updateEvaluations(
      data: $updateEvaluationsInput
      collectionId: $collectionId
    )
  }
`);

type UpdateEvaluationsPageContentProps = BoxProps & {
  collection: FragmentType<
    typeof UpdateEvaluationsPageContent_CollectionFragment
  >;
};

export default function UpdateEvaluationsPageContent({
  collection: collectionFragment,
  ...rest
}: UpdateEvaluationsPageContentProps) {
  const router = useRouter();
  const toast = useToast();
  const collection = useFragment(
    UpdateEvaluationsPageContent_CollectionFragment,
    collectionFragment
  );

  const [evaluations, setEvaluations] = useState(() => [
    ...collection.evaluations.filter((e) => e.wasPresent),
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const onChanged = (evaluation: EvaluationFragment) => {
    const newEvaluations = evaluations.map((e) => {
      if (e.id === evaluation.id) {
        return evaluation;
      }
      return e;
    });
    setEvaluations(newEvaluations);
  };

  // Add evaluations and navigate to the collection page
  const createEvaluations = async () => {
    setIsCreating(true);
    try {
      await graphqlClient.request(
        UpdateEvaluationsPageContent_UpdateEvaluationsMutation,
        {
          updateEvaluationsInput: evaluations.map((evaluation) => ({
            id: evaluation.id,
            wasPresent: evaluation.wasPresent,
            skillsRating: evaluation.skillsRating,
            behaviourRating: evaluation.behaviourRating,
            notes: evaluation.notes,
          })),
          collectionId: collection.id,
        }
      );
      setIsCreating(false);
      router.push(`/`);
      toast({
        title: `Arviointi tehty onnistuneesti!`,
        status: "success",
        position: "top",
        description: (
          <Text>
            Siirry tarkastelemaan arviointia{" "}
            <NextLink
              textDecoration="underline"
              color="inherit"
              href={`/collection/${collection.id}`}
              onClick={() => {
                toast.closeAll();
              }}
            >
              tästä
            </NextLink>
          </Text>
        ),
        isClosable: true,
      });
    } catch (error: any) {
      setIsCreating(false);
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return (
    <Box
      height="calc(100vh - 58px)"
      p="4"
      scrollSnapType="y mandatory"
      overflowY="scroll"
      {...rest}
    >
      {evaluations.length > 0 ? (
        evaluations.map((evaluation, index) => (
          <UpdateEvaluationCard
            key={evaluation.id}
            scrollSnapAlign={
              index === evaluations.length - 1 ? "end" : "center"
            }
            scrollSnapStop="always"
            evaluation={evaluation}
            onChanged={onChanged}
          >
            {index === evaluations.length - 1 && (
              <Button
                isLoading={isCreating}
                onClick={createEvaluations}
                width="100%"
                mt="6"
              >
                Luo arvioinnit
              </Button>
            )}
          </UpdateEvaluationCard>
        ))
      ) : (
        <Box p="5">
          <Text as="h1">Arvioinnin muokkaus</Text>
          <Text>Ei arviointeja kokoelmassa</Text>
        </Box>
      )}
    </Box>
  );
}
