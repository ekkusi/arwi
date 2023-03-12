"use client";

import BorderedCard from "@/app/(server-components)/primitives/BorderedCard";
import { Box, Button, Tag, Text, Textarea } from "@/components/chakra";
import { FragmentType, graphql, useFragment } from "@/gql";
import {
  UpdateEvaluationsPageContent_CollectionFragment as CollectionFragmentType,
  Rating,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { getErrorMessage } from "@/utils/errorUtils";
import { BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import RatingSelector from "./RatingSelector";

const UpdateEvaluationsPageContent_CollectionFragment = graphql(`
  fragment UpdateEvaluationsPageContent_Collection on EvaluationCollection {
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

type Evaluation = CollectionFragmentType["evaluations"][number];

export default function UpdateEvaluationsPageContent({
  collection: collectionFragment,
  ...rest
}: UpdateEvaluationsPageContentProps) {
  const router = useRouter();
  const collection = useFragment(
    UpdateEvaluationsPageContent_CollectionFragment,
    collectionFragment
  );
  // const scrollRef = useRef(null);
  // useScrollSnap({ ref: scrollRef, duration: 0, delay: 0 });

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
      router.push(`/collection/${collection.id}`);
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
    <Box
      height="calc(100vh - 58px)"
      p="4"
      scrollSnapType="y mandatory"
      overflowY="scroll"
      {...rest}
    >
      {evaluations.map((evaluation, index) => (
        <BorderedCard
          key={evaluation.student.id}
          scrollSnapAlign={index === evaluations.length - 1 ? "end" : "center"}
          scrollSnapStop="always"
          width="100%"
          mb="3"
        >
          <Tag
            as="h2"
            size="lg"
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
        </BorderedCard>
      ))}
    </Box>
  );
}
