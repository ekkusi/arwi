import { ClassYearCode as PrismaClassYearCode } from "@prisma/client";
import subjectSchema from "../subject-schema.json";
import { ClassYearInfo, ClassYearCode } from "../types";

export const getSubjectCode = (environmentCode: string) => {
  if (environmentCode.length < 2) {
    throw new Error("Invalid environment code");
  }
  return environmentCode.slice(0, 2);
};

export const getSubject = (environmentCode: string) => {
  const subjectCode = getSubjectCode(environmentCode);
  const matchingSubject = subjectSchema.subjects.find(
    (it) => it.code === subjectCode
  );
  return matchingSubject;
};

export const getEnvironment = (environmentCode: string) => {
  const subject = getSubject(environmentCode);
  if (!subject) return null;
  const environment = subject.environments.find(
    (it) => it.code === environmentCode
  );
  return environment || null;
};

export const SUBJECT_LABELS: Record<PrismaClassYearCode, string> = {
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
    label: SUBJECT_LABELS[yearCode],
    code: ClassYearCode[yearCode],
  };
};
