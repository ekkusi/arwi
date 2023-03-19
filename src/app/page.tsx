import { graphql } from "@/gql";
import {
  Box,
  Button,
  Flex,
  IconButton,
  NextLink,
  Text,
} from "@/components/chakra";
import { serverRequest } from "@/pages/api/graphql";
import PageWrapper from "@/app/(server-components)/PageWrapper";
import { getSessionOrRedirect } from "@/utils/session/server";
import GroupList from "@/components/functional/GroupList";
import { IoAddSharp } from "react-icons/io5";

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
        <Text as="h1" fontSize="lg" fontStyle="italic" textAlign="center">
          ARWI
        </Text>
        <Flex mb="2" justifyContent="space-between" alignItems="center">
          <Text as="h2" fontSize="lg" mb="0">
            Omat ryhmät:
          </Text>
          <IconButton
            variant="link"
            size="lg"
            as={NextLink}
            icon={<IoAddSharp />}
            href="/group/create"
            ml="auto"
            aria-label="Luo uusi luokka"
          />
        </Flex>
        {teacher.groups.length > 0 ? (
          <GroupList groups={teacher.groups} mb="5" />
        ) : (
          <>
            <Text mb="3" mt="5">
              Sinulla ei vielä ole ryhmiä
            </Text>
            <Button as={NextLink} href="/group/create" width="100%">
              Luo ensimmäinen ryhmä
            </Button>
          </>
        )}
      </Box>
    </PageWrapper>
  );
}
