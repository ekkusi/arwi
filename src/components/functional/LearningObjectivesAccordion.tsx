import { ClassYearCode } from "@/gql/graphql";
import {
  formatObjectiveLabel,
  formatObjectiveTypeLabel,
} from "@/utils/dataMappers";
import { getLearningObjectives } from "@/utils/subjectUtils";
import {
  Accordion,
  AccordionItemProps,
  AccordionProps,
  Text,
} from "@chakra-ui/react";
import AccordionItem from "../general/AccordionItem";

type LearningObjectivesAccordionProps = Omit<
  AccordionProps,
  "allowToggle" | "allowMultiple"
> & {
  subjectCode: string;
  yearCode: ClassYearCode;
  itemProps?: AccordionItemProps;
};

export default function LearningObjectivesAccordion({
  subjectCode,
  yearCode,
  itemProps,
  ...rest
}: LearningObjectivesAccordionProps) {
  const objectives = getLearningObjectives(subjectCode, yearCode);

  return (
    <Accordion allowMultiple {...rest}>
      {objectives.map((it) => (
        <AccordionItem
          title={formatObjectiveLabel(it)}
          key={it.code}
          {...itemProps}
        >
          <Text mb="2">
            <Text fontWeight="semibold" as="span">
              Tyyppi:
            </Text>{" "}
            {formatObjectiveTypeLabel(it.type)}
          </Text>
          <Text>{it.description}</Text>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
