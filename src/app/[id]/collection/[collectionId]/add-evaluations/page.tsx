import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import AddEvaluationsList from "./AddEvaluationsList";

type AddEvaluationsPageProps = {
  params: { collectionId: string };
};

const AddEvaluationsPage_GetCollectionQuery = graphql(`
  query AddEvaluationsPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      class {
        id
        teacher {
          id
        }
      }
      ...AddEvaluationsList_Collection
    }
  }
`);

export default async function AddEvaluationsPage({
  params,
}: AddEvaluationsPageProps) {
  const { getCollection } = await serverRequest(
    AddEvaluationsPage_GetCollectionQuery,
    {
      collectionId: params.collectionId,
    }
  );
  return (
    <PageWrapper>
      <Text as="h1">Arviointien lisäys</Text>
      <AddEvaluationsList collection={getCollection} />
    </PageWrapper>
  );
}
