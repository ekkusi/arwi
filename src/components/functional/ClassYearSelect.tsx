import { FragmentType, getFragmentData, graphql } from "@/gql";
import { ClassYearSelect_ClassYearInfoFragment } from "@/gql/graphql";
import Select, { SelectProps } from "../general/Select";

const ClassYearSelect_ClassYearInfo_Fragment = graphql(`
  fragment ClassYearSelect_ClassYearInfo on ClassYearInfo {
    code
    label
  }
`);

type ClassYearSelectProps = SelectProps & {
  classYearInfos: FragmentType<typeof ClassYearSelect_ClassYearInfo_Fragment>[];
  initialClassYearCode?: string;
  onChange?: (value: ClassYearSelect_ClassYearInfoFragment | null) => void;
};

export default function ClassYearSelect({
  classYearInfos: classYearInfoFragments,
  initialClassYearCode,
  ...rest
}: ClassYearSelectProps) {
  const options = getFragmentData(
    ClassYearSelect_ClassYearInfo_Fragment,
    classYearInfoFragments
  );

  return (
    <Select
      options={options}
      getOptionValue={(option) => option.code}
      isSearchable={false}
      defaultValue={options.find((it) => it.code === initialClassYearCode)}
      placeholder="Valitse vuosiluokka..."
      {...rest}
    />
  );
}
