import PageWrapper from "@/components/server-components/PageWrapper";
import { getFragmentData, graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Text } from "@chakra-ui/react";
import BackwardsLink from "@/components/general/BackwardsLink";
import {
  CollectionPage_GetCollectionQuery,
  EvaluationsAccordion_EvaluationFragmentDoc,
} from "@/gql/graphql";
import { formatDate } from "@/utils/dateUtils";
import { GetStaticPropsContext } from "next";
import graphqlClient from "@/graphql-client";
import { useRouter } from "next/router";
import useSWR from "swr";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import BorderedCard from "@/components/server-components/primitives/BorderedCard";
import EvaluationsAccordion, {
  EvaluationsAccordionHandlers,
} from "@/components/functional/EvaluationsAccordion";
import { useEffect, useRef } from "react";

const CollectionPage_GetCollection_Query = graphql(`
  query CollectionPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      date
      type
      description
      group {
        name
        id
      }
      evaluations {
        id
        ...EvaluationsAccordion_Evaluation
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

  const evaluationsAccordionRef = useRef<EvaluationsAccordionHandlers>(null);

  const { data } = useSWR<CollectionPage_GetCollectionQuery>(
    `collection/${collectionId}`,
    () =>
      graphqlClient.request(CollectionPage_GetCollection_Query, {
        collectionId,
      }),
    { fallbackData }
  );

  useEffect(() => {
    // Expand the evaluation matching the expandedEvaluationId query param if set
    const { expandedEvaluationId } = router.query;
    if (
      !data ||
      !expandedEvaluationId ||
      typeof expandedEvaluationId !== "string"
    )
      return;

    const expandedEvaluation = data.getCollection.evaluations.find(
      (it) => it.id === expandedEvaluationId
    );
    if (!expandedEvaluation) return;

    evaluationsAccordionRef.current?.expandEvaluation(
      getFragmentData(
        EvaluationsAccordion_EvaluationFragmentDoc,
        expandedEvaluation
      )
    );
  }, [router.query, data]);
  if (!data) return <LoadingIndicator />;

  const { getCollection: collection } = data;

  return (
    <PageWrapper>
      <BackwardsLink href={`/group/${collection.group?.id}`}>
        Takaisin ryhmän yhteenvetoon
      </BackwardsLink>
      <BorderedCard my="3" border="none">
        <Text as="h1" textAlign="center" mb="2" fontSize="2xl">
          Arvioinnin yhteenveto
        </Text>
        <Text>
          <Text fontWeight="semibold" as="span">
            Aihe:
          </Text>{" "}
          {collection.type}
        </Text>
        <Text>
          <Text fontWeight="semibold" as="span">
            Päivämäärä:
          </Text>{" "}
          {formatDate(new Date(collection.date))}
        </Text>
        <Text>
          <Text fontWeight="semibold" as="span">
            Ryhmä:
          </Text>{" "}
          {collection.group?.name}
        </Text>
        {collection.description && <Text mt="2">{collection.description}</Text>}
      </BorderedCard>
      <Text as="h2">Arvioinnit:</Text>

      {collection.evaluations.length > 0 ? (
        <EvaluationsAccordion
          ref={evaluationsAccordionRef}
          titleFrom="student"
          evaluations={collection.evaluations}
        />
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
