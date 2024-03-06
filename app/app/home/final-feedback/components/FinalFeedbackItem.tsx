import { isClassParticipationEvaluation } from "arwi-backend/src/types/typeGuards";
import { useTranslation } from "react-i18next";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import CText from "@/components/primitives/CText";
import { analyzeEvaluations } from "@/helpers/evaluationUtils";
import CircledNumber from "@/components/ui/CircledNumber";
import CView, { CViewProps } from "@/components/primitives/CView";
import ModalTextInput from "@/components/form/ModalTextInput";

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

export type FinalFeedbackItemProps = Omit<CViewProps, "children"> & {
  student: FragmentOf<typeof FinalFeedbackItem_Student_Fragment>;
};

export default function FinalFeedbackItem({ student: studentFragment, ...rest }: FinalFeedbackItemProps) {
  const { t } = useTranslation();
  const student = readFragment(FinalFeedbackItem_Student_Fragment, studentFragment);
  const evaluations = student.currentModuleEvaluations;

  const editFeedback = (newText: string) => {
    console.log("edit feedback for student", student.name, "with text", newText);
  };

  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);

  const { absencesAmount, presencesAmount, skillsAverage, behaviourAverage } = analyzeEvaluations([...classParticipationEvaluations]);

  return (
    <CView {...rest}>
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
        <CircledNumber value={(skillsAverage + behaviourAverage) / 2} title={t("grade-suggestion", "Arvosanaehdotus")} />
      </CView>
      <CText style={{ fontWeight: "500" }}>{t("oral-feedback", "Sanallinen palaute")}</CText>
      {student.latestFeedback ? (
        <ModalTextInput
          initialText={student.latestFeedback?.text}
          onSave={(text) => {
            editFeedback(text);
          }}
          containerStyle={{ marginTop: "xl" }}
        />
      ) : (
        <CText>{t("no-oral-feedback-generated-for-student", "Oppilaalle ei ole generoitu sanallista palautetta")}</CText>
      )}
    </CView>
  );
}
