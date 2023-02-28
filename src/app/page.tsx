import { graphql } from "@/gql";
import { Box, Button, Flex, NextLink, Text } from "@/components/chakra";
import { serverRequest } from "@/pages/api/graphql";
import { getSessionOrRedirect } from "@/utils/sessionUtils";
import LogoutButton from "./(auth)/LogoutButton";
import PageWrapper from "./(server-components)/PageWrapper";
import ClassList from "../components/ClassList";

const MainPage_GetTeacherQuery = graphql(`
  query MainPage_GetTeacher($teacherId: ID!) {
    getTeacher(id: $teacherId) {
      email
      id
      classes {
        ...ClassList_ClassFragment
      }
    }
  }
`);

export default async function Home() {
  const { user } = await getSessionOrRedirect();

  const { getTeacher: teacher } = await serverRequest(
    MainPage_GetTeacherQuery,
    {
      teacherId: user.id,
    }
  );

  return (
    <PageWrapper display="flex" flexDirection="column" hasNavigation={false}>
      <NextLink href="/design" display="block" mb="2">
        {"Design sivulle \u2B95"}
      </NextLink>
      <Text as="h1" mb="0" textAlign="center">
        Arwi
      </Text>
      <Box textAlign="center" mb="5">
        <Text as="span" mr="1">
          Kirjautunut käyttäjänä:
        </Text>
        <Text as="span" fontStyle="italic">
          {user.email}
        </Text>
      </Box>
      <Box>
        {teacher ? (
          <>
            <Box mb="5">
              <Text as="h2">Luokat:</Text>
              {teacher.classes.length > 0 ? (
                <ClassList classes={teacher.classes} mb="5" />
              ) : (
                <Text>Et vielä ole tehnyt luokkia</Text>
              )}
            </Box>
            <Button as={NextLink} href="/class/create" width="100%">
              {teacher.classes.length > 0 ? "Luo uusi luokka" : "Luo luokka"}
            </Button>
          </>
        ) : (
          <Text>Terve</Text>
        )}
      </Box>
      <Flex flex="1" flexDirection="column" justifyContent="flex-end">
        <LogoutButton mt="auto">Kirjaudu ulos</LogoutButton>
      </Flex>
    </PageWrapper>
  );
}
