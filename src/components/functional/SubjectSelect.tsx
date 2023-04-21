import { FragmentType, getFragmentData, graphql } from "@/gql";
import { SubjectSelect_SubjectFragment } from "@/gql/graphql";
import Select, { SelectProps } from "../general/Select";

const SubjectSelect_Subject_Fragment = graphql(`
  fragment SubjectSelect_Subject on Subject {
    code
    label
  }
`);

type SubjectSelectProps = SelectProps & {
  subjects: FragmentType<typeof SubjectSelect_Subject_Fragment>[];
  initialSubjectCode?: string;
  onChange?: (value: SubjectSelect_SubjectFragment | null) => void;
};

export default function SubjectSelect({
  subjects: subjectFragments,
  onChange,
  initialSubjectCode,
  ...rest
}: SubjectSelectProps) {
  const subjects = getFragmentData(
    SubjectSelect_Subject_Fragment,
    subjectFragments
  );
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
