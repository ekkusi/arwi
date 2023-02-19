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
  const { teacher } = await graphqlClient.request(MainPage_Query, {
    teacherEmail: "testi@email.com",
  });

  const classEdges = teacher?.class?.edges;

  return (
    <PageWrapper display="flex" flexDirection="column">
      <NextLink href="/design" display="block">
        To design page
      </NextLink>
      <Text as="h1" mb="5" textAlign="center">
        Ratify
      </Text>
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
