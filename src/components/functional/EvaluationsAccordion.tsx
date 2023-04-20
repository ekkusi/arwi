import { FragmentType, getFragmentData, graphql } from "@/gql";
import { EvaluationsAccordion_EvaluationFragment } from "@/gql/graphql";
import { formatRatingStringWithNull } from "@/utils/dataMappers";
import { formatDate } from "@/utils/dateUtils";
import {
  Accordion,
  AccordionProps,
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
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
      environment {
        label
      }
    }
    student {
      name
    }
  }
`);

type EvaluationsAccordionProps = Omit<
  AccordionProps,
  "allowToggle" | "allowMultiple"
> & {
  evaluations: FragmentType<typeof EvaluationsAccordion_Evaluation_Fragment>[];
  titleFrom?: "student" | "collection";
};

export type EvaluationsAccordionHandlers = {
  expandEvaluations: (evaluationIds: string[]) => void;
  scrollTo: (evaluationId: string, delay?: number) => void;
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
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const scrollTo = (evaluationId: string) => {
      const index = sortedEvaluations.findIndex((it) => it.id === evaluationId);

      if (index === -1) return;
      itemRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    };

    useImperativeHandle(ref, () => ({
      expandEvaluations(expandedEvaluationIds) {
        const indexes = expandedEvaluationIds
          .map((id) => sortedEvaluations.findIndex((it) => it.id === id))
          .filter((i) => i !== -1);

        setExpandedIndexes(indexes);
      },
      scrollTo(evaluationId) {
        scrollTo(evaluationId);
      },
    }));

    const openAll = () => {
      setExpandedIndexes(sortedEvaluations.map((_, i) => i));
    };

    const closeAll = () => {
      setExpandedIndexes([]);
    };

    return (
      <>
        <Flex justifyContent="end" pb="1" pr="1">
          <Text
            color="light-text"
            onClick={expandedIndexes.length > 0 ? closeAll : openAll}
          >
            {expandedIndexes.length > 0 ? "Piilota kaikki" : "Avaa kaikki"}
          </Text>
        </Flex>
        <Accordion
          index={expandedIndexes}
          allowMultiple
          onChange={(i) => setExpandedIndexes(Array.isArray(i) ? i : [i])}
          {...rest}
        >
          {sortedEvaluations.map((it, i) => (
            <AccordionItem
              title={
                titleFrom === "collection"
                  ? `${formatDate(it.collection.date)} - ${
                      it.collection.environment.label
                    }`
                  : it.student.name
              }
              key={it.id}
              ref={(itemRef) => {
                itemRefs.current[i] = itemRef;
              }}
              titleProps={{
                bg: it.wasPresent ? "green.100" : "red.100",
                _hover: {
                  bg: it.wasPresent ? "green.200" : "red.200",
                },
              }}
              borderColor="light-gray"
              titleIcons={it.wasPresent && !!it.notes && <Icon as={CgNotes} />}
            >
              <Text color={it.wasPresent ? "green" : "red"}>
                {it.wasPresent ? "Paikalla" : "Poissa"}
              </Text>
              {it.wasPresent ? (
                <>
                  <Text>
                    Työskentely:{" "}
                    {formatRatingStringWithNull(it.behaviourRating)}
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
      </>
    );
  }
);
