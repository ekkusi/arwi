import { Box, Text, BoxProps, Flex, Icon } from "@chakra-ui/react";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import { analyzeEvaluations } from "@/utils/evaluationUtils";
import { formatAmountString } from "@/utils/dataMappers";
import { AiOutlineStar } from "react-icons/ai";
import EvaluationsLineChart from "../functional/EvaluationsLineChart";
import CenteredContainer from "./primitives/CenteredContainer";
import FlippingCard from "../general/FlippingCard";
import EvaluationsBarChart from "../functional/EvaluationsBarChart";

const StudentEvaluationRecap_Evaluation_Fragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Evaluation on Evaluation {
    id
    wasPresent
    behaviourRating
    skillsRating
    isStellar
    ...EvaluationsLineChart_Evaluation
    ...EvaluationsBarChart_Evaluation
  }
`);

const StudentEvaluationRecap_Student_Fragment = graphql(/* GraphQL */ `
  fragment StudentEvaluationRecap_Student on Student {
    id
    name
    group {
      name
    }
  }
`);

type StudentEvaluationsRecapProps = BoxProps & {
  evaluations: FragmentType<typeof StudentEvaluationRecap_Evaluation_Fragment>[];
  student: FragmentType<typeof StudentEvaluationRecap_Student_Fragment>;
};

export default function StudentEvaluationsRecap({
  evaluations: evaluationFragments,
  student: studentFragment,
  ...rest
}: StudentEvaluationsRecapProps) {
  const evaluations = getFragmentData(StudentEvaluationRecap_Evaluation_Fragment, evaluationFragments);
  const student = getFragmentData(StudentEvaluationRecap_Student_Fragment, studentFragment);

  const { absencesAmount, presencesAmount, skillsAverage, behaviourAverage, gradeSuggestion, isStellarCount } = analyzeEvaluations([...evaluations]);

  const starRowCount = Math.ceil(isStellarCount / 12);

  return (
    <FlippingCard
      width="100%"
      height={650 + starRowCount * 25}
      front={
        <>
          <Text as="h1" textAlign="center" mb="-1">
            {student.name}
          </Text>
          <Text as="h2" fontSize="lg" textAlign="center" mb="2">
            {student.group.name}
          </Text>
          <>
            <Box>
              <EvaluationsLineChart studentId={student.id} evaluations={evaluations} overlayBgColor="white" />
            </Box>
            {isStellarCount > 0 && (
              <Flex justifyContent="center" mb="3" wrap="wrap">
                {[...Array(isStellarCount)].map((_, i) => (
                  <Icon key={i} as={AiOutlineStar} color="yellow.400" w={6} h={6} />
                ))}
              </Flex>
            )}
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
              <Text as="span">{!Number.isNaN(skillsAverage) ? `${skillsAverage.toFixed(2)}` : "Taitoja ei vielä arvioitu"}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" as="span">
                Työskentelyn keskiarvo:{" "}
              </Text>
              <Text as="span">{!Number.isNaN(behaviourAverage) ? `${behaviourAverage.toFixed(2)}` : "Työskentelyä ei vielä arvioitu"}</Text>
            </Box>
            <Flex alignItems="center" justifyContent="center" flexDirection="column" flex="1">
              <Text mb="1" as="span">
                Numeroehdotus:
              </Text>
              <Box position="relative" border="1px" boxShadow="md" borderColor="gray" borderRadius="full" p="10">
                <CenteredContainer as="span" fontSize="4xl" fontFamily="special" textAlign="center" lineHeight={1.0}>
                  {gradeSuggestion > 0 ? gradeSuggestion : "–"}
                </CenteredContainer>
              </Box>
            </Flex>
          </>
        </>
      }
      back={<EvaluationsBarChart evaluations={evaluations} overlayBgColor="white" />}
      {...rest}
    />
  );
}
