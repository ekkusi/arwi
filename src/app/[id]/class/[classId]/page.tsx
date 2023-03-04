import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Box, NextLink, Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import { formatDate } from "@/utils/dateUtils";

// Necessary for revalidation to work
export const dynamic = "force-static";

type ClassOverviewPageProps = {
  params: {
    classId: string;
  };
};

const ClassOverviewPage_GetClassQuery = graphql(`
  query ClassOverviewPage_GetClass($classId: ID!) {
    getClass(id: $classId) {
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

export default async function ClassOverviewPage({
  params,
}: ClassOverviewPageProps) {
  // const session = await getSessionOrRedirect();
  const { getClass } = await serverRequest(ClassOverviewPage_GetClassQuery, {
    classId: params.classId,
  });
  return (
    <PageWrapper>
      {/* TODO: Show lessons etc... */}
      <Text as="h1">Luokka: {getClass.name}</Text>
      <Text as="h2">Oppilaat:</Text>
      {getClass.students.length > 0 ? (
        <Box>
          {getClass.students.map((student) => (
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
      {getClass.evaluationCollections.length > 0 ? (
        <Box>
          {getClass.evaluationCollections.map((collection) => (
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
            href={`${getClass.teacher.id}/class/${getClass.id}/create-collection`}
          >
            Siirry tekemään arviointi
          </NextLink>
        </>
      )}
    </PageWrapper>
  );
}
