import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";
import CText from "../../../components/primitives/CText";
import CView from "../../../components/primitives/CView";
import { graphql } from "../../../gql";
import { HomeStackParams } from "../types";

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

export default function StudentView({ navigation, route }: NativeStackScreenProps<HomeStackParams, "student">) {
  const studentId = route.params.id;

  const { data } = useQuery(StudentPage_GetStudent_Query, { variables: { studentId } });

  const [summary, setSummary] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isGeneratingSummary, setIsGeneratingSumamry] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  // const evaluationsAccordionRef = useRef<EvaluationsAccordionHandlers>(null);

  // useEffect(() => {
  //   // Expand the evaluation matching the expandedEvaluationId query param if set
  //   const { modifiedEvaluationId } = router.query;

  //   if (!data || typeof modifiedEvaluationId !== "string") return;

  //   evaluationsAccordionRef.current?.expandEvaluations([modifiedEvaluationId]);
  //   evaluationsAccordionRef.current?.scrollTo(modifiedEvaluationId);
  // }, [router.query, data]);

  if (!data) return <LoadingIndicator />;
  const { getStudent: student } = data;
  const evaluations = student.currentClassEvaluations;

  const generateSummary = async () => {
    try {
      setIsGeneratingSumamry(true);
      setIsCopied(false);
      setError(undefined);
      setSummary(undefined);

      // TODO: Implement this to backend
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
    <CView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CText>Oppilaan sivu</CText>
    </CView>
  );
}
