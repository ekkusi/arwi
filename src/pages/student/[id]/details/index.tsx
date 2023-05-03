import { graphql } from "@/gql";
import useSWR, { SWRConfig } from "swr";
import PageWrapper from "@/components/server-components/PageWrapper";
import { Text } from "@chakra-ui/react";
import graphqlClient from "@/graphql-client";
import { useRouter } from "next/router";
import { serverRequest } from "@/pages/api/graphql";
import { GetStaticPropsContext } from "next";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import { StudentDetailsPageQuery } from "@/gql/graphql";
import TopNavigationBar from "@/components/functional/TopNavigationBar";
import EvaluationsLineChart from "@/components/functional/EvaluationsLineChart";
import { getSubject } from "@/utils/subjectUtils";
import { useEffect } from "react";

const StudentDetailsPage_Query = graphql(`
  query StudentDetailsPage($id: ID!) {
    getStudent(id: $id) {
      id
      name
      group {
        id
      }
      currentClassEvaluations {
        id
        notes
        ...EvaluationsLineChart_Evaluation
      }
    }
  }
`);

function StudentDetailsPageContent() {
  const router = useRouter();
  const id = router.query.id as string;
  const subject = getSubject("LI");
  if (!subject) throw new Error(`Subject with code LI doesn't exist`);
  const { environments } = subject;

  const { data } = useSWR<StudentDetailsPageQuery>(
    `student/${id}/details`,
    () => graphqlClient.request(StudentDetailsPage_Query, { id })
  );

  useEffect(() => {
    if (window.screen) {
      window.screen.orientation.lock("landscape");
    }
    return () => {
      if (window.screen) {
        window.screen.orientation.unlock();
      }
    };
  });

  if (!data) return <LoadingIndicator />;

  const { getStudent: student } = data;

  return (
    <PageWrapper>
      <TopNavigationBar />
      <Text as="h1">{student.name}</Text>
      <Text>Työn alla...</Text>
      <EvaluationsLineChart
        evaluations={student.currentClassEvaluations}
        studentId={student.id}
        type="skills"
        environments={environments}
      />
    </PageWrapper>
  );
}

type StudentDetailsPageProps = {
  data: StudentDetailsPageQuery;
};

export default function StudentDetailsPage({ data }: StudentDetailsPageProps) {
  return (
    <SWRConfig value={{ fallback: data }}>
      <StudentDetailsPageContent />
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
}: GetStaticPropsContext<{ id: string }>) {
  if (!params) throw new Error("Unexpected error, no params");

  const data = await serverRequest(StudentDetailsPage_Query, {
    id: params.id,
  });

  // Pass data to the page via props
  return { props: { data } };
}
