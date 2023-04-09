import { BoxProps } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export type Subject = {
  code: string;
  label: string;
};

type SubjectSelectProps = {
  subjects: Subject[];
  initialSubjectCode?: string;
  onChange?: (value: Subject | null) => void;
  containerProps?: BoxProps;
};

export default function SubjectSelect({
  subjects,
  onChange,
  initialSubjectCode,
  containerProps,
}: SubjectSelectProps) {
  return (
    <Select
      options={subjects}
      defaultValue={subjects.find((it) => it.code === initialSubjectCode)}
      onChange={onChange}
      isSearchable={false}
      selectedOptionColorScheme="green"
      getOptionValue={(option) => option.code}
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
      }}
    />
  );
}
