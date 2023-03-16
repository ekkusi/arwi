"use client";

import BorderedCard, {
  BorderedCardProps,
} from "@/app/(server-components)/primitives/BorderedCard";
import { Box, Tag, Text, Textarea } from "@/components/chakra";
import debounce from "lodash.debounce";
import { useCallback, useMemo, useState } from "react";
import SpeechRecognition from "@/components/functional/SpeechRecognition";
import { FragmentType, graphql, useFragment } from "@/gql";
import { UpdateEvaluationCard_EvaluationFragment as EvaluationFragment } from "@/gql/graphql";
import RatingSelector from "./RatingSelector";

const UpdateEvaluationCard_EvaluationFragment = graphql(`
  fragment UpdateEvaluationCard_Evaluation on Evaluation {
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
`);

type UpdateEvaluationCardProps = BorderedCardProps & {
  evaluation: FragmentType<typeof UpdateEvaluationCard_EvaluationFragment>;
  onChanged?: (evaluation: EvaluationFragment) => void;
};

export default function UpdateEvaluationCard({
  children,
  evaluation: evaluationFragment,
  onChanged: onChangedCallback,
  ...rest
}: UpdateEvaluationCardProps) {
  const initialEvaluation = useFragment(
    UpdateEvaluationCard_EvaluationFragment,
    evaluationFragment
  );
  const [evaluation, setEvaluation] = useState(() => initialEvaluation);
  const [notes, setNotes] = useState(() => evaluation.notes || "");

  const onChanged = useCallback(
    (key: "skillsRating" | "behaviourRating" | "notes", value: any) => {
      const newEvaluation = {
        ...evaluation,
      };
      newEvaluation[key] = value;
      setEvaluation(evaluation);
      if (onChangedCallback) {
        onChangedCallback(newEvaluation);
      }
    },
    [evaluation, onChangedCallback]
  );

  const debouncedOnChanged = useMemo(
    () => debounce(onChanged, 300),
    [onChanged]
  );

  const changeNotes = (value: string) => {
    setNotes(value);
    debouncedOnChanged("notes", value);
  };

  return (
    <BorderedCard width="100%" mb="3" {...rest}>
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
        onChange={(rating) => onChanged("skillsRating", rating)}
        mb="8"
      />
      <Text as="h3">Työskentely:</Text>
      <RatingSelector
        initialRating={evaluation.behaviourRating}
        onChange={(rating) => onChanged("behaviourRating", rating)}
        mb="8"
      />
      <Text as="h3">Muita huomioita:</Text>
      <Box position="relative">
        <Textarea
          value={notes}
          onChange={(e) => changeNotes(e.target.value)}
          colorScheme="green"
          minHeight="32"
          placeholder="Muita huomioita oppilaan toiminnasta tunnilla..."
          position="relative"
        />
        <SpeechRecognition
          position="absolute"
          zIndex="100"
          bottom="1"
          right="1"
          aria-label="Puhu tekstiksi"
          onResult={(result) => changeNotes(result)}
        />
      </Box>
      {children}
    </BorderedCard>
  );
}
