import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { hasRequiredField } from "arwi-backend/src/types/typeGuards";
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

const FinalFeedback_GetGroup_Query = graphql(`
  query FinalFeedback_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      students {
        id
        name
        latestFeedback {
          id
          text
        }
      }
      currentModule {
        id
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
  const evaluatedOtherCollectionTypes = otherCollectionTypes.filter((type) => hasRequiredField(type, "defaultTypeCollection")) as WithRequiredNonNull<
    (typeof otherCollectionTypes)[number],
    "defaultTypeCollection"
  >[];

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

  return (
    <Layout style={{ paddingHorizontal: "md", paddingVertical: "lg" }}>
      <CText style={{ fontSize: "xl", marginBottom: "xl" }}>Loppupalaute koko ryhmälle</CText>
      {studentsWithFeedback.length === 0 ? (
        <CView style={{ gap: 10 }}>
          <CText style={{ fontSize: "sm", fontWeight: "300" }}>
            {t(
              "group-final-feedback-info",
              "Generoi loppupalaute koko ryhmälle perustuen antamiisi numeerisiin ja sanallisiin palautteisiin. Palautteen generointi tapahtuu taustalla, voit liikkua sovelluksessa vapaasti tai sulkea sovelluksen generoinnin ajaksi."
            )}
          </CText>
          {evaluatedOtherCollectionTypes.length !== otherCollectionTypes.length && (
            <CView style={{ gap: 5 }}>
              <CText style={{ fontSize: "sm", fontWeight: "500" }}>
                {t("other-type-evaluations-missing", "HUOM! Seuraavat arviointikohteet ovat arvioimatta:")}
              </CText>
              <CView>
                {evaluatedOtherCollectionTypes.map((type) => {
                  return (
                    <CText key={type.id} style={{ fontSize: "sm", fontWeight: "500" }}>
                      {type.name}
                    </CText>
                  );
                })}
              </CView>
            </CView>
          )}
          <CButton title={t("generate", "Generoi")} size="small" onPress={generateFinalFeedback} />
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
