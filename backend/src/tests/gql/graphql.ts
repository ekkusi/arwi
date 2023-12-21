/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: string; output: string; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: string; output: string; }
};

export type Query = {
  __typename?: 'Query';
  getAppMetadata: AppMetadata;
  getCurrentUser: Teacher;
  getTeacher: Teacher;
  getGroups: Array<Group>;
  getGroup: Group;
  getCollection: EvaluationCollection;
  getStudent: Student;
  getEvaluation: Evaluation;
};


export type QueryGetTeacherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGroupsArgs = {
  teacherId: Scalars['ID']['input'];
};


export type QueryGetGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetStudentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEvaluationArgs = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: AuthPayload;
  login: AuthPayload;
  mPassIDLogin: MPassIdAuthPayload;
  requestPasswordReset: Scalars['Boolean']['output'];
  verifyPasswordResetCode: Scalars['Boolean']['output'];
  updatePassword: Scalars['Boolean']['output'];
  connectMPassID: AuthPayload;
  connectLocalCredentials: AuthPayload;
  logout: Scalars['Boolean']['output'];
  createGroup: Group;
  createCollection: EvaluationCollection;
  createStudent: Student;
  updateEvaluations: Scalars['Int']['output'];
  updateCollection: EvaluationCollection;
  updateStudent: Student;
  updateGroup: Group;
  updateEvaluation: Evaluation;
  deleteStudent: Student;
  deleteGroup: Group;
  deleteCollection: EvaluationCollection;
  changeGroupModule: Group;
  generateStudentFeedback: Scalars['String']['output'];
  fixTextGrammatics: Scalars['String']['output'];
};


export type MutationRegisterArgs = {
  data: CreateTeacherInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMPassIdLoginArgs = {
  code: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationVerifyPasswordResetCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationUpdatePasswordArgs = {
  recoveryCode: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationConnectMPassIdArgs = {
  code: Scalars['String']['input'];
};


export type MutationConnectLocalCredentialsArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};


export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationUpdateEvaluationsArgs = {
  data: Array<UpdateEvaluationInput>;
  collectionId: Scalars['ID']['input'];
};


export type MutationUpdateCollectionArgs = {
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
};


export type MutationUpdateStudentArgs = {
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
};


export type MutationUpdateEvaluationArgs = {
  data: UpdateEvaluationInput;
};


export type MutationDeleteStudentArgs = {
  studentId: Scalars['ID']['input'];
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationChangeGroupModuleArgs = {
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
};


export type MutationGenerateStudentFeedbackArgs = {
  studentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
};


export type MutationFixTextGrammaticsArgs = {
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type AppMetadata = {
  __typename?: 'AppMetadata';
  appVersion: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  userData: Teacher;
};

export type MPassIdAuthPayload = {
  __typename?: 'MPassIDAuthPayload';
  payload: AuthPayload;
  newUserCreated: Scalars['Boolean']['output'];
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID']['output'];
  email?: Maybe<Scalars['EmailAddress']['output']>;
  groups: Array<Group>;
  languagePreference: Scalars['String']['output'];
  consentsAnalytics: Scalars['Boolean']['output'];
  isMPassIDConnected: Scalars['Boolean']['output'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  userData: Teacher;
};

export type TranslatedString = {
  __typename?: 'TranslatedString';
  fi: Scalars['String']['output'];
  en?: Maybe<Scalars['String']['output']>;
  se?: Maybe<Scalars['String']['output']>;
};

export enum LearningObjectiveType {
  BEHAVIOUR = 'BEHAVIOUR',
  SKILLS = 'SKILLS',
  SKILLS_AND_BEHAVIOUR = 'SKILLS_AND_BEHAVIOUR',
  NOT_EVALUATED = 'NOT_EVALUATED'
}

export type LearningObjective = {
  __typename?: 'LearningObjective';
  code: Scalars['ID']['output'];
  label: TranslatedString;
  description: TranslatedString;
  type: LearningObjectiveType;
};

export type Subject = {
  __typename?: 'Subject';
  code: Scalars['ID']['output'];
  label: TranslatedString;
  environments: Array<Environment>;
};

export type Environment = {
  __typename?: 'Environment';
  code: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  label: TranslatedString;
  subject: Subject;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  students: Array<Student>;
  subject: Subject;
  teacher: Teacher;
  updatedAt: Scalars['DateTime']['output'];
  archived: Scalars['Boolean']['output'];
  currentModule: Module;
  modules: Array<Module>;
  collectionTypes: Array<CollectionType>;
};

export type CollectionType = {
  __typename?: 'CollectionType';
  id: Scalars['ID']['output'];
  category: CollectionTypeCategory;
  name: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
  group: Group;
};

export enum CollectionTypeCategory {
  CLASS_PARTICIPATION = 'CLASS_PARTICIPATION',
  EXAM = 'EXAM',
  WRITTEN_WORK = 'WRITTEN_WORK',
  GROUP_WORK = 'GROUP_WORK',
  OTHER = 'OTHER'
}

export type ModuleInfo = {
  __typename?: 'ModuleInfo';
  educationLevel: EducationLevel;
  learningObjectiveGroupKey: Scalars['String']['output'];
  label: TranslatedString;
};

export type Module = {
  __typename?: 'Module';
  id: Scalars['ID']['output'];
  info: ModuleInfo;
  evaluationCollections: Array<EvaluationCollection>;
  students: Array<Student>;
  group: Group;
};

export type EvaluationCollection = {
  __typename?: 'EvaluationCollection';
  id: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  type: CollectionType;
  environment: Environment;
  description?: Maybe<Scalars['String']['output']>;
  evaluations: Array<Evaluation>;
  module: Module;
  learningObjectives: Array<LearningObjective>;
};

export type Evaluation = {
  __typename?: 'Evaluation';
  id: Scalars['ID']['output'];
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
  skillsRating?: Maybe<Scalars['Int']['output']>;
  behaviourRating?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  isStellar: Scalars['Boolean']['output'];
  collection: EvaluationCollection;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  group: Group;
  currentModuleEvaluations: Array<Evaluation>;
};

export enum EducationLevel {
  PRIMARY_FIRST = 'PRIMARY_FIRST',
  PRIMARY_SECOND = 'PRIMARY_SECOND',
  PRIMARY_THIRD = 'PRIMARY_THIRD',
  PRIMARY_FOURTH = 'PRIMARY_FOURTH',
  PRIMARY_FIFTH = 'PRIMARY_FIFTH',
  PRIMARY_SIXTH = 'PRIMARY_SIXTH',
  PRIMARY_SEVENTH = 'PRIMARY_SEVENTH',
  PRIMARY_EIGHTH = 'PRIMARY_EIGHTH',
  PRIMARY_NINTH = 'PRIMARY_NINTH',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  VOCATIONAL = 'VOCATIONAL'
}

export type CreateTeacherInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
  languagePreference?: InputMaybe<Scalars['String']['input']>;
  consentsAnalytics?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateGroupInput = {
  name: Scalars['String']['input'];
  teacherId: Scalars['ID']['input'];
  subjectCode: Scalars['ID']['input'];
  educationLevel: EducationLevel;
  learningObjectiveGroupKey: Scalars['String']['input'];
  students: Array<CreateStudentInput>;
  collectionTypes: Array<CreateCollectionTypeInput>;
};

export type UpdateGroupInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateStudentInput = {
  name: Scalars['String']['input'];
};

export type CreateCollectionTypeInput = {
  category: CollectionTypeCategory;
  name: Scalars['String']['input'];
  weight: Scalars['Int']['input'];
};

export type UpdateStudentInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCollectionInput = {
  date: Scalars['Date']['input'];
  typeId: Scalars['ID']['input'];
  environmentCode: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  learningObjectiveCodes: Array<Scalars['ID']['input']>;
  evaluations?: InputMaybe<Array<CreateEvaluationInput>>;
};

export type UpdateCollectionInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  typeId?: InputMaybe<Scalars['ID']['input']>;
  environmentCode?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  learningObjectiveCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
  evaluations?: InputMaybe<Array<UpdateEvaluationInput>>;
};

export type CreateEvaluationInput = {
  studentId: Scalars['ID']['input'];
  wasPresent: Scalars['Boolean']['input'];
  skillsRating?: InputMaybe<Scalars['Int']['input']>;
  behaviourRating?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  isStellar?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateEvaluationInput = {
  id: Scalars['ID']['input'];
  wasPresent?: InputMaybe<Scalars['Boolean']['input']>;
  skillsRating?: InputMaybe<Scalars['Int']['input']>;
  behaviourRating?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  isStellar?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ChangeGroupModuleInput = {
  newEducationLevel: EducationLevel;
  newLearningObjectiveGroupKey: Scalars['String']['input'];
};

export type CreateCollectionMutationVariables = Exact<{
  data: CreateCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'EvaluationCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string }, environment: { __typename?: 'Environment', code: string }, evaluations: Array<{ __typename?: 'Evaluation', skillsRating?: number | null, behaviourRating?: number | null, student: { __typename?: 'Student', id: string } }>, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string }> } };

export type CreateCollectionInvalidEnvironmentMutationVariables = Exact<{
  data: CreateCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateCollectionInvalidEnvironmentMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'EvaluationCollection', id: string } };

export type CreateCollectionInvalidLearningObjectivesMutationVariables = Exact<{
  data: CreateCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateCollectionInvalidLearningObjectivesMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'EvaluationCollection', id: string } };

export type CreateCollectionNotEvaluatedLearningObjectivesMutationVariables = Exact<{
  data: CreateCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateCollectionNotEvaluatedLearningObjectivesMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'EvaluationCollection', id: string } };

export type CreateGroupMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, teacher: { __typename?: 'Teacher', id: string }, subject: { __typename?: 'Subject', code: string }, students: Array<{ __typename?: 'Student', name: string }>, collectionTypes: Array<{ __typename?: 'CollectionType', name: string, weight: number }> } };

export type CreateGroupInvalidSubjectMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupInvalidSubjectMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string } };

export type CreateGroupEmptyCollectionsMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupEmptyCollectionsMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string } };

export type CreateGroupInvalidWeightsMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupInvalidWeightsMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string } };

export type CreateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string, name: string, group: { __typename?: 'Group', id: string } } };

export type CreateDuplicateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateDuplicateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string } };

export type DeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'EvaluationCollection', id: string } };

export type DeleteCollectionUnauthorizedMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionUnauthorizedMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'EvaluationCollection', id: string, description?: string | null } };

export type DeleteCollectionInvalidIdMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionInvalidIdMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'EvaluationCollection', id: string } };

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type DeleteGroupUnauthorizedMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type DeleteGroupUnauthorizedMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type DeleteGroupInvalidIdMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type DeleteGroupInvalidIdMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type DeleteStudentMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: string } };

export type DeleteStudentUnauthorizedMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type DeleteStudentUnauthorizedMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: string } };

export type DeleteStudentInvalidIdMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type DeleteStudentInvalidIdMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: string } };

export type FixTextGrammaticsValidInputMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsValidInputMutation = { __typename?: 'Mutation', fixTextGrammatics: string };

export type FixTextGrammaticsUnauthorizedMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsUnauthorizedMutation = { __typename?: 'Mutation', fixTextGrammatics: string };

export type FixTextGrammaticsInvalidStudentMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsInvalidStudentMutation = { __typename?: 'Mutation', fixTextGrammatics: string };

export type FixTextGrammaticsEmptyTextMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsEmptyTextMutation = { __typename?: 'Mutation', fixTextGrammatics: string };

export type ChangeGroupModuleValidInputMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleValidInputMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string } } } };

export type ChangeGroupModuleUnAuthorizedMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleUnAuthorizedMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string } };

export type ChangeGroupModuleInvalidIdMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleInvalidIdMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string } };

export type ChangeGroupModuleInvalidLearningObjectiveKeyMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleInvalidLearningObjectiveKeyMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string } };

export type LoginTest_ValidLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginTest_ValidLoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type LoginTest_InvalidLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginTest_InvalidLoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type LoginTest_NoEmailLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginTest_NoEmailLoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type Test_LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Test_LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type Test_LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type Test_LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RequestPasswordResetValidMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetValidMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type VerifyPasswordResetCodeValidMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyPasswordResetCodeValidMutation = { __typename?: 'Mutation', verifyPasswordResetCode: boolean };

export type UpdatePasswordValidMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  recoveryCode: Scalars['String']['input'];
}>;


export type UpdatePasswordValidMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type RequestPasswordResetInvalidEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetInvalidEmailMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type RequestPasswordResetExceedTriesMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetExceedTriesMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type VerifyPasswordResetCodeInvalidMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyPasswordResetCodeInvalidMutation = { __typename?: 'Mutation', verifyPasswordResetCode: boolean };

export type VerifyPasswordResetCodeExpiredMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyPasswordResetCodeExpiredMutation = { __typename?: 'Mutation', verifyPasswordResetCode: boolean };

export type VerifyPasswordResetCodeExceedTriesMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyPasswordResetCodeExceedTriesMutation = { __typename?: 'Mutation', verifyPasswordResetCode: boolean };

export type RegisterTest_RegisterMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type RegisterTest_RegisterExistingEmailMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterExistingEmailMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type RegisterTest_RegisterInvalidLanguageMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterInvalidLanguageMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type UpdateCollectionMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string }, environment: { __typename?: 'Environment', code: string }, evaluations: Array<{ __typename?: 'Evaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null, wasPresent: boolean, isStellar: boolean }>, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string }> } };

export type UpdateCollectionUnauthorizedMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionUnauthorizedMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string } };

export type UpdateCollectionInvalidIdMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionInvalidIdMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string } };

export type UpdateCollectionInvalidEnvironmentMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionInvalidEnvironmentMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string } };

export type UpdateCollectionInvalidLearningObjectivesMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionInvalidLearningObjectivesMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string } };

export type UpdateCollectionEvaluationsNotInCollectionMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionEvaluationsNotInCollectionMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string } };

export type UpdateCollectionInvalidStudentPresenceMutationVariables = Exact<{
  data: UpdateCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateCollectionInvalidStudentPresenceMutation = { __typename?: 'Mutation', updateCollection: { __typename?: 'EvaluationCollection', id: string } };

export type UpdateEvaluationMutationVariables = Exact<{
  data: UpdateEvaluationInput;
}>;


export type UpdateEvaluationMutation = { __typename?: 'Mutation', updateEvaluation: { __typename?: 'Evaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null, isStellar: boolean } };

export type UpdateEvaluationUnauthorizedMutationVariables = Exact<{
  data: UpdateEvaluationInput;
}>;


export type UpdateEvaluationUnauthorizedMutation = { __typename?: 'Mutation', updateEvaluation: { __typename?: 'Evaluation', id: string } };

export type UpdateEvaluationInvalidIdMutationVariables = Exact<{
  data: UpdateEvaluationInput;
}>;


export type UpdateEvaluationInvalidIdMutation = { __typename?: 'Mutation', updateEvaluation: { __typename?: 'Evaluation', id: string } };

export type UpdateEvaluationNotPresentMutationVariables = Exact<{
  data: UpdateEvaluationInput;
}>;


export type UpdateEvaluationNotPresentMutation = { __typename?: 'Mutation', updateEvaluation: { __typename?: 'Evaluation', id: string } };

export type UpdateEvaluationsMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateEvaluationsMutation = { __typename?: 'Mutation', updateEvaluations: number };

export type UpdateEvaluationsUnauthenticatedMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateEvaluationsUnauthenticatedMutation = { __typename?: 'Mutation', updateEvaluations: number };

export type UpdateEvaluationsUnauthorizedMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateEvaluationsUnauthorizedMutation = { __typename?: 'Mutation', updateEvaluations: number };

export type UpdateEvaluationsInvalidIdMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateEvaluationsInvalidIdMutation = { __typename?: 'Mutation', updateEvaluations: number };

export type UpdateEvaluationsNotInCollectionMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateEvaluationsNotInCollectionMutation = { __typename?: 'Mutation', updateEvaluations: number };

export type UpdateEvaluationsNotPresentMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateEvaluationsNotPresentMutation = { __typename?: 'Mutation', updateEvaluations: number };

export type UpdateGroupMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, archived: boolean } };

export type UpdateGroupUnauthorizedMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupUnauthorizedMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, archived: boolean } };

export type UpdateGroupInvalidIdMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupInvalidIdMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, archived: boolean } };

export type UpdateStudentMutationVariables = Exact<{
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
}>;


export type UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, name: string } };

export type UpdateStudentUnauthorizedMutationVariables = Exact<{
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
}>;


export type UpdateStudentUnauthorizedMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, name: string } };

export type UpdateStudentInvalidIdMutationVariables = Exact<{
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
}>;


export type UpdateStudentInvalidIdMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, name: string } };

export type UpdateStudentDuplicateNameMutationVariables = Exact<{
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
}>;


export type UpdateStudentDuplicateNameMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, name: string } };

export type SampleTest_RegisterMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type SampleTest_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type SampleTest_RegisterExistingEmailMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type SampleTest_RegisterExistingEmailMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type GenerateStudentFeedbackValidMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
}>;


export type GenerateStudentFeedbackValidMutation = { __typename?: 'Mutation', generateStudentFeedback: string };

export type GenerateStudentFeedbackUnAuthorizedMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
}>;


export type GenerateStudentFeedbackUnAuthorizedMutation = { __typename?: 'Mutation', generateStudentFeedback: string };

export type GenerateStudentFeedbackStudentDoesntExistMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
}>;


export type GenerateStudentFeedbackStudentDoesntExistMutation = { __typename?: 'Mutation', generateStudentFeedback: string };

export type GenerateStudentFeedbackNoEvaluationMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
}>;


export type GenerateStudentFeedbackNoEvaluationMutation = { __typename?: 'Mutation', generateStudentFeedback: string };


export const CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const CreateCollectionInvalidEnvironmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollectionInvalidEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCollectionInvalidEnvironmentMutation, CreateCollectionInvalidEnvironmentMutationVariables>;
export const CreateCollectionInvalidLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollectionInvalidLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCollectionInvalidLearningObjectivesMutation, CreateCollectionInvalidLearningObjectivesMutationVariables>;
export const CreateCollectionNotEvaluatedLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollectionNotEvaluatedLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCollectionNotEvaluatedLearningObjectivesMutation, CreateCollectionNotEvaluatedLearningObjectivesMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateGroupInvalidSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupInvalidSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupInvalidSubjectMutation, CreateGroupInvalidSubjectMutationVariables>;
export const CreateGroupEmptyCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupEmptyCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupEmptyCollectionsMutation, CreateGroupEmptyCollectionsMutationVariables>;
export const CreateGroupInvalidWeightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupInvalidWeights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupInvalidWeightsMutation, CreateGroupInvalidWeightsMutationVariables>;
export const CreateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateStudentMutation, CreateStudentMutationVariables>;
export const CreateDuplicateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDuplicateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDuplicateStudentMutation, CreateDuplicateStudentMutationVariables>;
export const DeleteCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const DeleteCollectionUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollectionUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionUnauthorizedMutation, DeleteCollectionUnauthorizedMutationVariables>;
export const DeleteCollectionInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollectionInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionInvalidIdMutation, DeleteCollectionInvalidIdMutationVariables>;
export const DeleteGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DeleteGroupUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroupUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupUnauthorizedMutation, DeleteGroupUnauthorizedMutationVariables>;
export const DeleteGroupInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroupInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupInvalidIdMutation, DeleteGroupInvalidIdMutationVariables>;
export const DeleteStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const DeleteStudentUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudentUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentUnauthorizedMutation, DeleteStudentUnauthorizedMutationVariables>;
export const DeleteStudentInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudentInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentInvalidIdMutation, DeleteStudentInvalidIdMutationVariables>;
export const FixTextGrammaticsValidInputDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsValidInput"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<FixTextGrammaticsValidInputMutation, FixTextGrammaticsValidInputMutationVariables>;
export const FixTextGrammaticsUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<FixTextGrammaticsUnauthorizedMutation, FixTextGrammaticsUnauthorizedMutationVariables>;
export const FixTextGrammaticsInvalidStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsInvalidStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<FixTextGrammaticsInvalidStudentMutation, FixTextGrammaticsInvalidStudentMutationVariables>;
export const FixTextGrammaticsEmptyTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsEmptyText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<FixTextGrammaticsEmptyTextMutation, FixTextGrammaticsEmptyTextMutationVariables>;
export const ChangeGroupModuleValidInputDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleValidInput"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleValidInputMutation, ChangeGroupModuleValidInputMutationVariables>;
export const ChangeGroupModuleUnAuthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleUnAuthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleUnAuthorizedMutation, ChangeGroupModuleUnAuthorizedMutationVariables>;
export const ChangeGroupModuleInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleInvalidIdMutation, ChangeGroupModuleInvalidIdMutationVariables>;
export const ChangeGroupModuleInvalidLearningObjectiveKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleInvalidLearningObjectiveKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleInvalidLearningObjectiveKeyMutation, ChangeGroupModuleInvalidLearningObjectiveKeyMutationVariables>;
export const LoginTest_ValidLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_ValidLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_ValidLoginMutation, LoginTest_ValidLoginMutationVariables>;
export const LoginTest_InvalidLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_InvalidLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_InvalidLoginMutation, LoginTest_InvalidLoginMutationVariables>;
export const LoginTest_NoEmailLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_NoEmailLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_NoEmailLoginMutation, LoginTest_NoEmailLoginMutationVariables>;
export const Test_LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Test_Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<Test_LoginMutation, Test_LoginMutationVariables>;
export const Test_LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Test_Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<Test_LogoutMutation, Test_LogoutMutationVariables>;
export const RequestPasswordResetValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordResetValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetValidMutation, RequestPasswordResetValidMutationVariables>;
export const VerifyPasswordResetCodeValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeValidMutation, VerifyPasswordResetCodeValidMutationVariables>;
export const UpdatePasswordValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recoveryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"recoveryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recoveryCode"}}}]}]}}]} as unknown as DocumentNode<UpdatePasswordValidMutation, UpdatePasswordValidMutationVariables>;
export const RequestPasswordResetInvalidEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordResetInvalidEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetInvalidEmailMutation, RequestPasswordResetInvalidEmailMutationVariables>;
export const RequestPasswordResetExceedTriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordResetExceedTries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetExceedTriesMutation, RequestPasswordResetExceedTriesMutationVariables>;
export const VerifyPasswordResetCodeInvalidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeInvalid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeInvalidMutation, VerifyPasswordResetCodeInvalidMutationVariables>;
export const VerifyPasswordResetCodeExpiredDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeExpired"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeExpiredMutation, VerifyPasswordResetCodeExpiredMutationVariables>;
export const VerifyPasswordResetCodeExceedTriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeExceedTries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeExceedTriesMutation, VerifyPasswordResetCodeExceedTriesMutationVariables>;
export const RegisterTest_RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterMutation, RegisterTest_RegisterMutationVariables>;
export const RegisterTest_RegisterExistingEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_RegisterExistingEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterExistingEmailMutation, RegisterTest_RegisterExistingEmailMutationVariables>;
export const RegisterTest_RegisterInvalidLanguageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_RegisterInvalidLanguage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterInvalidLanguageMutation, RegisterTest_RegisterInvalidLanguageMutationVariables>;
export const UpdateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"isStellar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionMutation, UpdateCollectionMutationVariables>;
export const UpdateCollectionUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionUnauthorizedMutation, UpdateCollectionUnauthorizedMutationVariables>;
export const UpdateCollectionInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionInvalidIdMutation, UpdateCollectionInvalidIdMutationVariables>;
export const UpdateCollectionInvalidEnvironmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionInvalidEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionInvalidEnvironmentMutation, UpdateCollectionInvalidEnvironmentMutationVariables>;
export const UpdateCollectionInvalidLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionInvalidLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionInvalidLearningObjectivesMutation, UpdateCollectionInvalidLearningObjectivesMutationVariables>;
export const UpdateCollectionEvaluationsNotInCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionEvaluationsNotInCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionEvaluationsNotInCollectionMutation, UpdateCollectionEvaluationsNotInCollectionMutationVariables>;
export const UpdateCollectionInvalidStudentPresenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCollectionInvalidStudentPresence"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCollectionInvalidStudentPresenceMutation, UpdateCollectionInvalidStudentPresenceMutationVariables>;
export const UpdateEvaluationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"isStellar"}}]}}]}}]} as unknown as DocumentNode<UpdateEvaluationMutation, UpdateEvaluationMutationVariables>;
export const UpdateEvaluationUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateEvaluationUnauthorizedMutation, UpdateEvaluationUnauthorizedMutationVariables>;
export const UpdateEvaluationInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateEvaluationInvalidIdMutation, UpdateEvaluationInvalidIdMutationVariables>;
export const UpdateEvaluationNotPresentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationNotPresent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateEvaluationNotPresentMutation, UpdateEvaluationNotPresentMutationVariables>;
export const UpdateEvaluationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}]}}]} as unknown as DocumentNode<UpdateEvaluationsMutation, UpdateEvaluationsMutationVariables>;
export const UpdateEvaluationsUnauthenticatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationsUnauthenticated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}]}}]} as unknown as DocumentNode<UpdateEvaluationsUnauthenticatedMutation, UpdateEvaluationsUnauthenticatedMutationVariables>;
export const UpdateEvaluationsUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationsUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}]}}]} as unknown as DocumentNode<UpdateEvaluationsUnauthorizedMutation, UpdateEvaluationsUnauthorizedMutationVariables>;
export const UpdateEvaluationsInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationsInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}]}}]} as unknown as DocumentNode<UpdateEvaluationsInvalidIdMutation, UpdateEvaluationsInvalidIdMutationVariables>;
export const UpdateEvaluationsNotInCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationsNotInCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}]}}]} as unknown as DocumentNode<UpdateEvaluationsNotInCollectionMutation, UpdateEvaluationsNotInCollectionMutationVariables>;
export const UpdateEvaluationsNotPresentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvaluationsNotPresent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEvaluationInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}]}}]} as unknown as DocumentNode<UpdateEvaluationsNotPresentMutation, UpdateEvaluationsNotPresentMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateGroupUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupUnauthorizedMutation, UpdateGroupUnauthorizedMutationVariables>;
export const UpdateGroupInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupInvalidIdMutation, UpdateGroupInvalidIdMutationVariables>;
export const UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const UpdateStudentUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentUnauthorizedMutation, UpdateStudentUnauthorizedMutationVariables>;
export const UpdateStudentInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentInvalidIdMutation, UpdateStudentInvalidIdMutationVariables>;
export const UpdateStudentDuplicateNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentDuplicateName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentDuplicateNameMutation, UpdateStudentDuplicateNameMutationVariables>;
export const SampleTest_RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SampleTest_Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SampleTest_RegisterMutation, SampleTest_RegisterMutationVariables>;
export const SampleTest_RegisterExistingEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SampleTest_RegisterExistingEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SampleTest_RegisterExistingEmailMutation, SampleTest_RegisterExistingEmailMutationVariables>;
export const GenerateStudentFeedbackValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateStudentFeedbackValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateStudentFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}]}]}}]} as unknown as DocumentNode<GenerateStudentFeedbackValidMutation, GenerateStudentFeedbackValidMutationVariables>;
export const GenerateStudentFeedbackUnAuthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateStudentFeedbackUnAuthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateStudentFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}]}]}}]} as unknown as DocumentNode<GenerateStudentFeedbackUnAuthorizedMutation, GenerateStudentFeedbackUnAuthorizedMutationVariables>;
export const GenerateStudentFeedbackStudentDoesntExistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateStudentFeedbackStudentDoesntExist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateStudentFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}]}]}}]} as unknown as DocumentNode<GenerateStudentFeedbackStudentDoesntExistMutation, GenerateStudentFeedbackStudentDoesntExistMutationVariables>;
export const GenerateStudentFeedbackNoEvaluationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateStudentFeedbackNoEvaluation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateStudentFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}]}]}}]} as unknown as DocumentNode<GenerateStudentFeedbackNoEvaluationMutation, GenerateStudentFeedbackNoEvaluationMutationVariables>;