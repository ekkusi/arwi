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
import { Environment, getSubject } from "@/utils/subjectUtils";
import { useEffect, useState } from "react";
import EvaluationsLineChartDetailed from "@/components/functional/EvaluationsLineChartDetailed";

const StudentDetailsPage_Query = graphql(`
  query StudentDetailsPage($id: ID!) {
    getStudent(id: $id) {
      id
      name
      group {
        id
        subject {
          code
        }
      }
      currentClassEvaluations {
        id
        notes
        ...EvaluationsLineChart_Evaluation
        ...EvaluationsLineChartDetailed_Evaluation
      }
    }
  }
`);

function StudentDetailsPageContent() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data } = useSWR<StudentDetailsPageQuery>(
    `student/${id}/details`,
    () => graphqlClient.request(StudentDetailsPage_Query, { id })
  );

  const [environments, setEnvironments] = useState<Environment[]>([]);

  useEffect(() => {
    if (window.screen) {
      window.screen.orientation.lock("landscape");
    }
    if (data) {
      const subject = getSubject(data.getStudent.group.subject.code);
      if (subject) {
        setEnvironments(subject.environments);
      }
    }
    return () => {
      if (window.screen) {
        window.screen.orientation.unlock();
      }
    };
  }, [data]);

  if (!data) return <LoadingIndicator />;

  const { getStudent: student } = data;

  return (
    <PageWrapper>
      <TopNavigationBar />
      <Text as="h1">{student.name}</Text>
      <Text as="h2">Arvioinnit ympäristöttäin</Text>
      {/* <EnvironmentSelect
        subjectCode={student.group.subject.code}
        onChange={(value) => value && setEnvironments([value])}
      /> */}
      <EvaluationsLineChartDetailed
        evaluations={student.currentClassEvaluations}
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
