import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import UpdateEvaluationsList from "./UpdateEvaluationsList";

type UpdateEvaluationsPageProps = {
  params: { collectionId: string };
};

const UpdateEvaluationsPage_GetCollectionQuery = graphql(`
  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      group {
        id
        teacher {
          id
        }
      }
      ...UpdateEvaluationsList_Collection
    }
  }
`);

export default async function UpdateEvaluationsPage({
  params,
}: UpdateEvaluationsPageProps) {
  const { getCollection } = await serverRequest(
    UpdateEvaluationsPage_GetCollectionQuery,
    {
      collectionId: params.collectionId,
    }
  );
  return (
    <PageWrapper hasNavigation={false}>
      <UpdateEvaluationsList collection={getCollection} />
    </PageWrapper>
  );
}
