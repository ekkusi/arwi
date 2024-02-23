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

const FinalFeedback_GetGroup_Query = graphql(`
  query FinalFeedback_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      archived
      students {
        id
        name
        latestFeedback {
          id
          text
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
          {t("generating-feedbacks-loading-text", "Palautteita generoidaan. Tämä voi kestää hetken. Voit poistua tältä sivulta halutessasi.")}
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
          t("final-feedback-finished", "Loppupalaute generoitu ryhmälle {{groupName}}", { groupName: group.name }),
          { closeTimeout: 10000 },
          {
            action: () => navigation.navigate("final-feedback-collection", { groupId: group.id }),
            label: t("inspect", "Tarkastele"),
          }
        );
      },
      (err) => {
        openToast(
          t("final-feedback-generation-failed", "Loppupalautteen generointi epäonnistui: {{error}}", { error: err.message }),
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

  return (
    <Layout style={{ paddingHorizontal: "md", paddingVertical: "lg", backgroundColor: "white", gap: "lg" }}>
      <CText style={{ fontSize: "title", fontWeight: "500" }}>{group.name} - Loppupalaute</CText>
      {studentsWithFeedback.length === 0 ? (
        <CView style={{ gap: "xl" }}>
          <CText>
            <CText style={{ fontSize: "sm2", fontWeight: "300" }}>
              Palaute generoidaan perustuen antamiisi numeerisiin ja sanallisiin palautteisiin. Olet tehnyt ryhmälle yhteensä{" "}
            </CText>
            <CText style={{ fontSize: "sm2", fontWeight: "500" }}>
              {t("class-evaluation-count", "{{count}} tuntiarviointia", {
                count: group.currentModule.evaluationCollections.filter((ev) => ev.type.category === "CLASS_PARTICIPATION").length,
              })}{" "}
            </CText>
            <CText style={{ fontSize: "sm2", fontWeight: "300" }}>ja antanut sanallista palautetta keskimäärin </CText>
            <CText style={{ fontSize: "sm2", fontWeight: "500" }}>0 kertaa per oppilas.</CText>
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
                  ? "Kaikki arvioitavat sisällöt on arvioitu!"
                  : `Ryhmällä on ${nonEvaluatedOtherCollectionTypes.length} arvioitava sisältö arvioimatta. Arvioi sisältö ennen palautteen generointia.`}
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
                  ? "Kaikilla ryhmän oppilailla on riittävästi arviointeja!"
                  : `Ryhmässä on ${studentsWithLessThanThreeEvaluations.length} oppilasta, joilla on alle 3 arviointia. Kyseisille oppilaille ei ole mahdollista generoida sanallista palautetta.`}
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
                  ? "Kaikille ryhmän oppilaille on annettu riittävästi sanallista palautetta!"
                  : `Ryhmässä on ${studentsWithLessThanThreeVerbalFeedback.length} oppilasta, joille on annettu alle 3 sanallista palautetta. Antamalla sanallista palautetta yksilöllisempien palautteiden generointi on mahdollista.`}
              </CText>
            </CView>
            <CView style={{ gap: "md" }}>
              <CText style={{ fontSize: "sm2", fontWeight: "500" }}>Kaikki valmiina loppupalautteen generoimiseksi!</CText>
            </CView>
            <CView style={{ gap: "sm" }}>
              <CButton title={t("generate", "Generoi")} onPress={generateFinalFeedback} disabled={!allOtherCollectionTypesEvaluated} />
              <CText style={{ fontSize: "sm", fontWeight: "300" }}>
                Palautteen generointi tapahtuu taustalla, voit liikkua sovelluksessa vapaasti tai sulkea sovelluksen generoinnin ajaksi.
              </CText>
            </CView>
          </CView>
        </CView>
      ) : (
        <CFlatList
          data={studentsWithFeedback}
          renderItem={({ item }) => {
            return (
              <Card key={item.id} style={{ justifyContent: "space-between", paddingVertical: "lg" }}>
                <CText style={{ marginBottom: "md", textAlign: "center", fontWeight: "500" }}>{item.name}</CText>
                <CText style={{ marginBottom: "sm", fontStyle: "italic" }}>{t("feedback", "Palaute")}:</CText>
                <CText>{item.latestFeedback.text}</CText>
              </Card>
            );
          }}
        />
      )}
    </Layout>
  );
}
