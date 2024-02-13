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

export type EnvironmentInfo = Omit<SubjectInfo["elementarySchool"]["environments_1_to_2"][number], "name"> & {
  label: TranslatedString;
};
