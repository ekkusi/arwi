import PageWrapper from "@/components/server-components/PageWrapper";
import { graphql } from "@/gql";
import serverRequest from "@/utils/serverRequest";

import InputWithError from "@/components/general/InputWithError";
import graphqlClient from "@/graphql-client";
import { GetStaticPropsContext } from "next";
import { useToast, Text, FormLabel } from "@chakra-ui/react";
import { useRouter } from "next/router";
import UpdateStudentsList from "@/components/functional/UpdateStudentsList";
import UpdateCollectionsList from "@/components/functional/UpdateCollectionsList";
import { EditGroupPage_GetGroupQuery } from "@/gql/graphql";
import useSWR, { SWRConfig } from "swr";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import TopNavigationBar from "@/components/functional/TopNavigationBar";

const EditGroupPage_GetGroup_Query = graphql(`
  query EditGroupPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      subject {
        label
      }
      students {
        ...UpdateStudentsList_Student
      }
      currentClassYear {
        id
        info {
          label
        }
        evaluationCollections {
          ...UpdateCollectionsList_Collection
        }
      }
    }
  }
`);

const EditGroupPage_UpdateGroup_Mutation = graphql(`
  mutation EditGroupPage_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {
    updateGroup(groupId: $id, data: $input) {
      id
    }
  }
`);

function EditGroupPageContent() {
  const router = useRouter();
  const groupId = router.query.groupId as string;
  const { data } = useSWR<EditGroupPage_GetGroupQuery>(`group/${groupId}/edit`, () =>
    graphqlClient.request(EditGroupPage_GetGroup_Query, { groupId })
  );
  const toast = useToast();

  if (!data) return <LoadingIndicator />;

  const { getGroup: group } = data;

  const updateName = async (name: string) => {
    if (name === group.name) return;
    await graphqlClient.request(EditGroupPage_UpdateGroup_Mutation, {
      id: group.id,
      input: {
        name,
      },
    });

    toast({
      title: "Ryhmän nimi päivitetty.",
      description: `Ryhmän '${group.name}' nimi päivitetty nimeen '${name}'`,
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return (
    <PageWrapper>
      <TopNavigationBar />
      <Text as="h1">Ryhmän muokkaus</Text>
      <FormLabel>Aine: {group.subject.label}</FormLabel>
      <FormLabel>Vuosiluokka: {group.currentClassYear.info.label}</FormLabel>
      <FormLabel>Nimi:</FormLabel>
      <InputWithError
        name="group-name"
        defaultValue={group.name}
        onBlur={(e, isValid) => isValid && updateName(e.target.value)}
        containerProps={{ mb: "5" }}
      />
      <FormLabel mb="3">Oppilaat:</FormLabel>
      <UpdateStudentsList students={group.students} classYearId={group.currentClassYear.id} />
      <FormLabel mt="5">Arvioinnit:</FormLabel>
      {group.currentClassYear.evaluationCollections.length > 0 ? (
        <UpdateCollectionsList collections={group.currentClassYear.evaluationCollections} />
      ) : (
        <Text>Ei vielä arviointeja</Text>
      )}
    </PageWrapper>
  );
}

type EditGroupPageProps = {
  data: EditGroupPage_GetGroupQuery;
};

export default function GroupOverviewPage({ data }: EditGroupPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <EditGroupPageContent />
    </SWRConfig>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ groupId: string }>) {
  if (!params) throw new Error("Unexpected error, no params");
  const data = await serverRequest(EditGroupPage_GetGroup_Query, {
    groupId: params.groupId,
  });
  return {
    props: {
      data,
    },
  };
}
