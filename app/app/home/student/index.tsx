import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import { ScrollView } from "react-native-gesture-handler";
import { getEnvironments } from "arwi-backend/src/utils/subjectUtils";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import EvaluationsAccordion from "../../../components/EvaluationsAccordion";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import StudentEvaluationsRecap from "../../../components/StudentEvaluationsRecap";
import { getFragmentData, graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import { COLORS } from "../../../theme";
import { generateStudentSummary } from "../../../helpers/openAiUtils";
import StyledBarChart from "../../../components/charts/StyledBarChart";
import CircledNumber from "../../../components/CircledNumber";
import { analyzeEvaluations } from "../../../helpers/evaluationUtils";
import EvaluationsLineChart from "../../../components/charts/EvaluationsLineChart";
import EvaluationsBarChart from "../../../components/charts/EvaluationsBarChart";
import EvaluationStatistics from "../../../components/charts/EvaluationStatistics";

const StudentPage_GetStudent_Query = graphql(`
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      ...StudentEvaluationRecap_Student
      group {
        id
        name
        subject {
          code
          label
        }
        currentClassYear {
          info {
            code
            label
          }
        }
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

const StudentEvaluationRecap_Evaluation_Fragment = graphql(`
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

const StudentEvaluationRecap_Student_Fragment = graphql(`
  fragment StudentEvaluationRecap_Student on Student {
    id
    name
    group {
      name
    }
  }
`);

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const studentId = route.params.id;

  const { data } = useQuery(StudentPage_GetStudent_Query, { variables: { studentId } });
  const { t } = useTranslation();

  const [summary, setSummary] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [evaluationsByEnvironmentsFilter, setEvaluationsByEnvironmentsFilter] = useState<string>("all");
  const [isGeneratingSummary, setIsGeneratingSumamry] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [scrollYPos, setScrollYPos] = useState<number>(0);
  const scrollView = useRef<ScrollView>(null);

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluationsSimple = student.currentClassEvaluations;

  const generateSummary = async () => {
    try {
      setIsGeneratingSumamry(true);
      setIsCopied(false);
      setError(undefined);
      setSummary(undefined);

      const result = await generateStudentSummary(evaluationsSimple);

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

  const environments = getEnvironments(student.group.subject.code);
  const evaluations = getFragmentData(StudentEvaluationRecap_Evaluation_Fragment, evaluationsSimple);

  const { absencesAmount, presencesAmount, skillsAverage, behaviourAverage, gradeSuggestion } = analyzeEvaluations([...evaluations]);

  return (
    <ScrollView ref={scrollView}>
      <CView style={{ padding: "lg", backgroundColor: "white", gap: 30 }}>
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "3xl" }}>
          <CView>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{student.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{student.group.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{student.group.currentClassYear.info.label}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{student.group.subject.label}</CText>
            <CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{presencesAmount} </CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("evaluation", "arviointia", { count: presencesAmount })}</CText>
            </CText>
            <CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{absencesAmount} </CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("absence", "poissaoloa", { count: absencesAmount })}</CText>
            </CText>
          </CView>
          <CircledNumber value={(skillsAverage + behaviourAverage) / 2} title={t("mean", "Keskiarvo")} />
        </CView>
        <CView style={{ width: "100%", gap: 10 }}>
          <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <CText style={{ flex: 1, fontSize: "md", fontWeight: "300" }}>
              {t("evaluation-means-by-environments", "Arvointien keskiarvot ympäristöittäin")}
            </CText>
            <CView style={{ flex: 1, alignItems: "flex-end" }}>
              <Menu renderer={renderers.SlideInMenu}>
                <MenuTrigger style={{ borderRadius: 24 }}>
                  <CButton
                    size="small"
                    variant="outline"
                    title={t(evaluationsByEnvironmentsFilter, "")}
                    colorScheme="darkgray"
                    style={{ width: "auto" }}
                    leftIcon={<MaterialCommunityIcon name="chevron-down" size={25} color={COLORS.darkgray} />}
                    disableTouchEvent
                  />
                </MenuTrigger>
                <MenuOptions>
                  <CView
                    style={{
                      flexDirection: "row",
                      gap: 1,
                      width: "100%",
                      padding: "md",
                      borderTopColor: "gray",
                      borderTopWidth: 1,
                    }}
                  >
                    {[
                      { text: t("all", "Kaikki"), value: "all" },
                      { text: t("skills", "Taidot"), value: "skills" },
                      { text: t("behaviour", "Työskentely"), value: "behaviour" },
                    ].map((obj) => (
                      <MenuOption
                        onSelect={() => {
                          setEvaluationsByEnvironmentsFilter(obj.value);
                        }}
                      >
                        <CButton
                          key="all"
                          title={obj.text}
                          variant="outline"
                          colorScheme={evaluationsByEnvironmentsFilter === obj.value ? "darkgray" : "lightgray"}
                          style={{ flex: 1, margin: 3, paddingHorizontal: "md", gap: "sm" }}
                          disableTouchEvent
                          textStyle={{
                            fontSize: "xs",
                            fontWeight: "400",
                            color: evaluationsByEnvironmentsFilter === obj.value ? "darkgray" : "gray",
                          }}
                        />
                      </MenuOption>
                    ))}
                  </CView>
                </MenuOptions>
              </Menu>
            </CView>
          </CView>
          <EvaluationsBarChart evaluations={evaluations} filter={evaluationsByEnvironmentsFilter} />
        </CView>
        <EvaluationStatistics subjectCode={student.group.subject.code} evaluations={evaluations} />
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
