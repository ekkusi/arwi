import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsAccordion_EvaluationFragment } from "@/gql/graphql";
import { formatRatingStringWithNull } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import { Accordion, AccordionProps, Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import AccordionItem from "../general/AccordionItem";

const EvaluationsAccordion_Evaluation_Fragment = graphql(/* GraphQL */ `
  fragment EvaluationsAccordion_Evaluation on Evaluation {
    id
    notes
    behaviourRating
    skillsRating
    wasPresent
    collection {
      date
      type
    }
    student {
      name
    }
  }
`);

type EvaluationsAccordionProps = AccordionProps & {
  evaluations: FragmentType<typeof EvaluationsAccordion_Evaluation_Fragment>[];
  titleFrom?: "student" | "collection";
};

export type EvaluationsAccordionHandlers = {
  expandEvaluation: (
    evaluation: EvaluationsAccordion_EvaluationFragment
  ) => void;
};

export default forwardRef<
  EvaluationsAccordionHandlers,
  EvaluationsAccordionProps
>(
  (
    {
      evaluations: evaluationFragments,
      titleFrom = "collection",
      ...rest
    }: EvaluationsAccordionProps,
    ref
  ) => {
    const evaluations = getFragmentData(
      EvaluationsAccordion_Evaluation_Fragment,
      evaluationFragments
    );
    const sortedEvaluations = [...evaluations].sort((a, b) =>
      titleFrom === "collection"
        ? new Date(b.collection.date).getTime() -
          new Date(a.collection.date).getTime()
        : a.student.name.localeCompare(b.student.name)
    );
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);

    useImperativeHandle(ref, () => ({
      expandEvaluation(evaluation) {
        const index = sortedEvaluations.findIndex(
          (it) => it.id === evaluation.id
        );
        if (index === -1) return;
        itemRefs.current[index]?.scrollIntoView();
        setExpandedIndex(index);
      },
    }));

    return (
      <Accordion
        index={expandedIndex}
        onChange={(i) => setExpandedIndex(Array.isArray(i) ? i[0] : i)}
        {...rest}
      >
        {sortedEvaluations.map((it, i) => (
          <AccordionItem
            title={
              titleFrom === "collection"
                ? `${formatDate(it.collection.date)} - ${it.collection.type}`
                : it.student.name
            }
            key={it.id}
            ref={(itemRef) => {
              itemRefs.current[i] = itemRef;
            }}
          >
            <Text color={it.wasPresent ? "green" : "red"}>
              {it.wasPresent ? "Paikalla" : "Poissa"}
            </Text>
            {it.wasPresent ? (
              <>
                <Text>
                  Työskentely: {formatRatingStringWithNull(it.behaviourRating)}
                </Text>
                <Text>
                  Taidot: {formatRatingStringWithNull(it.skillsRating)}
                </Text>
                {it.notes ? (
                  <Box mt="3">
                    <Text mb="1">Huomiot:</Text>
                    <Text>{it.notes}</Text>
                  </Box>
                ) : (
                  <Text mt="3">Huomioita ei annettu</Text>
                )}
              </>
            ) : (
              <Text>Oppilas ei ollut paikalla, ei arviointeja</Text>
            )}
            <Button
              as={Link}
              href={{
                pathname: `/evaluation/${it.id}/edit`,
                query: {
                  prevPath:
                    typeof window !== "undefined" && window.location.pathname,
                },
              }}
              mt="3"
              size="sm"
            >
              Muokkaa
            </Button>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
);
