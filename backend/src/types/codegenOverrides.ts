import subjects from "../subject-schema.json";

type TranslatedString = {
  fi: string;
  se?: string;
  en?: string;
};

export type SubjectInfo = Omit<(typeof subjects)[number], "name"> & {
  label: TranslatedString;
};
export type SubjectMinimal = Pick<SubjectInfo, "code" | "label">;

type OriginalEnvironmentInfo = Exclude<SubjectInfo["elementarySchool"]["environments_1_to_2"], never[] | undefined>[number];

export type EnvironmentInfo = Omit<OriginalEnvironmentInfo, "name"> & {
  label: TranslatedString;
};
