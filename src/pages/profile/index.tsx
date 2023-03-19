import PageWrapper from "@/components/server-components/PageWrapper";
import { Flex, Text } from "@chakra-ui/react";
import { getSessionOrRedirect } from "@/utils/session/server";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import LogoutButton from "@/components/functional/LogoutButton";

type ProfilePageProps = {
  user: Session["user"];
};

export default function ProfilePage({ user }: ProfilePageProps) {
  return (
    <PageWrapper display="flex" flexDirection="column">
      <Text as="h1">Profiili</Text>
      <Text>Sähköposti: {user.email}</Text>
      <Flex flex="1" flexDirection="column" justifyContent="flex-end">
        <LogoutButton mt="auto">Kirjaudu ulos</LogoutButton>
      </Flex>
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSessionOrRedirect(context);

  return {
    props: {
      user: session.user,
    },
  };
};
