import { BoxProps } from "@chakra-ui/react";
import { GroupBase, MultiValue, Props, Select as ReactSelect, SelectInstance, SingleValue } from "chakra-react-select";
import { forwardRef, RefAttributes, useMemo } from "react";
import { DEFAULT_COLOR_SCHEME } from "@/theme";

export function isMultiOption<T>(value: MultiValue<T> | SingleValue<T>): value is T[] {
  return Array.isArray(value);
}

export function isSingleOption<T>(value: MultiValue<T> | SingleValue<T>): value is T {
  return value != null && !isMultiOption(value);
}

export type SelectProps<Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = WithRequired<
  Props<Option, IsMulti, Group>,
  "getOptionValue"
> &
  Omit<RefAttributes<SelectInstance<Option, IsMulti, Group>>, "key"> & {
    containerProps?: BoxProps;
    key?: React.Key;
  };

function Select<Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  { chakraStyles, defaultValue, getOptionValue, containerProps, key: propKey, ...rest }: SelectProps<Option, IsMulti, Group>,
  ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  // Make distinct keys based on the default value so that the select is re-rendered
  const key = useMemo((): React.Key | undefined => {
    if (propKey) return propKey;
    if (Array.isArray(defaultValue)) {
      return (defaultValue as MultiValue<Option>).map((it) => getOptionValue(it)).join(",");
    }
    return defaultValue ? getOptionValue(defaultValue as Option) : undefined;
  }, [defaultValue, getOptionValue, propKey]);

  return (
    <ReactSelect
      ref={ref}
      key={key}
      selectedOptionColorScheme="green"
      defaultValue={defaultValue}
      getOptionValue={getOptionValue}
      hideSelectedOptions={false}
      closeMenuOnSelect={!rest.isMulti}
      blurInputOnSelect={!rest.isMulti}
      chakraStyles={{
        container: (styles, options) => ({
          ...styles,
          ...chakraStyles?.container?.(styles, options),
          ...containerProps,
        }),
        dropdownIndicator: (styles, options) => ({
          ...styles,
          bg: "inherit",
          color: `${DEFAULT_COLOR_SCHEME}.500`,
          "> svg": {
            transitionDuration: "normal",
            transform: `rotate(${options.selectProps.menuIsOpen ? -180 : 0}deg)`,
          },
          ...chakraStyles?.dropdownIndicator?.(styles, options),
        }),
        singleValue: (styles, props) => ({
          ...styles,
          ...chakraStyles?.singleValue?.(styles, props),
        }),
        multiValue: (styles, props) => ({
          ...styles,
          bg: `${DEFAULT_COLOR_SCHEME}.400`,
          color: `white`,
          fontSize: "sm",
          px: 3,
          py: 1,
          ...chakraStyles?.multiValue?.(styles, props),
        }),
        multiValueRemove: (styles, props) => ({
          ...styles,
          color: `white`,
          opacity: 1,
          ml: 1,
          ...chakraStyles?.multiValueRemove?.(styles, props),
        }),
        clearIndicator: (styles, props) => ({
          ...styles,
          color: `${DEFAULT_COLOR_SCHEME}.500`,
          opacity: 1,
          ...chakraStyles?.clearIndicator?.(styles, props),
        }),
        groupHeading: (styles, props) => ({
          ...styles,
          color: `${DEFAULT_COLOR_SCHEME}.500`,
          ...chakraStyles?.groupHeading?.(styles, props),
        }),
        option: (styles, props) => ({
          ...styles,
          bg: props.isSelected ? `${DEFAULT_COLOR_SCHEME}.400` : "inherit",
          _active: {
            bg: props.isSelected ? `${DEFAULT_COLOR_SCHEME}.400` : "inherit",
          },
          ...chakraStyles?.option?.(styles, props),
        }),
      }}
      placeholder="Valitse"
      {...rest}
    />
  );
}
const WithRef = forwardRef(Select) as <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: SelectProps<Option, IsMulti, Group> & {
    ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>;
  }
) => ReturnType<typeof Select>;

export default WithRef;
