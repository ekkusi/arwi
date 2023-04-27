import { Box, Flex } from "@chakra-ui/react";
import {
  chakraComponents,
  OptionProps,
  SingleValue,
  SingleValueProps,
} from "chakra-react-select";
import { hexToRgbA } from "@/utils/color";
import { Environment, getSubject } from "@/utils/subjectUtils";
import Select, { SelectProps } from "../general/Select";

type SubjectSelectProps = SelectProps & {
  subjectCode: string;
  initialCode?: string;
  onChange?: (value: Environment | null) => void;
};

// Make sure this is defined outside of the component which returns your select
// or you'll run into rendering issues
const customComponents = {
  Option: ({ children, ...props }: OptionProps<Environment, false>) => (
    <chakraComponents.Option {...props}>
      <Box
        display="inline-block"
        bg={props.data.color}
        p="2"
        borderRadius="full"
        mr="2"
      />
      {children}
    </chakraComponents.Option>
  ),
  SingleValue: ({
    children,
    ...props
  }: SingleValueProps<Environment, false>) => (
    <chakraComponents.SingleValue {...props}>
      <Flex alignItems="center">
        <Box
          display="inline-block"
          bg={props.data.color}
          p="2"
          borderRadius="full"
          mr="2"
        />
        {children}
      </Flex>
    </chakraComponents.SingleValue>
  ),
};

export default function EnvironmentSelect({
  subjectCode,
  onChange: _onChange,
  initialCode,
  ...rest
}: SubjectSelectProps) {
  const subject = getSubject(subjectCode);
  if (!subject)
    throw new Error(`Subject with code ${subjectCode} doesn't exist`);
  const { environments } = subject;

  const onChange = (newValue: SingleValue<Environment> | null) => {
    _onChange?.(newValue);
  };

  return (
    <Select
      options={environments}
      defaultValue={environments.find((it) => it.code === initialCode)}
      onChange={onChange}
      isSearchable={false}
      getOptionValue={(option) => option.code}
      components={customComponents}
      chakraStyles={{
        option: (prev, { data, isSelected }) => ({
          ...prev,
          bg: isSelected ? hexToRgbA(data.color, 0.8) : "inherit",
          color: isSelected ? "white" : data.color,
        }),
        singleValue: (prev, { data }) => ({
          ...prev,
          color: data.color,
        }),
      }}
      placeholder="Valitse ympäristö..."
      {...rest}
    />
  );
}
