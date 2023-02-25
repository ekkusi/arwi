import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  NextLink,
  Text,
} from "@/components/chakra";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LogoutButton from "./auth/LogoutButton";
import PageWrapper from "./(components)/PageWrapper";

const MainPage_GetTeacherQuery = graphql(`
  query MainPage_GetTeacher($teacherId: ID!) {
    getTeacher(id: $teacherId) {
      email
      id
      classes {
        id
        name
      }
    }
  }
`);

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session found, something is wrong");
  }
  const { user } = session;

  const { getTeacher: teacher } = await graphqlClient.request(
    MainPage_GetTeacherQuery,
    {
      teacherId: user.id,
    }
  );

  return (
    <PageWrapper display="flex" flexDirection="column">
      <NextLink href="/design" display="block" mb="5">
        To design page
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
              {teacher.classes && teacher.classes.length > 0 ? (
                <List>
                  {teacher.classes.map((it) => (
                    <ListItem>{it.name}</ListItem>
                  ))}
                </List>
              ) : (
                <Text>Et vielä ole tehnyt luokkia</Text>
              )}
            </Box>
            <Button as={NextLink} href="/class/create" width="100%">
              Luo luokka
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
