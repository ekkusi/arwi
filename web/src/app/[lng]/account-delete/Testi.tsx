"use client";

import { useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { graphql } from "../../../gql";

type TestiProps = {};
const Testi_GetCurrentUser_Query = graphql(`
  query Testi_GetCurrentUser {
    getCurrentUser {
      email
      languagePreference
      consentsAnalytics
      id
      isMPassIDConnected
    }
  }
`);

export default function Testi(props: TestiProps) {
  const { data } = useQuery(Testi_GetCurrentUser_Query);
  // console.log(data);

  return (
    <>
      <Text>Testi</Text>
      {data ? <Text>Kirjautunut käyttäjä: {data.getCurrentUser.id}</Text> : <Text>Kirjautunut käyttäjä: Ei kirjautunut</Text>}
    </>
  );
}
