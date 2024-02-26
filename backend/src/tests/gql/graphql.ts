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
  getCurrentUserUsageData: TeacherUsageData;
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
  generateStudentFeedback: GenerateStudentFeedbackResult;
  generateGroupFeedback: GenerateGroupFeedbackResult;
  fixTextGrammatics: FixTextGrammaticsResult;
  setTokenUseWarningSeen: Scalars['Boolean']['output'];
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


export type MutationGenerateGroupFeedbackArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationFixTextGrammaticsArgs = {
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationSetTokenUseWarningSeenArgs = {
  warning: TokenUseWarning;
};

export type AppMetadata = {
  __typename?: 'AppMetadata';
  appVersion: Scalars['String']['output'];
  minimumSupportedAppVersion: Scalars['String']['output'];
  monthlyTokenUseLimit: Scalars['Int']['output'];
  feedbackGenerationTokenCost: Scalars['Int']['output'];
  textFixTokenCost: Scalars['Int']['output'];
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

export type WarningInfo = {
  __typename?: 'WarningInfo';
  warning: TokenUseWarning;
  threshhold: Scalars['Float']['output'];
};

export type TeacherUsageData = {
  __typename?: 'TeacherUsageData';
  id: Scalars['ID']['output'];
  monthlyTokensUsed: Scalars['Int']['output'];
  warning?: Maybe<WarningInfo>;
};

export type GenerateStudentFeedbackResult = {
  __typename?: 'GenerateStudentFeedbackResult';
  feedback: Feedback;
  tokensUsed: Scalars['Int']['output'];
  usageData: TeacherUsageData;
};

export type GenerateGroupFeedbackResult = {
  __typename?: 'GenerateGroupFeedbackResult';
  feedbacks: Array<Feedback>;
  tokensUsed: Scalars['Int']['output'];
  usageData: TeacherUsageData;
};

export type FixTextGrammaticsResult = {
  __typename?: 'FixTextGrammaticsResult';
  result: Scalars['String']['output'];
  tokensUsed: Scalars['Int']['output'];
  usageData: TeacherUsageData;
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

export type TokenUseWarning =
  | 'FIRST_WARNING'
  | 'SECOND_WARNING';

export type LearningObjectiveType =
  | 'BEHAVIOUR'
  | 'SKILLS'
  | 'SKILLS_AND_BEHAVIOUR'
  | 'NOT_EVALUATED';

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

export type CollectionTypeCategory =
  | 'CLASS_PARTICIPATION'
  | 'EXAM'
  | 'WRITTEN_WORK'
  | 'GROUP_WORK'
  | 'OTHER';

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
  latestFeedback?: Maybe<Feedback>;
  feedbacks: Array<Feedback>;
};

export type Feedback = {
  __typename?: 'Feedback';
  id: Scalars['ID']['output'];
  student: Student;
  module: Module;
  text: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
};

export type EducationLevel =
  | 'PRIMARY_FIRST'
  | 'PRIMARY_SECOND'
  | 'PRIMARY_THIRD'
  | 'PRIMARY_FOURTH'
  | 'PRIMARY_FIFTH'
  | 'PRIMARY_SIXTH'
  | 'PRIMARY_SEVENTH'
  | 'PRIMARY_EIGHTH'
  | 'PRIMARY_NINTH'
  | 'HIGH_SCHOOL'
  | 'VOCATIONAL';

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

export type Test_LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Test_LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type Test_LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type Test_LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ConnectLocalCredentialsMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ConnectLocalCredentialsMutation = { __typename?: 'Mutation', connectLocalCredentials: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', id: string, email?: string | null, groups: Array<{ __typename?: 'Group', id: string }> } } };

export type ConnectLocalCredentials_MPassIdLoginMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ConnectLocalCredentials_MPassIdLoginMutation = { __typename?: 'Mutation', mPassIDLogin: { __typename?: 'MPassIDAuthPayload', newUserCreated: boolean, payload: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', id: string, isMPassIDConnected: boolean } } } };

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

export type ChangeGroupModuleInvalidEducationLevelFromPrimaryMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleInvalidEducationLevelFromPrimaryMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string } };

export type ChangeGroupModuleInvalidEducationLevelFromHighSchoolMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleInvalidEducationLevelFromHighSchoolMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', id: string } };

export type ChangeGroupModuleDataLoadersCheckMutationVariables = Exact<{
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
}>;


export type ChangeGroupModuleDataLoadersCheckMutation = { __typename?: 'Mutation', changeGroupModule: { __typename?: 'Group', currentModule: { __typename?: 'Module', info: { __typename?: 'ModuleInfo', educationLevel: EducationLevel, learningObjectiveGroupKey: string } } } };

export type CreateClassParticipationCollectionMutationVariables = Exact<{
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateClassParticipationCollectionMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename: 'ClassParticipationCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string }, environment: { __typename?: 'Environment', code: string }, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string }>, evaluations: Array<{ __typename: 'ClassParticipationEvaluation', skillsRating?: number | null, behaviourRating?: number | null, student: { __typename?: 'Student', id: string } }> } };

export type CreateClassParticipationCollectionInvalidEnvironmentMutationVariables = Exact<{
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateClassParticipationCollectionInvalidEnvironmentMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type CreateClassParticipationCollectionInvalidLearningObjectivesMutationVariables = Exact<{
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateClassParticipationCollectionInvalidLearningObjectivesMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type CreateClassParticipationCollectionNotEvaluatedLearningObjectivesMutationVariables = Exact<{
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateClassParticipationCollectionNotEvaluatedLearningObjectivesMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type CreateClassParticipationCollectionInvalidTypeMutationVariables = Exact<{
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateClassParticipationCollectionInvalidTypeMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type CreateClassParticipationCollectionDataLoaderCheckMutationVariables = Exact<{
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateClassParticipationCollectionDataLoaderCheckMutation = { __typename?: 'Mutation', createClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string, date: string } };

export type CreateDefaultCollectionMutationVariables = Exact<{
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateDefaultCollectionMutation = { __typename?: 'Mutation', createDefaultCollection: { __typename: 'DefaultCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string }, evaluations: Array<{ __typename: 'DefaultEvaluation', notes?: string | null, rating?: number | null, student: { __typename?: 'Student', id: string } }> } };

export type CreateDefaultCollectionDuplicateMutationVariables = Exact<{
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateDefaultCollectionDuplicateMutation = { __typename?: 'Mutation', createDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type CreateDefaultCollectionInvalidTypeMutationVariables = Exact<{
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateDefaultCollectionInvalidTypeMutation = { __typename?: 'Mutation', createDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type CreateDefaultCollectionDataLoaderCheckMutationVariables = Exact<{
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateDefaultCollectionDataLoaderCheckMutation = { __typename?: 'Mutation', createDefaultCollection: { __typename?: 'DefaultCollection', id: string, date: string } };

export type CreateGroupMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, teacher: { __typename?: 'Teacher', id: string }, subject: { __typename?: 'Subject', code: string }, students: Array<{ __typename?: 'Student', name: string }>, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', name: string, weight: number }> } } };

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

export type CreateGroupDataLoadersCheckMutationVariables = Exact<{
  data: CreateGroupInput;
}>;


export type CreateGroupDataLoadersCheckMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string } };

export type CreateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string, name: string, group: { __typename?: 'Group', id: string }, currentModuleEvaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, collection: { __typename?: 'ClassParticipationCollection', id: string } } | { __typename?: 'DefaultEvaluation', id: string, collection: { __typename?: 'DefaultCollection', id: string } }> } };

export type CreateDuplicateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateDuplicateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string } };

export type CreateStudentDataLoaderCheckMutationVariables = Exact<{
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
}>;


export type CreateStudentDataLoaderCheckMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string, name: string } };

export type DeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'ClassParticipationCollection', id: string } | { __typename?: 'DefaultCollection', id: string } };

export type DeleteCollectionUnauthorizedMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionUnauthorizedMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'ClassParticipationCollection', id: string, description?: string | null } | { __typename?: 'DefaultCollection', id: string, description?: string | null } };

export type DeleteCollectionInvalidIdMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionInvalidIdMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'ClassParticipationCollection', id: string } | { __typename?: 'DefaultCollection', id: string } };

export type DeleteCollectionDataLoaderCheckMutationVariables = Exact<{
  collectionId: Scalars['ID']['input'];
}>;


export type DeleteCollectionDataLoaderCheckMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'ClassParticipationCollection', id: string } | { __typename?: 'DefaultCollection', id: string } };

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

export type DeleteGroupDataLoaderCheckMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type DeleteGroupDataLoaderCheckMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

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

export type DeleteStudentDataLoaderCheckMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type DeleteStudentDataLoaderCheckMutation = { __typename?: 'Mutation', deleteStudent: { __typename?: 'Student', id: string } };

export type DeleteTeacherMutationVariables = Exact<{
  teacherId: Scalars['ID']['input'];
}>;


export type DeleteTeacherMutation = { __typename?: 'Mutation', deleteTeacher: { __typename?: 'Teacher', id: string } };

export type DeleteTeacherUnauthorizedMutationVariables = Exact<{
  teacherId: Scalars['ID']['input'];
}>;


export type DeleteTeacherUnauthorizedMutation = { __typename?: 'Mutation', deleteTeacher: { __typename?: 'Teacher', id: string } };

export type DeleteTeacherDataLoaderCheckMutationVariables = Exact<{
  teacherId: Scalars['ID']['input'];
}>;


export type DeleteTeacherDataLoaderCheckMutation = { __typename?: 'Mutation', deleteTeacher: { __typename?: 'Teacher', id: string } };

export type FixTextGrammaticsValidInputMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsValidInputMutation = { __typename?: 'Mutation', fixTextGrammatics: { __typename?: 'FixTextGrammaticsResult', result: string } };

export type FixTextGrammaticsUnauthorizedMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsUnauthorizedMutation = { __typename?: 'Mutation', fixTextGrammatics: { __typename?: 'FixTextGrammaticsResult', result: string } };

export type FixTextGrammaticsInvalidStudentMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsInvalidStudentMutation = { __typename?: 'Mutation', fixTextGrammatics: { __typename?: 'FixTextGrammaticsResult', result: string } };

export type FixTextGrammaticsEmptyTextMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
}>;


export type FixTextGrammaticsEmptyTextMutation = { __typename?: 'Mutation', fixTextGrammatics: { __typename?: 'FixTextGrammaticsResult', result: string } };

export type GenerateGroupFeedbackTestMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type GenerateGroupFeedbackTestMutation = { __typename?: 'Mutation', generateGroupFeedback: { __typename?: 'GenerateGroupFeedbackResult', usageData: { __typename?: 'TeacherUsageData', id: string, monthlyTokensUsed: number } } };

export type LoginTest_ValidLoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginTest_ValidLoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type LoginTest_ValidLoginInDifferentCaseMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginTest_ValidLoginInDifferentCaseMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

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

export type GenerateStudentFeedbackTestMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
}>;


export type GenerateStudentFeedbackTestMutation = { __typename?: 'Mutation', generateStudentFeedback: { __typename?: 'GenerateStudentFeedbackResult', feedback: { __typename?: 'Feedback', id: string, text: string } } };

export type MPassIdLoginMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type MPassIdLoginMutation = { __typename?: 'Mutation', mPassIDLogin: { __typename?: 'MPassIDAuthPayload', newUserCreated: boolean, payload: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', id: string, isMPassIDConnected: boolean } } } };

export type ConnectMPassIdMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type ConnectMPassIdMutation = { __typename?: 'Mutation', connectMPassID: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', id: string, isMPassIDConnected: boolean, groups: Array<{ __typename?: 'Group', id: string }> } } };

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

export type UpdatePasswordDataLoadersMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  recoveryCode: Scalars['String']['input'];
}>;


export type UpdatePasswordDataLoadersMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type RegisterTest_RegisterMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type RegisterTest_RegisterExistingEmailMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterExistingEmailMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type RegisterTest_RegisterEmailInLowerCaseMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterEmailInLowerCaseMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type RegisterTest_RegisterInvalidLanguageMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type RegisterTest_RegisterInvalidLanguageMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type SampleTest_RegisterMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type SampleTest_RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type SampleTest_RegisterExistingEmailMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;


export type SampleTest_RegisterExistingEmailMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', userData: { __typename?: 'Teacher', email?: string | null } } };

export type UpdateClassParticipationCollectionMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string }, environment: { __typename?: 'Environment', code: string }, evaluations: Array<{ __typename?: 'ClassParticipationEvaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null, wasPresent: boolean }>, learningObjectives: Array<{ __typename?: 'LearningObjective', code: string }> } };

export type UpdateClassParticipationCollectionUnauthorizedMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionUnauthorizedMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionInvalidIdMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionInvalidIdMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionInvalidEnvironmentMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionInvalidEnvironmentMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionInvalidLearningObjectivesMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionInvalidLearningObjectivesMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionEvaluationsNotInCollectionMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionEvaluationsNotInCollectionMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionInvalidStudentPresenceMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionInvalidStudentPresenceMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionInvalidEvaluationTypeMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionInvalidEvaluationTypeMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationCollectionDataLoaderCheckMutationVariables = Exact<{
  data: UpdateClassParticipationCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateClassParticipationCollectionDataLoaderCheckMutation = { __typename?: 'Mutation', updateClassParticipationCollection: { __typename?: 'ClassParticipationCollection', id: string } };

export type UpdateClassParticipationEvaluationMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null } };

export type UpdateClassParticipationEvaluationBehaviourRatingLowMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationBehaviourRatingLowMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationBehaviourRatingHighMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationBehaviourRatingHighMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationSkillsRatingLowMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationSkillsRatingLowMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationSkillsRatingHighMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationSkillsRatingHighMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationUnauthorizedMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationUnauthorizedMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationInvalidIdMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationInvalidIdMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationNotPresentMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationNotPresentMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationWrongCollectionTypeMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationWrongCollectionTypeMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string } };

export type UpdateClassParticipationEvaluationDataLoaderCheckMutationVariables = Exact<{
  input: UpdateClassParticipationEvaluationInput;
}>;


export type UpdateClassParticipationEvaluationDataLoaderCheckMutation = { __typename?: 'Mutation', updateClassParticipationEvaluation: { __typename?: 'ClassParticipationEvaluation', id: string, skillsRating?: number | null, behaviourRating?: number | null, notes?: string | null } };

export type UpdateDefaultCollectionMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string, date: string, description?: string | null, type: { __typename?: 'CollectionType', id: string }, evaluations: Array<{ __typename?: 'DefaultEvaluation', id: string, notes?: string | null, wasPresent: boolean, rating?: number | null }> } };

export type UpdateDefaultCollectionUnauthorizedMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionUnauthorizedMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type UpdateDefaultCollectionInvalidIdMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionInvalidIdMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type UpdateDefaultCollectionEvaluationsNotInCollectionMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionEvaluationsNotInCollectionMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type UpdateDefaultCollectionInvalidStudentPresenceMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionInvalidStudentPresenceMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type UpdateDefaultCollectionInvalidEvaluationTypeMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionInvalidEvaluationTypeMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type UpdateDefaultCollectionDataLoaderCheckMutationVariables = Exact<{
  data: UpdateDefaultCollectionInput;
  collectionId: Scalars['ID']['input'];
}>;


export type UpdateDefaultCollectionDataLoaderCheckMutation = { __typename?: 'Mutation', updateDefaultCollection: { __typename?: 'DefaultCollection', id: string } };

export type UpdateDefaultEvaluationMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string, rating?: number | null, notes?: string | null } };

export type UpdateDefaultEvaluationRatingLowMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationRatingLowMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationRatingInvalidIntervalMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationRatingInvalidIntervalMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationRatingHighMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationRatingHighMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationUnauthorizedMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationUnauthorizedMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationInvalidIdMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationInvalidIdMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationNotPresentMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationNotPresentMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationClassParticipationUpdateMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationClassParticipationUpdateMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string } };

export type UpdateDefaultEvaluationDataLoaderCheckMutationVariables = Exact<{
  input: UpdateDefaultEvaluationInput;
}>;


export type UpdateDefaultEvaluationDataLoaderCheckMutation = { __typename?: 'Mutation', updateDefaultEvaluation: { __typename?: 'DefaultEvaluation', id: string, rating?: number | null, notes?: string | null } };

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

export type UpdateGroupDataLoaderCheckMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupDataLoaderCheckMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, archived: boolean } };

export type UpdateGroupCollectionTypesMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesDuplicateIdsMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesDuplicateIdsMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesUnmatchedIdsMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesUnmatchedIdsMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesInvalidCategoryChangeMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesInvalidCategoryChangeMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesInvalidCategoryChange2MutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesInvalidCategoryChange2Mutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesInvalidTotalWeightMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesInvalidTotalWeightMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesInvalidCategoryCountMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesInvalidCategoryCountMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

export type UpdateGroupCollectionTypesInvalidCategoryCount2MutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
}>;


export type UpdateGroupCollectionTypesInvalidCategoryCount2Mutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, currentModule: { __typename?: 'Module', collectionTypes: Array<{ __typename?: 'CollectionType', id: string, name: string, weight: number, category: CollectionTypeCategory }> } } };

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

export type UpdateStudentDataLoaderCheckMutationVariables = Exact<{
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
}>;


export type UpdateStudentDataLoaderCheckMutation = { __typename?: 'Mutation', updateStudent: { __typename?: 'Student', id: string, name: string } };


export const Test_LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Test_Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<Test_LoginMutation, Test_LoginMutationVariables>;
export const Test_LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Test_Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<Test_LogoutMutation, Test_LogoutMutationVariables>;
export const ConnectLocalCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConnectLocalCredentials"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectLocalCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConnectLocalCredentialsMutation, ConnectLocalCredentialsMutationVariables>;
export const ConnectLocalCredentials_MPassIdLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConnectLocalCredentials_MPassIDLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mPassIDLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"newUserCreated"}}]}}]}}]} as unknown as DocumentNode<ConnectLocalCredentials_MPassIdLoginMutation, ConnectLocalCredentials_MPassIdLoginMutationVariables>;
export const ChangeGroupModuleValidInputDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleValidInput"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleValidInputMutation, ChangeGroupModuleValidInputMutationVariables>;
export const ChangeGroupModuleUnAuthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleUnAuthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleUnAuthorizedMutation, ChangeGroupModuleUnAuthorizedMutationVariables>;
export const ChangeGroupModuleInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleInvalidIdMutation, ChangeGroupModuleInvalidIdMutationVariables>;
export const ChangeGroupModuleInvalidLearningObjectiveKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleInvalidLearningObjectiveKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleInvalidLearningObjectiveKeyMutation, ChangeGroupModuleInvalidLearningObjectiveKeyMutationVariables>;
export const ChangeGroupModuleInvalidEducationLevelFromPrimaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleInvalidEducationLevelFromPrimary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleInvalidEducationLevelFromPrimaryMutation, ChangeGroupModuleInvalidEducationLevelFromPrimaryMutationVariables>;
export const ChangeGroupModuleInvalidEducationLevelFromHighSchoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleInvalidEducationLevelFromHighSchool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleInvalidEducationLevelFromHighSchoolMutation, ChangeGroupModuleInvalidEducationLevelFromHighSchoolMutationVariables>;
export const ChangeGroupModuleDataLoadersCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeGroupModuleDataLoadersCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeGroupModuleInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeGroupModule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationLevel"}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectiveGroupKey"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ChangeGroupModuleDataLoadersCheckMutation, ChangeGroupModuleDataLoadersCheckMutationVariables>;
export const CreateClassParticipationCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClassParticipationCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}}]}}]}}]}}]} as unknown as DocumentNode<CreateClassParticipationCollectionMutation, CreateClassParticipationCollectionMutationVariables>;
export const CreateClassParticipationCollectionInvalidEnvironmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClassParticipationCollectionInvalidEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateClassParticipationCollectionInvalidEnvironmentMutation, CreateClassParticipationCollectionInvalidEnvironmentMutationVariables>;
export const CreateClassParticipationCollectionInvalidLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClassParticipationCollectionInvalidLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateClassParticipationCollectionInvalidLearningObjectivesMutation, CreateClassParticipationCollectionInvalidLearningObjectivesMutationVariables>;
export const CreateClassParticipationCollectionNotEvaluatedLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClassParticipationCollectionNotEvaluatedLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateClassParticipationCollectionNotEvaluatedLearningObjectivesMutation, CreateClassParticipationCollectionNotEvaluatedLearningObjectivesMutationVariables>;
export const CreateClassParticipationCollectionInvalidTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClassParticipationCollectionInvalidType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateClassParticipationCollectionInvalidTypeMutation, CreateClassParticipationCollectionInvalidTypeMutationVariables>;
export const CreateClassParticipationCollectionDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClassParticipationCollectionDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<CreateClassParticipationCollectionDataLoaderCheckMutation, CreateClassParticipationCollectionDataLoaderCheckMutationVariables>;
export const CreateDefaultCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDefaultCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]} as unknown as DocumentNode<CreateDefaultCollectionMutation, CreateDefaultCollectionMutationVariables>;
export const CreateDefaultCollectionDuplicateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDefaultCollectionDuplicate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDefaultCollectionDuplicateMutation, CreateDefaultCollectionDuplicateMutationVariables>;
export const CreateDefaultCollectionInvalidTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDefaultCollectionInvalidType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDefaultCollectionInvalidTypeMutation, CreateDefaultCollectionInvalidTypeMutationVariables>;
export const CreateDefaultCollectionDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDefaultCollectionDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<CreateDefaultCollectionDataLoaderCheckMutation, CreateDefaultCollectionDataLoaderCheckMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateGroupInvalidSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupInvalidSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupInvalidSubjectMutation, CreateGroupInvalidSubjectMutationVariables>;
export const CreateGroupEmptyCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupEmptyCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupEmptyCollectionsMutation, CreateGroupEmptyCollectionsMutationVariables>;
export const CreateGroupInvalidWeightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupInvalidWeights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGroupInvalidWeightsMutation, CreateGroupInvalidWeightsMutationVariables>;
export const CreateGroupDataLoadersCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupDataLoadersCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateGroupDataLoadersCheckMutation, CreateGroupDataLoadersCheckMutationVariables>;
export const CreateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentModuleEvaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateStudentMutation, CreateStudentMutationVariables>;
export const CreateDuplicateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDuplicateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDuplicateStudentMutation, CreateDuplicateStudentMutationVariables>;
export const CreateStudentDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStudentDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateStudentDataLoaderCheckMutation, CreateStudentDataLoaderCheckMutationVariables>;
export const DeleteCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const DeleteCollectionUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollectionUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionUnauthorizedMutation, DeleteCollectionUnauthorizedMutationVariables>;
export const DeleteCollectionInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollectionInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionInvalidIdMutation, DeleteCollectionInvalidIdMutationVariables>;
export const DeleteCollectionDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollectionDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionDataLoaderCheckMutation, DeleteCollectionDataLoaderCheckMutationVariables>;
export const DeleteGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DeleteGroupUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroupUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupUnauthorizedMutation, DeleteGroupUnauthorizedMutationVariables>;
export const DeleteGroupInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroupInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupInvalidIdMutation, DeleteGroupInvalidIdMutationVariables>;
export const DeleteGroupDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroupDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupDataLoaderCheckMutation, DeleteGroupDataLoaderCheckMutationVariables>;
export const DeleteStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const DeleteStudentUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudentUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentUnauthorizedMutation, DeleteStudentUnauthorizedMutationVariables>;
export const DeleteStudentInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudentInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentInvalidIdMutation, DeleteStudentInvalidIdMutationVariables>;
export const DeleteStudentDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudentDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteStudentDataLoaderCheckMutation, DeleteStudentDataLoaderCheckMutationVariables>;
export const DeleteTeacherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeacher"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teacherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTeacherMutation, DeleteTeacherMutationVariables>;
export const DeleteTeacherUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeacherUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teacherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTeacherUnauthorizedMutation, DeleteTeacherUnauthorizedMutationVariables>;
export const DeleteTeacherDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTeacherDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacher"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teacherId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teacherId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTeacherDataLoaderCheckMutation, DeleteTeacherDataLoaderCheckMutationVariables>;
export const FixTextGrammaticsValidInputDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsValidInput"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<FixTextGrammaticsValidInputMutation, FixTextGrammaticsValidInputMutationVariables>;
export const FixTextGrammaticsUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<FixTextGrammaticsUnauthorizedMutation, FixTextGrammaticsUnauthorizedMutationVariables>;
export const FixTextGrammaticsInvalidStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsInvalidStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<FixTextGrammaticsInvalidStudentMutation, FixTextGrammaticsInvalidStudentMutationVariables>;
export const FixTextGrammaticsEmptyTextDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FixTextGrammaticsEmptyText"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fixTextGrammatics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"}}]}}]}}]} as unknown as DocumentNode<FixTextGrammaticsEmptyTextMutation, FixTextGrammaticsEmptyTextMutationVariables>;
export const GenerateGroupFeedbackTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateGroupFeedbackTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateGroupFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"monthlyTokensUsed"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateGroupFeedbackTestMutation, GenerateGroupFeedbackTestMutationVariables>;
export const LoginTest_ValidLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_ValidLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_ValidLoginMutation, LoginTest_ValidLoginMutationVariables>;
export const LoginTest_ValidLoginInDifferentCaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_ValidLoginInDifferentCase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_ValidLoginInDifferentCaseMutation, LoginTest_ValidLoginInDifferentCaseMutationVariables>;
export const LoginTest_InvalidLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_InvalidLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_InvalidLoginMutation, LoginTest_InvalidLoginMutationVariables>;
export const LoginTest_NoEmailLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTest_NoEmailLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginTest_NoEmailLoginMutation, LoginTest_NoEmailLoginMutationVariables>;
export const GenerateStudentFeedbackTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateStudentFeedbackTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateStudentFeedback"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"moduleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"moduleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedback"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GenerateStudentFeedbackTestMutation, GenerateStudentFeedbackTestMutationVariables>;
export const MPassIdLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MPassIDLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mPassIDLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"newUserCreated"}}]}}]}}]} as unknown as DocumentNode<MPassIdLoginMutation, MPassIdLoginMutationVariables>;
export const ConnectMPassIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConnectMPassID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"connectMPassID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMPassIDConnected"}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ConnectMPassIdMutation, ConnectMPassIdMutationVariables>;
export const RequestPasswordResetValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordResetValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetValidMutation, RequestPasswordResetValidMutationVariables>;
export const VerifyPasswordResetCodeValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeValidMutation, VerifyPasswordResetCodeValidMutationVariables>;
export const UpdatePasswordValidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordValid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recoveryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"recoveryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recoveryCode"}}}]}]}}]} as unknown as DocumentNode<UpdatePasswordValidMutation, UpdatePasswordValidMutationVariables>;
export const RequestPasswordResetInvalidEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordResetInvalidEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetInvalidEmailMutation, RequestPasswordResetInvalidEmailMutationVariables>;
export const RequestPasswordResetExceedTriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordResetExceedTries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetExceedTriesMutation, RequestPasswordResetExceedTriesMutationVariables>;
export const VerifyPasswordResetCodeInvalidDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeInvalid"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeInvalidMutation, VerifyPasswordResetCodeInvalidMutationVariables>;
export const VerifyPasswordResetCodeExpiredDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeExpired"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeExpiredMutation, VerifyPasswordResetCodeExpiredMutationVariables>;
export const VerifyPasswordResetCodeExceedTriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetCodeExceedTries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetCodeExceedTriesMutation, VerifyPasswordResetCodeExceedTriesMutationVariables>;
export const UpdatePasswordDataLoadersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordDataLoaders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recoveryCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"recoveryCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recoveryCode"}}}]}]}}]} as unknown as DocumentNode<UpdatePasswordDataLoadersMutation, UpdatePasswordDataLoadersMutationVariables>;
export const RegisterTest_RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterMutation, RegisterTest_RegisterMutationVariables>;
export const RegisterTest_RegisterExistingEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_RegisterExistingEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterExistingEmailMutation, RegisterTest_RegisterExistingEmailMutationVariables>;
export const RegisterTest_RegisterEmailInLowerCaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_RegisterEmailInLowerCase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterEmailInLowerCaseMutation, RegisterTest_RegisterEmailInLowerCaseMutationVariables>;
export const RegisterTest_RegisterInvalidLanguageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterTest_RegisterInvalidLanguage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterTest_RegisterInvalidLanguageMutation, RegisterTest_RegisterInvalidLanguageMutationVariables>;
export const SampleTest_RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SampleTest_Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SampleTest_RegisterMutation, SampleTest_RegisterMutationVariables>;
export const SampleTest_RegisterExistingEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SampleTest_RegisterExistingEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SampleTest_RegisterExistingEmailMutation, SampleTest_RegisterExistingEmailMutationVariables>;
export const UpdateClassParticipationCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"learningObjectives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionMutation, UpdateClassParticipationCollectionMutationVariables>;
export const UpdateClassParticipationCollectionUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionUnauthorizedMutation, UpdateClassParticipationCollectionUnauthorizedMutationVariables>;
export const UpdateClassParticipationCollectionInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionInvalidIdMutation, UpdateClassParticipationCollectionInvalidIdMutationVariables>;
export const UpdateClassParticipationCollectionInvalidEnvironmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInvalidEnvironment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionInvalidEnvironmentMutation, UpdateClassParticipationCollectionInvalidEnvironmentMutationVariables>;
export const UpdateClassParticipationCollectionInvalidLearningObjectivesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInvalidLearningObjectives"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionInvalidLearningObjectivesMutation, UpdateClassParticipationCollectionInvalidLearningObjectivesMutationVariables>;
export const UpdateClassParticipationCollectionEvaluationsNotInCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionEvaluationsNotInCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionEvaluationsNotInCollectionMutation, UpdateClassParticipationCollectionEvaluationsNotInCollectionMutationVariables>;
export const UpdateClassParticipationCollectionInvalidStudentPresenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInvalidStudentPresence"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionInvalidStudentPresenceMutation, UpdateClassParticipationCollectionInvalidStudentPresenceMutationVariables>;
export const UpdateClassParticipationCollectionInvalidEvaluationTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInvalidEvaluationType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionInvalidEvaluationTypeMutation, UpdateClassParticipationCollectionInvalidEvaluationTypeMutationVariables>;
export const UpdateClassParticipationCollectionDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationCollectionDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationCollectionDataLoaderCheckMutation, UpdateClassParticipationCollectionDataLoaderCheckMutationVariables>;
export const UpdateClassParticipationEvaluationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationMutation, UpdateClassParticipationEvaluationMutationVariables>;
export const UpdateClassParticipationEvaluationBehaviourRatingLowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationBehaviourRatingLow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationBehaviourRatingLowMutation, UpdateClassParticipationEvaluationBehaviourRatingLowMutationVariables>;
export const UpdateClassParticipationEvaluationBehaviourRatingHighDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationBehaviourRatingHigh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationBehaviourRatingHighMutation, UpdateClassParticipationEvaluationBehaviourRatingHighMutationVariables>;
export const UpdateClassParticipationEvaluationSkillsRatingLowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationSkillsRatingLow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationSkillsRatingLowMutation, UpdateClassParticipationEvaluationSkillsRatingLowMutationVariables>;
export const UpdateClassParticipationEvaluationSkillsRatingHighDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationSkillsRatingHigh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationSkillsRatingHighMutation, UpdateClassParticipationEvaluationSkillsRatingHighMutationVariables>;
export const UpdateClassParticipationEvaluationUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationUnauthorizedMutation, UpdateClassParticipationEvaluationUnauthorizedMutationVariables>;
export const UpdateClassParticipationEvaluationInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationInvalidIdMutation, UpdateClassParticipationEvaluationInvalidIdMutationVariables>;
export const UpdateClassParticipationEvaluationNotPresentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationNotPresent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationNotPresentMutation, UpdateClassParticipationEvaluationNotPresentMutationVariables>;
export const UpdateClassParticipationEvaluationWrongCollectionTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationWrongCollectionType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationWrongCollectionTypeMutation, UpdateClassParticipationEvaluationWrongCollectionTypeMutationVariables>;
export const UpdateClassParticipationEvaluationDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClassParticipationEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClassParticipationEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRating"}},{"kind":"Field","name":{"kind":"Name","value":"behaviourRating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<UpdateClassParticipationEvaluationDataLoaderCheckMutation, UpdateClassParticipationEvaluationDataLoaderCheckMutationVariables>;
export const UpdateDefaultCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"wasPresent"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionMutation, UpdateDefaultCollectionMutationVariables>;
export const UpdateDefaultCollectionUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollectionUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionUnauthorizedMutation, UpdateDefaultCollectionUnauthorizedMutationVariables>;
export const UpdateDefaultCollectionInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollectionInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionInvalidIdMutation, UpdateDefaultCollectionInvalidIdMutationVariables>;
export const UpdateDefaultCollectionEvaluationsNotInCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollectionEvaluationsNotInCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionEvaluationsNotInCollectionMutation, UpdateDefaultCollectionEvaluationsNotInCollectionMutationVariables>;
export const UpdateDefaultCollectionInvalidStudentPresenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollectionInvalidStudentPresence"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionInvalidStudentPresenceMutation, UpdateDefaultCollectionInvalidStudentPresenceMutationVariables>;
export const UpdateDefaultCollectionInvalidEvaluationTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollectionInvalidEvaluationType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionInvalidEvaluationTypeMutation, UpdateDefaultCollectionInvalidEvaluationTypeMutationVariables>;
export const UpdateDefaultCollectionDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultCollectionDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultCollectionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultCollectionDataLoaderCheckMutation, UpdateDefaultCollectionDataLoaderCheckMutationVariables>;
export const UpdateDefaultEvaluationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationMutation, UpdateDefaultEvaluationMutationVariables>;
export const UpdateDefaultEvaluationRatingLowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationRatingLow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationRatingLowMutation, UpdateDefaultEvaluationRatingLowMutationVariables>;
export const UpdateDefaultEvaluationRatingInvalidIntervalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationRatingInvalidInterval"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationRatingInvalidIntervalMutation, UpdateDefaultEvaluationRatingInvalidIntervalMutationVariables>;
export const UpdateDefaultEvaluationRatingHighDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationRatingHigh"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationRatingHighMutation, UpdateDefaultEvaluationRatingHighMutationVariables>;
export const UpdateDefaultEvaluationUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationUnauthorizedMutation, UpdateDefaultEvaluationUnauthorizedMutationVariables>;
export const UpdateDefaultEvaluationInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationInvalidIdMutation, UpdateDefaultEvaluationInvalidIdMutationVariables>;
export const UpdateDefaultEvaluationNotPresentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationNotPresent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationNotPresentMutation, UpdateDefaultEvaluationNotPresentMutationVariables>;
export const UpdateDefaultEvaluationClassParticipationUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationClassParticipationUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationClassParticipationUpdateMutation, UpdateDefaultEvaluationClassParticipationUpdateMutationVariables>;
export const UpdateDefaultEvaluationDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDefaultEvaluationDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultEvaluationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultEvaluation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]}}]} as unknown as DocumentNode<UpdateDefaultEvaluationDataLoaderCheckMutation, UpdateDefaultEvaluationDataLoaderCheckMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateGroupUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupUnauthorizedMutation, UpdateGroupUnauthorizedMutationVariables>;
export const UpdateGroupInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupInvalidIdMutation, UpdateGroupInvalidIdMutationVariables>;
export const UpdateGroupDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupDataLoaderCheckMutation, UpdateGroupDataLoaderCheckMutationVariables>;
export const UpdateGroupCollectionTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesMutation, UpdateGroupCollectionTypesMutationVariables>;
export const UpdateGroupCollectionTypesDuplicateIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesDuplicateIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesDuplicateIdsMutation, UpdateGroupCollectionTypesDuplicateIdsMutationVariables>;
export const UpdateGroupCollectionTypesUnmatchedIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesUnmatchedIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesUnmatchedIdsMutation, UpdateGroupCollectionTypesUnmatchedIdsMutationVariables>;
export const UpdateGroupCollectionTypesInvalidCategoryChangeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesInvalidCategoryChange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesInvalidCategoryChangeMutation, UpdateGroupCollectionTypesInvalidCategoryChangeMutationVariables>;
export const UpdateGroupCollectionTypesInvalidCategoryChange2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesInvalidCategoryChange2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesInvalidCategoryChange2Mutation, UpdateGroupCollectionTypesInvalidCategoryChange2MutationVariables>;
export const UpdateGroupCollectionTypesInvalidTotalWeightDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesInvalidTotalWeight"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesInvalidTotalWeightMutation, UpdateGroupCollectionTypesInvalidTotalWeightMutationVariables>;
export const UpdateGroupCollectionTypesInvalidCategoryCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesInvalidCategoryCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesInvalidCategoryCountMutation, UpdateGroupCollectionTypesInvalidCategoryCountMutationVariables>;
export const UpdateGroupCollectionTypesInvalidCategoryCount2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupCollectionTypesInvalidCategoryCount2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentModule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupCollectionTypesInvalidCategoryCount2Mutation, UpdateGroupCollectionTypesInvalidCategoryCount2MutationVariables>;
export const UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const UpdateStudentUnauthorizedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentUnauthorized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentUnauthorizedMutation, UpdateStudentUnauthorizedMutationVariables>;
export const UpdateStudentInvalidIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentInvalidID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentInvalidIdMutation, UpdateStudentInvalidIdMutationVariables>;
export const UpdateStudentDuplicateNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentDuplicateName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentDuplicateNameMutation, UpdateStudentDuplicateNameMutationVariables>;
export const UpdateStudentDataLoaderCheckDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudentDataLoaderCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateStudentDataLoaderCheckMutation, UpdateStudentDataLoaderCheckMutationVariables>;