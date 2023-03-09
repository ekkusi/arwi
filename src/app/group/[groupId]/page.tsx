import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Box, Button, Flex, NextLink, Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import { formatDate } from "@/utils/dateUtils";

// Necessary for revalidation to work
export const dynamic = "force-static";

type GroupOverviewPageProps = {
  params: {
    groupId: string;
  };
};

const GroupOverviewPage_GetGroupQuery = graphql(`
  query GroupOverviewPage_GetGroup($groupId: ID!) {
    getGroup(id: $groupId) {
      id
      name
      students {
        id
        name
      }
      evaluationCollections {
        id
        date
        type
        description
        evaluations {
          student {
            name
          }
          skillsRating
          behaviourRating
        }
      }
    }
  }
`);

export default async function GroupOverviewPage({
  params,
}: GroupOverviewPageProps) {
  // const session = await getSessionOrRedirect();
  const { getGroup } = await serverRequest(GroupOverviewPage_GetGroupQuery, {
    groupId: params.groupId,
  });
  return (
    <PageWrapper>
      {/* TODO: Show lessons etc... */}
      <Text as="h1">Ryhmä: {getGroup.name}</Text>
      <Text as="h2" mb="5">
        Oppilaat:
      </Text>
      {getGroup.students.length > 0 ? (
        <Flex flexDirection="column" mb="5">
          {getGroup.students.map((student) => (
            <Button
              key={student.id}
              variant="outline"
              size="sm"
              as={NextLink}
              href={`/student/${student.id}`}
              _notLast={{ mb: 3 }}
            >
              {student.name}
            </Button>
          ))}
        </Flex>
      ) : (
        <Box mb="5">
          <Text>Ei oppilaita</Text>
        </Box>
      )}
      <Text as="h2" mt="5">
        Arvioinnit:
      </Text>
      {getGroup.evaluationCollections.length > 0 ? (
        <Box>
          {getGroup.evaluationCollections.map((collection) => (
            <Box>
              <Text as="span" textStyle="italic" mr="1">
                {formatDate(new Date(collection.date), "dd.MM.yyyy")}:
              </Text>
              <NextLink href={`/collection/${collection.id}`}>
                {collection.type}
              </NextLink>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Text>Ei vielä arviointeja</Text>
          <NextLink href={`/group/${getGroup.id}/create-collection`}>
            Siirry tekemään arviointi
          </NextLink>
        </>
      )}
    </PageWrapper>
  );
}
