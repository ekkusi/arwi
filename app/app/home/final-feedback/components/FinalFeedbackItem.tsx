import { isClassParticipationEvaluation } from "arwi-backend/src/types/typeGuards";
import { useTranslation } from "react-i18next";
import CView from "../../../../components/primitives/CView";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import CText from "../../../../components/primitives/CText";
import { analyzeEvaluations } from "../../../../helpers/evaluationUtils";
import CircledNumber from "../../../../components/ui/CircledNumber";

export const FinalFeedbackItem_Student_Fragment = graphql(`
  fragment FinalFeedbackItem_Student on Student {
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
`);

export default function FinalFeedbackItem({ student: studentFragment }: { student: FragmentOf<typeof FinalFeedbackItem_Student_Fragment> }) {
  const { t } = useTranslation();
  const student = readFragment(FinalFeedbackItem_Student_Fragment, studentFragment);
  const evaluations = student.currentModuleEvaluations;

  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);

  const { absencesAmount, presencesAmount, skillsAverage, behaviourAverage } = analyzeEvaluations([...classParticipationEvaluations]);

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
