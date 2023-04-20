import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { BoxProps } from "@chakra-ui/react";
import graphqlClient from "@/graphql-client";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import PageWrapper from "@/components/server-components/PageWrapper";
import { CreateCollectionPage_GetGroupQuery } from "@/gql/graphql";
import { StudentParticipation } from "@/components/functional/StudentParticipationList";
import useSWR, { SWRConfig } from "swr";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import UpdateCollectionForm, {
  FormData,
} from "@/components/functional/UpdateCollectionForm";

const CreateCollectionPage_GetGroup_Query = graphql(`
  query CreateCollectionPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      currentClassYear {
        id
      }
      ...UpdateCollectionForm_Group
    }
  }
`);

const CreateCollectionPage_CreateCollection_Mutation = graphql(`
  mutation CreateCollectionPage_CreateCollection(
    $createCollectionInput: CreateCollectionInput!
    $classYearId: ID!
  ) {
    createCollection(data: $createCollectionInput, classYearId: $classYearId) {
      id
    }
  }
`);

function CreateCollectionPageContent() {
  const router = useRouter();
  const groupId = router.query.groupId as string;

  const { data } = useSWR<CreateCollectionPage_GetGroupQuery>(
    `group/${groupId}/create-collection`,
    () =>
      graphqlClient.request(CreateCollectionPage_GetGroup_Query, { groupId })
  );

  if (!data) return <LoadingIndicator />;
  const { getGroup: group } = data;

  const handleSubmit = async (
    values: FormData,
    participations: StudentParticipation[]
  ) => {
    const { description, ...rest } = values;
    try {
      const { createCollection } = await graphqlClient.request(
        CreateCollectionPage_CreateCollection_Mutation,
        {
          classYearId: group.currentClassYear.id,
          createCollectionInput: {
            ...rest,
            description: description.length > 0 ? description : null,
            evaluations: participations.map((it) => ({
              studentId: it.student.id,
              wasPresent: it.wasPresent,
            })),
          },
        }
      );
      router.push(`/collection/${createCollection.id}/edit-evaluations`);
    } catch (error) {
      console.error("Error happened:", error);
    }
  };

  return (
    <PageWrapper display="flex" flexDirection="column">
      <UpdateCollectionForm onSubmit={handleSubmit} group={group} />
    </PageWrapper>
  );
}
type CreateCollectionPageProps = BoxProps & {
  data: CreateCollectionPage_GetGroupQuery;
};

export default function GroupOverviewPage({ data }: CreateCollectionPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <CreateCollectionPageContent />
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
}: GetStaticPropsContext<{ groupId: string }>) {
  if (!params) throw new Error("Unexpected error, no params");
  const data = await serverRequest(CreateCollectionPage_GetGroup_Query, {
    groupId: params.groupId,
  });
  return {
    props: {
      data,
    },
  };
}
