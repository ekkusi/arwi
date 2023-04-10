import { Box, Flex } from "@chakra-ui/react";
import {
  chakraComponents,
  OptionProps,
  SelectInstance,
  SingleValue,
  SingleValueProps,
} from "chakra-react-select";
import { hexToRgbA } from "@/utils/color";
import { useEffect, useRef, useState } from "react";
import Select, { SelectCustomProps } from "../general/Select";

export type Environment = {
  code: string;
  label: string;
  color: string;
};

type SubjectSelectProps = SelectCustomProps & {
  environments: Environment[];
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
  environments,
  onChange: _onChange,
  initialCode,
  ...rest
}: SubjectSelectProps) {
  const ref = useRef<SelectInstance<Environment> | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const onChange = (newValue: SingleValue<Environment> | null) => {
    setIsDirty(true);
    _onChange?.(newValue);
    ref.current?.blur();
  };

  useEffect(() => {
    // Only update the select with new initial value if it's not dirty
    // NOTE: This kind of workaround is needed because revalidate doesn't work for first render
    // after update. For this, useSWR fetches new data and initialValues change after that.
    // If revalidate worked as expected, this would not be needed.
    //
    // This could be investigated further, but for now this works.
    if (isDirty) return;

    const initialEnvironment = environments.find(
      (it) => it.code === initialCode
    );
    if (initialEnvironment) ref.current?.selectOption(initialEnvironment);
  }, [initialCode, environments, isDirty]);

  return (
    <Select
      ref={ref}
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
