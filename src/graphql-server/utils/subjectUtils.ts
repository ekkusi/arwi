import subjectSchema from "../subject-schema.json";

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
