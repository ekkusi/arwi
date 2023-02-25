import PageWrapper from "@/app/(components)/PageWrapper";
import { Text } from "@/components/chakra";
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";

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
  const { getClass } = await graphqlClient.request(
    ClassOverviewPage_GetClassQuery,
    {
      classId: params.classId,
    }
  );
  return (
    <PageWrapper>
      {/* TODO: Show lessons etc... */}
      <Text as="h1">{getClass.name}</Text>
      <Text>Tätä sivua ei vielä suuremmin olla implementoitu</Text>
    </PageWrapper>
  );
}
