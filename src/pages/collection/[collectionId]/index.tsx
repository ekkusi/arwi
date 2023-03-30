import PageWrapper from "@/components/server-components/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Box, Text } from "@chakra-ui/react";
import BackwardsLink from "@/components/general/BackwardsLink";
import { CollectionPage_GetCollectionQuery } from "@/gql/graphql";
import { formatRatingStringWithNull } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { GetStaticPropsContext } from "next";
import graphqlClient from "@/graphql-client";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoadingIndicator from "@/components/general/LoadingIndicator";

const CollectionPage_GetCollection_Query = graphql(`
  query CollectionPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      type
      group {
        name
        id
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
  }
`);

type CollectionPageProps = {
  data: CollectionPage_GetCollectionQuery;
};

export default function CollectionPage({
  data: fallbackData,
}: CollectionPageProps) {
  const router = useRouter();
  const collectionId = router.query.collectionId as string;

  const { data } = useSWR<CollectionPage_GetCollectionQuery>(
    `collection/${collectionId}`,
    () =>
      graphqlClient.request(CollectionPage_GetCollection_Query, {
        collectionId,
      }),
    { fallbackData }
  );

  if (!data) return <LoadingIndicator />;

  const { getCollection: collection } = data;
  const sortedEvaluations = collection.evaluations.sort((a, b) =>
    a.student.name.localeCompare(b.student.name)
  );

  return (
    <PageWrapper>
      <BackwardsLink href={`/group/${collection.group?.id}`}>
        Takaisin ryhmän yhteenvetoon
      </BackwardsLink>
      <Text as="h1">Arvioinnin yhteenveto</Text>
      <Text as="h2">Ryhmä: {collection.group?.name}</Text>
      <Text>Tyyppi: {collection.type}</Text>
      <Text mb="3">
        Päivämäärä: {formatDate(new Date(collection.date), "dd.MM.yyyy")}
      </Text>
      <Text as="h2">Arvioinnit:</Text>
      {sortedEvaluations.length > 0 ? (
        sortedEvaluations.map((evaluation) => (
          <Box key={evaluation.id} mb="2">
            <Text fontWeight="semibold">{evaluation.student.name}</Text>
            <Text color={evaluation.wasPresent ? "green" : "red"}>
              {evaluation.wasPresent ? "Paikalla" : "Poissa"}
            </Text>
            <Text>
              Käyttäytyminen:{" "}
              {formatRatingStringWithNull(evaluation.behaviourRating)}
            </Text>
            <Text>
              Taidot: {formatRatingStringWithNull(evaluation.skillsRating)}
            </Text>
            {!!evaluation.notes && <Text mt="2">{evaluation.notes}</Text>}
          </Box>
        ))
      ) : (
        <Text>Ei arviointeja</Text>
      )}
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ collectionId: string }>) {
  if (!params) throw new Error("Unexpected error, no params found");

  const data = await serverRequest(CollectionPage_GetCollection_Query, {
    collectionId: params.collectionId,
  });

  return { props: { data } };
}
