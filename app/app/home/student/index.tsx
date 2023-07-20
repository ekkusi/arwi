import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import { ScrollView } from "react-native-gesture-handler";
import EvaluationsAccordion from "../../../components/EvaluationsAccordion";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import StudentEvaluationsRecap from "../../../components/StudentEvaluationsRecap";
import { graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import { COLORS } from "../../../theme";
import { generateStudentSummary } from "../../../helpers/openAiUtils";

const StudentPage_GetStudent_Query = graphql(/* GraphQL */ `
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      ...StudentEvaluationRecap_Student
      group {
        id
      }
      currentClassEvaluations {
        id
        notes
        ...EvaluationsAccordion_Evaluation
        ...StudentEvaluationRecap_Evaluation
        ...OpenAIUtils_Evaluation
      }
    }
  }
`);

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const studentId = route.params.id;

  const { data } = useQuery(StudentPage_GetStudent_Query, { variables: { studentId } });
  const { t } = useTranslation();

  const [summary, setSummary] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isGeneratingSummary, setIsGeneratingSumamry] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [scrollYPos, setScrollYPos] = useState<number>(0);
  const scrollView = useRef<ScrollView>(null);

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluations = student.currentClassEvaluations;

  const generateSummary = async () => {
    try {
      setIsGeneratingSumamry(true);
      setIsCopied(false);
      setError(undefined);
      setSummary(undefined);

      const result = await generateStudentSummary(evaluations);

      setSummary(result);
      setIsGeneratingSumamry(false);
    } catch (e) {
      setIsGeneratingSumamry(false);
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

  return (
    <ScrollView ref={scrollView}>
      <CView style={{ padding: "lg" }}>
        <StudentEvaluationsRecap student={student} evaluations={student.currentClassEvaluations} />
        <CText style={{ marginTop: "xl", fontSize: "xl" }}>{t("StudentView.allEvaluations", "Kaikki arvioinnit")}</CText>
        <EvaluationsAccordion evaluations={student.currentClassEvaluations} />
        <CView style={{ marginTop: "lg" }} onLayout={(event) => setScrollYPos(event.nativeEvent.layout.y)}>
          <CText style={{ fontSize: "xl", marginBottom: "lg" }}>{t("StudentView.feedbackGeneration", "Loppupalautteen generointi")}</CText>
          <CButton loading={isGeneratingSummary} title={t("StudentView.generateFeedback", "Luo palaute")} onPress={generateSummary} />
          {error && <CText style={{ color: "error" }}>{error}</CText>}
          {summary && (
            <CView
              style={{ marginTop: "lg" }}
              onLayout={() => {
                scrollView.current?.scrollTo({ y: scrollYPos, x: 0, animated: true });
              }}
            >
              <CText style={{ fontSize: "xl" }}>{t("feedback", "Palaute")}:</CText>
              <CText style={{ marginBottom: "lg" }}>{summary}</CText>
              <CView style={{ alignContent: "center", marginTop: "md" }}>
                <CButton
                  title={isCopied ? t("StudentView.copied", "Kopioitu") : t("StudentView.copyText", "Kopioi teksti")}
                  disabled={isCopied}
                  onPress={copySummaryToClipboard}
                  leftIcon={<MaterialCommunityIcon name={isCopied ? "check" : "note-text-outline"} size={25} color={COLORS.white} />}
                />
              </CView>
            </CView>
          )}
        </CView>
      </CView>
    </ScrollView>
  );
}
