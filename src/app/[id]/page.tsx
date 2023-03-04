import { graphql } from "@/gql";
import { Box, Button, Flex, NextLink, Text } from "@/components/chakra";
import { serverRequest } from "@/pages/api/graphql";
import ClassList from "@/components/ClassList";
import LogoutButton from "@/app/(auth)/LogoutButton";
import PageWrapper from "@/app/(server-components)/PageWrapper";

// Necessary for revalidation to work
export const dynamic = "force-static";

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

type HomePageProps = {
  params: {
    id: string;
  };
};

export default async function HomePage({ params }: HomePageProps) {
  const { getTeacher: teacher } = await serverRequest(
    MainPage_GetTeacherQuery,
    {
      teacherId: params.id,
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
          {teacher.email}
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
            <Button
              as={NextLink}
              href={`/${teacher.id}/class/create`}
              width="100%"
            >
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
// const TeacherLayout_GetTeachersQuery = graphql(`
//   query TeacherLayout_GetTeachers {
//     getTeachers {
//       id
//     }
//   }
// `);

// export const generateStaticParams = async () => {
//   const { getTeachers: teachers } = await serverRequest(
//     TeacherLayout_GetTeachersQuery
//   );

//   return teachers.map((it) => ({
//     id: it.id,
//   }));
// };
