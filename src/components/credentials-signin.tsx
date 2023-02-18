import PageWrapper from "@/app/(components)/PageWrapper";
import { Box, Button, Input, Text } from "@/components/chakra";
import { Link } from "@chakra-ui/next-js";
import { FormLabel } from "@chakra-ui/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageWrapper>
      <Box as="form" method="post" action="/api/auth/callback/credentials">
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <FormLabel>
          Sähköposti
          <Input name="email" type="text" />
        </FormLabel>
        <FormLabel>
          Salasana
          <Input name="password" type="password" />
        </FormLabel>
        <Button type="submit">Kirjaudu sisään</Button>
      </Box>
      <Box>
        <Text as="span">Ei vielä käyttäjää?</Text>
        <Link href="/register">Rekisteröidy tästä</Link>
      </Box>
    </PageWrapper>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
