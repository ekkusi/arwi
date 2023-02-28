import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

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
  const { getClass } = await serverRequest(ClassOverviewPage_GetClassQuery, {
    classId: params.classId,
  });
  return (
    <PageWrapper>
      {/* TODO: Show lessons etc... */}
      <Text as="h1">Luokka: {getClass.name}</Text>
      <Text>Tätä sivua ei vielä suuremmin olla implementoitu</Text>
    </PageWrapper>
  );
}
