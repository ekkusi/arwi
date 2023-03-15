"use client";

import { Box, Text, useToast } from "@/components/chakra";
import BackwardsLink from "@/components/general/BackwardsLink";
import InputWithError from "@/components/general/InputWithError";
import { FragmentType, graphql, useFragment } from "@/gql";
import graphqlClient from "@/graphql-client";
import { formatDate } from "@/utils/dateUtils";
import DeleteGroupButton from "./DeleteGroupButton";
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
      id
      date
      type
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
  const group = useFragment(EditGroupPageContent_GroupFragment, groupFragment);
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
      <UpdateStudentsList students={group.students} />
      <Text as="h2" mt="5">
        Arvioinnit:
      </Text>
      {group.evaluationCollections.length > 0 ? (
        <Box>
          {group.evaluationCollections.map((collection) => (
            <Box>
              <Text as="span" textStyle="italic" mr="1">
                {formatDate(new Date(collection.date), "dd.MM.yyyy")}:
              </Text>
              <Text as="span">{collection.type}</Text>
            </Box>
          ))}
        </Box>
      ) : (
        <Text>Ei vielä arviointeja</Text>
      )}
      <DeleteGroupButton mt="5" width="100%" group={group} />
    </>
  );
}
