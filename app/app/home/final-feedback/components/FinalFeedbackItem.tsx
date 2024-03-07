import { isClassParticipationEvaluation } from "arwi-backend/src/types/typeGuards";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Sentry from "@sentry/react-native";
import { useMutation } from "@apollo/client";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import CText from "@/components/primitives/CText";
import { analyzeEvaluations } from "@/helpers/evaluationUtils";
import CircledNumber from "@/components/ui/CircledNumber";
import CView, { CViewProps } from "@/components/primitives/CView";
import ModalTextInput from "@/components/form/ModalTextInput";
import { useModal } from "@/hooks-and-providers/ModalProvider";
import SaveAndCancelButtons from "@/components/ui/SaveAndCancelButtons";
import CButton from "@/components/primitives/CButton";
import { useToast } from "@/hooks-and-providers/ToastProvider";
import { FeedbackCacheUpdate_Fragment } from "@/helpers/graphql/fragments";

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

export const FinalFeedbackItem_GenerateStudentFeedback_Mutation = graphql(
  `
    mutation FinalFeedbackItem_GenerateStudentFeedback($studentId: ID!, $moduleId: ID!) {
      generateStudentFeedback(studentId: $studentId, moduleId: $moduleId) {
        feedback {
          ...FeedbackCacheUpdate
        }
        usageData {
          id
          warning {
            warning
            threshhold
          }
        }
      }
    }
  `,
  [FeedbackCacheUpdate_Fragment]
);

const FinalFeedbackItem_UpdateFeedback_Mutation = graphql(
  `
    mutation FinalFeedbackItem_UpdateFeedback($feedbackId: ID!, $text: String!) {
      updateFeedback(feedbackId: $feedbackId, text: $text) {
        ...FeedbackCacheUpdate
      }
    }
  `,
  [FeedbackCacheUpdate_Fragment]
);

export type FinalFeedbackItemProps = Omit<CViewProps, "children"> & {
  student: FragmentOf<typeof FinalFeedbackItem_Student_Fragment>;
  moduleId: string;
};

export default function FinalFeedbackItem({ student: studentFragment, moduleId, ...rest }: FinalFeedbackItemProps) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();

  const student = readFragment(FinalFeedbackItem_Student_Fragment, studentFragment);
  const evaluations = student.currentModuleEvaluations;

  const [generateStudentFeedback, { loading: generatingFeedback }] = useMutation(FinalFeedbackItem_GenerateStudentFeedback_Mutation, {
    variables: {
      studentId: student.id,
      moduleId,
    },
    onError: (error) => {
      Sentry.captureException(error);
      openToast(
        t("feedback-generation-failed-message", "Palautteen generointi oppilaalle {{studentName}} epäonnistui.", { studentName: student.name }),
        {
          type: "error",
        }
      );
    },
    onCompleted: () => {
      openToast(t("feedback-generated-success-message", "Uusi palaute generoitu oppilaalle {{studentName}}.", { studentName: student.name }));
    },
  });

  const [updateFeedback, { loading: updatingFeedback }] = useMutation(FinalFeedbackItem_UpdateFeedback_Mutation, {
    onError: (error) => {
      Sentry.captureException(error);
      openToast(
        t(
          "update-feedback-failed-message",
          "Jokin meni vikaan oppilaan {{studentName}} palautteen muokkauksessa. Voi olla, että tekemäsi muutokset eivät ole tallentuneet.",
          { studentName: student.name }
        ),
        {
          type: "error",
        }
      );
    },
  });

  const editFeedback = (newText: string) => {
    if (student.latestFeedback) {
      updateFeedback({
        variables: {
          feedbackId: student.latestFeedback.id,
          text: newText,
        },
      });
    }
  };

  const openRegenerateFeedbackModal = () => {
    openModal({
      title: t("regenerate-feedback-title", "Generoi uusi palaute"),
      children: (
        <>
          <CText>{t("regenerate-feedback-confirmation-description", "Haluatko varmasti generoida uuden palautteen oppilaalle?")}</CText>
          <SaveAndCancelButtons
            onSave={() => {
              generateStudentFeedback();
              closeModal();
            }}
            onCancel={closeModal}
            saveTitle={t("regenerate-feedback", "Generoi palaute")}
            style={{ marginTop: "lg" }}
          />
        </>
      ),
    });
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
      <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "md", marginTop: "lg" }}>
        <CText style={{ fontWeight: "500" }}>{t("oral-feedback", "Sanallinen palaute")}</CText>
        <CButton variant="empty" onPress={openRegenerateFeedbackModal}>
          <Ionicons name="reload" size={24} />
        </CButton>
      </CView>
      {student.latestFeedback ? (
        <ModalTextInput
          initialValue={student.latestFeedback?.text.toString()}
          onSave={(text) => editFeedback(text)}
          isLoading={generatingFeedback}
          isDisabled={updatingFeedback}
          containerStyle={{ marginTop: "xl" }}
          placeholder="Ei sanallista palautetta generoitu"
          innerInputProps={{
            growWithContent: true,
            style: { flex: 1 },
          }}
        />
      ) : (
        <CText>{t("no-oral-feedback-generated-for-student", "Oppilaalle ei ole generoitu sanallista palautetta")}</CText>
      )}
    </CView>
  );
}
