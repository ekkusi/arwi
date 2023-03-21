import PageWrapper from "@/components/server-components/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import BackwardsLink from "@/components/general/BackwardsLink";
import InputWithError from "@/components/general/InputWithError";
import graphqlClient from "@/graphql-client";
import { GetStaticPropsContext } from "next";
import ConfirmationModal from "@/components/general/ConfirmationModal";
import { useToast, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import UpdateStudentsList from "@/components/functional/UpdateStudentsList";
import UpdateCollectionsList from "@/components/functional/UpdateCollectionsList";
import { EditGroupPage_GetGroupQuery } from "@/gql/graphql";
import useSWR, { SWRConfig } from "swr";
import LoadingIndicator from "@/components/general/LoadingIndicator";

const EditGroupPage_GetGroup_Query = graphql(`
  query EditGroupPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      students {
        ...UpdateStudentsList_Student
      }
      evaluationCollections {
        ...UpdateCollectionsList_Collection
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

const EditGroupPage_DeleteGroup_Mutation = graphql(`
  mutation EditGroupPage_DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId)
  }
`);

function EditGroupPageContent() {
  const router = useRouter();
  const groupId = router.query.groupId as string;
  const { data, isLoading, isValidating } = useSWR<EditGroupPage_GetGroupQuery>(
    `group/${groupId}/edit`,
    () => graphqlClient.request(EditGroupPage_GetGroup_Query, { groupId })
  );
  /* eslint-disable*/
  console.log("edit: data", data);
  console.log("edit: isLoading", isLoading);
  console.log("edit: isValidating", isValidating);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const deleteGroup = async () => {
    setLoading(true);
    setIsModalOpen(false);
    await graphqlClient.request(EditGroupPage_DeleteGroup_Mutation, {
      groupId: group.id,
    });
    setLoading(false);
    router.push("/");
    toast({
      title: `Ryhmä '${group.name}' poistettu onnistuneesti.`,
      status: "success",
      isClosable: true,
    });
  };

  return (
    <PageWrapper>
      <BackwardsLink href={`/group/${group.id}`} prefetch={false}>
        Takaisin yhteenvetoon
      </BackwardsLink>
      <Text as="h1">Ryhmän muokkaus</Text>
      <Text as="h2">Nimi:</Text>
      <InputWithError
        value={group.name}
        onBlur={(e, isValid) => isValid && updateName(e.target.value)}
        containerProps={{ mb: "5" }}
      />
      <Text as="h2" mb="5">
        Oppilaat:
      </Text>
      <UpdateStudentsList students={group.students} groupId={group.id} />
      <Text as="h2" mt="5">
        Arvioinnit:
      </Text>
      {group.evaluationCollections.length > 0 ? (
        <UpdateCollectionsList collections={group.evaluationCollections} />
      ) : (
        <Text>Ei vielä arviointeja</Text>
      )}
      <Button
        colorScheme="red"
        variant="alert"
        isLoading={loading}
        onClick={() => setIsModalOpen(true)}
        mt="8"
        width="100%"
      >
        Poista ryhmä
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => deleteGroup()}
      >
        <Text>
          Oletko varma, että haluat poistaa ryhmän? Kaikken ryhmän oppilaiden
          sekä heidän arviointien tiedot poistuvat samalla lopullisesti.
        </Text>
      </ConfirmationModal>
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

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ groupId: string }>) {
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
