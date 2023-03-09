import PageWrapper from "@/app/(server-components)/PageWrapper";
import { Text } from "@/components/chakra";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import StudentEvaluationsRecap from "./StudentEvaluationsRecap";

type StudentPageProps = {
  params: {
    studentId: string;
  };
};

const StudentPage_GetStudentQuery = graphql(/* GraphQL */ `
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      evaluations {
        ...StudentEvaluationRecap_Evaluation
      }
    }
  }
`);

export default async function StudentPage({ params }: StudentPageProps) {
  const { getStudent: student } = await serverRequest(
    StudentPage_GetStudentQuery,
    {
      studentId: params.studentId,
    }
  );
  return (
    <PageWrapper>
      <Text as="h1">Oppilaan {student.name} yhteenveto</Text>
      <StudentEvaluationsRecap evaluations={student.evaluations} />
    </PageWrapper>
  );
}
