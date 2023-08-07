import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import SingleEvaluationHistogram from "../../../components/charts/SingleEvaluationHistogram";
import EvaluationsAccordion from "../../../components/EvaluationsAccordion";
import Layout from "../../../components/Layout";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { formatDate } from "../../../helpers/dateHelpers";
import { HomeStackParams } from "../types";

const CollectionPage_GetCollection_Query = graphql(`
  query CollectionPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      description
      environment {
        label
        code
        color
      }
      classYear {
        group {
          name
          id
        }
      }
      learningObjectives {
        code
        label
      }
      evaluations {
        id
        ...EvaluationsAccordion_Evaluation
      }
    }
  }
`);

export default function CollectionView({ route: { params }, navigation }: NativeStackScreenProps<HomeStackParams, "collection">) {
  const { data, loading } = useQuery(CollectionPage_GetCollection_Query, {
    variables: { collectionId: params.id },
  });

  const { t } = useTranslation();

  if (loading || !data) return <LoadingIndicator />;

  const collection = data.getCollection;

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white", paddingHorizontal: "lg" }}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ gap: 30, paddingBottom: 100, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <CView>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{collection.environment.label}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>{formatDate(collection.date)}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>{collection.classYear.group.name}</CText>
          <CText style={{ fontSize: "md", fontWeight: "300" }}>
            {t("evaluation-count", "{{count}} arviointia", { count: collection.evaluations.length })}
          </CText>
          <CText style={{ paddingTop: "md", fontSize: "md", fontWeight: "500" }}>{t("learning-objectives", "Oppimistavoitteet:")}</CText>
          {collection.learningObjectives.map((obj) => {
            return (
              <CText key={obj.code}>
                <CText style={{ fontSize: "sm", fontWeight: "500" }}>{obj.code}: </CText>
                <CText style={{ fontSize: "sm", fontWeight: "300" }}>{obj.label}</CText>
              </CText>
            );
          })}
        </CView>
        <CView style={{ gap: 10, width: "100%" }}>
          <SingleEvaluationHistogram evaluations={collection.evaluations} />
        </CView>
        <CView style={{ gap: 10 }}>
          <CText style={{ fontSize: "title", fontWeight: "500" }}>{t("evaluations", "Arvioinnit")}</CText>
          <EvaluationsAccordion
            evaluations={collection.evaluations}
            titleFrom="student"
            onAccordionButtonPress={(id) => navigation.navigate("edit-evaluation", { evaluationId: id })}
          />
        </CView>
      </ScrollView>
    </Layout>
  );
}
