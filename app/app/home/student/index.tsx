import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { isClassParticipationEvaluation, isDefaultEvaluation } from "arwi-backend/src/types/typeGuards";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import EvaluationsAccordion from "../../../components/EvaluationsAccordion";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { HomeStackParams } from "../types";
import CircledNumber from "../../../components/CircledNumber";
import { analyzeEvaluations, parseFloatToGradeString } from "../../../helpers/evaluationUtils";
import EvaluationsBarChart from "../../../components/charts/EvaluationsBarChart";
import EvaluationStatistics from "../../../components/charts/EvaluationStatistics";
import InfoButton from "../../../components/InfoButton";
import GradeSuggestionView from "../../../components/GradeSuggestionView";
import EvaluationsHistogram from "../../../components/charts/EvaluationsHistogram";
import Layout from "../../../components/Layout";
import CButton from "../../../components/primitives/CButton";
import { getCollectionTypeTranslation, getEnvironmentTranslation } from "../../../helpers/translation";
import Card from "../../../components/Card";

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
        collectionTypes {
          id
          category
          name
          weight
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
          ...EvaluationsLineChart_Evaluation
          ...EvaluationsBarChart_Evaluation
          ...EvaluationsHistogram_Evaluation
          ...EvaluationsAccordion_Evaluation
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

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const { id: studentId, archived } = route.params;

  const { data } = useQuery(StudentPage_GetStudent_Query, { variables: { studentId } });
  const { t } = useTranslation();

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluations = student.currentModuleEvaluations;

  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);

  const otherEvaluations = evaluations.filter<WithTypename<(typeof evaluations)[number], "DefaultEvaluation">>(isDefaultEvaluation);

  const { collectionTypes } = student.group;
  const otherCollectionTypes = collectionTypes.filter((coll) => coll.category !== "CLASS_PARTICIPATION");
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
  const moduleInfo = student.group.currentModule.info;

  const evaluate = () => {
    Alert.alert("Evaluate");
  };

  const editEvaluation = () => {
    Alert.alert("Edit evaluation");
  };

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
                <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("class-evaluation", "tuntiarviointia", { count: presencesAmount })}</CText>
              </CText>
              <CText>
                <CText style={{ fontSize: "md", fontWeight: "500" }}>{absencesAmount} </CText>
                <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("absence", "poissaoloa", { count: absencesAmount })}</CText>
              </CText>
            </CView>
            <CircledNumber value={(skillsAverage + behaviourAverage) / 2} title={t("class-evaluation-mean", "Tuntityöskentelyn keskiarvo")} />
          </CView>
          {otherCollectionTypes.length > 0 && (
            <CView style={{ width: "100%", gap: 20 }}>
              <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluation-types", "Arvioitavat sisällöt")}</CText>
              <CView style={{ gap: 10 }}>
                {otherCollectionTypes.map((coll) => {
                  const collectionEvaluation = otherEvaluations.find((ev) => ev.collection.id === coll.id);
                  return (
                    <Card>
                      <CView style={{ flex: 6, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "flex-start" }}>
                        <CView style={{ flexGrow: 1, gap: 2 }}>
                          <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <CText style={{ fontWeight: "700", color: "darkgray", flex: 1 }}>{coll.name}</CText>
                          </CView>
                          <CView style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
                            <CText>
                              <CText style={{ fontSize: "sm", color: "gray" }}>
                                {getCollectionTypeTranslation(t, coll.category as CollectionTypeCategory)},{" "}
                              </CText>
                              <CText style={{ fontSize: "sm", color: "gray" }}>{t("evaluated-once", "Kerran arvioitava").toLocaleLowerCase()}</CText>
                            </CText>
                          </CView>
                        </CView>
                      </CView>
                      <CView style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                        <CView style={{ gap: 4, justifyContent: "center", alignItems: "center" }}>
                          {collectionEvaluation && (
                            <CText>
                              <CText style={{ fontSize: "sm", fontWeight: "500" }}>
                                {collectionEvaluation.rating ? `${t("grade", "arvosana")}: ` : t("grade-missing", "Arvosanaa ei ole annettu")}
                              </CText>
                              {collectionEvaluation.rating && (
                                <CText style={{ fontSize: "md", fontWeight: "500" }}>{parseFloatToGradeString(collectionEvaluation.rating)}</CText>
                              )}
                            </CText>
                          )}
                          <CButton
                            title={
                              collectionEvaluation
                                ? t("evaluate", "Arvioi").toLocaleUpperCase()
                                : t("edit-evaluation", "Muokkaa arviointia").toLocaleUpperCase()
                            }
                            variant="empty"
                            textStyle={{ color: "primary" }}
                            onPress={() => {
                              if (collectionEvaluation) {
                                editEvaluation();
                              } else {
                                evaluate();
                              }
                            }}
                          />
                        </CView>
                      </CView>
                    </Card>
                  );
                })}
              </CView>
            </CView>
          )}
          <CView style={{ width: "100%", gap: 20 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("class-evaluation-statistics", "Tuntityöskentely")}</CText>
            <EvaluationsBarChart evaluations={classParticipationEvaluations} subjectCode={student.group.subject.code} />
          </CView>
          <EvaluationsHistogram evaluations={classParticipationEvaluations} subjectCode={student.group.subject.code} moduleInfo={moduleInfo} />
          <EvaluationStatistics
            subjectCode={student.group.subject.code}
            evaluations={classParticipationEvaluations}
            moduleInfo={student.group.currentModule.info}
          />
          <CView style={{ gap: 10 }}>
            <CView style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", gap: 10 }}>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{t("characteristics", "Tunnusluvut")}</CText>
              <InfoButton
                onPress={() => {
                  Alert.alert(
                    t("characteristics", "Tunnusluvut"),
                    t(
                      "characteristics-info",
                      "Oppilaan taitojen ja työskentelyn tunnuslukuja tarkastelemalla saadaan nopeasti yleiskuva oppilaan menestyksestä. Useita eri tunnuslukuja on hyvä tarkastella pelkän keskiarvon sijasta. Moodi ja mediaani reagoivat vähemmän yksittäisiin poikkeaviin havaintoihin ja siten antavat paremman kuvan oppilaan keskimääräisestä tasosta, jos oppilaalla on esimerkiksi yksittäisiä notkahduksia arvosanoissa \n \nMediaani kuvaa järjestettyjen havaintojen keskimmäistä arvoa, ja se lasketaan järjestämällä luvut suuruusjärjestykseen ja valitsemalla keskimmäinen havainto tai kahden keskimmäisen havainnon keskiarvo \n \nMoodi kuvaa arvoa, joka on havaittu kaikista useimmin. Arvosanojen moodi tarkoittaa siis sitä arvosanaa, joka on esiintynyt oppilaan arvioinneissa eniten. \n \n{{of_environments_string}} keskiarvolla tarkoitetaan keskiarvoa, joka on laskettu antamalla kaikille {{for_enviroments_string}} yhtä suuret painot riippumatta siitä, minkä verran kullakin {{on_environment_string}} on arviointikertoja. Tämä antaa paremman kuvan oppilaan taitotasosta, jos oppilas on esimerkiksi loistanut lajeissa, jota on arvioitu vain harvoin.",
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
          <GradeSuggestionView
            skillsMean={skillsAverage}
            behaviourMean={behaviourAverage}
            otherEvaluations={otherEvaluations}
            collectionTypes={collectionTypes}
          />
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("class-evaluations", "Tuntiarvioinnit")}</CText>
          <EvaluationsAccordion
            allowEditing={!archived}
            evaluations={classParticipationEvaluations}
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
