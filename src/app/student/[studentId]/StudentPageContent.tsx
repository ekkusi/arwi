"use client";

import { FragmentType, getFragmentData, graphql } from "@/gql";
import { Box, Text } from "@/components/chakra";
import { useMemo } from "react";
import { formatDate } from "@/utils/dateUtils";
import BackwardsLink from "@/components/general/BackwardsLink";
import StudentEvaluationsRecap from "./StudentEvaluationsRecap";

const StudentPageContent_StudentFragment = graphql(`
  fragment StudentPageContent_Student on Student {
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
`);

type StudentPageContentProps = {
  student: FragmentType<typeof StudentPageContent_StudentFragment>;
};

export default function StudentPageContent({
  student: studentFragment,
}: StudentPageContentProps) {
  const student = getFragmentData(
    StudentPageContent_StudentFragment,
    studentFragment
  );

  const evaluationsWithNotes = useMemo(() => {
    return student.evaluations.filter((it) => !!it.notes);
  }, [student]);
  return (
    <>
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
    </>
  );
}
