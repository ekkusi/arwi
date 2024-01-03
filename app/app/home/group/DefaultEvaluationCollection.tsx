import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import { CollectionTypeCategory } from "arwi-backend/src/types";
import { HomeStackParams } from "../types";
import CView from "../../../components/primitives/CView";
import CText from "../../../components/primitives/CText";
import { graphql } from "../../../gql";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CScrollView from "../../../components/primitives/CScrollView";
import { getCollectionTypeTranslation } from "../../../helpers/translation";

const DefaultEvaluationCollection_GetCollection_Query = graphql(`
  query DefaultEvaluationCollection_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      type {
        id
        category
        name
        weight
      }
      evaluations {
        id
        wasPresent
        __typename
        ... on DefaultEvaluation {
          rating
        }
        notes
        student {
          id
          name
          currentModuleEvaluations {
            id
            notes
          }
        }
      }
    }
  }
`);

export default function DefaultEvaluationCollection({ route: { params } }: NativeStackScreenProps<HomeStackParams, "default-evaluation-collection">) {
  const { t } = useTranslation();
  const { data, loading } = useQuery(DefaultEvaluationCollection_GetCollection_Query, {
    variables: { collectionId: params.id },
  });

  if (loading || !data) return <LoadingIndicator />;

  const collection = data.getCollection;

  return (
    <CView style={{ flexGrow: 1, backgroundColor: "white", paddingHorizontal: "lg" }}>
      <CScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 30, paddingBottom: 100, paddingTop: 20 }} showsVerticalScrollIndicator={false}>
        <CView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: "2xl" }}>
          <CView>
            <CText style={{ fontSize: "title", fontWeight: "500" }}>{collection.type.name}</CText>
            <CText style={{ fontSize: "md", fontWeight: "300" }}>
              {getCollectionTypeTranslation(t, collection.type.category as CollectionTypeCategory)}
            </CText>
            <CText>
              <CText style={{ fontSize: "md", fontWeight: "300" }}>{`${t("weight-value", "Painoarvo")}: `}</CText>
              <CText style={{ fontSize: "md", fontWeight: "500" }}>{`${Math.round(collection.type.weight * 100)} / 100 %`}</CText>
            </CText>
          </CView>
        </CView>
      </CScrollView>
    </CView>
  );
}
