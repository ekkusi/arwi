import { CollectionType, EducationLevel, LearningObjectiveType, ModuleInfo, TranslatedString } from "./generated";
import { EnvironmentInfo, SubjectInfo } from "./codegenOverrides";

export type MinimalModuleInfo = Omit<ModuleInfo, "label">;

export type ElementarySchoolObjectiveGroups = "one_to_two_years" | "three_to_six_years" | "seven_to_nine_years";
export type ElementarySchoolEnvironmentKey = "environments_1_to_2" | "environments_3_to_6" | "environments_7_to_9";

export type LearningObjectiveInfo = Omit<
  NonNullable<NonNullable<SubjectInfo["elementarySchool"]>["one_to_two_years"]>[number],
  "type" | "longDescription"
> & {
  description: TranslatedString;
  type: LearningObjectiveType;
};

export type LearningObjectiveMinimal = Omit<LearningObjectiveInfo, "description" | "color">;

export type UnmappedEnvironment = SubjectInfo["elementarySchool"]["environments_1_to_2"][number];

export type MinimalEnvironment = Pick<EnvironmentInfo, "code" | "label">;

export type PrimaryEducationLevel = Exclude<EducationLevel, EducationLevel.HIGH_SCHOOL | EducationLevel.VOCATIONAL>;

export type CollectionTypeMinimal = Pick<CollectionType, "id" | "name" | "category">;
