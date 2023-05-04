import { ClassYearInfo, getClassYearInfos } from "@/utils/subjectUtils";
import Select, { SelectProps } from "../general/Select";

type ClassYearSelectProps = Omit<
  SelectProps<ClassYearInfo>,
  "getOptionValue"
> & {
  initialClassYearCode?: string;
  onChange?: (value: ClassYearInfo | null) => void;
};

export default function ClassYearSelect({
  initialClassYearCode,
  ...rest
}: ClassYearSelectProps) {
  const options = getClassYearInfos();
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
