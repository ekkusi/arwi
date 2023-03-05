import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Box, Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { Rating } from "@/gql/graphql";
import { serverRequest } from "@/pages/api/graphql";
import { formatRatingString } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";

export const dynamic = "force-static";

type CollectionPageProps = {
  params: { collectionId: string };
};

const CollectionPage_GetCollectionQuery = graphql(`
  query CollectionPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      type
      class {
        name
      }
      evaluations {
        id
        student {
          id
          name
        }
        wasPresent
        skillsRating
        behaviourRating
      }
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
  const getRatingString = (rating: Rating | null | undefined) => {
    return rating ? formatRatingString(rating) : "Ei arvioitu";
  };
  return (
    <PageWrapper>
      <Text as="h1">Arvioinnin yhteenveto</Text>
      <Text as="h2">Luokka: {collection.class.name}</Text>
      <Text>Tyyppi: {collection.type}</Text>
      <Text mb="3">
        Päivämäärä: {formatDate(new Date(collection.date), "dd.MM.yyyy")}
      </Text>
      <Text as="h2">Arvioinnit:</Text>
      {collection.evaluations.length > 0 ? (
        collection.evaluations.map((evaluation) => (
          <Box key={evaluation.id} mb="2">
            <Text fontWeight="semibold">{evaluation.student.name}</Text>
            <Text color={evaluation.wasPresent ? "green" : "red"}>
              {evaluation.wasPresent ? "Paikalla" : "Poissa"}
            </Text>
            <Text>
              Käyttäytyminen: {getRatingString(evaluation.behaviourRating)}
            </Text>
            <Text>Taidot: {getRatingString(evaluation.skillsRating)}</Text>
          </Box>
        ))
      ) : (
        <Text>Ei arviointeja</Text>
      )}
    </PageWrapper>
  );
}
