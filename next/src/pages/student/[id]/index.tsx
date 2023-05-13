import { graphql } from "@/gql";
import serverRequest from "@/utils/serverRequest";

import { Box, Button, FormLabel, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GetStaticPropsContext } from "next";
import PageWrapper from "@/components/server-components/PageWrapper";
import StudentEvaluationsRecap from "@/components/server-components/StudentEvaluationsRecap";
import { EvaluationsAccordion_EvaluationFragmentDoc, StudentPage_GetStudentQuery } from "@/gql/graphql";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import graphqlClient from "@/graphql-client";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
import EvaluationsAccordion, { EvaluationsAccordionHandlers } from "@/components/functional/EvaluationsAccordion";
import TopNavigationBar from "@/components/functional/TopNavigationBar";

const StudentPage_GetStudent_Query = graphql(/* GraphQL */ `
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      ...StudentEvaluationRecap_Student
      group {
        id
      }
      currentClassEvaluations {
        id
        notes
        ...EvaluationsAccordion_Evaluation
        ...StudentEvaluationRecap_Evaluation
        ...OpenAIUtils_Evaluation
      }
    }
  }
`);

function StudentPageContent() {
  const router = useRouter();

  const studentId = router.query.id as string;

  const { data } = useSWR<StudentPage_GetStudentQuery>(`student/${studentId}`, () =>
    graphqlClient.request(StudentPage_GetStudent_Query, { studentId })
  );

  const [summary, setSummary] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isGeneratingSummary, setIsGeneratingSumamry] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const evaluationsAccordionRef = useRef<EvaluationsAccordionHandlers>(null);

  useEffect(() => {
    // Expand the evaluation matching the expandedEvaluationId query param if set
    const { modifiedEvaluationId } = router.query;

    if (!data || typeof modifiedEvaluationId !== "string") return;

    evaluationsAccordionRef.current?.expandEvaluations([modifiedEvaluationId]);
    evaluationsAccordionRef.current?.scrollTo(modifiedEvaluationId);
  }, [router.query, data]);

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluations = student.currentClassEvaluations;

  const genearateSummary = async () => {
    try {
      setIsGeneratingSumamry(true);
      setIsCopied(false);
      setError(undefined);
      setSummary(undefined);

      const result = await fetch("/api/generate-summary", {
        method: "POST",
        body: JSON.stringify({
          evaluations,
        }),
      });

      if (!result.ok) throw new Error("Something went wrong");
      const json = await result.json();

      setSummary(json.summary);
      setIsGeneratingSumamry(false);
    } catch (e) {
      setIsGeneratingSumamry(false);
      setError("Palautteen generoinnissa meni jotakin mönkään. Yritä myöhemmin uudelleen tai ota yhteyttä järjestelmänvalvojaan.");
    }
  };

  const copySummaryToClipboard = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setIsCopied(true);
  };

  return (
    <PageWrapper>
      {/* <BackwardsLink position="absolute" top="9" left="10" /> */}
      <TopNavigationBar mb="3" />
      <StudentEvaluationsRecap student={student} evaluations={evaluations} mb="5" />
      <Text as="h2" mb="0">
        Kaikki arvioinnit
      </Text>
      {evaluations.length > 0 ? (
        <>
          <EvaluationsAccordion ref={evaluationsAccordionRef} evaluations={evaluations} />
          <Box my="5">
            <Text as="h2">Loppuarvioinnin generointi</Text>
            <FormLabel>Palautteen pituus</FormLabel>
            <Button isLoading={isGeneratingSummary} onClick={() => genearateSummary()}>
              Luo palaute
            </Button>
            {error && <Text color="red.500">{error}</Text>}
            {summary && (
              <Box mt="5">
                <Text as="h3">Palaute:</Text>
                <Text whiteSpace="pre-line" mb="5">
                  {summary}
                </Text>
                <Box flexDirection="column" alignItems="center" mt="2">
                  <Button
                    leftIcon={isCopied ? <AiOutlineCheck /> : <HiOutlineClipboardList />}
                    isDisabled={isCopied}
                    onClick={() => copySummaryToClipboard()}
                  >
                    {isCopied ? "Kopioitu" : "Kopioi teksti"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Text mb="5">Oppilaalle ei ole vielä annettu sanallista palautetta</Text>
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

export async function getStaticProps({ params }: GetStaticPropsContext<{ id: string }>) {
  if (!params) throw new Error("Unexpected error, no paramss");
  const data = await serverRequest(StudentPage_GetStudent_Query, {
    studentId: params.id,
  });
  return {
    props: {
      data,
    },
  };
}
