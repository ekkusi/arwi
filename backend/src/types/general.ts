import { CollectionType, EducationLevel, LearningObjectiveType, ModuleInfo, TranslatedString } from "./generated";
import { EnvironmentInfo, SubjectInfo } from "./codegenOverrides";
import {
  checkCollectionTypeCategoryCoverage,
  checkEducationLevelCoverage,
  checkLearningObjectiveTypeCoverage,
  checkTokenUseWarningCoverage,
} from "./typeGuards";

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

export type UnmappedEnvironment = Exclude<SubjectInfo["elementarySchool"]["environments_1_to_2"], never | undefined>[number];

export type MinimalEnvironment = Pick<EnvironmentInfo, "code" | "label">;

export type PrimaryEducationLevel = Exclude<EducationLevel, "HIGH_SCHOOL" | "VOCATIONAL">;

export type CollectionTypeMinimal = Pick<CollectionType, "id" | "name" | "category">;

export const EDUCATION_LEVELS = checkEducationLevelCoverage([
  "PRIMARY_FIRST",
  "PRIMARY_SECOND",
  "PRIMARY_THIRD",
  "PRIMARY_FOURTH",
  "PRIMARY_FIFTH",
  "PRIMARY_SIXTH",
  "PRIMARY_SEVENTH",
  "PRIMARY_EIGHTH",
  "PRIMARY_NINTH",
  "HIGH_SCHOOL",
  "VOCATIONAL",
]);

export const TOKEN_USE_WARNINGS = checkTokenUseWarningCoverage(["FIRST_WARNING", "SECOND_WARNING"]);

export const LEARNING_OBJECTIVE_TYPES = checkLearningObjectiveTypeCoverage(["BEHAVIOUR", "SKILLS", "SKILLS_AND_BEHAVIOUR", "NOT_EVALUATED"]);

export const COLLECTION_TYPE_CATEGORIES = checkCollectionTypeCategoryCoverage(["CLASS_PARTICIPATION", "WRITTEN_WORK", "EXAM", "OTHER", "GROUP_WORK"]);
