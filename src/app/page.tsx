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
import LogoutButton from "./auth/register/LogoutButton";
import PageWrapper from "./(components)/PageWrapper";

const MainPage_Query = graphql(`
  query MainPage_Query($teacherEmail: Email!) {
    teacher(by: { email: $teacherEmail }) {
      email
      name
      class(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`);

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("No session found, something is wrong");
  }
  const { user } = session;

  const { teacher } = await graphqlClient.request(MainPage_Query, {
    teacherEmail: user.email,
  });

  const classEdges = teacher?.class?.edges;

  return (
    <PageWrapper display="flex" flexDirection="column">
      <NextLink href="/design" display="block" mb="5">
        To design page
      </NextLink>
      <Text as="h1" mb="0" textAlign="center">
        Ratify
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
              {classEdges && classEdges.length > 0 ? (
                <List>
                  {classEdges.map(
                    (edge) => edge && <ListItem>{edge.node.name}</ListItem>
                  )}
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
