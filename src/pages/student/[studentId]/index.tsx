import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GetStaticPropsContext } from "next";
import PageWrapper from "@/components/server-components/PageWrapper";
import StudentEvaluationsRecap from "@/components/server-components/StudentEvaluationsRecap";
import {
  EvaluationsAccordion_EvaluationFragmentDoc,
  StudentPage_GetStudentQuery,
} from "@/gql/graphql";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import graphqlClient from "@/graphql-client";
import LoadingIndicator from "@/components/general/LoadingIndicator";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";
import EvaluationsAccordion, {
  EvaluationsAccordionHandlers,
} from "@/components/functional/EvaluationsAccordion";
import TopNavigationBar from "@/components/functional/TopNavigationBar";

const StudentPage_GetStudent_Query = graphql(/* GraphQL */ `
  query StudentPage_GetStudent($studentId: ID!) {
    getStudent(id: $studentId) {
      id
      name
      group {
        id
      }
      evaluations {
        id
        notes
        ...EvaluationsAccordion_Evaluation
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

  const [error, setError] = useState<string | undefined>();
  const [summary, setSummary] = useState<string | undefined>();
  const [summaryLength, setSummaryLength] = useState<number>(50);
  const [isGeneratingSummary, setIsGeneratingSumamry] =
    useState<boolean>(false);
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

  const genearateSummary = async () => {
    if (summaryLength < 10 || summaryLength > 200) {
      setError("Yhteenvedon pituuden tulee olla välillä 10-200 merkkiä.");
      return;
    }
    try {
      setIsGeneratingSumamry(true);
      setIsCopied(false);
      setError(undefined);
      setSummary(undefined);

      const notes = student.evaluations
        .filter((it) => !!it.notes)
        .map((it) => it.notes);

      const result = await fetch("/api/generate-summary", {
        method: "POST",
        body: JSON.stringify({
          notes,
          summaryLength,
        }),
      });

      if (!result.ok) throw new Error("Something went wrong");
      const json = await result.json();
      setSummary(json.summary);
      setIsGeneratingSumamry(false);
    } catch (e) {
      setIsGeneratingSumamry(false);
      setError(
        "Palautteen generoinnissa meni jotakin mönkään. Yritä myöhemmin uudelleen tai ota yhteyttä järjestelmänvalvojaan."
      );
    }
  };

  const copySummaryToClipboard = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setIsCopied(true);
  };

  return (
    <PageWrapper>
      <TopNavigationBar />
      <Text as="h1" textAlign="center" mb="2">
        {student.name}
      </Text>
      <StudentEvaluationsRecap evaluations={student.evaluations} mb="5" />
      <Text as="h2" mb="0">
        Kaikki arvioinnit
      </Text>
      {student.evaluations.length > 0 ? (
        <>
          <EvaluationsAccordion
            ref={evaluationsAccordionRef}
            evaluations={student.evaluations}
          />
          <Box my="5">
            <Text as="h2">Loppuarvioinnin generointi</Text>
            <FormLabel>Palautteen pituus</FormLabel>
            <Input
              type="number"
              isDisabled={isGeneratingSummary}
              value={summaryLength}
              onChange={(e) => setSummaryLength(Number(e.target.value))}
              mb="4"
            />
            <Button
              isLoading={isGeneratingSummary}
              onClick={() => genearateSummary()}
              mb="2"
            >
              Luo palaute
            </Button>
            {error && <Text color="red.500">{error}</Text>}
            {summary && (
              <Box mt="5">
                <Text as="h3">Palaute:</Text>
                <Text>{summary}</Text>
                <Box flexDirection="column" alignItems="center" mt="2">
                  <Button
                    leftIcon={
                      isCopied ? <AiOutlineCheck /> : <HiOutlineClipboardList />
                    }
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
