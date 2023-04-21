import { FragmentType, getFragmentData, graphql } from "@/gql";
import Select, { SelectProps } from "../general/Select";

const ClassYearSelect_ClassYearInfo_Fragment = graphql(`
  fragment ClassYearSelect_ClassYearInfo on ClassYearInfo {
    code
    label
  }
`);

type ClassYearSelectProps = SelectProps & {
  classYears: FragmentType<typeof ClassYearSelect_ClassYearInfo_Fragment>[];
  initialClassYearCode?: string;
};

export default function ClassYearSelect({
  classYears: classYearFragments,
  initialClassYearCode,
  ...rest
}: ClassYearSelectProps) {
  const classYears = getFragmentData(
    ClassYearSelect_ClassYearInfo_Fragment,
    classYearFragments
  );

  return (
    <Select
      options={classYears}
      getOptionValue={(option) => option.code}
      isSearchable={false}
      defaultValue={classYears.find((it) => it.code === initialClassYearCode)}
      placeholder="Valitse vuosiluokka..."
      {...rest}
    />
  );
}
