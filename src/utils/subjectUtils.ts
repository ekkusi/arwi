import { ClassYearCode as PrismaClassYearCode } from "@prisma/client";
import subjectSchema from "../graphql-server/subject-schema.json";
import { ClassYearCode } from "../graphql-server/types";

export type Subject = (typeof subjectSchema.subjects)[number];
export type SubjectMinimal = Omit<Subject, "environments">;

export type Environment =
  (typeof subjectSchema.subjects)[number]["environments"][number];

export const getSubjectCode = (environmentCode: string) => {
  if (environmentCode.length < 2) {
    throw new Error("Invalid environment code");
  }
  return environmentCode.slice(0, 2);
};

export const getSubject = (subjectCode: string): Subject | null => {
  const matchingSubject = subjectSchema.subjects.find(
    (it) => it.code === subjectCode
  );
  return matchingSubject || null;
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
  const environment = subject.environments.find(
    (it) => it.code === environmentCode
  );
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

export const getClassYearInfo = (
  yearCode: PrismaClassYearCode
): ClassYearInfo => {
  return {
    label: YEAR_CODE_LABELS[yearCode],
    code: ClassYearCode[yearCode],
  };
};

export const getClassYearInfos = () => {
  const yearInfos = Object.keys(ClassYearCode).map((it) =>
    getClassYearInfo(it as ClassYearCode)
  );
  return yearInfos;
};
