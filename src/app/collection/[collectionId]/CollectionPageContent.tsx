import { Box, Text } from "@/components/chakra";
import { FragmentType, graphql, useFragment } from "@/gql";
import { Rating } from "@/gql/graphql";
import { formatRatingString } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";

const CollectionPageContent_CollectionFragment = graphql(`
  fragment CollectionPageContent_Collection on EvaluationCollection {
    id
    date
    type
    group {
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
      notes
    }
  }
`);

type CollectionPageContentProps = {
  collection: FragmentType<typeof CollectionPageContent_CollectionFragment>;
};

export default function CollectionPageContent({
  collection: collectionFragment,
}: CollectionPageContentProps) {
  const collection = useFragment(
    CollectionPageContent_CollectionFragment,
    collectionFragment
  );

  const getRatingString = (rating: Rating | null | undefined) => {
    return rating ? formatRatingString(rating) : "Ei arvioitu";
  };

  return (
    <>
      <Text as="h1">Arvioinnin yhteenveto</Text>
      <Text as="h2">Ryhmä: {collection.group.name}</Text>
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
            {!!evaluation.notes && <Text mt="2">{evaluation.notes}</Text>}
          </Box>
        ))
      ) : (
        <Text>Ei arviointeja</Text>
      )}
    </>
  );
}
