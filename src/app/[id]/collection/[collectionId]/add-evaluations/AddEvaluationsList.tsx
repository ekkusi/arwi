"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Box, Button, SimpleGrid, Text } from "@/components/chakra";
import { FragmentType, graphql, useFragment } from "@/gql";
import {
  AddEvaluationsList_CollectionFragment as CollectionFragmentType,
  Rating,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getErrorMessage } from "@/utils/errorUtils";
import { BoxProps } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RatingButton from "@/app/(server-components)/RatingButton";

const AddEvaluationsList_CollectionFragment = graphql(`
  fragment AddEvaluationsList_Collection on EvaluationCollection {
    id
    evaluations {
      id
      wasPresent
      skillsRating
      behaviourRating
      student {
        id
        name
      }
    }
  }
`);

const AddEvaluationsList_AddEvaluationsMutation = graphql(`
  mutation AddEvaluationsList_AddEvaluations(
    $addEvaluationsInput: [UpdateEvaluationInput!]!
    $collectionId: ID!
  ) {
    updateEvaluations(data: $addEvaluationsInput, collectionId: $collectionId)
  }
`);

type AddEvaluationsListProps = BoxProps & {
  collection: FragmentType<typeof AddEvaluationsList_CollectionFragment>;
};

type Evaluation = CollectionFragmentType["evaluations"][number];

export default function AddEvaluationsList({
  collection: collectionFragment,
  ...rest
}: AddEvaluationsListProps) {
  const { data } = useSession();
  const router = useRouter();
  const collection = useFragment(
    AddEvaluationsList_CollectionFragment,
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
    if (!data) throw new Error("Unexpected error, no session found");
    setIsCreating(true);
    try {
      await graphqlClient.request(AddEvaluationsList_AddEvaluationsMutation, {
        addEvaluationsInput: evaluations.map((evaluation) => ({
          id: evaluation.id,
          wasPresent: evaluation.wasPresent,
          skillsRating: evaluation.skillsRating,
          behaviourRating: evaluation.behaviourRating,
        })),
        collectionId: collection.id,
      });
      setIsCreating(false);
      router.push(`${data.user.id}/collection/${collection.id}`);
    } catch (error: any) {
      setIsCreating(false);
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return (
    <Box {...rest}>
      {evaluations.map((evaluation) => (
        <BorderedCard key={evaluation.student.id} width="100%" mb="3">
          <Text as="h2" textAlign="center">
            {evaluation.student.name}
          </Text>
          <Text as="h3">Taidot:</Text>
          <SimpleGrid columns={2} spacing={5} mb="3">
            <RatingButton
              rating={Rating.Poor}
              isSelected={evaluation.skillsRating === Rating.Poor}
              onClick={() => changeSkillsRating(evaluation, Rating.Poor)}
            />
            <RatingButton
              rating={Rating.Fair}
              isSelected={evaluation.skillsRating === Rating.Fair}
              onClick={() => changeSkillsRating(evaluation, Rating.Fair)}
            />
            <RatingButton
              rating={Rating.Good}
              isSelected={evaluation.skillsRating === Rating.Good}
              onClick={() => changeSkillsRating(evaluation, Rating.Good)}
            />
            <RatingButton
              rating={Rating.Excellent}
              isSelected={evaluation.skillsRating === Rating.Excellent}
              onClick={() => changeSkillsRating(evaluation, Rating.Excellent)}
            />
          </SimpleGrid>
          <Text as="h3">Käyttäytyminen:</Text>
          <SimpleGrid columns={2} spacing={5}>
            <RatingButton
              rating={Rating.Poor}
              isSelected={evaluation.behaviourRating === Rating.Poor}
              onClick={() => changeBehaviourRating(evaluation, Rating.Poor)}
            />
            <RatingButton
              rating={Rating.Fair}
              isSelected={evaluation.behaviourRating === Rating.Fair}
              onClick={() => changeBehaviourRating(evaluation, Rating.Fair)}
            />
            <RatingButton
              rating={Rating.Good}
              isSelected={evaluation.behaviourRating === Rating.Good}
              onClick={() => changeBehaviourRating(evaluation, Rating.Good)}
            />
            <RatingButton
              rating={Rating.Excellent}
              isSelected={evaluation.behaviourRating === Rating.Excellent}
              onClick={() =>
                changeBehaviourRating(evaluation, Rating.Excellent)
              }
            />
          </SimpleGrid>
        </BorderedCard>
      ))}
      <Button
        isDisabled={!data}
        isLoading={isCreating}
        onClick={createEvaluations}
        width="100%"
        mt="3"
      >
        Luo arvioinnit
      </Button>
    </Box>
  );
}
