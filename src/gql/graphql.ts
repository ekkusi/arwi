/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, is compliant with the full-date format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for the representation of dates and times using the Gregorian calendar.
   *
   * This scalar is a description of the date, as used for birthdays for example. It cannot represent an instant on the timeline.
   */
  Date: any;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, is compliant with the date-time format outlined in section 5.6 of the RFC 3339
   * profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
   *
   * This scalar is a description of an exact instant on the timeline such as the instant that a user account was created.
   *
   * # Input Coercion
   *
   * When expected as an input type, only RFC 3339 compliant date-time strings are accepted. All other input values raise a query error indicating an incorrect type.
   *
   * # Result Coercion
   *
   * Where an RFC 3339 compliant date-time string has a time-zone other than UTC, it is shifted to UTC.
   * For example, the date-time string 2016-01-01T14:10:20+01:00 is shifted to 2016-01-01T13:10:20Z.
   */
  DateTime: any;
  /** A scalar to validate the email as it is defined in the HTML specification. */
  Email: any;
};

export type Class = {
  __typename?: 'Class';
  /** when the model was created */
  createdAt: Scalars['DateTime'];
  /** Unique identifier */
  id: Scalars['ID'];
  lessonTypes?: Maybe<Array<Scalars['String']>>;
  lessons?: Maybe<LessonConnection>;
  name: Scalars['String'];
  students?: Maybe<StudentConnection>;
  teacher: Teacher;
  /** when the model was updated */
  updatedAt: Scalars['DateTime'];
};


export type ClassLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassOrderByInput>;
};


export type ClassStudentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassOrderByInput>;
};

export type ClassByInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ClassConnection = {
  __typename?: 'ClassConnection';
  edges?: Maybe<Array<Maybe<ClassEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Class */
export type ClassCreateInput = {
  lessonTypes?: InputMaybe<Array<Scalars['String']>>;
  lessons?: InputMaybe<Array<ClassToLessonCreateLessonRelation>>;
  name: Scalars['String'];
  students?: InputMaybe<Array<ClassToStudentCreateStudentRelation>>;
  teacher: ClassToTeacherCreateTeacherRelation;
};

export type ClassCreatePayload = {
  __typename?: 'ClassCreatePayload';
  class?: Maybe<Class>;
};

export type ClassDeletePayload = {
  __typename?: 'ClassDeletePayload';
  deletedId: Scalars['ID'];
};

export type ClassEdge = {
  __typename?: 'ClassEdge';
  cursor: Scalars['String'];
  node: Class;
};

export type ClassOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to create a Class for the ClassToLesson relation of Lesson */
export type ClassToLessonCreateClass = {
  lessonTypes?: InputMaybe<Array<Scalars['String']>>;
  lessons?: InputMaybe<Array<ClassToLessonCreateLessonRelation>>;
  name: Scalars['String'];
  students?: InputMaybe<Array<ClassToStudentCreateStudentRelation>>;
  teacher: ClassToTeacherCreateTeacherRelation;
};

/** Input to link to or create a Class for the ClassToLesson relation of Lesson */
export type ClassToLessonCreateClassRelation = {
  create?: InputMaybe<ClassToLessonCreateClass>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Lesson for the ClassToLesson relation of Class */
export type ClassToLessonCreateLesson = {
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  evaluations?: InputMaybe<Array<EvaluationToLessonCreateEvaluationRelation>>;
  type: Scalars['String'];
};

/** Input to link to or create a Lesson for the ClassToLesson relation of Class */
export type ClassToLessonCreateLessonRelation = {
  create?: InputMaybe<ClassToLessonCreateLesson>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Class for the ClassToLesson relation of Lesson */
export type ClassToLessonUpdateClassRelation = {
  create?: InputMaybe<ClassToLessonCreateClass>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Lesson for the ClassToLesson relation of Class */
export type ClassToLessonUpdateLessonRelation = {
  create?: InputMaybe<ClassToLessonCreateLesson>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Class for the ClassToStudent relation of Student */
export type ClassToStudentCreateClass = {
  lessonTypes?: InputMaybe<Array<Scalars['String']>>;
  lessons?: InputMaybe<Array<ClassToLessonCreateLessonRelation>>;
  name: Scalars['String'];
  students?: InputMaybe<Array<ClassToStudentCreateStudentRelation>>;
  teacher: ClassToTeacherCreateTeacherRelation;
};

/** Input to link to or create a Class for the ClassToStudent relation of Student */
export type ClassToStudentCreateClassRelation = {
  create?: InputMaybe<ClassToStudentCreateClass>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Student for the ClassToStudent relation of Class */
export type ClassToStudentCreateStudent = {
  evaluations?: InputMaybe<Array<EvaluationToStudentCreateEvaluationRelation>>;
  name: Scalars['String'];
};

/** Input to link to or create a Student for the ClassToStudent relation of Class */
export type ClassToStudentCreateStudentRelation = {
  create?: InputMaybe<ClassToStudentCreateStudent>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Class for the ClassToStudent relation of Student */
export type ClassToStudentUpdateClassRelation = {
  create?: InputMaybe<ClassToStudentCreateClass>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Student for the ClassToStudent relation of Class */
export type ClassToStudentUpdateStudentRelation = {
  create?: InputMaybe<ClassToStudentCreateStudent>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Class for the ClassToTeacher relation of Teacher */
export type ClassToTeacherCreateClass = {
  lessonTypes?: InputMaybe<Array<Scalars['String']>>;
  lessons?: InputMaybe<Array<ClassToLessonCreateLessonRelation>>;
  name: Scalars['String'];
  students?: InputMaybe<Array<ClassToStudentCreateStudentRelation>>;
};

/** Input to link to or create a Class for the ClassToTeacher relation of Teacher */
export type ClassToTeacherCreateClassRelation = {
  create?: InputMaybe<ClassToTeacherCreateClass>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Teacher for the ClassToTeacher relation of Class */
export type ClassToTeacherCreateTeacher = {
  class?: InputMaybe<Array<ClassToTeacherCreateClassRelation>>;
  email: Scalars['Email'];
  name: Scalars['String'];
  passwordHash: Scalars['String'];
};

/** Input to link to or create a Teacher for the ClassToTeacher relation of Class */
export type ClassToTeacherCreateTeacherRelation = {
  create?: InputMaybe<ClassToTeacherCreateTeacher>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Class for the ClassToTeacher relation of Teacher */
export type ClassToTeacherUpdateClassRelation = {
  create?: InputMaybe<ClassToTeacherCreateClass>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Teacher for the ClassToTeacher relation of Class */
export type ClassToTeacherUpdateTeacherRelation = {
  create?: InputMaybe<ClassToTeacherCreateTeacher>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to update a Class */
export type ClassUpdateInput = {
  lessonTypes?: InputMaybe<Array<Scalars['String']>>;
  lessons?: InputMaybe<Array<ClassToLessonUpdateLessonRelation>>;
  name?: InputMaybe<Scalars['String']>;
  students?: InputMaybe<Array<ClassToStudentUpdateStudentRelation>>;
  teacher?: InputMaybe<ClassToTeacherUpdateTeacherRelation>;
};

export type ClassUpdatePayload = {
  __typename?: 'ClassUpdatePayload';
  class?: Maybe<Class>;
};

export type Evaluation = {
  __typename?: 'Evaluation';
  behaviourRating?: Maybe<Scalars['Int']>;
  /** when the model was created */
  createdAt: Scalars['DateTime'];
  /** Unique identifier */
  id: Scalars['ID'];
  lesson: Lesson;
  notes?: Maybe<Scalars['String']>;
  skillsRating?: Maybe<Scalars['Int']>;
  student: Student;
  /** when the model was updated */
  updatedAt: Scalars['DateTime'];
};

export type EvaluationByInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type EvaluationConnection = {
  __typename?: 'EvaluationConnection';
  edges?: Maybe<Array<Maybe<EvaluationEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Evaluation */
export type EvaluationCreateInput = {
  behaviourRating?: InputMaybe<Scalars['Int']>;
  lesson: EvaluationToLessonCreateLessonRelation;
  notes?: InputMaybe<Scalars['String']>;
  skillsRating?: InputMaybe<Scalars['Int']>;
  student: EvaluationToStudentCreateStudentRelation;
};

export type EvaluationCreatePayload = {
  __typename?: 'EvaluationCreatePayload';
  evaluation?: Maybe<Evaluation>;
};

export type EvaluationDeletePayload = {
  __typename?: 'EvaluationDeletePayload';
  deletedId: Scalars['ID'];
};

export type EvaluationEdge = {
  __typename?: 'EvaluationEdge';
  cursor: Scalars['String'];
  node: Evaluation;
};

export type EvaluationOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to create a Evaluation for the EvaluationToLesson relation of Lesson */
export type EvaluationToLessonCreateEvaluation = {
  behaviourRating?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  skillsRating?: InputMaybe<Scalars['Int']>;
  student: EvaluationToStudentCreateStudentRelation;
};

/** Input to link to or create a Evaluation for the EvaluationToLesson relation of Lesson */
export type EvaluationToLessonCreateEvaluationRelation = {
  create?: InputMaybe<EvaluationToLessonCreateEvaluation>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Lesson for the EvaluationToLesson relation of Evaluation */
export type EvaluationToLessonCreateLesson = {
  class: ClassToLessonCreateClassRelation;
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  evaluations?: InputMaybe<Array<EvaluationToLessonCreateEvaluationRelation>>;
  type: Scalars['String'];
};

/** Input to link to or create a Lesson for the EvaluationToLesson relation of Evaluation */
export type EvaluationToLessonCreateLessonRelation = {
  create?: InputMaybe<EvaluationToLessonCreateLesson>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Evaluation for the EvaluationToLesson relation of Lesson */
export type EvaluationToLessonUpdateEvaluationRelation = {
  create?: InputMaybe<EvaluationToLessonCreateEvaluation>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Lesson for the EvaluationToLesson relation of Evaluation */
export type EvaluationToLessonUpdateLessonRelation = {
  create?: InputMaybe<EvaluationToLessonCreateLesson>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Evaluation for the EvaluationToStudent relation of Student */
export type EvaluationToStudentCreateEvaluation = {
  behaviourRating?: InputMaybe<Scalars['Int']>;
  lesson: EvaluationToLessonCreateLessonRelation;
  notes?: InputMaybe<Scalars['String']>;
  skillsRating?: InputMaybe<Scalars['Int']>;
};

/** Input to link to or create a Evaluation for the EvaluationToStudent relation of Student */
export type EvaluationToStudentCreateEvaluationRelation = {
  create?: InputMaybe<EvaluationToStudentCreateEvaluation>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to create a Student for the EvaluationToStudent relation of Evaluation */
export type EvaluationToStudentCreateStudent = {
  class: ClassToStudentCreateClassRelation;
  evaluations?: InputMaybe<Array<EvaluationToStudentCreateEvaluationRelation>>;
  name: Scalars['String'];
};

/** Input to link to or create a Student for the EvaluationToStudent relation of Evaluation */
export type EvaluationToStudentCreateStudentRelation = {
  create?: InputMaybe<EvaluationToStudentCreateStudent>;
  link?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Evaluation for the EvaluationToStudent relation of Student */
export type EvaluationToStudentUpdateEvaluationRelation = {
  create?: InputMaybe<EvaluationToStudentCreateEvaluation>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to link/unlink to or create a Student for the EvaluationToStudent relation of Evaluation */
export type EvaluationToStudentUpdateStudentRelation = {
  create?: InputMaybe<EvaluationToStudentCreateStudent>;
  link?: InputMaybe<Scalars['ID']>;
  unlink?: InputMaybe<Scalars['ID']>;
};

/** Input to update a Evaluation */
export type EvaluationUpdateInput = {
  behaviourRating?: InputMaybe<IntOperationsInput>;
  lesson?: InputMaybe<EvaluationToLessonUpdateLessonRelation>;
  notes?: InputMaybe<Scalars['String']>;
  skillsRating?: InputMaybe<IntOperationsInput>;
  student?: InputMaybe<EvaluationToStudentUpdateStudentRelation>;
};

export type EvaluationUpdatePayload = {
  __typename?: 'EvaluationUpdatePayload';
  evaluation?: Maybe<Evaluation>;
};

/** Possible operations for an Int field */
export type IntOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  class: Class;
  /** when the model was created */
  createdAt: Scalars['DateTime'];
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  evaluations?: Maybe<EvaluationConnection>;
  /** Unique identifier */
  id: Scalars['ID'];
  type: Scalars['String'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime'];
};


export type LessonEvaluationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LessonOrderByInput>;
};

export type LessonByInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type LessonConnection = {
  __typename?: 'LessonConnection';
  edges?: Maybe<Array<Maybe<LessonEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Lesson */
export type LessonCreateInput = {
  class: ClassToLessonCreateClassRelation;
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  evaluations?: InputMaybe<Array<EvaluationToLessonCreateEvaluationRelation>>;
  type: Scalars['String'];
};

export type LessonCreatePayload = {
  __typename?: 'LessonCreatePayload';
  lesson?: Maybe<Lesson>;
};

export type LessonDeletePayload = {
  __typename?: 'LessonDeletePayload';
  deletedId: Scalars['ID'];
};

export type LessonEdge = {
  __typename?: 'LessonEdge';
  cursor: Scalars['String'];
  node: Lesson;
};

export type LessonOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to update a Lesson */
export type LessonUpdateInput = {
  class?: InputMaybe<ClassToLessonUpdateClassRelation>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  evaluations?: InputMaybe<Array<EvaluationToLessonUpdateEvaluationRelation>>;
  type?: InputMaybe<Scalars['String']>;
};

export type LessonUpdatePayload = {
  __typename?: 'LessonUpdatePayload';
  lesson?: Maybe<Lesson>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a Class */
  classCreate?: Maybe<ClassCreatePayload>;
  /** Delete a Class by ID or unique field */
  classDelete?: Maybe<ClassDeletePayload>;
  /** Update a Class */
  classUpdate?: Maybe<ClassUpdatePayload>;
  /** Create a Evaluation */
  evaluationCreate?: Maybe<EvaluationCreatePayload>;
  /** Delete a Evaluation by ID or unique field */
  evaluationDelete?: Maybe<EvaluationDeletePayload>;
  /** Update a Evaluation */
  evaluationUpdate?: Maybe<EvaluationUpdatePayload>;
  /** Create a Lesson */
  lessonCreate?: Maybe<LessonCreatePayload>;
  /** Delete a Lesson by ID or unique field */
  lessonDelete?: Maybe<LessonDeletePayload>;
  /** Update a Lesson */
  lessonUpdate?: Maybe<LessonUpdatePayload>;
  /** Create a Student */
  studentCreate?: Maybe<StudentCreatePayload>;
  /** Delete a Student by ID or unique field */
  studentDelete?: Maybe<StudentDeletePayload>;
  /** Update a Student */
  studentUpdate?: Maybe<StudentUpdatePayload>;
  /** Create a Teacher */
  teacherCreate?: Maybe<TeacherCreatePayload>;
  /** Delete a Teacher by ID or unique field */
  teacherDelete?: Maybe<TeacherDeletePayload>;
  /** Update a Teacher */
  teacherUpdate?: Maybe<TeacherUpdatePayload>;
};


export type MutationClassCreateArgs = {
  input: ClassCreateInput;
};


export type MutationClassDeleteArgs = {
  by: ClassByInput;
};


export type MutationClassUpdateArgs = {
  by: ClassByInput;
  input: ClassUpdateInput;
};


export type MutationEvaluationCreateArgs = {
  input: EvaluationCreateInput;
};


export type MutationEvaluationDeleteArgs = {
  by: EvaluationByInput;
};


export type MutationEvaluationUpdateArgs = {
  by: EvaluationByInput;
  input: EvaluationUpdateInput;
};


export type MutationLessonCreateArgs = {
  input: LessonCreateInput;
};


export type MutationLessonDeleteArgs = {
  by: LessonByInput;
};


export type MutationLessonUpdateArgs = {
  by: LessonByInput;
  input: LessonUpdateInput;
};


export type MutationStudentCreateArgs = {
  input: StudentCreateInput;
};


export type MutationStudentDeleteArgs = {
  by: StudentByInput;
};


export type MutationStudentUpdateArgs = {
  by: StudentByInput;
  input: StudentUpdateInput;
};


export type MutationTeacherCreateArgs = {
  input: TeacherCreateInput;
};


export type MutationTeacherDeleteArgs = {
  by: TeacherByInput;
};


export type MutationTeacherUpdateArgs = {
  by: TeacherByInput;
  input: TeacherUpdateInput;
};

export enum OrderByDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Query a single Class by an ID or a unique field */
  class?: Maybe<Class>;
  /** Paginated query to fetch the whole list of `Class`. */
  classCollection?: Maybe<ClassConnection>;
  /** Query a single Evaluation by an ID or a unique field */
  evaluation?: Maybe<Evaluation>;
  /** Paginated query to fetch the whole list of `Evaluation`. */
  evaluationCollection?: Maybe<EvaluationConnection>;
  /** Query a single Lesson by an ID or a unique field */
  lesson?: Maybe<Lesson>;
  /** Paginated query to fetch the whole list of `Lesson`. */
  lessonCollection?: Maybe<LessonConnection>;
  /** Query a single Student by an ID or a unique field */
  student?: Maybe<Student>;
  /** Paginated query to fetch the whole list of `Student`. */
  studentCollection?: Maybe<StudentConnection>;
  /** Query a single Teacher by an ID or a unique field */
  teacher?: Maybe<Teacher>;
  /** Paginated query to fetch the whole list of `Teacher`. */
  teacherCollection?: Maybe<TeacherConnection>;
};


export type QueryClassArgs = {
  by: ClassByInput;
};


export type QueryClassCollectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassOrderByInput>;
};


export type QueryEvaluationArgs = {
  by: EvaluationByInput;
};


export type QueryEvaluationCollectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EvaluationOrderByInput>;
};


export type QueryLessonArgs = {
  by: LessonByInput;
};


export type QueryLessonCollectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LessonOrderByInput>;
};


export type QueryStudentArgs = {
  by: StudentByInput;
};


export type QueryStudentCollectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StudentOrderByInput>;
};


export type QueryTeacherArgs = {
  by: TeacherByInput;
};


export type QueryTeacherCollectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TeacherOrderByInput>;
};

export type Student = {
  __typename?: 'Student';
  class: Class;
  /** when the model was created */
  createdAt: Scalars['DateTime'];
  evaluations?: Maybe<EvaluationConnection>;
  /** Unique identifier */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime'];
};


export type StudentEvaluationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StudentOrderByInput>;
};

export type StudentByInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type StudentConnection = {
  __typename?: 'StudentConnection';
  edges?: Maybe<Array<Maybe<StudentEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Student */
export type StudentCreateInput = {
  class: ClassToStudentCreateClassRelation;
  evaluations?: InputMaybe<Array<EvaluationToStudentCreateEvaluationRelation>>;
  name: Scalars['String'];
};

export type StudentCreatePayload = {
  __typename?: 'StudentCreatePayload';
  student?: Maybe<Student>;
};

export type StudentDeletePayload = {
  __typename?: 'StudentDeletePayload';
  deletedId: Scalars['ID'];
};

export type StudentEdge = {
  __typename?: 'StudentEdge';
  cursor: Scalars['String'];
  node: Student;
};

export type StudentOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to update a Student */
export type StudentUpdateInput = {
  class?: InputMaybe<ClassToStudentUpdateClassRelation>;
  evaluations?: InputMaybe<Array<EvaluationToStudentUpdateEvaluationRelation>>;
  name?: InputMaybe<Scalars['String']>;
};

export type StudentUpdatePayload = {
  __typename?: 'StudentUpdatePayload';
  student?: Maybe<Student>;
};

export type Teacher = {
  __typename?: 'Teacher';
  class?: Maybe<ClassConnection>;
  /** when the model was created */
  createdAt: Scalars['DateTime'];
  email: Scalars['Email'];
  /** Unique identifier */
  id: Scalars['ID'];
  name: Scalars['String'];
  passwordHash: Scalars['String'];
  /** when the model was updated */
  updatedAt: Scalars['DateTime'];
};


export type TeacherClassArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TeacherOrderByInput>;
};

export type TeacherByInput = {
  email?: InputMaybe<Scalars['Email']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type TeacherConnection = {
  __typename?: 'TeacherConnection';
  edges?: Maybe<Array<Maybe<TeacherEdge>>>;
  /** Information to aid in pagination */
  pageInfo: PageInfo;
};

/** Input to create a Teacher */
export type TeacherCreateInput = {
  class?: InputMaybe<Array<ClassToTeacherCreateClassRelation>>;
  email: Scalars['Email'];
  name: Scalars['String'];
  passwordHash: Scalars['String'];
};

export type TeacherCreatePayload = {
  __typename?: 'TeacherCreatePayload';
  teacher?: Maybe<Teacher>;
};

export type TeacherDeletePayload = {
  __typename?: 'TeacherDeletePayload';
  deletedId: Scalars['ID'];
};

export type TeacherEdge = {
  __typename?: 'TeacherEdge';
  cursor: Scalars['String'];
  node: Teacher;
};

export type TeacherOrderByInput = {
  createdAt?: InputMaybe<OrderByDirection>;
};

/** Input to update a Teacher */
export type TeacherUpdateInput = {
  class?: InputMaybe<Array<ClassToTeacherUpdateClassRelation>>;
  email?: InputMaybe<Scalars['Email']>;
  name?: InputMaybe<Scalars['String']>;
  passwordHash?: InputMaybe<Scalars['String']>;
};

export type TeacherUpdatePayload = {
  __typename?: 'TeacherUpdatePayload';
  teacher?: Maybe<Teacher>;
};

export type ClassOverviewPage_QueryQueryVariables = Exact<{
  classID: Scalars['ID'];
}>;


export type ClassOverviewPage_QueryQuery = { __typename?: 'Query', class?: { __typename?: 'Class', name: string, lessons?: { __typename?: 'LessonConnection', edges?: Array<{ __typename?: 'LessonEdge', node: { __typename?: 'Lesson', date: any, description?: string | null, type: string, evaluations?: { __typename?: 'EvaluationConnection', edges?: Array<{ __typename?: 'EvaluationEdge', node: { __typename?: 'Evaluation', behaviourRating?: number | null, skillsRating?: number | null, notes?: string | null, student: { __typename?: 'Student', name: string } } } | null> | null } | null } } | null> | null } | null } | null };

export type CreateClassMutationVariables = Exact<{
  name: Scalars['String'];
  teacherID: Scalars['ID'];
}>;


export type CreateClassMutation = { __typename?: 'Mutation', classCreate?: { __typename?: 'ClassCreatePayload', class?: { __typename?: 'Class', id: string, name: string } | null } | null };

export type MainPage_QueryQueryVariables = Exact<{
  teacherEmail: Scalars['Email'];
}>;


export type MainPage_QueryQuery = { __typename?: 'Query', teacher?: { __typename?: 'Teacher', email: any, name: string, class?: { __typename?: 'ClassConnection', edges?: Array<{ __typename?: 'ClassEdge', node: { __typename?: 'Class', name: string } } | null> | null } | null } | null };

export type GetTeacherQueryVariables = Exact<{
  email: Scalars['Email'];
}>;


export type GetTeacherQuery = { __typename?: 'Query', teacher?: { __typename?: 'Teacher', id: string, email: any, name: string, passwordHash: string } | null };

export type CreateTeacherMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['Email'];
  passwordHash: Scalars['String'];
}>;


export type CreateTeacherMutation = { __typename?: 'Mutation', teacherCreate?: { __typename?: 'TeacherCreatePayload', teacher?: { __typename?: 'Teacher', id: string, email: any, name: string, passwordHash: string } | null } | null };


export const ClassOverviewPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClassOverviewPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ClassOverviewPage_QueryQuery, ClassOverviewPage_QueryQueryVariables>;
export const CreateClassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"teacher"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"class"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateClassMutation, CreateClassMutationVariables>;
export const MainPage_QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MainPage_Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherEmail"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"class"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MainPage_QueryQuery, MainPage_QueryQueryVariables>;
export const GetTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"passwordHash"}}]}}]}}]} as unknown as DocumentNode<GetTeacherQuery, GetTeacherQueryVariables>;
export const CreateTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordHash"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"passwordHash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordHash"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"passwordHash"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTeacherMutation, CreateTeacherMutationVariables>;