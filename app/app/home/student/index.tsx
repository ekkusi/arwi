import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { isClassParticipationEvaluation, isDefaultEvaluation } from "arwi-backend/src/types/typeGuards";
import { CollectionType } from "arwi-backend/src/types";
import { analyzeEvaluationsAdvanced } from "arwi-shared";
import EvaluationsAccordion, { EvaluationsAccordion_Evaluation_Fragment } from "../../../components/evaluations/EvaluationsAccordion";
import LoadingIndicator from "../../../components/ui/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "@/graphql";
import { HomeStackParams } from "../types";
import CircledNumber from "../../../components/ui/CircledNumber";
import { parseFloatToGradeString } from "../../../helpers/evaluationUtils";
import EvaluationsBarChart, { EvaluationsBarChart_Evaluation_Fragment } from "../../../components/charts/EvaluationsBarChart";
import EvaluationStatistics, { EvaluationStatistics_Evaluation_Fragment } from "../../../components/charts/EvaluationStatistics";
import InfoButton from "../../../components/ui/InfoButton";
import GradeSuggestionView, { GradeSuggestionView_DefaultEvaluation_Fragment } from "./components/GradeSuggestionView";
import EvaluationsHistogram, { EvaluationsHistogram_Evaluation_Fragment } from "../../../components/charts/EvaluationsHistogram";
import Layout from "../../../components/layout/Layout";
import CButton from "../../../components/primitives/CButton";
import { getEnvironmentTranslation } from "../../../helpers/translation";
import { Accordion } from "../../../components/ui/Accordion";
import { formatDate } from "../../../helpers/dateHelpers";
import { SPACING } from "../../../theme";

const StudentPage_GetStudent_Query = graphql(
  `
    query StudentPage_GetStudent($studentId: ID!) {
      getStudent(id: $studentId) {
        id
        name
        latestFeedback {
          id
          text
        }
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
          currentModule {
            collectionTypes {
              id
              category
              name
              weight
              defaultTypeCollection {
                id
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
            ...EvaluationStatistics_Evaluation
            ...EvaluationsBarChart_Evaluation
            ...EvaluationsHistogram_Evaluation
            ...EvaluationsAccordion_Evaluation
          }
          ... on DefaultEvaluation {
            rating
            ...GradeSuggestionView_DefaultEvaluation
          }
          collection {
            id
            date
            type {
              id
              weight
              name
              category
            }
          }
        }
      }
    }
  `,
  [
    EvaluationStatistics_Evaluation_Fragment,
    EvaluationsBarChart_Evaluation_Fragment,
    EvaluationsHistogram_Evaluation_Fragment,
    EvaluationsAccordion_Evaluation_Fragment,
    GradeSuggestionView_DefaultEvaluation_Fragment,
  ]
);

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const { id: studentId, archived } = route.params;

  const { data } = useQuery(StudentPage_GetStudent_Query, { variables: { studentId } });
  const { t } = useTranslation();

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluations = student.currentModuleEvaluations;

  const classParticipationEvaluations =
    evaluations.filter<WithTypename<(typeof evaluations)[number], "ClassParticipationEvaluation">>(isClassParticipationEvaluation);

  const defaultTypeEvaluations = evaluations.filter<WithTypename<(typeof evaluations)[number], "DefaultEvaluation">>(isDefaultEvaluation);

  const collectionTypes = student.group.currentModule.collectionTypes as CollectionType[];
  const defaultCollectionTypes = collectionTypes.filter((coll) => coll.category !== "CLASS_PARTICIPATION");
  const {
    absencesAmount,
    presencesAmount,
    skillsMean,
    skillsMedian,
    skillsMode,
    skillsMeanByEnvironments,
    behaviourMean,
    behaviourMedian,
    behaviourMode,
    behaviourMeanByEnvironments,
  } = analyzeEvaluationsAdvanced([...classParticipationEvaluations]);
  const moduleInfo = student.group.currentModule.info;

  const classParticipationType = collectionTypes.find((type) => type.category === "CLASS_PARTICIPATION");

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <ScrollView>
        <CView style={{ padding: "lg", gap: 30 }}>
          <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "xl" }}>
            <CView style={{ width: "50%" }}>
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
            <GradeSuggestionView
              skillsMean={skillsMean}
              behaviourMean={behaviourMean}
              classParticipationWeight={classParticipationType?.weight ?? 0}
              defaultTypeEvaluations={defaultTypeEvaluations}
              style={{ marginLeft: "lg" }}
              size="small"
              infoButtonLinkAction={() => {
                navigation.navigate("edit-evaluation-types", { groupId: student.group.id, onlyWeights: true });
              }}
              hideEdit
            />
          </CView>
          {defaultCollectionTypes.length > 0 && (
            <CView style={{ width: "100%", gap: 20 }}>
              <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluation-types", "Arvioitavat sisällöt")}</CText>
              <CView style={{ gap: 10 }}>
                <Accordion
                  allowMultiple={false}
                  data={[...defaultCollectionTypes].map((type) => {
                    const collectionEvaluation = type.defaultTypeCollection?.id
                      ? defaultTypeEvaluations.find((ev) => ev.collection.id === type.defaultTypeCollection!.id)
                      : undefined;
                    return {
                      key: type.id,
                      title: type.name,
                      date: collectionEvaluation ? formatDate(collectionEvaluation.collection.date) : undefined,
                      stateText:
                        collectionEvaluation?.rating !== null ? t("is-evaluated", "Arviointi tehty") : t("is-not-evaluated", "Arviointi puuttuu"),
                      icons: collectionEvaluation?.wasPresent && !!collectionEvaluation.notes && (
                        <MaterialCommunityIcon name="note-text-outline" size={20} style={{ marginLeft: SPACING.xs }} />
                      ),
                      headerContentRight: (
                        <CircledNumber
                          decimals={0}
                          size={48}
                          valueString={collectionEvaluation?.rating ? parseFloatToGradeString(collectionEvaluation.rating) : "-"}
                        />
                      ),
                      content: (
                        <>
                          <CText
                            style={{
                              fontSize: "sm",
                              fontWeight: "500",
                              color: collectionEvaluation?.wasPresent ? "green" : "red",
                              paddingBottom: 10,
                            }}
                          >
                            {collectionEvaluation?.wasPresent ? t("present", "Paikalla") : t("notPresent", "Poissa")}
                          </CText>
                          {collectionEvaluation?.wasPresent ? (
                            <CView style={{ gap: 10 }}>
                              {collectionEvaluation?.notes ? (
                                <CView>
                                  <CText style={{ fontSize: "sm" }}>{collectionEvaluation.notes}</CText>
                                </CView>
                              ) : (
                                <CText style={{ fontSize: "sm" }}>
                                  {t("components.EvaluationsAccordion.verbalFeedbackNotGiven", "Sanallista palautetta ei annettu")}
                                </CText>
                              )}
                            </CView>
                          ) : (
                            <CText style={{ fontSize: "sm" }}>
                              {t("components.EvaluationsAccordion.studentNotPresent", "Oppilas ei ollut paikalla, ei arviointeja")}
                            </CText>
                          )}
                          {collectionEvaluation ? (
                            <CButton
                              size="small"
                              title={t("edit", "Muokkaa")}
                              style={{ marginTop: "md" }}
                              onPress={() => {
                                navigation.navigate("edit-default-evaluation", { evaluationId: collectionEvaluation.id });
                              }}
                            />
                          ) : (
                            <CButton
                              size="small"
                              title={t("evaluate", "Arvioi")}
                              style={{ marginTop: "md" }}
                              onPress={() => {
                                navigation.navigate("default-collection-create", { groupId: student.group.id, collectionTypeId: type.id });
                              }}
                            />
                          )}
                        </>
                      ),
                    };
                  })}
                />
              </CView>
            </CView>
          )}
          <CView style={{ width: "100%", gap: 20 }}>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("class-evaluation-statistics", "Tuntityöskentely")}</CText>
            <EvaluationsBarChart evaluations={classParticipationEvaluations} subjectCode={student.group.subject.code} />
          </CView>
          <EvaluationsHistogram evaluations={classParticipationEvaluations} subjectCode={student.group.subject.code} moduleInfo={moduleInfo} />
          <EvaluationStatistics subjectCode={student.group.subject.code} evaluations={classParticipationEvaluations} moduleInfo={moduleInfo} />
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
                  {Number.isNaN(skillsMean) ? "-" : skillsMean.toPrecision(2)}
                </CText>
              </CView>
              <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%" }}>
                <CText style={{ flex: 3, fontSize: "sm", fontWeight: "600" }}>{t("behaviour-mean", "Työskentelyn keskiarvo")} </CText>
                <CText style={{ textAlign: "right", flex: 1, fontSize: "lg", fontWeight: "700" }}>
                  {Number.isNaN(behaviourMean) ? "-" : behaviourMean.toPrecision(2)}
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
          {!archived && (
            <CView style={{ gap: 20 }}>
              <CView style={{ gap: 5 }}>
                <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("final-feedback", "Loppuarviointi")}</CText>
                {!student.latestFeedback && (
                  <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
                    {t("student-final-feedback-not-generated", "Oppilaalle ei ole luotu loppupalautta")}
                  </CText>
                )}
              </CView>
              {student.latestFeedback && (
                <CButton
                  title={t("student-final-evaluation", "Siirry loppuarviointiin")}
                  onPress={() => navigation.push("student-feedback", route.params)}
                  style={{ marginBottom: "lg" }}
                />
              )}
              {!student.latestFeedback && (
                <CView>
                  <CButton
                    title={t("group-final-feedback", "Siirry ryhmän loppuarviointiin")}
                    onPress={() => navigation.push("final-feedback", { groupId: student.group.id })}
                  />
                </CView>
              )}
            </CView>
          )}
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("class-evaluations", "Tuntiarvioinnit")}</CText>
          <EvaluationsAccordion
            allowEditing={!archived}
            evaluations={classParticipationEvaluations}
            onAccordionButtonPress={(id) => navigation.navigate("edit-evaluation", { evaluationId: id })}
          />
        </CView>
      </ScrollView>
    </Layout>
  );
}
