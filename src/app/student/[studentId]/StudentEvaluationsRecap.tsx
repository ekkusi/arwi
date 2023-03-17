import { Box, Text } from "@/components/chakra";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { evaluateStudent } from "@/utils/evaluationUtils";
import { BoxProps } from "@chakra-ui/react";

const StudentEvaluationRecap_EvaluationFragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Evaluation on Evaluation {
    id
    wasPresent
    behaviourRating
    skillsRating
  }
`);

type StudentEvaluationsRecapProps = BoxProps & {
  evaluations: FragmentType<typeof StudentEvaluationRecap_EvaluationFragment>[];
};

export default function StudentEvaluationsRecap({
  evaluations: evaluationFragments,
  ...rest
}: StudentEvaluationsRecapProps) {
  const evaluations = getFragmentData(
    StudentEvaluationRecap_EvaluationFragment,
    evaluationFragments
  );

  const {
    absencesAmount,
    presencesAmount,
    skillsAverage,
    skillsStdev,
    behaviourAverage,
    behaviourStdev,
  } = evaluateStudent([...evaluations]);

  const formatAmountString = (value: number) => {
    return value === 1 ? "kerta" : "kertaa";
  };

  return (
    <Box {...rest}>
      {evaluations.length > 0 ? (
        <>
          <Box>
            <Text fontWeight="bold" as="span">
              Arviointeja:{" "}
            </Text>
            <Text as="span">{evaluations.length}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" as="span">
              Paikalla:{" "}
            </Text>
            <Text as="span">
              {presencesAmount} {formatAmountString(presencesAmount)}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" as="span">
              Poissa:{" "}
            </Text>
            <Text as="span">
              {absencesAmount} {formatAmountString(absencesAmount)}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" as="span">
              Taitojen keskiarvo:{" "}
            </Text>
            <Text as="span">
              {skillsAverage.toFixed(2)} (keskihajonta: {skillsStdev.toFixed(2)}
              )
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" as="span">
              Työskentelyn keskiarvo:{" "}
            </Text>
            <Text as="span">
              {behaviourAverage.toFixed(2)} (keskihajonta:{" "}
              {behaviourStdev.toFixed(2)})
            </Text>
          </Box>
        </>
      ) : (
        <Text>Ei vielä arviointeja</Text>
      )}
    </Box>
  );
}
