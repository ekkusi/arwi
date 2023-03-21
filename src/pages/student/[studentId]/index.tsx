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
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import graphqlClient from "@/graphql-client";
import LoadingIndicator from "@/components/general/LoadingIndicator";

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

function StudentPageContent() {
  const router = useRouter();
  const studentId = router.query.studentId as string;

  const { data } = useSWR<StudentPage_GetStudentQuery>(
    `student/${studentId}`,
    () => graphqlClient.request(StudentPage_GetStudent_Query, { studentId })
  );

  const evaluationsWithNotes = useMemo(() => {
    return data ? data.getStudent.evaluations.filter((it) => !!it.notes) : [];
  }, [data]);

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;

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
type StudentPageProps = {
  data: StudentPage_GetStudentQuery;
};

export default function StudentPage({ data }: StudentPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <StudentPageContent />
    </SWRConfig>
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
