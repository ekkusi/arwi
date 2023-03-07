import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Box, NextLink, Text } from "@/components/chakra";
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
        name
      }
      teacher {
        id
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
      <Text as="h2">Oppilaat:</Text>
      {getGroup.students.length > 0 ? (
        <Box>
          {getGroup.students.map((student) => (
            <Text>{student.name}</Text>
          ))}
        </Box>
      ) : (
        <Box>
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
              <NextLink href={`${collection.id}/collection/${collection.id}`}>
                {collection.type}
              </NextLink>
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Text>Ei vielä arviointeja</Text>
          <NextLink
            href={`${getGroup.teacher.id}/group/${getGroup.id}/create-collection`}
          >
            Siirry tekemään arviointi
          </NextLink>
        </>
      )}
    </PageWrapper>
  );
}
