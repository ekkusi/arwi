import PageWrapper from "@/app/(components)/PageWrapper";
import { Text } from "@/components/chakra";
import { graphql } from "@/gql";
import graphqlClient from "@/graphql-client";

type ClassOverviewPageProps = {
  params: {
    classID: string;
  };
};

const ClassOverviewPage_Query = graphql(`
  query ClassOverviewPage_Query($classID: ID!) {
    class(by: { id: $classID }) {
      name
      lessons(first: 10) {
        edges {
          node {
            date
            description
            type
            evaluations(first: 10) {
              edges {
                node {
                  behaviourRating
                  skillsRating
                  notes
                  student {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);

export default async function ClassOverviewPage({
  params,
}: ClassOverviewPageProps) {
  // class variable name is reserved -> classData
  const { class: classData } = await graphqlClient.request(
    ClassOverviewPage_Query,
    {
      classID: params.classID,
    }
  );
  return (
    <PageWrapper>
      {classData ? (
        // TODO: Show lessons etc...
        <Text as="h1">{classData.name}</Text>
      ) : (
        <Text as="h1">
          No höhlä, luokkaa ei jostakin kumman syystä löytynyt:(
        </Text>
      )}
    </PageWrapper>
  );
}
