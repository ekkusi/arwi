import { CollectionType, EducationLevel, LearningObjectiveType, ModuleInfo } from "./generated";
import { Environment, Subject, TranslatedString } from "./codegenOverrides";

export type MinimalModuleInfo = Omit<ModuleInfo, "label">;

export type ElementarySchoolObjectiveGroups = "one_to_two_years" | "three_to_six_years" | "seven_to_nine_years";
export type ElementarySchoolEnvironmentKey = "environments_1_to_2" | "environments_3_to_6" | "environments_7_to_9";

export type LearningObjective = Omit<
  NonNullable<NonNullable<Subject["elementarySchool"]>["one_to_two_years"]>[number],
  "type" | "longDescription"
> & {
  description: TranslatedString;
  type: LearningObjectiveType;
};

export type LearningObjectiveMinimal = Omit<LearningObjective, "description">;

export type UnmappedEnvironment = Subject["environments"][number];

export type MinimalEnvironment = Pick<Environment, "code" | "label">;

export type PrimaryEducationLevel = Exclude<EducationLevel, EducationLevel.HIGH_SCHOOL | EducationLevel.VOCATIONAL>;

export type CollectionTypeMinimal = Pick<CollectionType, "id" | "name" | "category">;
