import Select, { SelectCustomProps } from "../general/Select";

export type Subject = {
  code: string;
  label: string;
};

type SubjectSelectProps = SelectCustomProps & {
  subjects: Subject[];
  initialSubjectCode?: string;
  onChange?: (value: Subject | null) => void;
};

export default function SubjectSelect({
  subjects,
  onChange,
  initialSubjectCode,
  ...rest
}: SubjectSelectProps) {
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
