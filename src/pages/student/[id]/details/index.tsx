import { graphql } from "@/gql";
import useSWR, { SWRConfig } from "swr";
import PageWrapper from "@/components/server-components/PageWrapper";
import { FormLabel, Radio, RadioGroup } from "@chakra-ui/react";
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
import EnvironmentSelect from "@/components/functional/EnvironmentSelect";
import { isMultiOption } from "@/components/general/Select";

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
  const [graphType, setGraphType] = useState<"skills" | "behaviour">("skills");

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

  const subject = getSubject(data.getStudent.group.subject.code);
  const { getStudent: student } = data;

  return (
    <PageWrapper>
      <TopNavigationBar mb="3" />
      <FormLabel>Ympäristöt</FormLabel>
      <EnvironmentSelect
        subjectCode={student.group.subject.code}
        onChange={(value) => isMultiOption(value) && setEnvironments(value)}
        defaultValue={subject?.environments}
        isMulti
        containerProps={{
          mb: 2,
        }}
      />
      <FormLabel>Arviointikohde</FormLabel>
      <RadioGroup
        onChange={(value: "skills" | "behaviour") => setGraphType(value)}
        value={graphType}
        mb="2"
      >
        <Radio value="skills" mr="2">
          Taidot
        </Radio>
        <Radio value="behaviour">Työskentely</Radio>
      </RadioGroup>
      <EvaluationsLineChartDetailed
        evaluations={student.currentClassEvaluations}
        type={graphType}
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
