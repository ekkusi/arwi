import PageWrapper from "@/app/(server-components)/PageWrapper";
import { NextLink, Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

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
      evaluations {
        wasPresent
        student {
          id
        }
      }
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
      <Text>Taitaapi olla vielä työn alla tämä sivu</Text>
      <NextLink
        href={`/${getCollection.class.teacher.id}/class/${getCollection.class.id}`}
      >
        Luokan sivulle
      </NextLink>
    </PageWrapper>
  );
}
