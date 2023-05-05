import { Box, Flex } from "@chakra-ui/react";
import {
  chakraComponents,
  OptionProps,
  SingleValueProps,
} from "chakra-react-select";
import { hexToRgbA } from "@/utils/color";
import { Environment, getSubject } from "@/utils/subjectUtils";
import Select, { SelectProps } from "../general/Select";

type SubjectSelectProps = Omit<
  SelectProps<Environment, boolean>,
  "getOptionValue"
> & {
  subjectCode: string;
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
  // MultiValue: ({
  //   children,
  //   ...props
  // }: MultiValueProps<Environment, false>) => (
  //   <chakraComponents.MultiValue {...props}
  // )
};

export default function EnvironmentSelect({
  subjectCode,
  ...rest
}: SubjectSelectProps) {
  const subject = getSubject(subjectCode);
  if (!subject)
    throw new Error(`Subject with code ${subjectCode} doesn't exist`);
  const { environments } = subject;

  return (
    <Select
      options={environments}
      isSearchable={false}
      getOptionValue={(option) => option.code}
      components={customComponents}
      chakraStyles={{
        option: (_, { data, isSelected }) => ({
          bg: isSelected ? hexToRgbA(data.color, 0.8) : "inherit",
          color: isSelected ? "white" : data.color,
          _active: {
            bg: isSelected ? hexToRgbA(data.color, 0.8) : "inherit",
          },
        }),
        singleValue: (_, { data }) => ({
          color: data.color,
        }),
        multiValue: (_, { data }) => ({
          bg: data.color,
        }),
      }}
      placeholder="Valitse ympäristö..."
      {...rest}
    />
  );
}
