import { BoxProps } from "@chakra-ui/react";
import {
  GroupBase,
  MultiValue,
  Props,
  Select as ReactSelect,
  SelectInstance,
} from "chakra-react-select";
import { forwardRef, RefAttributes } from "react";

export type SelectProps = {
  containerProps?: BoxProps;
};

function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  {
    containerProps,
    chakraStyles,
    defaultValue,
    getOptionValue,
    ...rest
  }: WithRequired<Props<Option, IsMulti, Group>, "getOptionValue"> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>> &
    SelectProps,
  ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  // Make distinct keys based on the default value so that the select is re-rendered
  const formatKey = () => {
    if (Array.isArray(defaultValue)) {
      return (defaultValue as MultiValue<Option>)
        .map((it) => getOptionValue(it))
        .join(",");
    }
    return defaultValue && getOptionValue(defaultValue as Option);
  };

  return (
    <ReactSelect
      ref={ref}
      key={formatKey()}
      selectedOptionColorScheme="green"
      defaultValue={defaultValue}
      getOptionValue={getOptionValue}
      chakraStyles={{
        container: (prev) => ({
          ...prev,
          ...containerProps,
        }),
        dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
          ...prev,
          bg: "inherit",
          "> svg": {
            transitionDuration: "normal",
            transform: `rotate(${menuIsOpen ? -180 : 0}deg)`,
          },
        }),
        multiValue: (prev) => ({
          ...prev,
          px: 3,
          py: 1,
        }),
        ...chakraStyles,
      }}
      placeholder="Valitse"
      {...rest}
    />
  );
}
const WithRef = forwardRef(Select) as <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: WithRequired<Props<Option, IsMulti, Group>, "getOptionValue"> & {
    ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>;
  } & SelectProps
) => ReturnType<typeof Select>;

export default WithRef;
