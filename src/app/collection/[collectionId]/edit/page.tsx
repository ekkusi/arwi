import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import UpdateEvaluationsPageContent from "./UpdateEvaluationsPageContent";

type UpdateEvaluationsPageProps = {
  params: { collectionId: string };
};

const UpdateEvaluationsPage_GetCollectionQuery = graphql(`
  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      ...UpdateEvaluationsPageContent_Collection
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
    <PageWrapper p={0}>
      <UpdateEvaluationsPageContent collection={getCollection} />
    </PageWrapper>
  );
}
