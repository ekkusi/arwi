import { ClassYearCode, LearningObjectiveType } from "@/gql/graphql";
import { getLearningObjectives, LearningObjective } from "@/utils/subjectUtils";
import { Text } from "@chakra-ui/react";
import {
  chakraComponents,
  MultiValue,
  MultiValueGenericProps,
  GroupBase,
} from "chakra-react-select";
import { useMemo } from "react";
import Select, { SelectProps } from "../general/Select";

type LearningObjectiveSelectProps = Omit<
  SelectProps<LearningObjective, true>,
  "getOptionValue"
> & {
  subjectCode: string;
  yearCode: ClassYearCode;
  initialCodes?: string[];
  onChange?: (value: MultiValue<LearningObjective>) => void;
};

const customComponents = {
  MultiValueLabel: (props: MultiValueGenericProps<LearningObjective>) => {
    const { data } = props;
    return (
      <chakraComponents.MultiValueLabel {...props}>
        <Text>{data.code}</Text>
      </chakraComponents.MultiValueLabel>
    );
  },
};

export default function LearningObjectiveSelect({
  subjectCode,
  yearCode,
  initialCodes,
  ...rest
}: LearningObjectiveSelectProps) {
  const options = useMemo(
    () => getLearningObjectives(subjectCode, yearCode),
    [subjectCode, yearCode]
  );
  const groups: GroupBase<LearningObjective>[] = useMemo(() => {
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
      closeMenuOnSelect={false}
      blurInputOnSelect={false}
      defaultValue={
        initialCodes
          ? options.filter((it) => initialCodes.includes(it.code))
          : []
      }
      placeholder="Valitse tavoitteet..."
      noOptionsMessage={() => "Ei valittavia tavoitteita"}
      isMulti
      components={customComponents}
      {...rest}
    />
  );
}
