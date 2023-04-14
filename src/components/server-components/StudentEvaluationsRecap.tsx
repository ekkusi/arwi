import { Box, Text, BoxProps, Flex } from "@chakra-ui/react";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { analyzeEvaluations } from "@/utils/evaluationUtils";
import EvaluationsChart from "../functional/EvaluationsChart";
import CenteredContainer from "./primitives/CenteredContainer";
import FlippingCard from "../general/FlippingCard";

const StudentEvaluationRecap_Evaluation_Fragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Evaluation on Evaluation {
    id
    wasPresent
    behaviourRating
    skillsRating
    ...EvaluationsChart_Evaluation
  }
`);

const StudentEvaluationRecap_Student_Fragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Student on Student {
    id
    name
  }
`);

type StudentEvaluationsRecapProps = BoxProps & {
  evaluations: FragmentType<
    typeof StudentEvaluationRecap_Evaluation_Fragment
  >[];
  student: FragmentType<typeof StudentEvaluationRecap_Student_Fragment>;
};

export default function StudentEvaluationsRecap({
  evaluations: evaluationFragments,
  student: studentFragment,
  ...rest
}: StudentEvaluationsRecapProps) {
  const evaluations = getFragmentData(
    StudentEvaluationRecap_Evaluation_Fragment,
    evaluationFragments
  );
  const student = getFragmentData(
    StudentEvaluationRecap_Student_Fragment,
    studentFragment
  );

  const {
    absencesAmount,
    presencesAmount,
    skillsAverage,
    skillsStdev,
    behaviourAverage,
    behaviourStdev,
    gradeSuggestion,
  } = analyzeEvaluations([...evaluations]);

  const formatAmountString = (value: number) => {
    return value === 1 ? "kerta" : "kertaa";
  };

  return (
    <FlippingCard
      width="100%"
      height={750}
      front={
        <>
          <Text as="h1" textAlign="center" mb="2">
            {student.name}
          </Text>
          {evaluations.length > 0 ? (
            <>
              <Box>
                <EvaluationsChart
                  studentId={student.id}
                  evaluations={evaluations}
                  mb="2"
                />
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
                  {!Number.isNaN(skillsAverage)
                    ? `${skillsAverage.toFixed(
                        2
                      )} (keskihajonta: ${skillsStdev.toFixed(2)})`
                    : "Taitoja ei vielä arvioitu"}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold" as="span">
                  Työskentelyn keskiarvo:{" "}
                </Text>
                <Text as="span">
                  {!Number.isNaN(behaviourAverage)
                    ? `${behaviourAverage.toFixed(
                        2
                      )} (keskihajonta: ${behaviourStdev.toFixed(2)})`
                    : "Työskentelyä ei vielä arvioitu"}
                </Text>
              </Box>
              {gradeSuggestion > 0 && (
                <Flex
                  mt="3"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  flex="1"
                >
                  <Text mb="1" as="span">
                    Numeroehdotus:
                  </Text>
                  <Box
                    position="relative"
                    border="1px"
                    boxShadow="md"
                    borderColor="gray"
                    borderRadius="full"
                    p="10"
                  >
                    <CenteredContainer
                      as="span"
                      fontFamily="heading"
                      fontSize="4xl"
                    >
                      {gradeSuggestion}
                    </CenteredContainer>
                  </Box>
                </Flex>
              )}
            </>
          ) : (
            <Text>Ei vielä arviointeja</Text>
          )}
        </>
      }
      back={<Text as="h1">Terve</Text>}
      {...rest}
    />
  );
}
