import { graphql } from "@/gql";
import { Box, Button, NextLink, Text } from "@/components/chakra";
import { serverRequest } from "@/pages/api/graphql";
import PageWrapper from "@/app/(server-components)/PageWrapper";
import { getSessionOrRedirect } from "@/utils/session/server";
import GroupList from "@/components/functional/GroupList";

// Necessary for revalidation to work
export const dynamic = "force-dynamic";

const MainPage_GetTeacherQuery = graphql(`
  query MainPage_GetTeacher($teacherId: ID!) {
    getTeacher(id: $teacherId) {
      email
      id
      groups {
        ...GroupList_GroupFragment
      }
    }
  }
`);

export default async function HomePage() {
  const session = await getSessionOrRedirect();
  const { getTeacher: teacher } = await serverRequest(
    MainPage_GetTeacherQuery,
    {
      teacherId: session.user.id,
    }
  );

  return (
    <PageWrapper display="flex" flexDirection="column">
      <Box mb="5">
        <Text as="h2" mb="5">
          Omat ryhmät:
        </Text>
        {teacher.groups.length > 0 ? (
          <GroupList groups={teacher.groups} mb="5" />
        ) : (
          <Text>Et vielä ole tehnyt ryhmiä</Text>
        )}
      </Box>
      <Button as={NextLink} href="/group/create" width="100%">
        {teacher.groups.length > 0 ? "Luo uusi ryhmä" : "Luo ryhmä"}
      </Button>
      <NextLink textAlign="center" display="block" href="/test" mt="auto">
        Puheentunnistus testiin
      </NextLink>
    </PageWrapper>
  );
}
