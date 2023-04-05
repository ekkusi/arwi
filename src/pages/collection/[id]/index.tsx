import PageWrapper from "@/components/server-components/PageWrapper";
import { getFragmentData, graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Divider, Text, useToast } from "@chakra-ui/react";
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
import Card from "@/components/server-components/primitives/Card";
import EvaluationsAccordion, {
  EvaluationsAccordionHandlers,
} from "@/components/functional/EvaluationsAccordion";
import { useEffect, useRef, useState } from "react";
import TopNavigationBar from "@/components/functional/TopNavigationBar";
import Popover, { PopoverItem } from "@/components/general/Popover";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "@/components/general/ConfirmationModal";

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

const CollectionPage_DeleteCollection_Mutation = graphql(`
  mutation CollectionPage_DeleteCollection($id: ID!) {
    deleteCollection(collectionId: $id)
  }
`);

type CollectionPageProps = {
  data: CollectionPage_GetCollectionQuery;
};

export default function CollectionPage({
  data: fallbackData,
}: CollectionPageProps) {
  const router = useRouter();
  const id = router.query.id as string;
  const toast = useToast();

  const evaluationsAccordionRef = useRef<EvaluationsAccordionHandlers>(null);

  const { data } = useSWR<CollectionPage_GetCollectionQuery>(
    `collection/${id}`,
    () =>
      graphqlClient.request(CollectionPage_GetCollection_Query, {
        collectionId: id,
      }),
    { fallbackData }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const dateString = formatDate(new Date(collection.date));

  const deleteGroup = async () => {
    await graphqlClient.request(CollectionPage_DeleteCollection_Mutation, {
      id: collection.id,
    });
    setIsModalOpen(false);
    router.push("/");
    toast({
      title: `Arviointi '${dateString} ${collection.type}' poistettu onnistuneesti.`,
      status: "success",
      isClosable: true,
      position: "top",
    });
  };
  return (
    <PageWrapper>
      <TopNavigationBar>
        <Popover>
          <PopoverItem
            icon={FiEdit}
            as={Link}
            href={`/collection/${collection.id}/edit`}
          >
            Muokkaa
          </PopoverItem>
          <Divider />
          <PopoverItem
            icon={RiDeleteBin6Line}
            color="error"
            onClick={() => setIsModalOpen(true)}
          >
            Poista
          </PopoverItem>
        </Popover>
      </TopNavigationBar>
      <ConfirmationModal
        isOpen={isModalOpen}
        awaitBeforeClose
        onClose={() => setIsModalOpen(false)}
        onAccept={() => deleteGroup()}
      >
        <Text>
          Haluatko varmasti poistaa ryhmän? Kaikki ryhmän oppilaiden sekä heidän
          arviointien tiedot poistuvat samalla.
        </Text>
      </ConfirmationModal>
      <Card my="3" border="none">
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
          {dateString}
        </Text>
        <Text>
          <Text fontWeight="semibold" as="span">
            Ryhmä:
          </Text>{" "}
          {collection.group?.name}
        </Text>
        {collection.description && <Text mt="2">{collection.description}</Text>}
      </Card>
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
}: GetStaticPropsContext<{ id: string }>) {
  if (!params) throw new Error("Unexpected error, no params found");

  const data = await serverRequest(CollectionPage_GetCollection_Query, {
    collectionId: params.id,
  });

  return { props: { data } };
}
