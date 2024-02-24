import { useQuery } from "@apollo/client";
import { isClassParticipationEvaluation, isDefaultEvaluation } from "arwi-backend/src/types/typeGuards";
import { useTranslation } from "react-i18next";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import CText from "../../../components/primitives/CText";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { analyzeEvaluations } from "../../../helpers/evaluationUtils";
import CircledNumber from "../../../components/CircledNumber";

const FinalFeedbackItem_GetStudent_Query = graphql(`
  query FinalFeedbackItem_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      latestFeedback {
        id
        text
      }
      currentModuleEvaluations {
        id
        notes
        wasPresent
        __typename
        ... on ClassParticipationEvaluation {
          behaviourRating
          skillsRating
          collection {
            environment {
              code
              label {
                fi
              }
            }
          }
        }
        ... on DefaultEvaluation {
          rating
        }
        collection {
          id
          date
        }
      }
    }
  }
`);

export default function FinalFeedbackItem({ studentId }: { studentId: string }) {
  const { data, loading } = useQuery(FinalFeedbackItem_GetStudent_Query, { variables: { studentId } });
  const { t } = useTranslation();
  if (!data || loading) return <LoadingIndicator />;
  const student = data.getStudent;
  const evaluations = student.currentModuleEvaluations;

  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);

  const otherEvaluations = evaluations.filter<WithTypename<(typeof evaluations)[number], "DefaultEvaluation">>(isDefaultEvaluation);

  const {
    absencesAmount,
    presencesAmount,
    skillsAverage,
    skillsMedian,
    skillsMode,
    skillsMeanByEnvironments,
    behaviourAverage,
    behaviourMedian,
    behaviourMode,
    behaviourMeanByEnvironments,
  } = analyzeEvaluations([...classParticipationEvaluations]);

  return (
    <CView>
      <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "3xl" }}>
        <CView>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{student.name}</CText>
          <CText>
            <CText style={{ fontSize: "md", fontWeight: "500" }}>{presencesAmount} </CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("class-evaluation", "tuntiarviointia", { count: presencesAmount })}</CText>
          </CText>
          <CText>
            <CText style={{ fontSize: "md", fontWeight: "500" }}>{absencesAmount} </CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("absence", "poissaoloa", { count: absencesAmount })}</CText>
          </CText>
        </CView>
        <CircledNumber value={(skillsAverage + behaviourAverage) / 2} title="Arvosanaehdotus" />
      </CView>
      <CText>{student.latestFeedback?.text || "Ei sanallista palautetta."}</CText>
    </CView>
  );
}
