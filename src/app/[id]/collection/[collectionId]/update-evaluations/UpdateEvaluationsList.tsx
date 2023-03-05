"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Box, Button, Tag, Text, Textarea } from "@/components/chakra";
import { FragmentType, graphql, useFragment } from "@/gql";
import {
  UpdateEvaluationsList_CollectionFragment as CollectionFragmentType,
  Rating,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getErrorMessage } from "@/utils/errorUtils";
import { BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSessionClient } from "@/utils/session/client";
import LinkToHome from "@/components/LinkToHome";
import RatingSelector from "./RatingSelector";

const UpdateEvaluationsList_CollectionFragment = graphql(`
  fragment UpdateEvaluationsList_Collection on EvaluationCollection {
    id
    evaluations {
      id
      wasPresent
      skillsRating
      behaviourRating
      notes
      student {
        id
        name
      }
    }
  }
`);

const UpdateEvaluationsList_UpdateEvaluationsMutation = graphql(`
  mutation UpdateEvaluationsList_UpdateEvaluations(
    $updateEvaluationsInput: [UpdateEvaluationInput!]!
    $collectionId: ID!
  ) {
    updateEvaluations(
      data: $updateEvaluationsInput
      collectionId: $collectionId
    )
  }
`);

type UpdateEvaluationsListProps = BoxProps & {
  collection: FragmentType<typeof UpdateEvaluationsList_CollectionFragment>;
};

type Evaluation = CollectionFragmentType["evaluations"][number];

export default function UpdateEvaluationsList({
  collection: collectionFragment,
  ...rest
}: UpdateEvaluationsListProps) {
  const router = useRouter();
  const collection = useFragment(
    UpdateEvaluationsList_CollectionFragment,
    collectionFragment
  );
  const [evaluations, setEvaluations] = useState([
    ...collection.evaluations.filter((e) => e.wasPresent),
  ]);
  const [isCreating, setIsCreating] = useState(false);

  // Copy old array of evaluations, change skillsRating of the one that was clicked and set the new array as the state
  const changeSkillsRating = (evaluation: Evaluation, value: Rating) => {
    const newEvaluations = evaluations.map((e) => {
      if (e.student.id === evaluation.student.id) {
        return { ...e, skillsRating: value };
      }
      return e;
    });
    setEvaluations(newEvaluations);
  };

  const changeBehaviourRating = (evaluation: Evaluation, value: Rating) => {
    const newEvaluations = evaluations.map((e) => {
      if (e.student.id === evaluation.student.id) {
        return { ...e, behaviourRating: value };
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
        UpdateEvaluationsList_UpdateEvaluationsMutation,
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
      const session = await getSessionClient();
      router.push(`${session.user.id}/collection/${collection.id}`);
    } catch (error: any) {
      setIsCreating(false);
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  const changeNotes = useCallback(
    (evaluation: Evaluation, value: string) => {
      const newEvaluations = evaluations.map((e) => {
        if (e.student.id === evaluation.student.id) {
          return { ...e, notes: value.length > 0 ? value : null };
        }
        return e;
      });
      setEvaluations(newEvaluations);
    },
    [evaluations]
  );

  // Debounce changeNotes function to prevent preformance issues
  const debouncedChangeNotes = useMemo(
    () => debounce(changeNotes, 300),
    [changeNotes]
  );

  // Cancel debounced function on unmount to prevent event being fired after component is no more
  useEffect(() => {
    return () => {
      debouncedChangeNotes.cancel();
    };
  });

  return (
    <Box {...rest}>
      {evaluations.map((evaluation) => (
        <BorderedCard key={evaluation.student.id} width="100%" mb="3">
          <Tag
            as="h2"
            size="lg"
            colorScheme="gray"
            variant="outline"
            mx="auto"
            display="block"
            textAlign="center"
            mb="6"
          >
            {evaluation.student.name}
          </Tag>
          <Text as="h3">Taidot:</Text>
          <RatingSelector
            initialRating={evaluation.skillsRating}
            onChange={(rating) => changeSkillsRating(evaluation, rating)}
            mb="8"
          />
          <Text as="h3">Työskentely:</Text>
          <RatingSelector
            initialRating={evaluation.skillsRating}
            onChange={(rating) => changeBehaviourRating(evaluation, rating)}
            mb="8"
          />
          <Text as="h3">Muita huomioita:</Text>
          <Textarea
            onChange={(e) => debouncedChangeNotes(evaluation, e.target.value)}
            colorScheme="green"
            minHeight="32"
            placeholder="Muita huomioita oppilaan toiminnasta tunnilla..."
          />
        </BorderedCard>
      ))}
      <Button
        isLoading={isCreating}
        onClick={createEvaluations}
        width="100%"
        mt="3"
      >
        Luo arvioinnit
      </Button>
      <LinkToHome
        color="gray.700"
        display="block"
        mt="3"
        textTransform="uppercase"
        textAlign="center"
      >
        Peruuta
      </LinkToHome>
    </Box>
  );
}
