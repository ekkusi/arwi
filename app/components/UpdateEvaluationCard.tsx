import { useCallback, useEffect, useMemo, useState } from "react";
import ParticipationToggle from "./ParticipationToggle";
import {
  CreateEvaluationInput,
  UpdateEvaluationCard_EvaluationFragment as EvaluationFragment,
  UpdateEvaluationCard_StudentFragment as StudentFragment,
} from "../gql/graphql";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { CardProps } from "./Card";

export const UpdateEvaluationCard_EvaluationFragment = graphql(`
  fragment UpdateEvaluationCard_Evaluation on Evaluation {
    id
    skillsRating
    behaviourRating
    notes
    wasPresent
    isStellar
    student {
      id
      name
      currentClassEvaluations {
        notes
      }
    }
  }
`);

export const UpdateEvaluationCard_StudentFragment = graphql(`
  fragment UpdateEvaluationCard_Student on Student {
    id
    name
    currentClassEvaluations {
      notes
    }
  }
`);

export type Evaluation = Omit<CreateEvaluationInput, "studentId"> & {
  student: FragmentType<typeof UpdateEvaluationCard_StudentFragment>;
};

export type EvaluationUnFragmented = Omit<Evaluation, "student"> & {
  student: StudentFragment;
};

type UpdateEvaluationCardProps = CardProps & {
  hasParticipationToggle?: boolean;
} & (
    | {
        evaluation: FragmentType<typeof UpdateEvaluationCard_EvaluationFragment>;
        onChanged?: (evaluation: EvaluationFragment) => void;
      }
    | {
        evaluation: Evaluation;
        onChanged?: (evaluation: EvaluationUnFragmented) => void;
      }
  );

type EvaluationPropKeys = "skillsRating" | "behaviourRating" | "notes" | "wasPresent" | "isStellar";

export function isEvaluationFragment(
  value: FragmentType<typeof UpdateEvaluationCard_EvaluationFragment> | Evaluation
): value is FragmentType<typeof UpdateEvaluationCard_EvaluationFragment> {
  console.log((value as Evaluation).wasPresent === undefined);

  return (value as Evaluation).wasPresent === undefined;
}

export default function UpdateEvaluationCard({
  children,
  evaluation: evaluationData,
  onChanged: onChangedCallback,
  hasParticipationToggle = true,
  ...rest
}: UpdateEvaluationCardProps) {
  const initialEvaluation = isEvaluationFragment(evaluationData)
    ? getFragmentData(UpdateEvaluationCard_EvaluationFragment, evaluationData)
    : {
        ...evaluationData,
        student: getFragmentData(UpdateEvaluationCard_StudentFragment, evaluationData.student),
      };
  // const [evaluation, setEvaluation] = useState(() => initialEvaluation);
  // const [notes, setNotes] = useState(() => evaluation.notes || "");

  // useEffect(() => {
  //   setNotes(initialEvaluation.notes || "");
  //   setEvaluation(initialEvaluation);
  // }, [initialEvaluation]);

  // const onChanged = useCallback(
  //   (key: EvaluationPropKeys, value: any) => {
  //     const newEvaluation = {
  //       ...evaluation,
  //       [key]: value,
  //     };
  //     setEvaluation(newEvaluation);

  //     if (onChangedCallback) {
  //       onChangedCallback(newEvaluation);
  //     }
  //   },
  //   [evaluation, onChangedCallback]
  // );

  // const debouncedOnChanged = useMemo(() => debounce(onChanged, 300), [onChanged]);

  // const changeNotes = (value: string) => {
  //   setNotes(value);

  //   debouncedOnChanged("notes", value);
  // };

  // const givenNotesCount = useMemo(() => {
  //   return evaluation.student.currentclassevaluations.filter((it) => !!it.notes).length;
  // }, [evaluation]);

  return null;

  // return (
  //   <Card mb="3" {...rest}>
  //     <Tag as="h2" size="lg" mx="auto" display="block" textAlign="center" mb="4" position="relative">
  //       {evaluation.student.name}
  //       <IconButton
  //         position="absolute"
  //         top="50%"
  //         transform="translateY(-50%)"
  //         right="3"
  //         variant="ghost"
  //         colorScheme="yellow"
  //         size="lg"
  //         icon={evaluation.isStellar ? <AiFillStar /> : <AiOutlineStar />}
  //         onClick={() => onChanged("isStellar", !evaluation.isStellar)}
  //         aria-label="Merkkaa arviointi tähtiarvioinniksi"
  //       />
  //     </Tag>
  //     {hasParticipationToggle && (
  //       <Flex justifyContent="center" mb="3">
  //         <ParticipationToggle size="sm" initialValue={evaluation.wasPresent} onChange={(value) => onChanged("wasPresent", value)} />
  //       </Flex>
  //     )}
  //     <Box position="relative">
  //       <Text as="h3">Taidot:</Text>
  //       <RatingSelector initialRating={evaluation.skillsRating} onChange={(rating) => onChanged("skillsRating", rating)} mb="6" />
  //       <Text as="h3">Työskentely:</Text>
  //       <RatingSelector initialRating={evaluation.behaviourRating} onChange={(rating) => onChanged("behaviourRating", rating)} mb="6" />
  //       <Text as="h3">
  //         Sanallinen palaute (annettu {givenNotesCount} {formatAmountString(givenNotesCount)}):
  //       </Text>
  //       <Box position="relative">
  //         <Textarea
  //           value={notes}
  //           onChange={(e) => changeNotes(e.target.value)}
  //           colorScheme="green"
  //           minHeight="32"
  //           placeholder="Sanallinen palaute oppilaan toiminnasta tunnilla..."
  //           position="relative"
  //         />
  //         <SpeechRecognition position="absolute" bottom="1" right="1" aria-label="Puhu tekstiksi" onResult={changeNotes} />
  //       </Box>
  //       {children}
  //       {!evaluation.wasPresent && hasParticipationToggle && (
  //         <Overlay bgColor="white" display="flex" alignItems="center" justifyContent="center">
  //           <Text color="black" fontWeight="bold" textAlign="center" mx="3">
  //             Merkkaa henkilö paikalla olleeksi muokataksesi arviointia
  //           </Text>
  //         </Overlay>
  //       )}
  //     </Box>
  //   </Card>
  // );
}
