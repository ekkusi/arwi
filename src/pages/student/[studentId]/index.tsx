import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { formatDate } from "@/utils/dateUtils";
import BackwardsLink from "@/components/general/BackwardsLink";
import { GetStaticPropsContext } from "next";
import PageWrapper from "@/components/server-components/PageWrapper";
import StudentEvaluationsRecap from "@/components/server-components/StudentEvaluationsRecap";
import { StudentPage_GetStudentQuery } from "@/gql/graphql";

const StudentPage_GetStudent_Query = graphql(/* GraphQL */ `
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      group {
        id
      }
      evaluations {
        notes
        id
        collection {
          date
        }
        ...StudentEvaluationRecap_Evaluation
      }
    }
  }
`);

type StudentPageContentProps = {
  data: StudentPage_GetStudentQuery;
};

export default function StudentPageContent({ data }: StudentPageContentProps) {
  const { getStudent: student } = data;

  const evaluationsWithNotes = useMemo(() => {
    return student.evaluations.filter((it) => !!it.notes);
  }, [student]);
  return (
    <PageWrapper>
      <BackwardsLink href={`/group/${student.group.id}`}>
        Takaisin ryhmän yhteenvetoon
      </BackwardsLink>
      <Text as="h1">
        Oppilaan{" "}
        <Text as="span" fontStyle="italic">
          {student.name}
        </Text>{" "}
        yhteenveto
      </Text>
      <StudentEvaluationsRecap evaluations={student.evaluations} mb="5" />
      <Text as="h2">Oppilaalle annetut huomioit</Text>
      {evaluationsWithNotes.length > 0 ? (
        evaluationsWithNotes.map((it) => (
          <Box mb="2" key={it.id}>
            <Text fontStyle="italic">
              {formatDate(it.collection.date, "dd.MM.yyyy")}:
            </Text>
            <Text>{it.notes}</Text>
          </Box>
        ))
      ) : (
        <Text>Oppilaalle ei ole vielä annettu erikoishuomioita</Text>
      )}
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ studentId: string }>) {
  if (!params) throw new Error("Unexpected error, no paramss");
  const data = await serverRequest(StudentPage_GetStudent_Query, {
    studentId: params.studentId,
  });
  return {
    props: {
      data,
    },
  };
}
