import { isClassParticipationEvaluation, isDefaultEvaluation } from "arwi-backend/src/types/typeGuards";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Sentry from "@sentry/react-native";
import { useMutation } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { analyzeEvaluations } from "arwi-shared";
import { FragmentOf, graphql, readFragment } from "@/graphql";
import CText from "@/components/primitives/CText";
import CView, { CViewProps } from "@/components/primitives/CView";
import ModalTextInput from "@/components/form/ModalTextInput";
import { useModal } from "@/hooks-and-providers/ModalProvider";
import SaveAndCancelButtons from "@/components/ui/SaveAndCancelButtons";
import CButton from "@/components/primitives/CButton";
import { useToast } from "@/hooks-and-providers/ToastProvider";
import { FeedbackCacheUpdate_Fragment } from "@/helpers/graphql/fragments";
import GradeSuggestionView, {
  GradeSuggestionView_CollectionType_Fragment,
  GradeSuggestionView_DefaultEvaluation_Fragment,
} from "../../../student/components/GradeSuggestionView";
import { HomeStackParams } from "../../../types";
import { useMetadata } from "@/hooks-and-providers/MetadataProvider";
import { useHandleOpenAIError } from "@/hooks-and-providers/openAI";
import { useToggleTokenUseWarning } from "@/hooks-and-providers/monthlyTokenUseWarning";

export const FinalFeedbackItem_Student_Fragment = graphql(
  `
    fragment FinalFeedbackItem_Student on Student {
      id
      name
      latestFeedback {
        id
        text
      }
      group {
        id
        subject {
          code
        }
        currentModule {
          id
          collectionTypes {
            ...GradeSuggestionView_CollectionType
          }
        }
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
          ...GradeSuggestionView_DefaultEvaluation
        }
      }
    }
  `,
  [GradeSuggestionView_CollectionType_Fragment, GradeSuggestionView_DefaultEvaluation_Fragment]
);

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
  navigation: NativeStackNavigationProp<HomeStackParams, "final-feedback-results">;
  student: FragmentOf<typeof FinalFeedbackItem_Student_Fragment>;
  moduleId: string;
  generatingFeedback?: boolean;
};

export default function FinalFeedbackItem({ student: studentFragment, moduleId, navigation, ...rest }: FinalFeedbackItemProps) {
  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();
  const { openToast } = useToast();
  const handleError = useHandleOpenAIError();
  const toggleTokenUseWarning = useToggleTokenUseWarning();

  const { minimumEvalsForFeedback } = useMetadata();

  const student = readFragment(FinalFeedbackItem_Student_Fragment, studentFragment);
  const evaluations = student.currentModuleEvaluations;

  const [generateStudentFeedback, { loading: _generatingFeedback }] = useMutation(FinalFeedbackItem_GenerateStudentFeedback_Mutation, {
    variables: {
      studentId: student.id,
      moduleId,
    },
    onError: (err) => handleError(err),
    onCompleted: (res) => {
      const warning = res.generateStudentFeedback?.usageData.warning;
      if (warning) toggleTokenUseWarning(warning);
      openToast(t("student-feedback-generated-success-message", "Uusi palaute luotu oppilaalle {{studentName}}.", { studentName: student.name }));
    },
  });

  const generatingFeedback = rest.generatingFeedback || _generatingFeedback;

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
      title: t("regenerate-feedback-title", "Luo uusi palaute"),
      children: (
        <>
          <CText>{t("regenerate-feedback-confirmation-description", "Haluatko varmasti luoda uuden palautteen oppilaalle?")}</CText>
          <SaveAndCancelButtons
            onSave={() => {
              generateStudentFeedback();
              closeModal();
            }}
            onCancel={closeModal}
            saveTitle={t("generate-feedback", "Luo palaute")}
            style={{ marginTop: "lg" }}
          />
        </>
      ),
    });
  };

  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);

  const defaultTypeEvaluations = evaluations.filter<WithTypename<(typeof evaluations)[number], "DefaultEvaluation">>(isDefaultEvaluation);

  const { absencesAmount, presencesAmount, skillsMean, behaviourMean } = analyzeEvaluations([...classParticipationEvaluations]);

  const canGenerateFeedback = student.currentModuleEvaluations.filter((ev) => ev.wasPresent).length >= minimumEvalsForFeedback;

  const noFeedbackContent = useMemo(() => {
    return canGenerateFeedback ? (
      <>
        <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
          {t(
            "no-oral-feedback-generated-but-available",
            "Oppilaalle ei ole luotu sanallista palautetta, mutta sen luominen on mahdollista. Luo sanallinen palaute alta."
          )}
        </CText>
        <CView style={{ alignItems: "center" }}>
          <CButton title={t("generate-feedback", "Luo palaute")} loading={generatingFeedback} onPress={() => generateStudentFeedback()} />
        </CView>
      </>
    ) : (
      <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
        {t(
          "feedback-generation-not-available-for-student",
          "Sanallista palautetta ei voi luoda puutteellisten arviointien vuoksi. Oppilaalla tulee olla vähintään {{minimumEvalsForFeedback}} arviointia palautteen luomiseksi.",
          { minimumEvalsForFeedback }
        )}
      </CText>
    );
  }, [canGenerateFeedback, generateStudentFeedback, generatingFeedback, minimumEvalsForFeedback, t]);

  return (
    <CView {...rest}>
      <CView style={{ gap: "3xl" }}>
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "xl" }}>
          <CView style={{ flexDirection: "column", alignItems: "flex-start", width: "50%" }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{student.name}</CText>
            <CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{presencesAmount} </CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("class-evaluation", "tuntiarviointia", { count: presencesAmount })}</CText>
            </CText>
            <CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{absencesAmount} </CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("absence", "poissaoloa", { count: absencesAmount })}</CText>
            </CText>
            <CButton
              variant="empty"
              title="Katso lisää"
              textStyle={{ color: "primary" }}
              style={{ marginTop: "sm" }}
              onPress={() => navigation.push("student", { id: student.id, name: student.name, archived: false })}
            />
          </CView>
          <GradeSuggestionView
            skillsMean={skillsMean}
            behaviourMean={behaviourMean}
            defaultTypeEvaluations={defaultTypeEvaluations}
            collectionTypes={student.group.currentModule.collectionTypes}
            style={{ justifyContent: "center" }}
            size="small"
            hideEdit
          />
        </CView>
        <CView style={{ gap: "lg" }}>
          <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "md" }}>
            <CText style={{ fontWeight: "300", fontSize: "lg" }}>{t("oral-feedback", "Sanallinen palaute")}</CText>
            {student.latestFeedback && (
              <CButton variant="empty" onPress={openRegenerateFeedbackModal}>
                <Ionicons name="reload" size={24} />
              </CButton>
            )}
          </CView>
          {student.latestFeedback ? (
            <ModalTextInput
              initialValue={student.latestFeedback?.text.toString()}
              onSave={(text) => editFeedback(text)}
              isLoading={generatingFeedback}
              isDisabled={updatingFeedback}
              placeholder="Ei sanallista palautetta generoitu"
              innerInputProps={{
                growWithContent: true,
                style: { flex: 1 },
              }}
            />
          ) : (
            noFeedbackContent
          )}
        </CView>
      </CView>
    </CView>
  );
}
