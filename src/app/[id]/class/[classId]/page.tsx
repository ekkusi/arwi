import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Box, Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

// Necessary for revalidation to work
export const dynamic = "force-static";

type ClassOverviewPageProps = {
  params: {
    classId: string;
  };
};

const ClassOverviewPage_GetClassQuery = graphql(`
  query ClassOverviewPage_GetClass($classId: ID!) {
    getClass(id: $classId) {
      id
      name
      students {
        name
      }
      teacher {
        id
      }
      evaluationCollections {
        id
        date
        type
        description
        evaluations {
          student {
            name
          }
          skillsRating
          behaviourRating
        }
      }
    }
  }
`);

export default async function ClassOverviewPage({
  params,
}: ClassOverviewPageProps) {
  // const session = await getSessionOrRedirect();
  const { getClass } = await serverRequest(ClassOverviewPage_GetClassQuery, {
    classId: params.classId,
  });
  return (
    <PageWrapper teacherId={getClass.teacher.id}>
      {/* TODO: Show lessons etc... */}
      <Text as="h1">Luokka: {getClass.name}</Text>
      <Text as="h2">Oppilaat:</Text>
      {getClass.students.length > 0 ? (
        <Box>
          {getClass.students.map((student) => (
            <Text>{student.name}</Text>
          ))}
        </Box>
      ) : (
        <Box>
          <Text>Ei oppilaita</Text>
        </Box>
      )}
    </PageWrapper>
  );
}

// const ClassPage_GetClassesQuery = graphql(`
//   query ClassPage_GetClasses($teacherId: ID!) {
//     getClasses(teacherId: $teacherId) {
//       id
//     }
//   }
// `);

// export const generateStaticParams = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   console.log("generate class page, params", params);

//   const { getClasses: classes } = await serverRequest(
//     ClassPage_GetClassesQuery,
//     {
//       teacherId: params.id,
//     }
//   );

//   return classes.map((it) => ({
//     classId: it.id,
//   }));
// };
