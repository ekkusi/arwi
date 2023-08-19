import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Clipboard from "expo-clipboard";
import { ScrollView } from "react-native-gesture-handler";
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { Alert } from "react-native";
import EvaluationsAccordion from "../../../components/EvaluationsAccordion";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CButton from "../../../components/primitives/CButton";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { StudentEvaluationRecap_Evaluation_Fragment } from "../../../components/StudentEvaluationsRecap";
import { getFragmentData, graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import { COLORS } from "../../../theme";
import { generateStudentSummary } from "../../../helpers/openAiUtils";
import CircledNumber from "../../../components/CircledNumber";
import { analyzeEvaluations } from "../../../helpers/evaluationUtils";
import EvaluationsBarChart from "../../../components/charts/EvaluationsBarChart";
import EvaluationStatistics from "../../../components/charts/EvaluationStatistics";
import InfoButton from "../../../components/InfoButton";
import GradeSuggestionView from "../../../components/GradeSuggestionView";
import EvaluationsHistogram from "../../../components/charts/EvaluationsHistogram";
import Layout from "../../../components/Layout";

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
          id
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

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const { id: studentId, archived } = route.params;

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

  const evaluations = getFragmentData(StudentEvaluationRecap_Evaluation_Fragment, evaluationsSimple);

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
  } = analyzeEvaluations([...evaluations]);

  return (
    <Layout>
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
          <CView style={{ width: "100%", gap: 20 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("statistics", "Tilastot")}</CText>
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
                      leftIcon={<MaterialCommunityIcon name="filter-variant" size={25} color={COLORS.darkgray} />}
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
                          key={obj.value}
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
          <EvaluationsHistogram evaluations={evaluations} subjectCode={student.group.subject.code} />
          <EvaluationStatistics subjectCode={student.group.subject.code} evaluations={evaluations} />
          <CView style={{ gap: 10 }}>
            <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("characteristics", "Tunnusluvut")}</CText>
              <InfoButton
                onPress={() => {
                  Alert.alert(
                    t("characteristics", "Tunnusluvut"),
                    t(
                      "characteristics-info",
                      "Oppilaan taitojen ja työskentelyn tunnuslukuja tarkastelemalla saadaan nopeasti yleiskuva oppilaan menestyksestä. Useita eri tunnuslukuja on hyvä tarkastella pelkän keskiarvon sijasta. Moodi ja mediaani reagoivat vähemmän yksittäisiin poikkeaviin havaintoihin ja siten antavat paremman kuvan oppilaan keskimääräisestä tasosta, jos oppilaalla on esimerkiksi yksittäisiä notkahduksia arvosanoissa\n\nMediaani kuvaa järjestettyjen havaintojen keskimmäistä arvoa, ja se lasketaan järjestämällä luvut suuruusjärjestykseen ja valitsemalla keskimmäinen havainto tai kahden keskimmäisen havainnon keskiarvo\n\nMoodi kuvaa arvoa, joka on havaittu kaikista useimmin. Arvosanojen moodi tarkoittaa siis sitä arvosanaa, joka on esiintynyt oppilaan arvioinneissa eniten. \n \nYmpärisöjen keskiarvolla tarkoitetaan keskiarvoa, joka on laskettu antamalla kaikille ympäristöille yhtä suuret painot riippumatta siitä, minkä verran kullakin ympäristöllä on arviointikertoja. Tämä antaa paremman kuvan oppilaan taitotasosta, jos oppilas on esimerkiksi loistanut lajeissa, jota on arvioitu vain harvoin."
                    )
                  );
                }}
              />
            </CView>
            <CView style={{ gap: 5 }}>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("skills-mean", "Taitojen keskiarvo")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(skillsAverage) ? "-" : skillsAverage.toPrecision(2)}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("behaviour-mean", "Työskentelyn keskiarvo")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(behaviourAverage) ? "-" : behaviourAverage.toPrecision(2)}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("skill-median", "Taitojen mediaani")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(skillsMedian) ? "-" : skillsMedian}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("behaviour-median", "Työskentelyn mediaani")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(behaviourMedian) ? "-" : behaviourMedian}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("skill-mode", "Taitojen moodi")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(skillsMode) ? "-" : skillsMode}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("behaviour-mode", "Työskentelyn moodi")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(behaviourMode) ? "-" : behaviourMode}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>
                  {t("skills-mean-by-environments", "Ympäristöjen keskiarvo taidoille")}{" "}
                </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(skillsMeanByEnvironments) ? "-" : skillsMeanByEnvironments.toPrecision(2)}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>
                  {t("behaviour-mean-by-environments", "Ympäristöjen keskiarvo työskentelylle")}{" "}
                </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(behaviourMeanByEnvironments) ? "-" : behaviourMeanByEnvironments.toPrecision(2)}
                </CText>
              </CView>
            </CView>
          </CView>
          <GradeSuggestionView skillsMean={skillsAverage} behaviourMean={behaviourAverage} />
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluations", "Arvioinnit")}</CText>
          <EvaluationsAccordion
            allowEditing={!archived}
            evaluations={student.currentClassEvaluations}
            onAccordionButtonPress={(id) => navigation.navigate("edit-evaluation", { evaluationId: id })}
          />
          {archived && (
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
          )}
        </CView>
      </ScrollView>
    </Layout>
  );
}
