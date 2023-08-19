import { ClassYearCode as PrismaClassYearCode } from "@prisma/client";
import subjectSchema from "../subject-schema-only-sports.json";
import { ClassYearCode, LearningObjectiveType } from "../types";

export type Subject = (typeof subjectSchema.subjects)[number];
export type SubjectMinimal = Omit<Subject, "environments" | "learning_objectives">;
export type LearningObjective = Omit<Subject["learning_objectives"]["1-2"][number], "type"> & {
  type: LearningObjectiveType;
};

export type LearningObjectiveMinimal = Omit<LearningObjective, "description">;

export type LearningObjectiveKey = keyof Subject["learning_objectives"];

export type Environment = Subject["environments"][number];

export const getSubjectCode = (environmentCode: string) => {
  if (environmentCode.length < 2) {
    throw new Error("Invalid environment code");
  }
  return environmentCode.slice(0, 2);
};

// NOTE: Only temporal, remove when other subjects are added
const sportsSubject = subjectSchema.subjects[0];

export const getSubject = (subjectCode: string): Subject | null => {
  const matchingSubject = subjectSchema.subjects.find((it) => it.code === subjectCode);
  return matchingSubject || sportsSubject; // NOTE: Return null when other subjects are added back
};

export const getSubjects = (): SubjectMinimal[] => {
  return subjectSchema.subjects.map((it) => ({
    code: it.code,
    label: it.label,
  }));
};

export const getEnvironment = (environmentCode: string): Environment | null => {
  const subject = getSubject(getSubjectCode(environmentCode));
  if (!subject) return null;
  const environment = subject.environments.find((it) => it.code === environmentCode);
  return environment || null;
};

export type ClassYearInfo = {
  label: string;
  code: ClassYearCode;
};

export const YEAR_CODE_LABELS: Record<PrismaClassYearCode, string> = {
  PRIMARY_FIRST: "1. luokka",
  PRIMARY_SECOND: "2. luokka",
  PRIMARY_THIRD: "3. luokka",
  PRIMARY_FOURTH: "4. luokka",
  PRIMARY_FIFTH: "5. luokka",
  PRIMARY_SIXTH: "6. luokka",
  PRIMARY_SEVENTH: "7. luokka",
  PRIMARY_EIGHTH: "8. luokka",
  PRIMARY_NINTH: "9. luokka",
  HIGH_SCHOOL_FIRST: "Lukion 1. vuosi",
  HIGH_SCHOOL_SECOND: "Lukion 2. vuosi",
  HIGH_SCHOOL_THIRD: "Lukion 3. vuosi",
  VOCATIONAL_FIRST: "Ammattikoulu 1. vuosi",
  VOCATIONAL_SECOND: "Ammattikoulu 2. vuosi",
  VOCATIONAL_THIRD: "Ammattikoulu 3. vuosi",
  VOCATIONAL_FOURTH: "Ammattikoulu 4. vuosi",
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
    case ClassYearCode.HIGH_SCHOOL_SECOND:
    case ClassYearCode.HIGH_SCHOOL_THIRD:
      return "high_school_1-3";
    case ClassYearCode.VOCATIONAL_FIRST:
    case ClassYearCode.VOCATIONAL_SECOND:
    case ClassYearCode.VOCATIONAL_THIRD:
    case ClassYearCode.VOCATIONAL_FOURTH:
      return "vocational_1-4";
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

export const getEnvironments = (subjectCode: string): Environment[] => {
  const subject = getSubject(subjectCode);
  if (!subject) return [];
  return subject.environments;
};
