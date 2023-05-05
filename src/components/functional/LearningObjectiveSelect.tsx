import { ClassYearCode, LearningObjectiveType } from "@/gql/graphql";
import {
  getLearningObjectives,
  LearningObjectiveMinimal,
} from "@/utils/subjectUtils";
import { Box, Text } from "@chakra-ui/react";
import {
  chakraComponents,
  MultiValueGenericProps,
  GroupBase,
  OptionProps,
} from "chakra-react-select";
import { useMemo } from "react";
import Select, { SelectProps } from "../general/Select";

type LearningObjectiveSelectProps = Omit<
  SelectProps<LearningObjectiveMinimal, boolean>,
  "getOptionValue"
> & {
  subjectCode: string;
  yearCode: ClassYearCode;
};

const customComponents = {
  MultiValueLabel: (
    props: MultiValueGenericProps<LearningObjectiveMinimal>
  ) => {
    const { data } = props;
    return (
      <chakraComponents.MultiValueLabel {...props}>
        <Text>{data.code}</Text>
      </chakraComponents.MultiValueLabel>
    );
  },

  Option: (props: OptionProps<LearningObjectiveMinimal>) => {
    const { data } = props;
    return (
      <chakraComponents.Option {...props}>
        <Box display="flex">
          <Text as="span" mr="1">
            {data.code}:
          </Text>
          <Text as="span">{data.label}</Text>
        </Box>
      </chakraComponents.Option>
    );
  },
};

export default function LearningObjectiveSelect({
  subjectCode,
  yearCode,
  ...rest
}: LearningObjectiveSelectProps) {
  const options = useMemo(
    () => getLearningObjectives(subjectCode, yearCode),
    [subjectCode, yearCode]
  );
  const groups: GroupBase<LearningObjectiveMinimal>[] = useMemo(() => {
    const skillsOptions = options.filter(
      (it) => it.type === LearningObjectiveType.SKILLS
    );
    const behaviourOptions = options.filter(
      (it) => it.type === LearningObjectiveType.BEHAVIOUR
    );
    return [
      {
        label: "Taidot",
        options: skillsOptions,
      },
      {
        label: "Työskentely",
        options: behaviourOptions,
      },
    ];
  }, [options]);

  return (
    <Select
      options={groups}
      getOptionValue={(value) => value.code}
      getOptionLabel={(value) => `${value.code}: ${value.label}`}
      isSearchable={false}
      placeholder="Valitse tavoitteet..."
      noOptionsMessage={() => "Ei valittavia tavoitteita"}
      components={customComponents}
      chakraStyles={{
        option: () => ({
          fontSize: "sm",
        }),
      }}
      {...rest}
    />
  );
}
