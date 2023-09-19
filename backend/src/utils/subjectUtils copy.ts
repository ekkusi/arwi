import { ClassYearCode as PrismaClassYearCode } from "@prisma/client";
import subjects from "../subject-schema.json";
import { ClassYearCode, LearningObjectiveType } from "../types";

type TranslatedString = {
  fi: string;
  se?: string;
  en?: string;
};

export type Subject = (typeof subjects)[number];
export type SubjectMinimal = Pick<Subject, "code" | "name">;
export type LearningObjective = Omit<NonNullable<Subject["elementarySchool"]["one_to_two_years"]>[number], "type"> & {
  type: LearningObjectiveType;
};

export type LearningObjectiveMinimal = Omit<LearningObjective, "description">;

// export type LearningObjectiveKey = keyof Subject["learning_objectives"];

export type Environment = Subject["environments"][number];

export const getSubjectCode = (environmentCode: string) => {
  if (environmentCode.length < 2) {
    throw new Error("Invalid environment code");
  }
  return environmentCode.slice(0, 2);
};

// NOTE: Only temporal, remove when other subjects are added
// const sportsSubject = subjectSchema.subjects[0];

export const getSubject = (subjectCode: string): Subject | undefined => {
  const matchingSubject = subjects.find((it) => it.code === subjectCode);
  return matchingSubject; // NOTE: Return null when other subjects are added back
};

export const getSubjects = (): SubjectMinimal[] => {
  return subjects.map((it) => ({
    code: it.code,
    name: it.name,
  }));
};

export const getEnvironment = (environmentCode: string): Environment | null => {
  const subject = getSubject(getSubjectCode(environmentCode));
  if (!subject) return null;
  const environment = subject.environments.find((it) => it.code === environmentCode);
  return environment || null;
};

export type ClassYearInfo = {
  label: TranslatedString;
  code: ClassYearCode;
};

export const YEAR_CODE_LABELS: Record<PrismaClassYearCode, TranslatedString> = {
  PRIMARY_FIRST: {
    fi: "1. luokka",
  },
  PRIMARY_SECOND: {
    fi: "2. luokka",
  },
  PRIMARY_THIRD: {
    fi: "3. luokka",
  },
  // PRIMARY_SECOND: "2. luokka",
  // PRIMARY_THIRD: "3. luokka",
  // PRIMARY_FOURTH: "4. luokka",
  // PRIMARY_FIFTH: "5. luokka",
  // PRIMARY_SIXTH: "6. luokka",
  // PRIMARY_SEVENTH: "7. luokka",
  // PRIMARY_EIGHTH: "8. luokka",
  // PRIMARY_NINTH: "9. luokka",
  // HIGH_SCHOOL_FIRST: "LI 1 (lukio 1. moduuli)",
  // HIGH_SCHOOL_SECOND: "LI 2 (lukio 2. moduuli)",
  // HIGH_SCHOOL_THIRD: "LI 3 (lukio 3. moduuli)",
  // HIGH_SCHOOL_FOURTH: "LI 4 (lukio 4. moduuli)",
  // HIGH_SCHOOL_FIFTH: "LI 5 (lukio 5. moduuli)",
  // HIGH_SCHOOL_OTHER: "Lukio muu vapaavalintainen moduuli",
  // VOCATIONAL_OBLIGATORY: "Ammatillinen koulutus pakollinen",
  // VOCATIONAL_VOLUNTARY: "Ammatillinen koulutus valinnainen",
};

export const getClassYearInfo = (yearCode: PrismaClassYearCode): ClassYearInfo => {
  return {
    label: YEAR_CODE_LABELS[yearCode],
    code: ClassYearCode[yearCode],
  };
};

export const getClassYearInfos = () => {
  const yearInfos = Object.keys(ClassYearCode).map((it) => getClassYearInfo(it as ClassYearCode));
  return yearInfos;
};

export const getLearningObjectKey = (yearCode: ClassYearCode): LearningObjectiveKey => {
  switch (yearCode) {
    case ClassYearCode.PRIMARY_FIRST:
    case ClassYearCode.PRIMARY_SECOND:
      return "1-2";
    case ClassYearCode.PRIMARY_THIRD:
    case ClassYearCode.PRIMARY_FOURTH:
    case ClassYearCode.PRIMARY_FIFTH:
    case ClassYearCode.PRIMARY_SIXTH:
      return "3-6";
    case ClassYearCode.PRIMARY_SEVENTH:
    case ClassYearCode.PRIMARY_EIGHTH:
    case ClassYearCode.PRIMARY_NINTH:
      return "7-9";
    case ClassYearCode.HIGH_SCHOOL_FIRST:
      return "high_school_1";
    case ClassYearCode.HIGH_SCHOOL_SECOND:
      return "high_school_2";
    case ClassYearCode.HIGH_SCHOOL_THIRD:
      return "high_school_3";
    case ClassYearCode.HIGH_SCHOOL_FOURTH:
      return "high_school_4";
    case ClassYearCode.HIGH_SCHOOL_FIFTH:
      return "high_school_5";
    case ClassYearCode.HIGH_SCHOOL_OTHER:
      return "high_school_other";
    case ClassYearCode.VOCATIONAL_OBLIGATORY:
      return "vocational_obligatory";
    case ClassYearCode.VOCATIONAL_VOLUNTARY:
      return "vocational_voluntary";
    default:
      throw new Error("Invalid class year code");
  }
};

export const getLearningObjectives = (subjectCode: string, yearCode: ClassYearCode): LearningObjective[] => {
  const objectives = getSubject(subjectCode)?.learning_objectives[getLearningObjectKey(yearCode)] || [];

  return objectives.map((it) => ({
    ...it,
    type: it.type as LearningObjectiveType,
  }));
};

export const getEvaluableLearningObjectives = (subjectCode: string, yearCode: ClassYearCode) => {
  const objectives = getSubject(subjectCode)?.learning_objectives[getLearningObjectKey(yearCode)] || [];

  return objectives
    .filter((it) => it.type !== "NOT_EVALUATED")
    .map((it) => ({
      ...it,
      type: it.type as LearningObjectiveType,
    }));
};

export const getEvaluableLearningObjectivesMinimal = (subjectCode: string, yearCode: ClassYearCode): LearningObjectiveMinimal[] => {
  const objectives = getSubject(subjectCode)?.learning_objectives[getLearningObjectKey(yearCode)] || [];

  return objectives
    .filter((it) => it.type !== "NOT_EVALUATED")
    .map((it) => ({
      code: it.code,
      label: it.label,
      type: it.type as LearningObjectiveType,
    }));
};

export const getEnvironments = (subjectCode: string): Environment[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  return subject.environments;
};
