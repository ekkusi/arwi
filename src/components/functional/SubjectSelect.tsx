import { getSubjects, SubjectMinimal } from "@/utils/subjectUtils";
import Select, { SelectProps } from "../general/Select";

type SubjectSelectProps = Omit<
  SelectProps<SubjectMinimal, boolean>,
  "getOptionValue"
> & {
  initialSubjectCode?: string;
  onChange?: (value: SubjectMinimal | null) => void;
};

export default function SubjectSelect({
  onChange,
  initialSubjectCode,
  ...rest
}: SubjectSelectProps) {
  const subjects = getSubjects();

  return (
    <Select
      options={subjects}
      defaultValue={subjects.find((it) => it.code === initialSubjectCode)}
      onChange={onChange}
      isSearchable={false}
      getOptionValue={(option) => option.code}
      placeholder="Valitse aine..."
      {...rest}
    />
  );
}
