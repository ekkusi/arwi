import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { isClassParticipationEvaluation } from "arwi-backend/src/types/typeGuards";
import EvaluationsAccordion from "../../../components/EvaluationsAccordion";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import CircledNumber from "../../../components/CircledNumber";
import { analyzeEvaluations } from "../../../helpers/evaluationUtils";
import EvaluationsBarChart from "../../../components/charts/EvaluationsBarChart";
import EvaluationStatistics from "../../../components/charts/EvaluationStatistics";
import InfoButton from "../../../components/InfoButton";
import GradeSuggestionView from "../../../components/GradeSuggestionView";
import EvaluationsHistogram from "../../../components/charts/EvaluationsHistogram";
import Layout from "../../../components/Layout";
import CButton from "../../../components/primitives/CButton";
import { getEnvironmentTranslation } from "../../../helpers/translation";
import { StudentPage_GetStudentQuery } from "../../../gql/graphql";

const StudentPage_GetStudent_Query = graphql(`
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      group {
        id
        name
        subject {
          code
          label {
            fi
          }
        }
        currentModule {
          id
          info {
            educationLevel
            learningObjectiveGroupKey
            label {
              fi
            }
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
          ...EvaluationsAccordion_Evaluation
          ...EvaluationsLineChart_Evaluation
          ...EvaluationsBarChart_Evaluation
        }
        ... on DefaultEvaluation {
          rating
        }
        collection {
          id
        }
      }
    }
  }
`);

// // Type for ClassParticipationEvaluation
export type ClassParticipationEvaluation = StudentPage_GetStudentQuery["getStudent"]["currentModuleEvaluations"][number] & {
  __typename: "ClassParticipationEvaluation";
};

// Type guard function
// export function isClassParticipationEvaluation(evaluation: any): evaluation is ClassParticipationEvaluation {
//   // eslint-disable-next-line
//   return evaluation.__typename === "ClassParticipationEvaluation";
// }

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const { id: studentId, archived } = route.params;

  const { data } = useQuery(StudentPage_GetStudent_Query, { variables: { studentId } });
  const { t } = useTranslation();

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
  } = useMemo(() => {
    const evaluations = data?.getStudent.currentModuleEvaluations ?? [];
    return analyzeEvaluations([...evaluations]);
  }, [data]);

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluations = student.currentModuleEvaluations;

  // const classParticipationEvaluations = evaluations.filter((evaluation) => isClassParticipationEvaluation(evaluation));
  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);
  const moduleInfo = student.group.currentModule.info;

  return (
    <Layout>
      <ScrollView>
        <CView style={{ padding: "lg", backgroundColor: "white", gap: 30 }}>
          <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "3xl" }}>
            <CView>
              <CText style={{ fontSize: "title", fontWeight: "500" }}>{student.name}</CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{student.group.name}</CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{student.group.currentModule.info.label.fi}</CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{student.group.subject.label.fi}</CText>
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
            <EvaluationsBarChart evaluations={classParticipationEvaluations} subjectCode={student.group.subject.code} />
          </CView>
          <EvaluationsHistogram evaluations={evaluations} subjectCode={student.group.subject.code} moduleInfo={moduleInfo} />
          <EvaluationStatistics subjectCode={student.group.subject.code} evaluations={evaluations} moduleInfo={student.group.currentModule.info} />
          <CView style={{ gap: 10 }}>
            <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("characteristics", "Tunnusluvut")}</CText>
              <InfoButton
                onPress={() => {
                  Alert.alert(
                    t("characteristics", "Tunnusluvut"),
                    t(
                      "characteristics-info",
                      "Oppilaan taitojen ja työskentelyn tunnuslukuja tarkastelemalla saadaan nopeasti yleiskuva oppilaan menestyksestä. Useita eri tunnuslukuja on hyvä tarkastella pelkän keskiarvon sijasta. Moodi ja mediaani reagoivat vähemmän yksittäisiin poikkeaviin havaintoihin ja siten antavat paremman kuvan oppilaan keskimääräisestä tasosta, jos oppilaalla on esimerkiksi yksittäisiä notkahduksia arvosanoissa\n\nMediaani kuvaa järjestettyjen havaintojen keskimmäistä arvoa, ja se lasketaan järjestämällä luvut suuruusjärjestykseen ja valitsemalla keskimmäinen havainto tai kahden keskimmäisen havainnon keskiarvo\n\nMoodi kuvaa arvoa, joka on havaittu kaikista useimmin. Arvosanojen moodi tarkoittaa siis sitä arvosanaa, joka on esiintynyt oppilaan arvioinneissa eniten. \n \n{{of_environments_string}} keskiarvolla tarkoitetaan keskiarvoa, joka on laskettu antamalla kaikille {{for_enviroments_string}} yhtä suuret painot riippumatta siitä, minkä verran kullakin {{on_environment_string}} on arviointikertoja. Tämä antaa paremman kuvan oppilaan taitotasosta, jos oppilas on esimerkiksi loistanut lajeissa, jota on arvioitu vain harvoin.",
                      {
                        of_environments_string: getEnvironmentTranslation(t, "of-environments", student.group.subject.code),
                        for_enviroments_string: getEnvironmentTranslation(t, "for-environments", student.group.subject.code).toLocaleLowerCase(),
                        on_environment_string: getEnvironmentTranslation(t, "on-environment", student.group.subject.code).toLocaleLowerCase(),
                      }
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
                  {t("skills-mean-by-environments", "{{of_environments_string}} keskiarvo taidoille", {
                    of_environments_string: getEnvironmentTranslation(t, "of-environments", student.group.subject.code),
                  })}{" "}
                </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(skillsMeanByEnvironments) ? "-" : skillsMeanByEnvironments.toPrecision(2)}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>
                  {t("behaviour-mean-by-environments", "{{of_environments_string}} keskiarvo työskentelylle", {
                    of_environments_string: getEnvironmentTranslation(t, "of-environments", student.group.subject.code),
                  })}{" "}
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
            evaluations={student.currentModuleEvaluations}
            onAccordionButtonPress={(id) => navigation.navigate("edit-evaluation", { evaluationId: id })}
          />
          {!archived && (
            <CButton
              title={t("student-final-evaluation", "Siirry loppuarviointiin")}
              onPress={() => navigation.push("student-feedback", route.params)}
              style={{ marginBottom: "lg" }}
            />
          )}
        </CView>
      </ScrollView>
    </Layout>
  );
}
