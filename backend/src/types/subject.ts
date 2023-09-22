import Module from "module";
import { EducationLevel, LearningObjectiveType, ModuleInfo } from "types";
import subjects from "../subject-schema.json";

export type TranslatedString = {
  fi: string;
  se?: string;
  en?: string;
};

export type MinimalModuleInfo = Omit<ModuleInfo, "label">;

export type Subject = Omit<(typeof subjects)[number], "name"> & {
  label: TranslatedString;
};
export type SubjectMinimal = Pick<Subject, "code" | "label">;
export type LearningObjective = Omit<NonNullable<Subject["elementarySchool"]["one_to_two_years"]>[number], "type" | "longDescription"> & {
  type: LearningObjectiveType;
  description: TranslatedString;
};

export type LearningObjectiveMinimal = Omit<LearningObjective, "description">;

// export type LearningObjectiveKey = keyof Subject["learning_objectives"];

export type Environment = Omit<Subject["environments"][number], "name"> & {
  label: TranslatedString;
};

export type PrimaryEducationLevel = Exclude<EducationLevel, EducationLevel.HIGH_SCHOOL | EducationLevel.VOCATIONAL>;
