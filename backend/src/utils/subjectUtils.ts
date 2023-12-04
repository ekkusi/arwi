import {
  ElementarySchoolObjectiveGroups,
  ElementarySchoolEnvironmentKey,
  Environment,
  LearningObjective,
  LearningObjectiveMinimal,
  PrimaryEducationLevel,
  Subject,
  SubjectMinimal,
  UnmappedEnvironment,
} from "../types/general";
import subjects from "../subject-schema.json";
import { ModuleInfo, EducationLevel, LearningObjectiveType, TranslatedString } from "../types";

export const getSubjectCode = (environmentCode: string) => {
  if (environmentCode.length < 2) {
    throw new Error("Invalid environment code");
  }
  return environmentCode.slice(0, 2);
};

export const getSubject = (subjectCode: string): Subject | undefined => {
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
    case EducationLevel.HIGH_SCHOOL:
      label = getSubject(subjectCode)?.highSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.name;
      break;
    case EducationLevel.VOCATIONAL:
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
    [EducationLevel.PRIMARY_FIRST, EducationLevel.PRIMARY_SECOND].forEach((it) =>
      getAndPushModuleIfExists(subjectCode, EducationLevel[it], "one_to_two_years", moduleInfos)
    );
  }
  if (subject.elementarySchool.three_to_six_years) {
    [EducationLevel.PRIMARY_THIRD, EducationLevel.PRIMARY_FOURTH, EducationLevel.PRIMARY_FIFTH, EducationLevel.PRIMARY_SIXTH].forEach((it) =>
      getAndPushModuleIfExists(subjectCode, EducationLevel[it], "three_to_six_years", moduleInfos)
    );
  }
  if (subject.elementarySchool.seven_to_nine_years) {
    [EducationLevel.PRIMARY_SEVENTH, EducationLevel.PRIMARY_EIGHTH, EducationLevel.PRIMARY_NINTH].forEach((it) =>
      getAndPushModuleIfExists(subjectCode, EducationLevel[it], "seven_to_nine_years", moduleInfos)
    );
  }
  subject.highSchoolModules?.forEach((it) => {
    getAndPushModuleIfExists(subjectCode, EducationLevel.HIGH_SCHOOL, it.code, moduleInfos);
  });
  subject.vocationalSchoolModules?.forEach((it) => {
    getAndPushModuleIfExists(subjectCode, EducationLevel.VOCATIONAL, it.code, moduleInfos);
  });
  return moduleInfos;
};

export const getLearningObjectives = (
  subjectCode: string,
  educationLevel: EducationLevel,
  learningObjectivesGroupKey: string
): LearningObjective[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];

  let objectives = [];
  switch (educationLevel) {
    case EducationLevel.HIGH_SCHOOL:
      objectives = subject.highSchoolModules?.find((it) => it.code === learningObjectivesGroupKey)?.learningObjectives || [];
      break;
    case EducationLevel.VOCATIONAL:
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

export const mapEnvironment = (environment: UnmappedEnvironment): Environment => ({
  ...environment,
  label: environment.name,
});

export const getEnvironment = (environmentCode: string): Environment | undefined => {
  const subject = getSubject(getSubjectCode(environmentCode));
  if (!subject) return undefined;
  let environment = subject.environments.find((it) => it.code === environmentCode);
  // Only search from other modules if not found in the previous one
  if (!environment) environment = subject.elementarySchool?.environments_1_to_2?.find((it) => it.code === environmentCode);
  if (!environment) environment = subject.elementarySchool?.environments_3_to_6?.find((it) => it.code === environmentCode);
  if (!environment) environment = subject.elementarySchool?.environments_7_to_9?.find((it) => it.code === environmentCode);
  if (!environment) environment = subject.highSchoolModules?.flatMap((it) => it.environments)?.find((it) => it.code === environmentCode);
  if (!environment) environment = subject.vocationalSchoolModules?.flatMap((it) => it.environments as any)?.find((it) => it.code === environmentCode); // Delete "as any" when first environment is added to vocational school modules
  return environment && mapEnvironment(environment);
};

export const getEnvironmentsByLevel = (subjectCode: string, educationLevel: EducationLevel, learningObjectiveGroupKey: string): Environment[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  const allLevelEnvironments = [...subject.environments] as UnmappedEnvironment[];
  // On top of environments that belong to all modules, fetch module-specific environments
  switch (educationLevel) {
    case EducationLevel.HIGH_SCHOOL: {
      const moduleEnvironments = subject.highSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.environments || [];
      allLevelEnvironments.push(...moduleEnvironments);
      break;
    }
    case EducationLevel.VOCATIONAL: {
      const moduleEnvironments = subject.vocationalSchoolModules?.find((it) => it.code === learningObjectiveGroupKey)?.environments || [];
      allLevelEnvironments.push(...moduleEnvironments);
      break;
    }
    default: {
      const elementarySchoolEnvironments =
        subject.elementarySchool[getElementarySchoolEnvironmentsKey(learningObjectiveGroupKey as ElementarySchoolObjectiveGroups)] || [];
      allLevelEnvironments.push(...elementarySchoolEnvironments);
      break;
    }
  }
  return allLevelEnvironments.map((it) => mapEnvironment(it));
};

export const getAllEnvironments = (subjectCode: string): Environment[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  const unmappedEnvironments = [...subject.environments] as UnmappedEnvironment[];
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
    case EducationLevel.HIGH_SCHOOL:
      return subject.highSchoolModules?.map((it) => it.code) || [];
    case EducationLevel.VOCATIONAL:
      return subject.vocationalSchoolModules?.map((it) => it.code) || [];
    default:
      return Object.keys(subject.elementarySchool);
  }
};
