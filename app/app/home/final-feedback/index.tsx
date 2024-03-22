import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { hasRequiredField } from "arwi-backend/src/types/typeGuards";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useMemo } from "react";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { HomeStackParams } from "../types";
import { ResultOf, graphql } from "@/graphql";
import LoadingIndicator from "../../../components/ui/LoadingIndicator";
import { useGenerateFeedback } from "../../../hooks-and-providers/GenerateFeedbacksProvider";
import CButton from "../../../components/primitives/CButton";
import { useToast } from "../../../hooks-and-providers/ToastProvider";
import Layout from "../../../components/layout/Layout";
import { COLORS } from "../../../theme";
import { useMetadata } from "@/hooks-and-providers/MetadataProvider";
import { getCurrentRoute } from "@/helpers/navigation";

const FinalFeedback_GetGroup_Query = graphql(
  `
    query FinalFeedback_GetGroup($groupId: ID!) {
      getGroup(id: $groupId) {
        id
        name
        archived
        students {
          id
          latestFeedback {
            id
          }
          currentModuleEvaluations {
            __typename
            id
            notes
            wasPresent
            ... on ClassParticipationEvaluation {
              skillsRating
              behaviourRating
            }
            ... on DefaultEvaluation {
              rating
            }
          }
        }
        currentModule {
          id
          evaluationCollections {
            id
            type {
              id
              category
            }
          }
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
    }
  `
);

function checkIsEvaluationEvaluated(
  evaluation: ResultOf<typeof FinalFeedback_GetGroup_Query>["getGroup"]["students"][number]["currentModuleEvaluations"][number]
) {
  if (!evaluation.wasPresent) return false;
  if (evaluation.__typename === "ClassParticipationEvaluation") return evaluation.skillsRating != null && evaluation.behaviourRating != null;
  if (evaluation.__typename === "DefaultEvaluation") return evaluation.rating != null;
}

export default function FinalFeedback({ route, navigation }: NativeStackScreenProps<HomeStackParams, "final-feedback">) {
  const { minimumEvalsForFeedback } = useMetadata();
  const { groupId, noRedirect = false } = route.params;
  const { isGenerating, generateFeedbacks } = useGenerateFeedback(groupId);
  const { t } = useTranslation();
  const { openToast } = useToast();

  const { data } = useQuery(FinalFeedback_GetGroup_Query, {
    variables: { groupId },
  });

  const students = data?.getGroup.students || [];

  const studentsWithLessThanThreeVerbalFeedback = students.filter(
    (student) => student.currentModuleEvaluations.filter((ev) => ev.notes).length < minimumEvalsForFeedback
  );
  const studentsWithInsufficientEvaluations = students.filter(
    (student) => student.currentModuleEvaluations.filter(checkIsEvaluationEvaluated).length < minimumEvalsForFeedback
  );

  const sufficientEvaluationsContent = useMemo(() => {
    let icon;
    let color;
    let message;
    switch (studentsWithInsufficientEvaluations.length) {
      case 0: {
        icon = "check-bold";
        color = COLORS.primary;
        message = t("all-students-evaluated", "Kaikilla ryhmän oppilailla on riittävästi arviointeja!");
        break;
      }
      case students.length: {
        icon = "alert-rhombus-outline";
        color = COLORS.red;
        message = t(
          "no-students-evaluated",
          "Ryhmässä ei ole yhtään oppilasta, jolla olisi yli {{minimumEvalsForFeedback}} täysin arvioitua arviointia. Loppupalautteen luominen ei ole mahdollista.",
          { minimumEvalsForFeedback }
        );
        break;
      }
      default:
        icon = "alert-rhombus-outline";
        color = COLORS.yellow;
        message = t(
          "all-students-not-evaluated",
          `Ryhmässä on {{count}} oppilasta, joilla on alle {{minimumEvalsForFeedback}} täysin arvioitua arviointia. Kyseisille oppilaille ei ole mahdollista luoda sanallista loppupalautetta.`,
          {
            count: studentsWithInsufficientEvaluations.length,
            minimumEvalsForFeedback,
          }
        );
    }
    return (
      <CView style={{ flexDirection: "row", gap: "lg", alignItems: "center" }}>
        <MaterialCommunityIcon name={icon} size={40} color={color} />
        <CText style={{ width: "80%", fontSize: "sm", fontWeight: "300" }}>{message}</CText>
      </CView>
    );
  }, [studentsWithInsufficientEvaluations.length, students.length, t, minimumEvalsForFeedback]);

  if (isGenerating)
    return (
      <LoadingIndicator style={{ paddingHorizontal: "lg" }}>
        <CText style={{ color: "primary", marginBottom: "3xl" }}>
          {t("generating-feedbacks-loading-text", "Palautteita luodaan. Tämä voi kestää hetken. Voit poistua tältä sivulta halutessasi.")}
        </CText>
      </LoadingIndicator>
    );

  if (!data) return <LoadingIndicator />;

  const group = data.getGroup;

  const studentsWithFeedback = group.students.filter((student) => hasRequiredField(student, "latestFeedback")) as WithRequiredNonNull<
    (typeof group.students)[number],
    "latestFeedback"
  >[];

  if (!noRedirect && studentsWithFeedback.length > 0) navigation.replace("final-feedback-results", { groupId });

  const otherCollectionTypes = group.currentModule.collectionTypes.filter((type) => type.category !== "CLASS_PARTICIPATION");
  const nonEvaluatedOtherCollectionTypes = otherCollectionTypes.filter((type) => !hasRequiredField(type, "defaultTypeCollection"));

  const generateFinalFeedback = () => {
    generateFeedbacks(() => {
      const currentRoute = getCurrentRoute(navigation);

      openToast(
        t("final-feedback-finished", "Loppupalaute on luotu ryhmälle {{groupName}}", { groupName: group.name }),
        { closeTimeout: 10000 },
        currentRoute?.name !== "final-feedback-results" && currentRoute?.name !== "final-feedback"
          ? {
              action: () => navigation.navigate("final-feedback", { groupId: group.id }),
              label: t("inspect", "Tarkastele"),
            }
          : undefined
      );
      if (currentRoute?.name === "final-feedback") navigation.replace("final-feedback-results", { groupId });
    });
  };

  const allOtherCollectionTypesEvaluated = nonEvaluatedOtherCollectionTypes.length === 0;
  const allStudentsHaveSufficientEvaluations = !(studentsWithInsufficientEvaluations.length > 0);
  const allStudentsHaveThreeVerbalFeedback = !(studentsWithLessThanThreeVerbalFeedback.length > 0);

  const isGeneratingDisabled = !allOtherCollectionTypesEvaluated || studentsWithInsufficientEvaluations.length === group.students.length;

  let bottomText = t("all-set-for-generation", "Kaikki valmiina loppupalautteen luontiin!");
  if (!allOtherCollectionTypesEvaluated)
    bottomText = t("fix-errors-before-generation", "Korjaa punaisella merkatut kohdat ennen loppupalautteen luontia.");
  else if (!allStudentsHaveSufficientEvaluations || !allStudentsHaveThreeVerbalFeedback)
    bottomText = t("see-warnings-before-generation", "Huomioi keltaisella merkatut kohdat. Voit kuitenkin jatkaa loppupalautteen luontiin.");
  return (
    <Layout style={{ backgroundColor: "white", paddingHorizontal: "md", paddingVertical: "lg" }}>
      <CText style={{ fontSize: "title", fontWeight: "500" }}>
        {t("group_final_feedback", "{{groupName}} - Loppuarviointi", { groupName: group.name })}
      </CText>
      <CView style={{ gap: "2xl" }}>
        <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
          {t(
            "feedback-generation-info1",
            "Sanallinen palaute luodaan tekoälyä hyödyntäen antamiesi numeeristen ja sanallisten arviointien perusteella."
          )}
        </CText>
        <CView style={{ gap: "xl" }}>
          <CView style={{ flexDirection: "row", gap: "lg", alignItems: "center" }}>
            <MaterialCommunityIcon
              name={!allOtherCollectionTypesEvaluated ? "alert-outline" : "check-bold"}
              size={40}
              color={!allOtherCollectionTypesEvaluated ? COLORS.red : COLORS.primary}
            />
            <CText style={{ width: "80%", fontSize: "sm", fontWeight: "300" }}>
              {allOtherCollectionTypesEvaluated
                ? t("all-types-evaluated", "Kaikki arvioitavat sisällöt on arvioitu!")
                : t(
                    "all-types-not-evaluated",
                    `Ryhmällä on {{count}} arvioitavaa sisältöä arvioimatta. Arvioi sisällöt ennen loppuarvioinnin luontia.`,
                    { count: nonEvaluatedOtherCollectionTypes.length }
                  )}
            </CText>
          </CView>
          {sufficientEvaluationsContent}
          <CView style={{ flexDirection: "row", gap: "lg", alignItems: "center" }}>
            <MaterialCommunityIcon
              name={!allStudentsHaveThreeVerbalFeedback ? "alert-rhombus-outline" : "check-bold"}
              size={40}
              color={!allStudentsHaveThreeVerbalFeedback ? COLORS.yellow : COLORS.primary}
            />
            <CText style={{ width: "80%", fontSize: "sm", fontWeight: "300" }}>
              {allStudentsHaveThreeVerbalFeedback
                ? t("all-students-have-verbal-feedback", "Kaikille ryhmän oppilaille on annettu riittävästi sanallista palautetta!")
                : t(
                    "all-students-have-not-verbal-feedback",
                    `Ryhmässä on {{count}} oppilasta, joille on annettu alle 3 sanallista arviointia. Antamalla sanallisia arviointeja, yksilöllisempien palautteiden luonti on mahdollista.`,
                    { count: studentsWithLessThanThreeVerbalFeedback.length }
                  )}
            </CText>
          </CView>
        </CView>
        <CView style={{ gap: "md" }}>
          <CText style={{ fontSize: "sm2", fontWeight: "500" }}>{bottomText}</CText>
        </CView>
        <CView style={{ gap: "sm" }}>
          <CButton title={t("generate-final-feedback", "Luo loppupalaute")} onPress={generateFinalFeedback} disabled={isGeneratingDisabled} />
          {isGeneratingDisabled && (
            <CButton
              variant="empty"
              textStyle={{
                color: "primary",
                fontWeight: "600",
                marginTop: "md",
              }}
              title={t("inspect-feedback-suggestions", "Tarkastele arvosanaehdotuksia")}
              onPress={() =>
                navigation.navigate("final-feedback-results", {
                  groupId,
                  noRedirect: true,
                })
              }
            />
          )}
          <CText style={{ fontSize: "sm", fontWeight: "300", marginTop: "lg" }}>
            {t(
              "feedback-generation-info2",
              "Loppuarviointien luonti tapahtuu taustalla. Voit liikkua sovelluksessa vapaasti tai sulkea sovelluksen luonnin ajaksi."
            )}
          </CText>
        </CView>
      </CView>
    </Layout>
  );
}
