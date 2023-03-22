import { graphql } from "@/gql";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { serverRequest } from "@/pages/api/graphql";
import PageWrapper from "@/components/server-components/PageWrapper";
import GroupList from "@/components/functional/GroupList";
import { IoAddSharp } from "react-icons/io5";
import { GetServerSideProps } from "next";
import { MainPage_GetTeacherQuery } from "@/gql/graphql";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]";

const MainPage_GetTeacher_Query = graphql(`
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

type MainPageProps = {
  data: MainPage_GetTeacherQuery;
};

export default function HomePage({ data }: MainPageProps) {
  const { getTeacher: teacher } = data;

  if (!teacher) throw new Error("Unexpected error, no teacher");

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
            as={Link}
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
            <Button as={Link} href="/group/create" width="100%">
              Luo ensimmäinen ryhmä
            </Button>
          </>
        )}
      </Box>
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) throw new Error("Unexpected error, no session");
  const data = await serverRequest(MainPage_GetTeacher_Query, {
    teacherId: session.user.id,
  });

  // Pass data to the page via props
  return { props: { data } };
};
