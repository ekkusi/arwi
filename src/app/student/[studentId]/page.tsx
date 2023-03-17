import PageWrapper from "@/app/(server-components)/PageWrapper";
import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";
import StudentPageContent from "./StudentPageContent";

type StudentPageProps = {
  params: {
    studentId: string;
  };
};

const StudentPage_GetStudentQuery = graphql(/* GraphQL */ `
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      ...StudentPageContent_Student
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
      <StudentPageContent student={student} />
    </PageWrapper>
  );
}
