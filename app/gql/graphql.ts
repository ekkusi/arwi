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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: string;
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
  id: Scalars['ID'];
};


export type QueryGetGroupsArgs = {
  teacherId: Scalars['ID'];
};


export type QueryGetGroupArgs = {
  id: Scalars['ID'];
};


export type QueryGetCollectionArgs = {
  id: Scalars['ID'];
};


export type QueryGetStudentArgs = {
  id: Scalars['ID'];
};


export type QueryGetEvaluationArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: AuthPayload;
  login: AuthPayload;
  mPassIDLogin: MPassIdAuthPayload;
  requestPasswordReset: Scalars['Boolean'];
  verifyPasswordResetCode: Scalars['Boolean'];
  updatePassword: Scalars['Boolean'];
  connectMPassID: AuthPayload;
  connectLocalCredentials: AuthPayload;
  logout: Scalars['Boolean'];
  createGroup: Group;
  createClassParticipationCollection: ClassParticipationCollection;
  createDefaultCollection: DefaultCollection;
  createStudent: Student;
  updateClassParticipationCollection: ClassParticipationCollection;
  updateDefaultCollection: DefaultCollection;
  updateStudent: Student;
  updateGroup: Group;
  updateClassParticipationEvaluation: ClassParticipationEvaluation;
  updateDefaultEvaluation: DefaultEvaluation;
  deleteStudent: Student;
  deleteGroup: Group;
  deleteCollection: EvaluationCollection;
  changeGroupModule: Group;
  generateStudentFeedback: Scalars['String'];
  fixTextGrammatics: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: CreateTeacherInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMPassIdLoginArgs = {
  code: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
};


export type MutationVerifyPasswordResetCodeArgs = {
  code: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  recoveryCode: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationConnectMPassIdArgs = {
  code: Scalars['String'];
};


export type MutationConnectLocalCredentialsArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};


export type MutationCreateClassParticipationCollectionArgs = {
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID'];
};


export type MutationCreateDefaultCollectionArgs = {
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID'];
};


export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  moduleId: Scalars['ID'];
};


export type MutationUpdateClassParticipationCollectionArgs = {
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID'];
};


export type MutationUpdateDefaultCollectionArgs = {
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID'];
};


export type MutationUpdateStudentArgs = {
  data: UpdateStudentInput;
  studentId: Scalars['ID'];
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
  groupId: Scalars['ID'];
};


export type MutationUpdateClassParticipationEvaluationArgs = {
  input: UpdateClassParticipationEvaluationInput;
};


export type MutationUpdateDefaultEvaluationArgs = {
  input: UpdateDefaultEvaluationInput;
};


export type MutationDeleteStudentArgs = {
  studentId: Scalars['ID'];
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID'];
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['ID'];
};


export type MutationChangeGroupModuleArgs = {
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID'];
};


export type MutationGenerateStudentFeedbackArgs = {
  studentId: Scalars['ID'];
  moduleId: Scalars['ID'];
};


export type MutationFixTextGrammaticsArgs = {
  studentId: Scalars['ID'];
  text: Scalars['String'];
};

export type AppMetadata = {
  __typename?: 'AppMetadata';
  appVersion: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  userData: Teacher;
};

export type MPassIdAuthPayload = {
  __typename?: 'MPassIDAuthPayload';
  payload: AuthPayload;
  newUserCreated: Scalars['Boolean'];
};

export type Teacher = {
  __typename?: 'Teacher';
  id: Scalars['ID'];
  email?: Maybe<Scalars['EmailAddress']>;
  groups: Array<Group>;
  languagePreference: Scalars['String'];
  consentsAnalytics: Scalars['Boolean'];
  isMPassIDConnected: Scalars['Boolean'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  userData: Teacher;
};

export type TranslatedString = {
  __typename?: 'TranslatedString';
  fi: Scalars['String'];
  en?: Maybe<Scalars['String']>;
  se?: Maybe<Scalars['String']>;
};

export enum LearningObjectiveType {
  BEHAVIOUR = 'BEHAVIOUR',
  SKILLS = 'SKILLS',
  SKILLS_AND_BEHAVIOUR = 'SKILLS_AND_BEHAVIOUR',
  NOT_EVALUATED = 'NOT_EVALUATED'
}

export type LearningObjective = {
  __typename?: 'LearningObjective';
  code: Scalars['ID'];
  label: TranslatedString;
  description: TranslatedString;
  type: LearningObjectiveType;
};

export type Subject = {
  __typename?: 'Subject';
  code: Scalars['ID'];
  label: TranslatedString;
  environments: Array<Environment>;
};

export type Environment = {
  __typename?: 'Environment';
  code: Scalars['ID'];
  color: Scalars['String'];
  label: TranslatedString;
  subject: Subject;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['ID'];
  name: Scalars['String'];
  students: Array<Student>;
  subject: Subject;
  teacher: Teacher;
  updatedAt: Scalars['DateTime'];
  archived: Scalars['Boolean'];
  currentModule: Module;
  modules: Array<Module>;
  collectionTypes: Array<CollectionType>;
};

export type CollectionType = {
  __typename?: 'CollectionType';
  id: Scalars['ID'];
  category: CollectionTypeCategory;
  name: Scalars['String'];
  weight: Scalars['Int'];
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
  learningObjectiveGroupKey: Scalars['String'];
  label: TranslatedString;
};

export type Module = {
  __typename?: 'Module';
  id: Scalars['ID'];
  info: ModuleInfo;
  evaluationCollections: Array<EvaluationCollection>;
  students: Array<Student>;
  group: Group;
};

export type EvaluationCollection = {
  id: Scalars['ID'];
  date: Scalars['Date'];
  type: CollectionType;
  description?: Maybe<Scalars['String']>;
  evaluations: Array<Evaluation>;
  module: Module;
};

export type ClassParticipationCollection = EvaluationCollection & {
  __typename?: 'ClassParticipationCollection';
  id: Scalars['ID'];
  date: Scalars['Date'];
  type: CollectionType;
  description?: Maybe<Scalars['String']>;
  evaluations: Array<ClassParticipationEvaluation>;
  module: Module;
  environment: Environment;
  learningObjectives: Array<LearningObjective>;
};

export type DefaultCollection = EvaluationCollection & {
  __typename?: 'DefaultCollection';
  id: Scalars['ID'];
  date: Scalars['Date'];
  type: CollectionType;
  description?: Maybe<Scalars['String']>;
  evaluations: Array<DefaultEvaluation>;
  module: Module;
};

export type Evaluation = {
  id: Scalars['ID'];
  student: Student;
  wasPresent: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  collection: EvaluationCollection;
};

export type ClassParticipationEvaluation = Evaluation & {
  __typename?: 'ClassParticipationEvaluation';
  id: Scalars['ID'];
  student: Student;
  wasPresent: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  collection: ClassParticipationCollection;
  skillsRating?: Maybe<Scalars['Int']>;
  behaviourRating?: Maybe<Scalars['Int']>;
};

export type DefaultEvaluation = Evaluation & {
  __typename?: 'DefaultEvaluation';
  id: Scalars['ID'];
  student: Student;
  wasPresent: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  collection: DefaultCollection;
  rating?: Maybe<Scalars['Float']>;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  name: Scalars['String'];
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
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
  languagePreference?: InputMaybe<Scalars['String']>;
  consentsAnalytics?: InputMaybe<Scalars['Boolean']>;
};

export type CreateGroupInput = {
  name: Scalars['String'];
  teacherId: Scalars['ID'];
  subjectCode: Scalars['ID'];
  educationLevel: EducationLevel;
  learningObjectiveGroupKey: Scalars['String'];
  students: Array<CreateStudentInput>;
  collectionTypes: Array<CreateCollectionTypeInput>;
};

export type UpdateGroupInput = {
  name?: InputMaybe<Scalars['String']>;
  archived?: InputMaybe<Scalars['Boolean']>;
};

export type CreateStudentInput = {
  name: Scalars['String'];
};

export type CreateCollectionTypeInput = {
  category: CollectionTypeCategory;
  name: Scalars['String'];
  weight: Scalars['Int'];
};

export type UpdateStudentInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreateClassParticipationCollectionInput = {
  date: Scalars['Date'];
  typeId: Scalars['ID'];
  environmentCode: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  learningObjectiveCodes: Array<Scalars['ID']>;
  evaluations?: InputMaybe<Array<CreateClassParticipationEvaluationInput>>;
};

export type CreateDefaultCollectionInput = {
  date: Scalars['Date'];
  typeId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  evaluations?: InputMaybe<Array<CreateDefaultEvaluationInput>>;
};

export type CreateClassParticipationEvaluationInput = {
  studentId: Scalars['ID'];
  wasPresent: Scalars['Boolean'];
  skillsRating?: InputMaybe<Scalars['Int']>;
  behaviourRating?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type CreateDefaultEvaluationInput = {
  studentId: Scalars['ID'];
  wasPresent: Scalars['Boolean'];
  rating?: InputMaybe<Scalars['Float']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateClassParticipationCollectionInput = {
  date?: InputMaybe<Scalars['Date']>;
  environmentCode?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  learningObjectiveCodes?: InputMaybe<Array<Scalars['ID']>>;
  evaluations?: InputMaybe<Array<UpdateClassParticipationEvaluationInput>>;
};

export type UpdateDefaultCollectionInput = {
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  evaluations?: InputMaybe<Array<UpdateDefaultEvaluationInput>>;
};

export type UpdateClassParticipationEvaluationInput = {
  id: Scalars['ID'];
  wasPresent?: InputMaybe<Scalars['Boolean']>;
  skillsRating?: InputMaybe<Scalars['Int']>;
  behaviourRating?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type UpdateDefaultEvaluationInput = {
  id: Scalars['ID'];
  wasPresent?: InputMaybe<Scalars['Boolean']>;
  rating?: InputMaybe<Scalars['Float']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type ChangeGroupModuleInput = {
  newEducationLevel: EducationLevel;
  newLearningObjectiveGroupKey: Scalars['String'];
};

export type Main_GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type Main_GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'Teacher', email?: string | null, languagePreference: string, consentsAnalytics: boolean, id: string, isMPassIDConnected: boolean } };

export type Main_GetAppMetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type Main_GetAppMetadataQuery = { __typename?: 'Query', getAppMetadata: { __typename?: 'AppMetadata', appVersion: string } };

export type EvaluationCard_FixTextGrammaticsMutationVariables = Exact<{
  studentId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type EvaluationCard_FixTextGrammaticsMutation = { __typename?: 'Mutation', fixTextGrammatics: string };

export type EvaluationsAccordion_EvaluationFragment = { __typename: 'ClassParticipationEvaluation', id: string, notes?: string | null, behaviourRating?: number | null, skillsRating?: number | null, wasPresent: boolean, collection: { __typename?: 'ClassParticipationCollection', date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } } }, student: { __typename?: 'Student', name: string } } & { ' $fragmentName'?: 'EvaluationsAccordion_EvaluationFragment' };

export type GroupListItemFragment = { __typename?: 'Group', id: string, name: string, archived: boolean, updatedAt: any, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } } } & { ' $fragmentName'?: 'GroupListItemFragment' };

export type MPassId_LoginMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type MPassId_LoginMutation = { __typename?: 'Mutation', mPassIDLogin: { __typename?: 'MPassIDAuthPayload', newUserCreated: boolean, payload: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null, languagePreference: string, consentsAnalytics: boolean, id: string, isMPassIDConnected: boolean } } } };

export type ArchivePage_GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ArchivePage_GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'Teacher', email?: string | null, id: string, groups: Array<{ __typename?: 'Group', id: string, name: string, archived: boolean, updatedAt: any, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } }, currentModule: { __typename?: 'Module', id: string } }> } };

export type CodeInput_VerifyPasswordResetCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type CodeInput_VerifyPasswordResetCodeMutation = { __typename?: 'Mutation', verifyPasswordResetCode: boolean };

export type ForgotPassword_RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPassword_RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type UpdatePasswordPage_UpdatePasswordMutationVariables = Exact<{
  code: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordPage_UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type LoginPage_LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginPage_LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null, id: string, languagePreference: string, consentsAnalytics: boolean, isMPassIDConnected: boolean } } };

export type RegisterPage_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;


export type RegisterPage_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null, id: string, languagePreference: string, consentsAnalytics: boolean, isMPassIDConnected: boolean } } };

export type AddNewStudent_CreateStudentMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CreateStudentInput;
}>;


export type AddNewStudent_CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string, name: string, group: { __typename?: 'Group', id: string, name: string, archived: boolean, updatedAt: any, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } }, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string, label: { __typename?: 'TranslatedString', fi: string } }, students: Array<{ __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean } | { __typename?: 'DefaultEvaluation', id: string, wasPresent: boolean }> }>, evaluationCollections: Array<{ __typename: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string }, description: { __typename?: 'TranslatedString', fi: string } }> } | { __typename: 'DefaultCollection', id: string, date: string }> } } } };

export type ChangeArchiveStatus_UpdateGroupMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateGroupInput;
}>;


export type ChangeArchiveStatus_UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, archived: boolean } };

export type ChangeModule_GetGroupQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ChangeModule_GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'Group', id: string, subject: { __typename?: 'Subject', code: string }, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string, label: { __typename?: 'TranslatedString', fi: string } } } } };

export type ChangeModule_ChangeModuleMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID'];
}>;


export type ChangeModule_ChangeModuleMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string, label: { __typename?: 'TranslatedString', fi: string } }, students: Array<{ __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean } | { __typename?: 'DefaultEvaluation', id: string, wasPresent: boolean }> }>, evaluationCollections: Array<(
        { __typename: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string }, description: { __typename?: 'TranslatedString', fi: string } }> }
        & { ' $fragmentRefs'?: { 'CollectionsLineChart_EvaluationCollectionFragment': CollectionsLineChart_EvaluationCollectionFragment } }
      ) | { __typename: 'DefaultCollection', id: string, date: string }> } } };

export type ChangeGroupName_UpdateGroupMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateGroupInput;
}>;


export type ChangeGroupName_UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string } };

export type ChangeStudentName_UpdateStudentMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateStudentInput;
}>;


export type ChangeStudentName_UpdateStudentMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, name: string } };

export type CollectionHeaderRightButton_DeleteCollectionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CollectionHeaderRightButton_DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'ClassParticipationCollection', id: string, module: { __typename?: 'Module', id: string, evaluationCollections: Array<{ __typename?: 'ClassParticipationCollection', id: string } | { __typename?: 'DefaultCollection', id: string }>, group: { __typename?: 'Group', id: string, name: string } } } | { __typename?: 'DefaultCollection', id: string, module: { __typename?: 'Module', id: string, evaluationCollections: Array<{ __typename?: 'ClassParticipationCollection', id: string } | { __typename?: 'DefaultCollection', id: string }>, group: { __typename?: 'Group', id: string, name: string } } } };

export type StudentHeaderRightButton_DeleteStudentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StudentHeaderRightButton_DeleteStudentMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: string, name: string, group: { __typename?: 'Group', id: string, name: string, archived: boolean, updatedAt: any, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } }, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string, label: { __typename?: 'TranslatedString', fi: string } }, students: Array<{ __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean } | { __typename?: 'DefaultEvaluation', id: string, wasPresent: boolean }> }>, evaluationCollections: Array<{ __typename: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string }, description: { __typename?: 'TranslatedString', fi: string } }> } | { __typename: 'DefaultCollection', id: string, date: string }> } } } };

export type MainPage_GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MainPage_GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'Teacher', email?: string | null, id: string, groups: Array<{ __typename?: 'Group', id: string, name: string, archived: boolean, updatedAt: any, collectionTypes: Array<{ __typename?: 'CollectionType', id: string, category: CollectionTypeCategory, name: string, weight: number }>, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } }, currentModule: { __typename?: 'Module', id: string } }> } };

export type ProfileView_LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type ProfileView_LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ProfileView_ConnectMPassIdMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type ProfileView_ConnectMPassIdMutation = { __typename?: 'Mutation', connectMPassID: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', id: string, email?: string | null, consentsAnalytics: boolean, languagePreference: string, isMPassIDConnected: boolean } } };

export type ProfileView_ConnectLocalCredentialsMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type ProfileView_ConnectLocalCredentialsMutation = { __typename?: 'Mutation', connectLocalCredentials: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', id: string, email?: string | null, consentsAnalytics: boolean, languagePreference: string, isMPassIDConnected: boolean, groups: Array<{ __typename?: 'Group', id: string }> } } };

export type CollectionStatistics_EvaluationCollectionFragment = { __typename?: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, label: { __typename?: 'TranslatedString', fi: string } }, evaluations: Array<{ __typename?: 'ClassParticipationEvaluation', skillsRating?: number | null, behaviourRating?: number | null, wasPresent: boolean }> } & { ' $fragmentName'?: 'CollectionStatistics_EvaluationCollectionFragment' };

export type CollectionsLineChart_EvaluationCollectionFragment = { __typename?: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, label: { __typename?: 'TranslatedString', fi: string } }, evaluations: Array<{ __typename?: 'ClassParticipationEvaluation', skillsRating?: number | null, behaviourRating?: number | null, wasPresent: boolean }> } & { ' $fragmentName'?: 'CollectionsLineChart_EvaluationCollectionFragment' };

export type EvaluationsBarChart_EvaluationFragment = { __typename?: 'ClassParticipationEvaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, wasPresent: boolean, collection: { __typename?: 'ClassParticipationCollection', environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } } } } & { ' $fragmentName'?: 'EvaluationsBarChart_EvaluationFragment' };

export type EvaluationsHistogram_EvaluationFragment = { __typename?: 'ClassParticipationEvaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, wasPresent: boolean, collection: { __typename?: 'ClassParticipationCollection', environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } } } } & { ' $fragmentName'?: 'EvaluationsHistogram_EvaluationFragment' };

export type EvaluationsLineChart_EvaluationFragment = { __typename?: 'ClassParticipationEvaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, wasPresent: boolean, collection: { __typename?: 'ClassParticipationCollection', date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } } } } & { ' $fragmentName'?: 'EvaluationsLineChart_EvaluationFragment' };

export type CollectionEditAllEvaluationsView_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars['ID'];
}>;


export type CollectionEditAllEvaluationsView_GetCollectionQuery = { __typename?: 'Query', getCollection: { __typename: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, evaluations: Array<{ __typename: 'ClassParticipationEvaluation', skillsRating?: number | null, behaviourRating?: number | null, id: string, wasPresent: boolean, notes?: string | null, student: { __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, notes?: string | null } | { __typename?: 'DefaultEvaluation', id: string, notes?: string | null }> } }> } | { __typename: 'DefaultCollection', id: string, date: string, evaluations: Array<{ __typename: 'DefaultEvaluation', id: string, wasPresent: boolean, notes?: string | null, student: { __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, notes?: string | null } | { __typename?: 'DefaultEvaluation', id: string, notes?: string | null }> } }> } };

export type CollectionEvaluationsView_UpdateCollectionMutationVariables = Exact<{
  updateCollectionInput: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID'];
}>;


export type CollectionEvaluationsView_UpdateCollectionMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string, evaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null, student: { __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, notes?: string | null } | { __typename?: 'DefaultEvaluation', id: string, notes?: string | null }> } }> } };

export type EditGeneralDetails_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars['ID'];
}>;


export type EditGeneralDetails_GetCollectionQuery = { __typename?: 'Query', getCollection: { __typename: 'ClassParticipationCollection', id: string, date: string, description?: string | null, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string } }>, type: { __typename?: 'CollectionType', id: string, name: string, category: CollectionTypeCategory }, module: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string }, group: { __typename?: 'Group', id: string, subject: { __typename?: 'Subject', code: string }, collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, category: CollectionTypeCategory }> } } } | { __typename: 'DefaultCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string, name: string, category: CollectionTypeCategory }, module: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string }, group: { __typename?: 'Group', id: string, subject: { __typename?: 'Subject', code: string }, collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, category: CollectionTypeCategory }> } } } };

export type EditGeneralDetails_UpdateCollectionMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateClassParticipationCollectionInput;
}>;


export type EditGeneralDetails_UpdateCollectionMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string, date: string, description?: string | null, environment: { __typename?: 'Environment', code: string, label: { __typename?: 'TranslatedString', fi: string } }, module: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string }, group: { __typename?: 'Group', id: string, subject: { __typename?: 'Subject', code: string } } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string }, description: { __typename?: 'TranslatedString', fi: string } }> } };

export type CollectionPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars['ID'];
}>;


export type CollectionPage_GetCollectionQuery = { __typename?: 'Query', getCollection: { __typename: 'ClassParticipationCollection', id: string, date: string, description?: string | null, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, label: { __typename?: 'TranslatedString', fi: string } }>, module: { __typename?: 'Module', group: { __typename?: 'Group', name: string, id: string } }, evaluations: Array<(
      { __typename?: 'ClassParticipationEvaluation', id: string }
      & { ' $fragmentRefs'?: { 'EvaluationsAccordion_EvaluationFragment': EvaluationsAccordion_EvaluationFragment } }
    )> } | { __typename: 'DefaultCollection', id: string, date: string, description?: string | null, module: { __typename?: 'Module', group: { __typename?: 'Group', name: string, id: string } }, evaluations: Array<{ __typename?: 'DefaultEvaluation', id: string }> } };

export type EvaluationEditView_GetEvaluationQueryVariables = Exact<{
  evaluationId: Scalars['ID'];
}>;


export type EvaluationEditView_GetEvaluationQuery = { __typename?: 'Query', getEvaluation: { __typename: 'ClassParticipationEvaluation', skillsRating?: number | null, behaviourRating?: number | null, id: string, wasPresent: boolean, notes?: string | null, collection: { __typename?: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } } }, student: { __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, notes?: string | null } | { __typename?: 'DefaultEvaluation', id: string, notes?: string | null }> } } | { __typename: 'DefaultEvaluation', id: string, wasPresent: boolean, notes?: string | null, student: { __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, notes?: string | null } | { __typename?: 'DefaultEvaluation', id: string, notes?: string | null }> } } };

export type EvaluationEditView_UpdateEvaluationMutationVariables = Exact<{
  updateEvaluationInput: UpdateClassParticipationEvaluationInput;
}>;


export type EvaluationEditView_UpdateEvaluationMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null } };

export type GroupOverviewPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars['ID'];
}>;


export type GroupOverviewPage_GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'Group', id: string, name: string, archived: boolean, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } }, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string, label: { __typename?: 'TranslatedString', fi: string } }, students: Array<{ __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean } | { __typename?: 'DefaultEvaluation', id: string, wasPresent: boolean }> }>, evaluationCollections: Array<(
        { __typename: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string }, description: { __typename?: 'TranslatedString', fi: string } }> }
        & { ' $fragmentRefs'?: { 'CollectionStatistics_EvaluationCollectionFragment': CollectionStatistics_EvaluationCollectionFragment } }
      ) | { __typename: 'DefaultCollection', id: string, date: string }> } } };

export type StudentFeedbackView_GetStudentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StudentFeedbackView_GetStudentQuery = { __typename?: 'Query', getStudent: { __typename?: 'Student', id: string, group: { __typename?: 'Group', id: string, archived: boolean, currentModule: { __typename?: 'Module', id: string } }, currentModuleEvaluations: Array<{ __typename: 'ClassParticipationEvaluation', behaviourRating?: number | null, skillsRating?: number | null, id: string, notes?: string | null, wasPresent: boolean, collection: { __typename?: 'ClassParticipationCollection', id: string, date: string, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } } } } | { __typename: 'DefaultEvaluation', rating?: number | null, id: string, notes?: string | null, wasPresent: boolean, collection: { __typename?: 'DefaultCollection', id: string, date: string } }> } };

export type StudentFeedbackView_GenerateFeedbackMutationVariables = Exact<{
  studentId: Scalars['ID'];
  moduleId: Scalars['ID'];
}>;


export type StudentFeedbackView_GenerateFeedbackMutation = { __typename?: 'Mutation', generateStudentFeedback: string };

export type StudentPage_GetStudentQueryVariables = Exact<{
  studentId: Scalars['ID'];
}>;


export type StudentPage_GetStudentQuery = { __typename?: 'Query', getStudent: { __typename?: 'Student', id: string, name: string, group: { __typename?: 'Group', id: string, name: string, subject: { __typename?: 'Subject', code: string, label: { __typename?: 'TranslatedString', fi: string } }, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string, label: { __typename?: 'TranslatedString', fi: string } } } }, currentModuleEvaluations: Array<(
      { __typename: 'ClassParticipationEvaluation', behaviourRating?: number | null, skillsRating?: number | null, id: string, notes?: string | null, wasPresent: boolean, collection: { __typename?: 'ClassParticipationCollection', id: string, environment: { __typename?: 'Environment', code: string, label: { __typename?: 'TranslatedString', fi: string } } } }
      & { ' $fragmentRefs'?: { 'EvaluationsLineChart_EvaluationFragment': EvaluationsLineChart_EvaluationFragment;'EvaluationsBarChart_EvaluationFragment': EvaluationsBarChart_EvaluationFragment;'EvaluationsHistogram_EvaluationFragment': EvaluationsHistogram_EvaluationFragment;'EvaluationsAccordion_EvaluationFragment': EvaluationsAccordion_EvaluationFragment } }
    ) | { __typename: 'DefaultEvaluation', rating?: number | null, id: string, notes?: string | null, wasPresent: boolean, collection: { __typename?: 'DefaultCollection', id: string } }> } };

export type CollectionCreationProvider_GetGroupQueryVariables = Exact<{
  groupId: Scalars['ID'];
}>;


export type CollectionCreationProvider_GetGroupQuery = { __typename?: 'Query', getGroup: (
    { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', id: string, students: Array<{ __typename?: 'Student', id: string, name: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, notes?: string | null } | { __typename?: 'DefaultEvaluation', id: string, notes?: string | null }> }> }, collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, category: CollectionTypeCategory }> }
    & { ' $fragmentRefs'?: { 'CollectionGeneralInfoView_GroupFragment': CollectionGeneralInfoView_GroupFragment } }
  ) };

export type CollectionEvaluationsView_CreateCollectionMutationVariables = Exact<{
  createCollectionInput: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID'];
}>;


export type CollectionEvaluationsView_CreateCollectionMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string, date: string, description?: string | null, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string, type: LearningObjectiveType, label: { __typename?: 'TranslatedString', fi: string }, description: { __typename?: 'TranslatedString', fi: string } }>, environment: { __typename?: 'Environment', code: string, color: string, label: { __typename?: 'TranslatedString', fi: string } }, evaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, wasPresent: boolean, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null, student: { __typename?: 'Student', id: string, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string } | { __typename?: 'DefaultEvaluation', id: string }> } }>, module: { __typename?: 'Module', id: string, evaluationCollections: Array<{ __typename?: 'ClassParticipationCollection', id: string } | { __typename?: 'DefaultCollection', id: string }>, group: { __typename?: 'Group', id: string, updatedAt: any } } } };

export type CollectionGeneralInfoView_GroupFragment = { __typename?: 'Group', subject: { __typename?: 'Subject', code: string }, currentModule: { __typename?: 'Module', id: string, info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string } } } & { ' $fragmentName'?: 'CollectionGeneralInfoView_GroupFragment' };

export type CollectionParticipationsView_GroupFragment = { __typename?: 'Group', students: Array<{ __typename?: 'Student', id: string, name: string }> } & { ' $fragmentName'?: 'CollectionParticipationsView_GroupFragment' };

export type CreateGroupPage_CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupPage_CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string } };

export const EvaluationsAccordion_EvaluationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsAccordion_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EvaluationsAccordion_EvaluationFragment, unknown>;
export const GroupListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GroupListItemFragment, unknown>;
export const CollectionStatistics_EvaluationCollectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionStatistics_EvaluationCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}}]} as unknown as DocumentNode<CollectionStatistics_EvaluationCollectionFragment, unknown>;
export const CollectionsLineChart_EvaluationCollectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionsLineChart_EvaluationCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}}]} as unknown as DocumentNode<CollectionsLineChart_EvaluationCollectionFragment, unknown>;
export const EvaluationsBarChart_EvaluationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsBarChart_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<EvaluationsBarChart_EvaluationFragment, unknown>;
export const EvaluationsHistogram_EvaluationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsHistogram_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<EvaluationsHistogram_EvaluationFragment, unknown>;
export const EvaluationsLineChart_EvaluationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsLineChart_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<EvaluationsLineChart_EvaluationFragment, unknown>;
export const CollectionGeneralInfoView_GroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionGeneralInfoView_Group"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}}]}}]}}]} as unknown as DocumentNode<CollectionGeneralInfoView_GroupFragment, unknown>;
export const CollectionParticipationsView_GroupFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionParticipationsView_Group"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CollectionParticipationsView_GroupFragment, unknown>;
export const Main_GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Main_GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}}]} as unknown as DocumentNode<Main_GetCurrentUserQuery, Main_GetCurrentUserQueryVariables>;
export const Main_GetAppMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Main_GetAppMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAppMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appVersion"}}]}}]}}]} as unknown as DocumentNode<Main_GetAppMetadataQuery, Main_GetAppMetadataQueryVariables>;
export const EvaluationCard_FixTextGrammaticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvaluationCard_FixTextGrammatics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode<EvaluationCard_FixTextGrammaticsMutation, EvaluationCard_FixTextGrammaticsMutationVariables>;
export const MPassId_LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MPassID_Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mPassIDLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"newUserCreated"}}]}}]}}]} as unknown as DocumentNode<MPassId_LoginMutation, MPassId_LoginMutationVariables>;
export const ArchivePage_GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArchivePage_GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ArchivePage_GetCurrentUserQuery, ArchivePage_GetCurrentUserQueryVariables>;
export const CodeInput_VerifyPasswordResetCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CodeInput_VerifyPasswordResetCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<CodeInput_VerifyPasswordResetCodeMutation, CodeInput_VerifyPasswordResetCodeMutationVariables>;
export const ForgotPassword_RequestPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword_RequestPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ForgotPassword_RequestPasswordResetMutation, ForgotPassword_RequestPasswordResetMutationVariables>;
export const UpdatePasswordPage_UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordPage_UpdatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recoveryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<UpdatePasswordPage_UpdatePasswordMutation, UpdatePasswordPage_UpdatePasswordMutationVariables>;
export const LoginPage_LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginPage_Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}}]}}]} as unknown as DocumentNode<LoginPage_LoginMutation, LoginPage_LoginMutationVariables>;
export const RegisterPage_RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterPage_Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterPage_RegisterMutation, RegisterPage_RegisterMutationVariables>;
export const AddNewStudent_CreateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNewStudent_CreateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluationCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddNewStudent_CreateStudentMutation, AddNewStudent_CreateStudentMutationVariables>;
export const ChangeArchiveStatus_UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeArchiveStatus_UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<ChangeArchiveStatus_UpdateGroupMutation, ChangeArchiveStatus_UpdateGroupMutationVariables>;
export const ChangeModule_GetGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChangeModule_GetGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeModule_GetGroupQuery, ChangeModule_GetGroupQueryVariables>;
export const ChangeModule_ChangeModuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeModule_ChangeModule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluationCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionsLineChart_EvaluationCollection"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionsLineChart_EvaluationCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}}]} as unknown as DocumentNode<ChangeModule_ChangeModuleMutation, ChangeModule_ChangeModuleMutationVariables>;
export const ChangeGroupName_UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupName_UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupName_UpdateGroupMutation, ChangeGroupName_UpdateGroupMutationVariables>;
export const ChangeStudentName_UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeStudentName_UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ChangeStudentName_UpdateStudentMutation, ChangeStudentName_UpdateStudentMutationVariables>;
export const CollectionHeaderRightButton_DeleteCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CollectionHeaderRightButton_DeleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"module"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"evaluationCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionHeaderRightButton_DeleteCollectionMutation, CollectionHeaderRightButton_DeleteCollectionMutationVariables>;
export const StudentHeaderRightButton_DeleteStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StudentHeaderRightButton_DeleteStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluationCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<StudentHeaderRightButton_DeleteStudentMutation, StudentHeaderRightButton_DeleteStudentMutationVariables>;
export const MainPage_GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MainPage_GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MainPage_GetCurrentUserQuery, MainPage_GetCurrentUserQueryVariables>;
export const ProfileView_LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileView_Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<ProfileView_LogoutMutation, ProfileView_LogoutMutationVariables>;
export const ProfileView_ConnectMPassIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileView_ConnectMPassID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectMPassID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}}]}}]} as unknown as DocumentNode<ProfileView_ConnectMPassIdMutation, ProfileView_ConnectMPassIdMutationVariables>;
export const ProfileView_ConnectLocalCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProfileView_ConnectLocalCredentials"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectLocalCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProfileView_ConnectLocalCredentialsMutation, ProfileView_ConnectLocalCredentialsMutationVariables>;
export const CollectionEditAllEvaluationsView_GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionEditAllEvaluationsView_GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionEditAllEvaluationsView_GetCollectionQuery, CollectionEditAllEvaluationsView_GetCollectionQueryVariables>;
export const CollectionEvaluationsView_UpdateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CollectionEvaluationsView_UpdateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCollectionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCollectionInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionEvaluationsView_UpdateCollectionMutation, CollectionEvaluationsView_UpdateCollectionMutationVariables>;
export const EditGeneralDetails_GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EditGeneralDetails_GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"module"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<EditGeneralDetails_GetCollectionQuery, EditGeneralDetails_GetCollectionQueryVariables>;
export const EditGeneralDetails_UpdateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditGeneralDetails_UpdateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"module"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<EditGeneralDetails_UpdateCollectionMutation, EditGeneralDetails_UpdateCollectionMutationVariables>;
export const CollectionPage_GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionPage_GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"module"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationsAccordion_Evaluation"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsAccordion_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CollectionPage_GetCollectionQuery, CollectionPage_GetCollectionQueryVariables>;
export const EvaluationEditView_GetEvaluationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvaluationEditView_GetEvaluation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"evaluationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"evaluationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EvaluationEditView_GetEvaluationQuery, EvaluationEditView_GetEvaluationQueryVariables>;
export const EvaluationEditView_UpdateEvaluationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvaluationEditView_UpdateEvaluation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateEvaluationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateEvaluationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<EvaluationEditView_UpdateEvaluationMutation, EvaluationEditView_UpdateEvaluationMutationVariables>;
export const GroupOverviewPage_GetGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupOverviewPage_GetGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluationCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionStatistics_EvaluationCollection"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionStatistics_EvaluationCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}}]}}]} as unknown as DocumentNode<GroupOverviewPage_GetGroupQuery, GroupOverviewPage_GetGroupQueryVariables>;
export const StudentFeedbackView_GetStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudentFeedbackView_GetStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StudentFeedbackView_GetStudentQuery, StudentFeedbackView_GetStudentQueryVariables>;
export const StudentFeedbackView_GenerateFeedbackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StudentFeedbackView_GenerateFeedback"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateStudentFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}]}]}}]} as unknown as DocumentNode<StudentFeedbackView_GenerateFeedbackMutation, StudentFeedbackView_GenerateFeedbackMutationVariables>;
export const StudentPage_GetStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudentPage_GetStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationsLineChart_Evaluation"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationsBarChart_Evaluation"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationsHistogram_Evaluation"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationsAccordion_Evaluation"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsLineChart_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsBarChart_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsHistogram_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationsAccordion_Evaluation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClassParticipationEvaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<StudentPage_GetStudentQuery, StudentPage_GetStudentQueryVariables>;
export const CollectionCreationProvider_GetGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionCreationProvider_GetGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionGeneralInfoView_Group"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionGeneralInfoView_Group"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}}]}}]}}]} as unknown as DocumentNode<CollectionCreationProvider_GetGroupQuery, CollectionCreationProvider_GetGroupQueryVariables>;
export const CollectionEvaluationsView_CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CollectionEvaluationsView_CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCollectionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCollectionInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fi"}}]}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"module"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"evaluationCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CollectionEvaluationsView_CreateCollectionMutation, CollectionEvaluationsView_CreateCollectionMutationVariables>;
export const CreateGroupPage_CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupPage_CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateGroupPage_CreateGroupMutation, CreateGroupPage_CreateGroupMutationVariables>;