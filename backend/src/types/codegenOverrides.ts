import subjects from "../subject-schema.json";

export type TranslatedString = {
  fi: string;
  se?: string;
  en?: string;
};

export type Subject = Omit<(typeof subjects)[number], "name"> & {
  label: TranslatedString;
};
export type SubjectMinimal = Pick<Subject, "code" | "label">;

export type Environment = Omit<Subject["environments"][number], "name"> & {
  label: TranslatedString;
};
