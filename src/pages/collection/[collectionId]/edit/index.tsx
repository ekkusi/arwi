import { Box, Button, Text, useToast } from "@chakra-ui/react";
import UpdateEvaluationCard from "@/components/functional/UpdateEvaluationCard";
import PageWrapper from "@/components/server-components/PageWrapper";
import { graphql } from "@/gql";
import {
  UpdateEvaluationsPage_GetCollectionQuery,
  UpdateEvaluationCard_EvaluationFragment as Evaluation,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { serverRequest } from "@/pages/api/graphql";
import { getErrorMessage } from "@/utils/errorUtils";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import NoPrefetchLink from "@/components/general/NoPrefetchLink";
import useSWR, { SWRConfig } from "swr";
import LoadingIndicator from "@/components/general/LoadingIndicator";

const UpdateEvaluationsPage_GetCollection_Query = graphql(`
  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {
    getCollection(id: $collectionId) {
      id
      evaluations {
        id
        wasPresent
        skillsRating
        behaviourRating
        notes
        ...UpdateEvaluationCard_Evaluation
      }
    }
  }
`);

const UpdateEvaluationsPage_UpdateEvaluations_Mutation = graphql(`
  mutation UpdateEvaluationsPage_UpdateEvaluations(
    $updateEvaluationsInput: [UpdateEvaluationInput!]!
    $collectionId: ID!
  ) {
    updateEvaluations(
      data: $updateEvaluationsInput
      collectionId: $collectionId
    )
  }
`);

function UpdateEvaluationsPageContent() {
  const router = useRouter();
  const collectionId = router.query.collectionId as string;

  const { data } = useSWR<UpdateEvaluationsPage_GetCollectionQuery>(
    `collection/${collectionId}`,
    () =>
      graphqlClient.request(UpdateEvaluationsPage_GetCollection_Query, {
        collectionId,
      })
  );

  const toast = useToast();

  const [evaluations, setEvaluations] = useState(() => [
    ...(data ? data.getCollection.evaluations.filter((e) => e.wasPresent) : []),
  ]);
  const [isCreating, setIsCreating] = useState(false);

  if (!data) return <LoadingIndicator />;

  const { getCollection: collection } = data;

  const onChanged = (evaluation: Evaluation) => {
    const newEvaluations = evaluations.map((e) => {
      if (e.id === evaluation.id) {
        return evaluation;
      }
      return e;
    });
    setEvaluations(newEvaluations);
  };

  // Add evaluations and navigate to the collection page
  const createEvaluations = async () => {
    setIsCreating(true);
    try {
      await graphqlClient.request(
        UpdateEvaluationsPage_UpdateEvaluations_Mutation,
        {
          updateEvaluationsInput: evaluations.map((evaluation) => ({
            id: evaluation.id,
            wasPresent: evaluation.wasPresent,
            skillsRating: evaluation.skillsRating,
            behaviourRating: evaluation.behaviourRating,
            notes: evaluation.notes,
          })),
          collectionId: collection.id,
        }
      );
      setIsCreating(false);
      router.push(`/`);
      toast({
        title: `Arviointi tehty onnistuneesti!`,
        status: "success",
        position: "top",
        description: (
          <Text>
            Siirry tarkastelemaan arviointia{" "}
            <Text
              as={NoPrefetchLink}
              textDecoration="underline"
              color="inherit"
              href={`/collection/${collection.id}`}
              onClick={() => {
                toast.closeAll();
              }}
            >
              tästä
            </Text>
          </Text>
        ),
        isClosable: true,
      });
    } catch (error: any) {
      setIsCreating(false);
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return (
    <PageWrapper p="0">
      <Box
        height="calc(100vh - 58px)"
        p="4"
        scrollSnapType="y mandatory"
        overflowY="scroll"
        onScrollCapture={() => {
          if (document?.activeElement?.tagName === "TEXTAREA") {
            const textAreaEl = document.activeElement as HTMLTextAreaElement;
            textAreaEl.blur();
          }
        }}
      >
        {evaluations.length > 0 ? (
          evaluations.map((evaluation, index) => (
            <UpdateEvaluationCard
              key={evaluation.id}
              scrollSnapAlign={
                index === evaluations.length - 1 ? "end" : "center"
              }
              scrollSnapStop="always"
              evaluation={evaluation}
              onChanged={onChanged}
            >
              {index === evaluations.length - 1 && (
                <Button
                  isLoading={isCreating}
                  onClick={createEvaluations}
                  width="100%"
                  mt="6"
                >
                  Luo arvioinnit
                </Button>
              )}
            </UpdateEvaluationCard>
          ))
        ) : (
          <Box p="5">
            <Text as="h1">Arvioinnin muokkaus</Text>
            <Text>Ei arviointeja kokoelmassa</Text>
          </Box>
        )}
      </Box>
    </PageWrapper>
  );
}
type UpdateEvaluationsPageProps = {
  data: UpdateEvaluationsPage_GetCollectionQuery;
};

export default function UpdateEvaluationsPage({
  data,
}: UpdateEvaluationsPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <UpdateEvaluationsPageContent />
    </SWRConfig>
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
  if (!params) throw new Error("Unexpected error, no params");
  const data = await serverRequest(UpdateEvaluationsPage_GetCollection_Query, {
    collectionId: params.collectionId,
  });

  // Pass data to the page via props
  return { props: { data } };
}
