import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";
import { Button, NextLink, Text } from "@/components/chakra";

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

  return (
    <main>
      <h1>Ratify</h1>
      {teacher ? (
        <Text as="h2">Opettaja: {teacher.name}</Text>
      ) : (
        <Text>Opettajaa ei löytynyt</Text>
      )}
      <Button as={NextLink} href="/class/create">
        Luo luokka
      </Button>
    </main>
  );
}
