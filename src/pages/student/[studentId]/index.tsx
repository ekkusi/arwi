import { graphql } from "@/gql";
import { serverRequest } from "@/pages/api/graphql";

import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
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
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineCheck } from "react-icons/ai";

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

  const [error, setError] = useState<string | undefined>();
  const [summary, setSummary] = useState<string | undefined>();
  const [summaryLength, setSummaryLength] = useState<number>(50);
  const [isGeneratingSummary, setIsGeneratingSumamry] =
    useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

      const result = await fetch("/api/generate-summary", {
        method: "POST",
        body: JSON.stringify({
          notes: evaluationsWithNotes.map((it) => it.notes || ""),
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
        <>
          {evaluationsWithNotes.map((it) => (
            <Box mb="2" key={it.id}>
              <Text fontStyle="italic">
                {formatDate(it.collection.date, "dd.MM.yyyy")}:
              </Text>
              <Text>{it.notes}</Text>
            </Box>
          ))}
          <Box my="5">
            <Text as="h2">Testaa palautteen generointia</Text>
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
