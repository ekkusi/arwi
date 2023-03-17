"use client";

import { Text, useToast } from "@/components/chakra";
import BackwardsLink from "@/components/general/BackwardsLink";
import InputWithError from "@/components/general/InputWithError";
import { FragmentType, graphql, getFragmentData } from "@/gql";
import graphqlClient from "@/graphql-client";
import DeleteGroupButton from "./DeleteGroupButton";
import UpdateCollectionsList from "./UpdateCollectionsList";
import UpdateStudentsList from "./UpdateStudentsList";

const EditGroupPageContent_GroupFragment = graphql(`
  fragment EditGroupPageContent_Group on Group {
    id
    name
    ...DeleteGroupButton_Group
    students {
      ...UpdateStudentsList_Student
    }
    evaluationCollections {
      ...UpdateCollectionsList_Collection
    }
  }
`);

const EditGroupPageContent_UpdateGroupMutation = graphql(`
  mutation EditGroupPageContent_UpdateGroup(
    $id: ID!
    $input: UpdateGroupInput!
  ) {
    updateGroup(groupId: $id, data: $input) {
      id
    }
  }
`);

type EditGroupPageContentProps = {
  group: FragmentType<typeof EditGroupPageContent_GroupFragment>;
};

export default function EditGroupPageContent({
  group: groupFragment,
}: EditGroupPageContentProps) {
  const group = getFragmentData(
    EditGroupPageContent_GroupFragment,
    groupFragment
  );
  const toast = useToast();

  const updateName = async (name: string) => {
    if (name === group.name) return;
    await graphqlClient.request(EditGroupPageContent_UpdateGroupMutation, {
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
    <>
      <BackwardsLink href={`/group/${group.id}`}>
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
      <DeleteGroupButton mt="8" width="100%" group={group} />
    </>
  );
}
