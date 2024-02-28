import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import { isClassParticipationCollection } from "arwi-backend/src/types/typeGuards";
import EvaluationsAccordion, { EvaluationsAccordion_Evaluation_Fragment } from "../../../components/EvaluationsAccordion";
import Layout from "../../../components/Layout";
import LoadingIndicator from "../../../components/LoadingIndicator";
import SingleEvaluationHistogram from "../../../components/charts/SingleEvaluationHistogram";
import CButton from "../../../components/primitives/CButton";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "@/graphql";
import { formatDate } from "../../../helpers/dateHelpers";
import { HomeStackParams } from "../types";

const CollectionPage_GetCollection_Query = graphql(
  `
    query CollectionPage_GetCollection($collectionId: ID!) {
      getCollection(id: $collectionId) {
        __typename
        id
        date
        description
        __typename
        ... on ClassParticipationCollection {
          environment {
            label {
              fi
            }
            code
            color
          }
          learningObjectives {
            code
            label {
              fi
            }
          }
        }
        module {
          group {
            name
            id
          }
        }
        evaluations {
          id
          __typename
          ...EvaluationsAccordion_Evaluation
        }
      }
    }
  `,
  [EvaluationsAccordion_Evaluation_Fragment]
);

export default function CollectionView({ route: { params }, navigation }: NativeStackScreenProps<HomeStackParams, "collection">) {
  const { data, loading } = useQuery(CollectionPage_GetCollection_Query, {
    variables: { collectionId: params.id },
  });

  const { t } = useTranslation();

  if (loading || !data) return <LoadingIndicator />;

  const collection = data.getCollection;

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingHorizontal: "lg" }}>
      {isClassParticipationCollection<WithTypename<typeof collection, "ClassParticipationCollection">>(collection) ? (
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ gap: 30, paddingBottom: 100, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <CView>
            {isClassParticipationCollection<WithTypename<typeof collection, "ClassParticipationCollection">>(collection) && (
              <CText style={{ fontSize: "title", fontWeight: "500" }}>{collection.environment.label.fi}</CText>
            )}
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{formatDate(collection.date)}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>{collection.module.group.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>
              {t("evaluation-count", "{{count}} arviointia", { count: collection.evaluations.length })}
            </CText>
            {isClassParticipationCollection<WithTypename<typeof collection, "ClassParticipationCollection">>(collection) && (
              <>
                <CText style={{ paddingTop: "md", fontSize: "md", fontWeight: "500" }}>{t("learning-objectives", "Oppimistavoitteet:")}</CText>
                {collection.learningObjectives.map((obj) => {
                  return (
                    <CText key={obj.code}>
                      <CText style={{ fontSize: "sm", fontWeight: "500" }}>{obj.code}: </CText>
                      <CText style={{ fontSize: "sm", fontWeight: "300" }}>{obj.label.fi}</CText>
                    </CText>
                  );
                })}
              </>
            )}
            {collection.description && (
              <CView>
                <CText style={{ paddingTop: "md", fontSize: "md", fontWeight: "500" }}>{t("additional-infos", "Lisätiedot: ")}</CText>
                <CText style={{ fontSize: "sm", fontWeight: "300" }}>{collection.description}</CText>
              </CView>
            )}
          </CView>
          <CView style={{ gap: 10, width: "100%" }}>
            <SingleEvaluationHistogram
              evaluations={collection.evaluations as WithTypename<(typeof collection.evaluations)[number], "ClassParticipationEvaluation">[]}
            />
          </CView>
          <CView style={{ gap: 10 }}>
            <CView style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluations", "Arvioinnit")}</CText>
              {!params.archived && (
                <CButton
                  size="small"
                  variant="outline"
                  title={t("edit-all", "Muokkaa kaikkia")}
                  onPress={() => {
                    navigation.navigate("edit-all-evaluations", { collectionId: collection.id });
                  }}
                />
              )}
            </CView>
            {isClassParticipationCollection<WithTypename<typeof collection, "ClassParticipationCollection">>(collection) && (
              <EvaluationsAccordion
                allowEditing={!params.archived}
                evaluations={collection.evaluations as WithTypename<(typeof collection.evaluations)[number], "ClassParticipationEvaluation">[]}
                type="student"
                onAccordionButtonPress={(id) => navigation.navigate("edit-evaluation", { evaluationId: id })}
              />
            )}
          </CView>
        </ScrollView>
      ) : (
        <CText>
          {t("you-should-not-end-up-here", "Sinun ei kuuluisi päätyä tälle näkymälle. Jos viitsit, niin ilmoita asiasta kehittäjille info@arwi.fi.")}
        </CText>
      )}
    </Layout>
  );
}
