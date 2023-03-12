"use client";

import { Box, Text } from "@/components/chakra";
import BackwardsLink from "@/components/general/BackwardsLink";
import { FragmentType, graphql, useFragment } from "@/gql";
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

type EditGroupPageContentProps = {
  group: FragmentType<typeof EditGroupPageContent_GroupFragment>;
};

export default function EditGroupPageContent({
  group: groupFragment,
}: EditGroupPageContentProps) {
  const group = useFragment(EditGroupPageContent_GroupFragment, groupFragment);
  return (
    <>
      <BackwardsLink href={`/group/${group.id}`}>
        Takaisin yhteenvetoon
      </BackwardsLink>
      <Text as="h1">Ryhmän muokkaus</Text>
      <Text as="h2" mb="5">
        Nimi: {group.name}
      </Text>
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
