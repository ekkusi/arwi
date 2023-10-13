import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation, useQuery } from "@apollo/client";
import { useMatomo } from "matomo-tracker-react-native";
import Layout from "../../../components/Layout";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import CButton from "../../../components/primitives/CButton";
import { COLORS, SPACING } from "../../../theme";
import { HomeStackParams } from "../types";
import GradeSuggestionView from "../../../components/GradeSuggestionView";
import { analyzeEvaluations } from "../../../helpers/evaluationUtils";
import { graphql } from "../../../gql";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { useAuthenticatedUser } from "../../../hooks-and-providers/AuthProvider";

const StudentFeedbackView_GetStudent_Query = graphql(`
  query StudentFeedbackView_GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      group {
        id
        archived
        currentModule {
          id
        }
      }
      currentModuleEvaluations {
        id
        notes
        wasPresent
        behaviourRating
        skillsRating
        isStellar
        collection {
          id
          date
          environment {
            code
            label {
              fi
            }
          }
        }
      }
    }
  }
`);

const StudentFeedbackView_GenerateFeedback_Mutation = graphql(`
  mutation StudentFeedbackView_GenerateFeedback($studentId: ID!, $moduleId: ID!) {
    generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)
  }
`);

export default function StudentFeedbackView({ route }: NativeStackScreenProps<HomeStackParams, "student-feedback">) {
  const { t } = useTranslation();
  const { id, name } = route.params;
  const { trackAction } = useMatomo();
  const user = useAuthenticatedUser();

  const [summary, setSummary] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  // const [isGeneratingSummary, setIsGeneratingSumamry] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { data } = useQuery(StudentFeedbackView_GetStudent_Query, {
    variables: { id },
  });

  const [generateFeedback, { loading: isGeneratingSummary }] = useMutation(StudentFeedbackView_GenerateFeedback_Mutation);

  const { skillsAverage, behaviourAverage } = useMemo(() => {
    const evaluations = data?.getStudent.currentModuleEvaluations ?? [];
    return analyzeEvaluations([...evaluations]);
  }, [data]);

  const generateSummary = async () => {
    try {
      const moduleId = data?.getStudent.group.currentModule.id;
      if (!moduleId) throw new Error("Unexpected error, moduleId not found"); // Should never happen, is for TS

      setIsCopied(false);
      setError(undefined);
      setSummary(undefined);

      const result = await generateFeedback({
        variables: {
          studentId: id,
          moduleId,
        },
      });

      trackAction({
        name: "Generate student feedback",
        userInfo: {
          uid: user.email,
        },
      });

      if (!result.data?.generateStudentFeedback) throw new Error("Summary generation failed");
      setSummary(result.data?.generateStudentFeedback);
    } catch (e) {
      console.error(e);
      setError(
        t(
          "StudentView.summaryGenerationError",
          "Palautteen generoinnissa meni jotakin mönkään. Yritä myöhemmin uudelleen tai ota yhteyttä järjestelmänvalvojaan."
        )
      );
    }
  };

  const copySummaryToClipboard = async () => {
    if (!summary) return;
    await Clipboard.setStringAsync(summary);
    setIsCopied(true);
  };

  if (!data) return <LoadingIndicator />;

  const { getStudent: student } = data;

  if (student.group.archived)
    return (
      <Layout style={{ padding: "lg" }}>
        <CText style={{ fontSize: "lg", marginBottom: "md", textAlign: "center" }}>{t("group-archived", "Ryhmä arkistoitu")}</CText>
        <CText>
          {t(
            "feedback-disabled-for-archived-group",
            "Arkistoidun ryhmän suorituksia ei voida arvioida. Poista ryhmä arkistoista arvioidaksesi oppilas."
          )}
        </CText>
      </Layout>
    );

  if (isGeneratingSummary)
    return (
      <Layout style={{ alignItems: "center", justifyContent: "center" }}>
        <LoadingIndicator style={{ marginBottom: "4xl" }}>
          <CText style={{ marginTop: "lg", color: "primary" }}>{t("generating-summary", "Loppuarviointia generoidaan...")}</CText>
        </LoadingIndicator>
      </Layout>
    );

  if (!summary || error)
    return (
      <Layout style={{ alignItems: "center", justifyContent: "center", marginBottom: "4xl", padding: "lg" }}>
        <CText style={{ fontSize: "2xl" }}>{`${name} - ${t("final-feedback", "Loppuarviointi").toLowerCase()}`}</CText>
        <CText style={{ marginBottom: "lg" }}>
          {t("final-feedback-generation-info", "Generoi oppilaan loppuarviointi alta. Huom! Generoinnissa voi mennä hetki.")}
        </CText>
        <CButton title={t("generate-final-feedback", "Generoi loppuarviointi")} onPress={generateSummary} />
        {error && <CText style={{ color: "error", marginTop: "lg" }}>{error}</CText>}
      </Layout>
    );

  return (
    <Layout>
      <ScrollView style={{ padding: SPACING.lg }}>
        <CText style={{ fontSize: "xl", marginBottom: "2xl", marginTop: "md", textAlign: "center" }}>{t("final-feedback", "Loppuarviointi")}</CText>
        <GradeSuggestionView style={{ marginBottom: "3xl" }} skillsMean={skillsAverage} behaviourMean={behaviourAverage} />
        <CText style={{ fontSize: "lg", fontWeight: "400", marginBottom: "lg" }}>{t("oral-feedback", "Sanallinen palaute:")}</CText>
        <CView style={{ marginBottom: "4xl" }}>
          <CText style={{ marginBottom: "lg" }}>{summary}</CText>
          <CView style={{ alignContent: "center", marginTop: "md" }}>
            <CButton
              title={isCopied ? t("copied-to-clipboard", "Kopioitu leikepöydälle") : t("copy-feedback", "Kopioi palaute")}
              disabled={isCopied}
              onPress={copySummaryToClipboard}
              leftIcon={<MaterialCommunityIcon name={isCopied ? "check" : "note-text-outline"} size={25} color={COLORS.white} />}
            />
          </CView>
        </CView>
      </ScrollView>
    </Layout>
  );
}
