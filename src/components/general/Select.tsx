import { BoxProps } from "@chakra-ui/react";
import {
  GroupBase,
  Props,
  Select as ReactSelect,
  SelectInstance,
} from "chakra-react-select";
import { forwardRef, RefAttributes } from "react";

export type SelectCustomProps = {
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
    ...rest
  }: Props<Option, IsMulti, Group> &
    RefAttributes<SelectInstance<Option, IsMulti, Group>> &
    SelectCustomProps,
  ref: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>
) {
  return (
    <ReactSelect
      ref={ref}
      selectedOptionColorScheme="green"
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
  props: Props<Option, IsMulti, Group> & {
    ref?: React.ForwardedRef<SelectInstance<Option, IsMulti, Group>>;
  } & SelectCustomProps
) => ReturnType<typeof Select>;

export default WithRef;
