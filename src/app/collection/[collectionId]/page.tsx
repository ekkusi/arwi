import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import CollectionPageContent from "./CollectionPageContent";

export const dynamic = "force-dynamic";

type CollectionPageProps = {
  params: { collectionId: string };
};

const CollectionPage_GetCollectionQuery = graphql(`
  query CollectionPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      ...CollectionPageContent_Collection
    }
  }
`);

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { getCollection: collection } = await serverRequest(
    CollectionPage_GetCollectionQuery,
    {
      collectionId: params.collectionId,
    }
  );
  return (
    <PageWrapper>
      <CollectionPageContent collection={collection} />
    </PageWrapper>
  );
}
