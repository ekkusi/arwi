/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
};

export type Class = {
  __typename?: "Class";
  id: Scalars["ID"];
  lessonTypes?: Maybe<Array<Scalars["String"]>>;
  lessons?: Maybe<Array<Lesson>>;
  name: Scalars["String"];
  students?: Maybe<Array<Student>>;
  teacher: Teacher;
};

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  name: Scalars["String"];
};

export type Evaluation = {
  __typename?: "Evaluation";
  behaviourRating?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  lesson: Lesson;
  notes?: Maybe<Scalars["String"]>;
  skillsRating?: Maybe<Scalars["Int"]>;
  student: Student;
};

export type Lesson = {
  __typename?: "Lesson";
  class: Class;
  date: Scalars["Date"];
  description?: Maybe<Scalars["String"]>;
  evaluations?: Maybe<Array<Evaluation>>;
  id: Scalars["ID"];
  type: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTeacher: Teacher;
};

export type MutationCreateTeacherArgs = {
  data: CreateTeacherInput;
};

export type Query = {
  __typename?: "Query";
  getClasses?: Maybe<Array<Class>>;
  getTeacher: Teacher;
  greetings: Scalars["String"];
};

export type QueryGetClassesArgs = {
  teacherID: Scalars["ID"];
};

export type QueryGetTeacherArgs = {
  id: Scalars["ID"];
};

export type Student = {
  __typename?: "Student";
  class: Class;
  evaluations?: Maybe<Array<Evaluation>>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Teacher = {
  __typename?: "Teacher";
  class?: Maybe<Array<Class>>;
  email: Scalars["EmailAddress"];
  id: Scalars["ID"];
  name: Scalars["String"];
};
