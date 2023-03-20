import PageWrapper from "@/components/server-components/PageWrapper";
import { Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import LogoutButton from "@/components/functional/LogoutButton";
import { authOptions } from "../api/auth/[...nextauth]";

type ProfilePageProps = {
  user: Session["user"];
};

export default function ProfilePage({ user }: ProfilePageProps) {
  // eslint-disable-next-line
  console.log("user in profile page", user);

  return (
    <PageWrapper display="flex" flexDirection="column">
      <Text as="h1">Profiili</Text>
      <Text>Sähköposti: {user?.email}</Text>
      <Flex flex="1" flexDirection="column" justifyContent="flex-end">
        <LogoutButton mt="auto">Kirjaudu ulos</LogoutButton>
      </Flex>
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line
  console.log("Running getServerSideProps in profile: ", new Date());
  const session = await getServerSession(context.req, context.res, authOptions);
  // eslint-disable-next-line
  console.log("session in profile page serverSideProps", session);
  if (!session) throw new Error("Unexpected error, no session");

  return {
    props: {
      user: session.user,
    },
  };
};
