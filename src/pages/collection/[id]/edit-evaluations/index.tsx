import { Box, Button, Text, useToast } from "@chakra-ui/react";
import UpdateEvaluationCard from "@/components/functional/UpdateEvaluationCard";
import PageWrapper from "@/components/server-components/PageWrapper";
import { getFragmentData, graphql } from "@/gql";
import {
  UpdateEvaluationsPage_GetCollectionQuery,
  UpdateEvaluationCard_EvaluationFragment as Evaluation,
  UpdateEvaluationCard_EvaluationFragmentDoc,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { serverRequest } from "@/pages/api/graphql";
import { getErrorMessage } from "@/utils/errorUtils";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
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
        student {
          name
        }
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
  const id = router.query.id as string;

  const { data } = useSWR<UpdateEvaluationsPage_GetCollectionQuery>(
    `collection/${id}/edit-evaluations`,
    () =>
      graphqlClient.request(UpdateEvaluationsPage_GetCollection_Query, {
        collectionId: id,
      })
  );

  const toast = useToast();

  const [evaluations, setEvaluations] = useState<Evaluation[]>();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (data) {
      const filteredEvaluations = data.getCollection.evaluations.filter(
        (e) => e.wasPresent
      );
      setEvaluations(
        filteredEvaluations.map((it) =>
          getFragmentData(UpdateEvaluationCard_EvaluationFragmentDoc, it)
        )
      );
    }
  }, [data]);

  if (!data || !evaluations) return <LoadingIndicator />;

  const { getCollection: collection } = data;
  const sortedEvaluations = collection.evaluations
    .filter((e) => e.wasPresent)
    .sort((a, b) => a.student.name.localeCompare(b.student.name));

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
              as={Link}
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
        height="calc(100vh - 74px)"
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
        {sortedEvaluations.length > 0 ? (
          sortedEvaluations.map((evaluation, index) => (
            <UpdateEvaluationCard
              key={evaluation.id}
              scrollSnapAlign={
                index === evaluations.length - 1 ? "end" : "center"
              }
              scrollSnapStop="always"
              evaluation={evaluation}
              onChanged={onChanged}
              hasParticipationToggle={false}
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
}: GetStaticPropsContext<{ id: string }>) {
  if (!params) throw new Error("Unexpected error, no params");
  const data = await serverRequest(UpdateEvaluationsPage_GetCollection_Query, {
    collectionId: params.id,
  });

  // Pass data to the page via props
  return { props: { data } };
}
