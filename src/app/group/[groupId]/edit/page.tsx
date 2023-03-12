import PageWrapper from "@/app/(server-components)/PageWrapper";
import BackwardsLink from "@/components/general/BackwardsLink";
import { Box, Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import { formatDate } from "@/utils/dateUtils";
import DeleteGroupButton from "./DeleteGroupButton";
import UpdateStudentsList from "./UpdateStudentsList";

// Necessary for revalidation to work
export const dynamic = "force-static";

type EditGroupPageProps = {
  params: {
    groupId: string;
  };
};

const EditGroupPage_GetGroupQuery = graphql(`
  query EditGroupPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
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
  }
`);

export default async function EditGroupPage({ params }: EditGroupPageProps) {
  // const session = await getSessionOrRedirect();
  const { getGroup: group } = await serverRequest(EditGroupPage_GetGroupQuery, {
    groupId: params.groupId,
  });
  return (
    <PageWrapper>
      <BackwardsLink href={`/group/${params.groupId}`}>
        Takaisin yhteenvetoon
      </BackwardsLink>
      {/* TODO: Show lessons etc... */}
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
    </PageWrapper>
  );
}
