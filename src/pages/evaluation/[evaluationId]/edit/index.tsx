import UpdateEvaluationCard from "@/components/functional/UpdateEvaluationCard";
import BackwardsLink from "@/components/general/BackwardsLink";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import PageWrapper from "@/components/server-components/PageWrapper";
import { getFragmentData, graphql } from "@/gql";
import {
  EvaluationEditPage_GetEvaluationQuery,
  UpdateEvaluationCard_EvaluationFragment,
  UpdateEvaluationCard_EvaluationFragmentDoc,
} from "@/gql/graphql";
import graphqlClient from "@/graphql-client";
import { serverRequest } from "@/pages/api/graphql";
import { assertIsError, getErrorMessage } from "@/utils/errorUtils";
import { Button, useToast } from "@chakra-ui/react";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";

const EvaluationEditPage_GetEvaluation_Query = graphql(`
  query EvaluationEditPage_GetEvaluation($evaluationId: ID!) {
    getEvaluation(id: $evaluationId) {
      notes
      id
      skillsRating
      behaviourRating
      student {
        id
      }
      ...UpdateEvaluationCard_Evaluation
    }
  }
`);
const EvaluationsEditPage_UpdateEvaluation_Mutation = graphql(`
  mutation EvaluationsEditPage_UpdateEvaluation(
    $input: UpdateEvaluationInput!
  ) {
    updateEvaluation(data: $input) {
      id
    }
  }
`);

function EvaluationEditPageContent() {
  const router = useRouter();
  const evaluationId = router.query.evaluationId as string;

  const { data } = useSWR<EvaluationEditPage_GetEvaluationQuery>(
    `evaluation/${evaluationId}/edit`,
    () =>
      graphqlClient.request(EvaluationEditPage_GetEvaluation_Query, {
        evaluationId,
      })
  );
  const toast = useToast();

  const [evaluation, setEvaluation] = useState<
    UpdateEvaluationCard_EvaluationFragment | undefined
  >(() =>
    data
      ? getFragmentData(
          UpdateEvaluationCard_EvaluationFragmentDoc,
          data.getEvaluation
        )
      : undefined
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (data)
      setEvaluation(
        getFragmentData(
          UpdateEvaluationCard_EvaluationFragmentDoc,
          data.getEvaluation
        )
      );
  }, [data]);

  if (!data || !evaluation) return <LoadingIndicator />;

  const onChanged = (
    newEvaluation: UpdateEvaluationCard_EvaluationFragment
  ) => {
    setEvaluation(newEvaluation);
  };

  // Add evaluations and navigate to the collection page
  const updateEvaluation = async () => {
    setIsUpdating(true);
    try {
      await graphqlClient.request(
        EvaluationsEditPage_UpdateEvaluation_Mutation,
        {
          input: {
            id: evaluation.id,
            skillsRating: evaluation.skillsRating,
            behaviourRating: evaluation.behaviourRating,
            notes: evaluation.notes,
          },
        }
      );
      setIsUpdating(false);
      router.push({
        pathname: `/student/${evaluation.student.id}`,
        query: {
          expandedEvaluationId: evaluation.id,
        },
      });
      toast({
        title: `Arviointi päivitetty onnistuneesti!`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      assertIsError(error);
      setIsUpdating(false);
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  return (
    <PageWrapper>
      <BackwardsLink href={`/student/${evaluation.student.id}`} mb="3">
        Takaisin yhteenvetoon
      </BackwardsLink>
      <UpdateEvaluationCard
        key={evaluation.id}
        evaluation={data.getEvaluation}
        onChanged={onChanged}
      />
      <Button
        isLoading={isUpdating}
        onClick={updateEvaluation}
        width="100%"
        mt="6"
      >
        Tallenna
      </Button>
    </PageWrapper>
  );
}

type EvaluationEditPageProps = {
  data: EvaluationEditPage_GetEvaluationQuery;
};

export default function StudentPage({ data }: EvaluationEditPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <EvaluationEditPageContent />
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
}: GetStaticPropsContext<{ evaluationId: string }>) {
  if (!params) throw new Error("Unexpected error, no paramss");
  const data = await serverRequest(EvaluationEditPage_GetEvaluation_Query, {
    evaluationId: params.evaluationId,
  });
  return {
    props: {
      data,
    },
  };
}
