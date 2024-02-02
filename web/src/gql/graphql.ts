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
  getType: CollectionType;
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


export type QueryGetTypeArgs = {
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
  deleteTeacher: Teacher;
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


export type MutationCreateClassParticipationCollectionArgs = {
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationCreateDefaultCollectionArgs = {
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationUpdateClassParticipationCollectionArgs = {
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
};


export type MutationUpdateDefaultCollectionArgs = {
  data: UpdateDefaultCollectionInput;
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


export type MutationUpdateClassParticipationEvaluationArgs = {
  input: UpdateClassParticipationEvaluationInput;
};


export type MutationUpdateDefaultEvaluationArgs = {
  input: UpdateDefaultEvaluationInput;
};


export type MutationDeleteStudentArgs = {
  studentId: Scalars['ID']['input'];
};


export type MutationDeleteTeacherArgs = {
  teacherId: Scalars['ID']['input'];
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
  minimumSupportedAppVersion: Scalars['String']['output'];
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
  color: Scalars['String']['output'];
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
};

export type CollectionType = {
  __typename?: 'CollectionType';
  id: Scalars['ID']['output'];
  category: CollectionTypeCategory;
  name: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
  module: Module;
  defaultTypeCollection?: Maybe<DefaultCollection>;
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
  collectionTypes: Array<CollectionType>;
};

export type EvaluationCollection = {
  id: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  type: CollectionType;
  description?: Maybe<Scalars['String']['output']>;
  evaluations: Array<Evaluation>;
  module: Module;
};

export type ClassParticipationCollection = EvaluationCollection & {
  __typename?: 'ClassParticipationCollection';
  id: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  type: CollectionType;
  description?: Maybe<Scalars['String']['output']>;
  evaluations: Array<ClassParticipationEvaluation>;
  module: Module;
  environment: Environment;
  learningObjectives: Array<LearningObjective>;
};

export type DefaultCollection = EvaluationCollection & {
  __typename?: 'DefaultCollection';
  id: Scalars['ID']['output'];
  date: Scalars['Date']['output'];
  type: CollectionType;
  description?: Maybe<Scalars['String']['output']>;
  evaluations: Array<DefaultEvaluation>;
  module: Module;
};

export type Evaluation = {
  id: Scalars['ID']['output'];
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  collection: EvaluationCollection;
};

export type ClassParticipationEvaluation = Evaluation & {
  __typename?: 'ClassParticipationEvaluation';
  id: Scalars['ID']['output'];
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  collection: ClassParticipationCollection;
  skillsRating?: Maybe<Scalars['Int']['output']>;
  behaviourRating?: Maybe<Scalars['Int']['output']>;
};

export type DefaultEvaluation = Evaluation & {
  __typename?: 'DefaultEvaluation';
  id: Scalars['ID']['output'];
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  collection: DefaultCollection;
  rating?: Maybe<Scalars['Float']['output']>;
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

export type CreateStudentInput = {
  name: Scalars['String']['input'];
};

export type CreateCollectionTypeInput = {
  category: CollectionTypeCategory;
  name: Scalars['String']['input'];
  weight: Scalars['Int']['input'];
};

export type UpdateGroupInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  updateCollectionTypeInputs?: InputMaybe<Array<UpdateCollectionTypeInput>>;
  deleteCollectionTypeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  createCollectionTypeInputs?: InputMaybe<Array<CreateCollectionTypeInput>>;
};

export type UpdateCollectionTypeInput = {
  id: Scalars['ID']['input'];
  category?: InputMaybe<CollectionTypeCategory>;
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateStudentInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClassParticipationCollectionInput = {
  date: Scalars['Date']['input'];
  typeId: Scalars['ID']['input'];
  environmentCode: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  learningObjectiveCodes: Array<Scalars['ID']['input']>;
  evaluations?: InputMaybe<Array<CreateClassParticipationEvaluationInput>>;
};

export type CreateDefaultCollectionInput = {
  date: Scalars['Date']['input'];
  typeId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  evaluations?: InputMaybe<Array<CreateDefaultEvaluationInput>>;
};

export type CreateClassParticipationEvaluationInput = {
  studentId: Scalars['ID']['input'];
  wasPresent: Scalars['Boolean']['input'];
  skillsRating?: InputMaybe<Scalars['Int']['input']>;
  behaviourRating?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDefaultEvaluationInput = {
  studentId: Scalars['ID']['input'];
  wasPresent: Scalars['Boolean']['input'];
  rating?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClassParticipationCollectionInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  environmentCode?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  learningObjectiveCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
  evaluations?: InputMaybe<Array<UpdateClassParticipationEvaluationInput>>;
};

export type UpdateDefaultCollectionInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  evaluations?: InputMaybe<Array<UpdateDefaultEvaluationInput>>;
};

export type UpdateClassParticipationEvaluationInput = {
  id: Scalars['ID']['input'];
  wasPresent?: InputMaybe<Scalars['Boolean']['input']>;
  skillsRating?: InputMaybe<Scalars['Int']['input']>;
  behaviourRating?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDefaultEvaluationInput = {
  id: Scalars['ID']['input'];
  wasPresent?: InputMaybe<Scalars['Boolean']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type ChangeGroupModuleInput = {
  newEducationLevel: EducationLevel;
  newLearningObjectiveGroupKey: Scalars['String']['input'];
};

export type Header_LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type Header_LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type LoginPage_LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginPage_LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null, id: string, languagePreference: string, consentsAnalytics: boolean, isMPassIDConnected: boolean } } };

export type AccountDeletePage_GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountDeletePage_GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'Teacher', email?: string | null, id: string } };

export type Testi_GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type Testi_GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'Teacher', email?: string | null, languagePreference: string, consentsAnalytics: boolean, id: string, isMPassIDConnected: boolean } };

export type DeleteUserAndModalButton_DeleteTeacherMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserAndModalButton_DeleteTeacherMutation = { __typename?: 'Mutation', deleteTeacher: { __typename?: 'Teacher', id: string } };


export const Header_LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Header_Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<Header_LogoutMutation, Header_LogoutMutationVariables>;
export const LoginPage_LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginPage_Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}}]}}]} as unknown as DocumentNode<LoginPage_LoginMutation, LoginPage_LoginMutationVariables>;
export const AccountDeletePage_GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountDeletePage_GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AccountDeletePage_GetCurrentUserQuery, AccountDeletePage_GetCurrentUserQueryVariables>;
export const Testi_GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Testi_GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"languagePreference"}},{"kind":"Field","name":{"kind":"Name","value":"consentsAnalytics"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}}]} as unknown as DocumentNode<Testi_GetCurrentUserQuery, Testi_GetCurrentUserQueryVariables>;
export const DeleteUserAndModalButton_DeleteTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUserAndModalButton_DeleteTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teacherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserAndModalButton_DeleteTeacherMutation, DeleteUserAndModalButton_DeleteTeacherMutationVariables>;