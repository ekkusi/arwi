import {
  ElementarySchoolObjectiveGroups,
  ElementarySchoolEnvironmentKey,
  LearningObjectiveInfo,
  LearningObjectiveMinimal,
  PrimaryEducationLevel,
  UnmappedEnvironment,
  ModuleInfo,
  EducationLevel,
  LearningObjectiveType,
  TranslatedString,
  SubjectInfo,
  SubjectMinimal,
  EnvironmentInfo,
  MinimalModuleInfo,
} from "../types";
import subjects from "../subject-schema.json";

export const ELEMENTARY_LEARNING_GROUP_KEYS = ["one_to_two_years", "three_to_six_years", "seven_to_nine_years"];

export const getSubjectCode = (environmentCode: string) => {
  if (environmentCode.length < 2) {
    throw new Error("Invalid environment code");
  }
  return environmentCode.slice(0, 2);
};

export const getSubject = (subjectCode: string): SubjectInfo | undefined => {
  const matchingSubject = subjects.find((it) => it.code === subjectCode);
  return (
    matchingSubject && {
      ...matchingSubject,
      label: matchingSubject?.name,
    }
  );
};

export const getSubjects = (): SubjectMinimal[] => {
  return subjects.map((it) => ({
    code: it.code,
    label: it.name,
  }));
};

export const PRIMARY_YEAR_CODE_LABELS: Record<PrimaryEducationLevel, TranslatedString> = {
  PRIMARY_FIRST: { fi: "1. luokka" },
  PRIMARY_SECOND: { fi: "2. luokka" },
  PRIMARY_THIRD: { fi: "3. luokka" },
  PRIMARY_FOURTH: { fi: "4. luokka" },
  PRIMARY_FIFTH: { fi: "5. luokka" },
  PRIMARY_SIXTH: { fi: "6. luokka" },
  PRIMARY_SEVENTH: { fi: "7. luokka" },
  PRIMARY_EIGHTH: { fi: "8. luokka" },
  PRIMARY_NINTH: { fi: "9. luokka" },
};

// In case of high school or vocational school the label is the name of the (dynamic) module
// In case of primary school the labels are always static, hence we fetch them from the static object only by education level
export const getModuleInfo = (subjectCode: string, educationLevel: EducationLevel, learningObjectiveGroupKey: string): ModuleInfo | undefined => {
  let label: TranslatedString | undefined;
  switch (educationLevel) {
    case "HIGH_SCHOOL":
      label = getSubject(subjectCode)?.highSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.name;
      break;
    case "VOCATIONAL":
      label = getSubject(subjectCode)?.vocationalSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.name;
      break;
    default:
      label = PRIMARY_YEAR_CODE_LABELS[educationLevel];
      break;
  }
  if (!label) return undefined;
  return {
    label,
    educationLevel,
    learningObjectiveGroupKey,
  };
};

const getAndPushModuleIfExists = (subjectCode: string, educationLevel: EducationLevel, learningObjectiveGroupKey: string, modules: ModuleInfo[]) => {
  const module = getModuleInfo(subjectCode, educationLevel, learningObjectiveGroupKey);
  if (module) modules.push(module);
};

export const getModuleInfos = (subjectCode: string): ModuleInfo[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  const moduleInfos: ModuleInfo[] = [];
  if (subject.elementarySchool.one_to_two_years) {
    const oneToTwoYearLevels: EducationLevel[] = ["PRIMARY_FIRST", "PRIMARY_SECOND"];
    oneToTwoYearLevels.forEach((it) => getAndPushModuleIfExists(subjectCode, it, "one_to_two_years", moduleInfos));
  }
  if (subject.elementarySchool.three_to_six_years) {
    const threeToSixYearLevels: EducationLevel[] = ["PRIMARY_THIRD", "PRIMARY_FOURTH", "PRIMARY_FIFTH", "PRIMARY_SIXTH"];
    threeToSixYearLevels.forEach((it) => getAndPushModuleIfExists(subjectCode, it, "three_to_six_years", moduleInfos));
  }
  if (subject.elementarySchool.seven_to_nine_years) {
    const sevenToNineYearLevels: EducationLevel[] = ["PRIMARY_SEVENTH", "PRIMARY_EIGHTH", "PRIMARY_NINTH"];
    sevenToNineYearLevels.forEach((it) => getAndPushModuleIfExists(subjectCode, it, "seven_to_nine_years", moduleInfos));
  }
  subject.highSchoolModules?.forEach((it) => {
    getAndPushModuleIfExists(subjectCode, "HIGH_SCHOOL", it.code, moduleInfos);
  });
  subject.vocationalSchoolModules?.forEach((it) => {
    getAndPushModuleIfExists(subjectCode, "VOCATIONAL", it.code, moduleInfos);
  });
  return moduleInfos;
};

export const getLearningObjectives = (
  subjectCode: string,
  educationLevel: EducationLevel,
  learningObjectivesGroupKey: string
): LearningObjectiveInfo[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];

  let objectives = [];
  switch (educationLevel) {
    case "HIGH_SCHOOL":
      objectives = subject.highSchoolModules?.find((it) => it.code === learningObjectivesGroupKey)?.learningObjectives || [];
      break;
    case "VOCATIONAL":
      objectives = subject.vocationalSchoolModules?.find((it) => it.code === learningObjectivesGroupKey)?.learningObjectives || [];
      break;
    default:
      objectives = subject.elementarySchool[learningObjectivesGroupKey as ElementarySchoolObjectiveGroups] || [];
      break;
  }
  // const objectives = getSubject(subjectCode)?.learning_objectives[getLearningObjectKey(yearCode)] || [];

  return objectives.map((it) => ({
    ...it,
    description: it.longDescription,
    type: it.type as LearningObjectiveType,
  }));
};

export const getEvaluableLearningObjectives = (subjectCode: string, educationLevel: EducationLevel, learningObjectiveGroupKey: string) => {
  const objectives = getLearningObjectives(subjectCode, educationLevel, learningObjectiveGroupKey);
  return objectives.filter((it) => it.type !== "NOT_EVALUATED");
};

export const getEvaluableLearningObjectivesMinimal = (
  subjectCode: string,
  educationLevel: EducationLevel,
  learningObjectiveGroupKey: string
): LearningObjectiveMinimal[] => {
  const objectives = getLearningObjectives(subjectCode, educationLevel, learningObjectiveGroupKey);

  return objectives
    .filter((it) => it.type !== "NOT_EVALUATED")
    .map((it) => ({
      code: it.code,
      label: it.label,
      type: it.type as LearningObjectiveType,
    }));
};

export const getElementarySchoolEnvironmentsKey = (learningObjectiveGroupKey: ElementarySchoolObjectiveGroups): ElementarySchoolEnvironmentKey => {
  switch (learningObjectiveGroupKey) {
    case "three_to_six_years":
      return "environments_3_to_6";
    case "seven_to_nine_years":
      return "environments_7_to_9";
    default:
      return "environments_1_to_2";
  }
};

export const mapEnvironment = (environment: UnmappedEnvironment): EnvironmentInfo => ({
  ...environment,
  label: environment.name,
});

export const getEnvironment = (environmentCode: string, moduleInfo: MinimalModuleInfo): EnvironmentInfo | undefined => {
  const subject = getSubject(getSubjectCode(environmentCode));
  if (!subject) return undefined;
  let environment;
  if (isPrimaryEducationLevel(moduleInfo.educationLevel)) {
    const environmentKey = getElementarySchoolEnvironmentsKey(moduleInfo.learningObjectiveGroupKey as ElementarySchoolObjectiveGroups);
    environment = subject.elementarySchool[environmentKey]?.find((it) => it.code === environmentCode);
  } else if (moduleInfo.educationLevel === "HIGH_SCHOOL")
    environment = subject.highSchoolModules?.flatMap((it) => it.environments)?.find((it) => it.code === environmentCode);
  else if (moduleInfo.educationLevel === "VOCATIONAL")
    environment = subject.vocationalSchoolModules?.flatMap((it) => it.environments)?.find((it) => it.code === environmentCode);
  return environment && mapEnvironment(environment);
};

export const getEnvironmentsByLevel = (subjectCode: string, educationLevel: EducationLevel, learningObjectiveGroupKey: string): EnvironmentInfo[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  let environments;
  // On top of environments that belong to all modules, fetch module-specific environments
  switch (educationLevel) {
    case "HIGH_SCHOOL": {
      environments = subject.highSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.environments || [];
      break;
    }
    case "VOCATIONAL": {
      environments = subject.vocationalSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.environments || [];
      break;
    }
    default: {
      environments = subject.elementarySchool[getElementarySchoolEnvironmentsKey(learningObjectiveGroupKey as ElementarySchoolObjectiveGroups)] || [];
      break;
    }
  }
  return environments.map((it) => mapEnvironment(it));
};

export const getAllEnvironments = (subjectCode: string): EnvironmentInfo[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  const unmappedEnvironments = [] as UnmappedEnvironment[];
  if (subject.elementarySchool.environments_1_to_2)
    unmappedEnvironments.push(...(subject.elementarySchool.environments_1_to_2 as UnmappedEnvironment[]));
  if (subject.elementarySchool.environments_3_to_6)
    unmappedEnvironments.push(...(subject.elementarySchool.environments_3_to_6 as UnmappedEnvironment[]));
  if (subject.elementarySchool.environments_7_to_9)
    unmappedEnvironments.push(...(subject.elementarySchool.environments_7_to_9 as UnmappedEnvironment[]));
  if (subject.highSchoolModules) unmappedEnvironments.push(...subject.highSchoolModules.flatMap((it) => it.environments as UnmappedEnvironment[]));
  if (subject.vocationalSchoolModules)
    unmappedEnvironments.push(...subject.vocationalSchoolModules.flatMap((it) => it.environments as UnmappedEnvironment[]));

  return unmappedEnvironments.map((it) => mapEnvironment(it));
};

export const getLearningObjectiveGroupKeys = (subjectCode: string, educationLevel: EducationLevel): string[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  switch (educationLevel) {
    case "HIGH_SCHOOL":
      return subject.highSchoolModules?.map((it) => it.code) || [];
    case "VOCATIONAL":
      return subject.vocationalSchoolModules?.map((it) => it.code) || [];
    default:
      return ELEMENTARY_LEARNING_GROUP_KEYS;
  }
};

export const isPrimaryEducationLevel = (educationLevel: EducationLevel): boolean => {
  switch (educationLevel) {
    case "PRIMARY_FIRST":
    case "PRIMARY_SECOND":
    case "PRIMARY_THIRD":
    case "PRIMARY_FOURTH":
    case "PRIMARY_FIFTH":
    case "PRIMARY_SIXTH":
    case "PRIMARY_SEVENTH":
    case "PRIMARY_EIGHTH":
    case "PRIMARY_NINTH":
      return true;
    default:
      return false;
  }
};
