import { useTranslation } from "react-i18next";
import { FragmentType, getFragmentData, graphql } from "../gql";
import { formatAmountString } from "../helpers/dataMappers";
import { analyzeEvaluations } from "../helpers/evaluationUtils";
import Card from "./Card";
import EvaluationsLineChart from "./charts/EvaluationsLineChart";
import FlippingCard from "./FlippingCard";
import CText from "./primitives/CText";
import CView, { CViewProps } from "./primitives/CView";

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

type StudentEvaluationsRecapProps = CViewProps & {
  evaluations: FragmentType<typeof StudentEvaluationRecap_Evaluation_Fragment>[];
  student: FragmentType<typeof StudentEvaluationRecap_Student_Fragment>;
};

export default function StudentEvaluationsRecap({
  evaluations: evaluationFragments,
  student: studentFragment,
  ...rest
}: StudentEvaluationsRecapProps) {
  const { t } = useTranslation();
  const evaluations = getFragmentData(StudentEvaluationRecap_Evaluation_Fragment, evaluationFragments);
  const student = getFragmentData(StudentEvaluationRecap_Student_Fragment, studentFragment);

  const { absencesAmount, presencesAmount, skillsAverage, behaviourAverage, gradeSuggestion, isStellarCount } = analyzeEvaluations([...evaluations]);

  const starRowCount = Math.ceil(isStellarCount / 12);

  return (
    <FlippingCard
      style={{ padding: "lg" }}
      height={600}
      front={
        <>
          <EvaluationsLineChart evaluations={evaluations} style={{ marginBottom: "md" }} />
          <CView style={{ width: "100%", paddingHorizontal: "md" }}>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Paikalla: </CText>
              <CText>{presencesAmount}</CText>
            </CView>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Poissa: </CText>
              <CText>{absencesAmount}</CText>
            </CView>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Taitojen keskiarvo: </CText>
              <CText>
                {!Number.isNaN(skillsAverage)
                  ? `${skillsAverage.toFixed(2)}`
                  : t("components.StudentEvaluationsRecap.skillsNotEvaluated", "Taitoja ei vielä arvioitu")}
              </CText>
            </CView>
            <CView style={{ flexDirection: "row" }}>
              <CText style={{ fontWeight: "600" }}>Työskentelyn keskiarvo: </CText>
              <CText>
                {!Number.isNaN(behaviourAverage)
                  ? `${behaviourAverage.toFixed(2)}`
                  : t("components.StudentEvaluationsRecap", "Työskentelyä ei vielä arvioitu")}
              </CText>
            </CView>
          </CView>
          <CView style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <CText style={{ marginBottom: "sm" }}>Numeroehdotus:</CText>
            <CView style={{ borderWidth: 2, borderColor: "lightgray", borderRadius: 50, padding: "3xl", alignContent: "center" }}>
              <CView style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                <CText style={{ fontSize: "2xl" }}>{gradeSuggestion > 0 ? gradeSuggestion : "–"}</CText>
              </CView>
            </CView>
          </CView>
        </>
      }
      back={<CText style={{ fontSize: "largeTitle" }}>TerveTerve</CText>}
    />
  );
  // return (
  // <FlippingCard
  //   width="100%"
  //   height={650 + starRowCount * 25}
  //   front={
  //     <>
  //       <Text as="h1" textAlign="center" mb="-1">
  //         {student.name}
  //       </Text>
  //       <Text as="h2" fontSize="lg" textAlign="center" mb="2">
  //         {student.group.name}
  //       </Text>
  //       <>
  //         <Box>
  //           <EvaluationsLineChart studentId={student.id} evaluations={evaluations} overlayBgColor="white" />
  //         </Box>
  //         {isStellarCount > 0 && (
  //           <Flex justifyContent="center" mb="3" wrap="wrap">
  //             {[...Array(isStellarCount)].map((_, i) => (
  //               <Icon key={i} as={AiOutlineStar} color="yellow.400" w={6} h={6} />
  //             ))}
  //           </Flex>
  //         )}
  //         <Box>
  //           <Text fontWeight="bold" as="span">
  //             Paikalla:{" "}
  //           </Text>
  //           <Text as="span">
  //             {presencesAmount} {formatAmountString(presencesAmount)}
  //           </Text>
  //         </Box>
  //         <Box>
  //           <Text fontWeight="bold" as="span">
  //             Poissa:{" "}
  //           </Text>
  //           <Text as="span">
  //             {absencesAmount} {formatAmountString(absencesAmount)}
  //           </Text>
  //         </Box>
  //         <Box>
  //           <Text fontWeight="bold" as="span">
  //             Taitojen keskiarvo:{" "}
  //           </Text>
  //           <Text as="span">{!Number.isNaN(skillsAverage) ? `${skillsAverage.toFixed(2)}` : "Taitoja ei vielä arvioitu"}</Text>
  //         </Box>
  //         <Box>
  //           <Text fontWeight="bold" as="span">
  //             Työskentelyn keskiarvo:{" "}
  //           </Text>
  //           <Text as="span">{!Number.isNaN(behaviourAverage) ? `${behaviourAverage.toFixed(2)}` : "Työskentelyä ei vielä arvioitu"}</Text>
  //         </Box>
  //         <Flex alignItems="center" justifyContent="center" flexDirection="column" flex="1">
  //           <Text mb="1" as="span">
  //             Numeroehdotus:
  //           </Text>
  //           <Box position="relative" border="1px" boxShadow="md" borderColor="gray" borderRadius="full" p="10">
  //             <CenteredContainer as="span" fontSize="4xl" fontFamily="special" textAlign="center" lineHeight={1.0}>
  //               {gradeSuggestion > 0 ? gradeSuggestion : "–"}
  //             </CenteredContainer>
  //           </Box>
  //         </Flex>
  //       </>
  //     </>
  //   }
  //   back={<EvaluationsBarChart evaluations={evaluations} overlayBgColor="white" />}
  //   {...rest}
  // />
  // );
}
