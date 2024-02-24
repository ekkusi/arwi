import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { hasRequiredField } from "arwi-backend/src/types/typeGuards";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { HomeStackParams } from "../types";
import { graphql } from "../../../gql";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { useGenerateFeedback } from "../../../hooks-and-providers/GenerateFeedbacksProvider";
import CButton from "../../../components/primitives/CButton";
import { useToast } from "../../../hooks-and-providers/ToastProvider";
import CFlatList from "../../../components/primitives/CFlatList";
import Card from "../../../components/Card";
import Layout from "../../../components/Layout";
import { useToggleTokenUseWarning } from "../../../hooks-and-providers/monthlyTokenUseWarning";
import EvaluationTargetCard from "../group/components/EvaluationTargetCard";
import { COLORS } from "../../../theme";
import FinalFeedbackItem from "./FinalFeedbackItem";

const FinalFeedback_GetGroup_Query = graphql(`
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
          id
          notes
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
`);

export default function FinalFeedback({ route, navigation }: NativeStackScreenProps<HomeStackParams, "final-feedback-collection">) {
  const { groupId } = route.params;
  const { isGenerating, generateFeedbacks } = useGenerateFeedback(groupId);
  const toggleTokenUseWarning = useToggleTokenUseWarning();
  const { t } = useTranslation();
  const { openToast } = useToast();

  const { data } = useQuery(FinalFeedback_GetGroup_Query, {
    variables: { groupId },
  });

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

  const otherCollectionTypes = group.currentModule.collectionTypes.filter((type) => type.category !== "CLASS_PARTICIPATION");
  const nonEvaluatedOtherCollectionTypes = otherCollectionTypes.filter((type) => !hasRequiredField(type, "defaultTypeCollection"));

  const studentsWithFeedback = group.students.filter((student) => hasRequiredField(student, "latestFeedback")) as WithRequiredNonNull<
    (typeof group.students)[number],
    "latestFeedback"
  >[];

  const generateFinalFeedback = () => {
    generateFeedbacks(
      (res) => {
        const warning = res.data?.generateGroupFeedback.usageData?.warning;
        if (warning) toggleTokenUseWarning(warning);
        openToast(
          t("final-feedback-finished", "Loppupalaute on luontu ryhmälle {{groupName}}", { groupName: group.name }),
          { closeTimeout: 10000 },
          {
            action: () => navigation.navigate("final-feedback-collection", { groupId: group.id }),
            label: t("inspect", "Tarkastele"),
          }
        );
      },
      (err) => {
        openToast(
          t("final-feedback-generation-failed", "Loppupalautteen luonti epäonnistui: {{error}}", { error: err.message }),
          {
            type: "error",
          },
          {
            action: () => navigation.navigate("profile"),
            label: t("inspect-in-profile", "Tarkastele profiilissa"),
          }
        );
      }
    );
  };

  const studentsWithLessThanThreeVerbalFeedback = group.students.filter(
    (student) => student.currentModuleEvaluations.filter((ev) => ev.notes).length < 3
  );
  const studentsWithLessThanThreeEvaluations = group.students.filter((student) => student.currentModuleEvaluations.length < 3);

  const allOtherCollectionTypesEvaluated = nonEvaluatedOtherCollectionTypes.length === 0;
  const allStudentsHaveThreeEvaluations = !(studentsWithLessThanThreeEvaluations.length > 0);
  const allStudentsHaveThreeVerbalFeedback = !(studentsWithLessThanThreeVerbalFeedback.length > 0);

  let bottomText = t("all-set-for-generation", "Kaikki valmiina loppupalautteen luontiin!");
  if (!allOtherCollectionTypesEvaluated)
    bottomText = t("fix-errors-before-generation", "Korjaa punaisella merkatut kohdat ennen loppupalautteen luontia.");
  else if (!allStudentsHaveThreeEvaluations || !allStudentsHaveThreeVerbalFeedback)
    bottomText = t("see-warnings-before-generation", "Huomioi keltaisella merkatut kohdat. Voit kuitenkin jatkaa loppupalautteen luontiin.");

  return (
    <Layout style={{ paddingHorizontal: "md", paddingVertical: "lg", backgroundColor: "white", gap: "lg" }}>
      <CText style={{ fontSize: "title", fontWeight: "500" }}>{group.name} - Loppuarviointi</CText>
      {studentsWithFeedback.length === 0 ? (
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
            <CView style={{ flexDirection: "row", gap: "lg", alignItems: "center" }}>
              <MaterialCommunityIcon
                name={!allStudentsHaveThreeEvaluations ? "alert-rhombus-outline" : "check-bold"}
                size={40}
                color={!allStudentsHaveThreeEvaluations ? COLORS.yellow : COLORS.primary}
              />
              <CText style={{ width: "80%", fontSize: "sm", fontWeight: "300" }}>
                {allStudentsHaveThreeEvaluations
                  ? t("all-students-evaluated", "Kaikilla ryhmän oppilailla on riittävästi arviointeja!")
                  : t(
                      "all-students-not-evaluated",
                      `Ryhmässä on {{count}} oppilasta, joilla on alle 3 arviointia. Kyseisille oppilaille ei ole mahdollista luoda sanallista loppupalautetta.`,
                      { count: studentsWithLessThanThreeEvaluations.length }
                    )}
              </CText>
            </CView>
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
            <CButton
              title={t("generate-final-feedback", "Luo loppupalaute")}
              onPress={generateFinalFeedback}
              disabled={!allOtherCollectionTypesEvaluated}
            />
            <CText style={{ fontSize: "sm", fontWeight: "300" }}>
              {t(
                "feedback-generation-info2",
                "Loppuarviointien luonti tapahtuu taustalla. Voit liikkua sovelluksessa vapaasti tai sulkea sovelluksen luonnin ajaksi."
              )}
            </CText>
          </CView>
        </CView>
      ) : (
        <CFlatList
          data={studentsWithFeedback}
          renderItem={({ item }) => {
            return <FinalFeedbackItem studentId={item.id} />;
          }}
        />
      )}
    </Layout>
  );
}
