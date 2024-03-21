/* eslint-disable */
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
  Date: { input: string; output: string; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: string; output: string; }
};

export type AppMetadata = {
  __typename?: 'AppMetadata';
  appVersion: Scalars['String']['output'];
  feedbackGenerationTokenCost: Scalars['Int']['output'];
  minimumEvalsForFeedback: Scalars['Int']['output'];
  minimumSupportedAppVersion: Scalars['String']['output'];
  monthlyTokenUseLimit: Scalars['Int']['output'];
  textFixTokenCost: Scalars['Int']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  userData: Teacher;
};

export type ChangeGroupModuleInput = {
  newEducationLevel: EducationLevel;
  newLearningObjectiveGroupKey: Scalars['String']['input'];
};

export type ClassParticipationCollection = EvaluationCollection & {
  __typename?: 'ClassParticipationCollection';
  date: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  environment: Environment;
  evaluations: Array<ClassParticipationEvaluation>;
  id: Scalars['ID']['output'];
  learningObjectives: Array<LearningObjective>;
  module: Module;
  type: CollectionType;
};

export type ClassParticipationEvaluation = Evaluation & {
  __typename?: 'ClassParticipationEvaluation';
  behaviourRating?: Maybe<Scalars['Int']['output']>;
  collection: ClassParticipationCollection;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  skillsRating?: Maybe<Scalars['Int']['output']>;
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
};

export type CollectionType = {
  __typename?: 'CollectionType';
  category: CollectionTypeCategory;
  defaultTypeCollection?: Maybe<DefaultCollection>;
  id: Scalars['ID']['output'];
  module: Module;
  name: Scalars['String']['output'];
  weight: Scalars['Int']['output'];
};

export type CollectionTypeCategory =
  | 'CLASS_PARTICIPATION'
  | 'EXAM'
  | 'GROUP_WORK'
  | 'OTHER'
  | 'WRITTEN_WORK';

export type CreateClassParticipationCollectionInput = {
  date: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  environmentCode: Scalars['ID']['input'];
  evaluations?: InputMaybe<Array<CreateClassParticipationEvaluationInput>>;
  learningObjectiveCodes: Array<Scalars['ID']['input']>;
  typeId: Scalars['ID']['input'];
};

export type CreateClassParticipationEvaluationInput = {
  behaviourRating?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  skillsRating?: InputMaybe<Scalars['Int']['input']>;
  studentId: Scalars['ID']['input'];
  wasPresent: Scalars['Boolean']['input'];
};

export type CreateCollectionTypeInput = {
  category: CollectionTypeCategory;
  name: Scalars['String']['input'];
  weight: Scalars['Int']['input'];
};

export type CreateDefaultCollectionInput = {
  date: Scalars['Date']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  evaluations?: InputMaybe<Array<CreateDefaultEvaluationInput>>;
  typeId: Scalars['ID']['input'];
};

export type CreateDefaultEvaluationInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  studentId: Scalars['ID']['input'];
  wasPresent: Scalars['Boolean']['input'];
};

export type CreateGroupInput = {
  collectionTypes: Array<CreateCollectionTypeInput>;
  educationLevel: EducationLevel;
  learningObjectiveGroupKey: Scalars['String']['input'];
  name: Scalars['String']['input'];
  students: Array<CreateStudentInput>;
  subjectCode: Scalars['ID']['input'];
  teacherId: Scalars['ID']['input'];
};

export type CreateStudentInput = {
  name: Scalars['String']['input'];
};

export type CreateTeacherInput = {
  consentsAnalytics?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['EmailAddress']['input'];
  languagePreference?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type DefaultCollection = EvaluationCollection & {
  __typename?: 'DefaultCollection';
  date: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  evaluations: Array<DefaultEvaluation>;
  id: Scalars['ID']['output'];
  module: Module;
  type: CollectionType;
};

export type DefaultEvaluation = Evaluation & {
  __typename?: 'DefaultEvaluation';
  collection: DefaultCollection;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
};

export type EducationLevel =
  | 'HIGH_SCHOOL'
  | 'PRIMARY_EIGHTH'
  | 'PRIMARY_FIFTH'
  | 'PRIMARY_FIRST'
  | 'PRIMARY_FOURTH'
  | 'PRIMARY_NINTH'
  | 'PRIMARY_SECOND'
  | 'PRIMARY_SEVENTH'
  | 'PRIMARY_SIXTH'
  | 'PRIMARY_THIRD'
  | 'VOCATIONAL';

export type Environment = {
  __typename?: 'Environment';
  code: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  label: TranslatedString;
  subject: Subject;
};

export type Evaluation = {
  collection: EvaluationCollection;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  student: Student;
  wasPresent: Scalars['Boolean']['output'];
};

export type EvaluationCollection = {
  date: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  evaluations: Array<Evaluation>;
  id: Scalars['ID']['output'];
  module: Module;
  type: CollectionType;
};

export type Feedback = {
  __typename?: 'Feedback';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  module: Module;
  student: Student;
  text: Scalars['String']['output'];
};

export type FixTextGrammaticsResult = {
  __typename?: 'FixTextGrammaticsResult';
  result: Scalars['String']['output'];
  tokensUsed: Scalars['Int']['output'];
  usageData: TeacherUsageData;
};

export type GenerateGroupFeedbackResult = {
  __typename?: 'GenerateGroupFeedbackResult';
  feedbacks: Array<Feedback>;
  tokensUsed: Scalars['Int']['output'];
  usageData: TeacherUsageData;
};

export type GenerateStudentFeedbackResult = {
  __typename?: 'GenerateStudentFeedbackResult';
  feedback: Feedback;
  tokensUsed: Scalars['Int']['output'];
  usageData: TeacherUsageData;
};

export type Group = {
  __typename?: 'Group';
  archived: Scalars['Boolean']['output'];
  currentModule: Module;
  id: Scalars['ID']['output'];
  modules: Array<Module>;
  name: Scalars['String']['output'];
  students: Array<Student>;
  subject: Subject;
  teacher: Teacher;
  updatedAt: Scalars['DateTime']['output'];
};

export type LearningObjective = {
  __typename?: 'LearningObjective';
  code: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  description: TranslatedString;
  label: TranslatedString;
  type: LearningObjectiveType;
};

export type LearningObjectiveType =
  | 'BEHAVIOUR'
  | 'NOT_EVALUATED'
  | 'SKILLS'
  | 'SKILLS_AND_BEHAVIOUR';

export type LoginResult = {
  __typename?: 'LoginResult';
  userData: Teacher;
};

export type MPassIdAuthPayload = {
  __typename?: 'MPassIDAuthPayload';
  newUserCreated: Scalars['Boolean']['output'];
  payload: AuthPayload;
};

export type MPassIdOrganization = {
  __typename?: 'MPassIDOrganization';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Module = {
  __typename?: 'Module';
  collectionTypes: Array<CollectionType>;
  evaluationCollections: Array<EvaluationCollection>;
  group: Group;
  id: Scalars['ID']['output'];
  info: ModuleInfo;
  students: Array<Student>;
};

export type ModuleInfo = {
  __typename?: 'ModuleInfo';
  educationLevel: EducationLevel;
  label: TranslatedString;
  learningObjectiveGroupKey: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeGroupModule: Group;
  connectLocalCredentials: AuthPayload;
  connectMPassID: AuthPayload;
  createClassParticipationCollection: ClassParticipationCollection;
  createDefaultCollection: DefaultCollection;
  createGroup: Group;
  createStudent: Student;
  deleteCollection: EvaluationCollection;
  deleteGroup: Group;
  deleteStudent: Student;
  deleteTeacher: Teacher;
  fixTextGrammatics: FixTextGrammaticsResult;
  generateGroupFeedback: GenerateGroupFeedbackResult;
  generateStudentFeedback: GenerateStudentFeedbackResult;
  login: AuthPayload;
  logout: Scalars['Boolean']['output'];
  mPassIDLogin: MPassIdAuthPayload;
  register: AuthPayload;
  requestPasswordReset: Scalars['Boolean']['output'];
  sendFeedbackEmail: SendMailResult;
  setTokenUseWarningSeen: Scalars['Boolean']['output'];
  updateClassParticipationCollection: ClassParticipationCollection;
  updateClassParticipationEvaluation: ClassParticipationEvaluation;
  updateDefaultCollection: DefaultCollection;
  updateDefaultEvaluation: DefaultEvaluation;
  updateFeedback: Feedback;
  updateGroup: Group;
  updatePassword: Scalars['Boolean']['output'];
  updateStudent: Student;
  verifyPasswordResetCode: Scalars['Boolean']['output'];
};


export type MutationChangeGroupModuleArgs = {
  data: ChangeGroupModuleInput;
  groupId: Scalars['ID']['input'];
};


export type MutationConnectLocalCredentialsArgs = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};


export type MutationConnectMPassIdArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateClassParticipationCollectionArgs = {
  data: CreateClassParticipationCollectionInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationCreateDefaultCollectionArgs = {
  data: CreateDefaultCollectionInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};


export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  moduleId: Scalars['ID']['input'];
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['ID']['input'];
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID']['input'];
};


export type MutationDeleteStudentArgs = {
  studentId: Scalars['ID']['input'];
};


export type MutationDeleteTeacherArgs = {
  teacherId: Scalars['ID']['input'];
};


export type MutationFixTextGrammaticsArgs = {
  text: Scalars['String']['input'];
};


export type MutationGenerateGroupFeedbackArgs = {
  groupId: Scalars['ID']['input'];
  onlyGenerateMissing?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationGenerateStudentFeedbackArgs = {
  moduleId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};


export type MutationMPassIdLoginArgs = {
  code: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  data: CreateTeacherInput;
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['EmailAddress']['input'];
};


export type MutationSendFeedbackEmailArgs = {
  email: Scalars['EmailAddress']['input'];
  groupId: Scalars['ID']['input'];
};


export type MutationSetTokenUseWarningSeenArgs = {
  warning: TokenUseWarning;
};


export type MutationUpdateClassParticipationCollectionArgs = {
  collectionId: Scalars['ID']['input'];
  data: UpdateClassParticipationCollectionInput;
};


export type MutationUpdateClassParticipationEvaluationArgs = {
  input: UpdateClassParticipationEvaluationInput;
};


export type MutationUpdateDefaultCollectionArgs = {
  collectionId: Scalars['ID']['input'];
  data: UpdateDefaultCollectionInput;
};


export type MutationUpdateDefaultEvaluationArgs = {
  input: UpdateDefaultEvaluationInput;
};


export type MutationUpdateFeedbackArgs = {
  feedbackId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
  groupId: Scalars['ID']['input'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  recoveryCode: Scalars['String']['input'];
};


export type MutationUpdateStudentArgs = {
  data: UpdateStudentInput;
  studentId: Scalars['ID']['input'];
};


export type MutationVerifyPasswordResetCodeArgs = {
  code: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAppMetadata: AppMetadata;
  getCollection: EvaluationCollection;
  getCurrentUser: Teacher;
  getCurrentUserUsageData: TeacherUsageData;
  getEvaluation: Evaluation;
  getGroup: Group;
  getGroups: Array<Group>;
  getMPassIDOrganizations: Array<MPassIdOrganization>;
  getStudent: Student;
  getTeacher: Teacher;
  getType: CollectionType;
};


export type QueryGetCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEvaluationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetGroupsArgs = {
  teacherId: Scalars['ID']['input'];
};


export type QueryGetMPassIdOrganizationsArgs = {
  parentOid: Scalars['String']['input'];
};


export type QueryGetStudentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTeacherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetTypeArgs = {
  id: Scalars['ID']['input'];
};

export type SendMailResult =
  | 'EMAIL_VERIFICATION_REQUIRED'
  | 'SUCCESS';

export type Student = {
  __typename?: 'Student';
  currentModuleEvaluations: Array<Evaluation>;
  feedbacks: Array<Feedback>;
  group: Group;
  id: Scalars['ID']['output'];
  latestFeedback?: Maybe<Feedback>;
  name: Scalars['String']['output'];
};

export type Subject = {
  __typename?: 'Subject';
  code: Scalars['ID']['output'];
  environments: Array<Environment>;
  label: TranslatedString;
};

export type Teacher = {
  __typename?: 'Teacher';
  consentsAnalytics: Scalars['Boolean']['output'];
  email?: Maybe<Scalars['EmailAddress']['output']>;
  groups: Array<Group>;
  id: Scalars['ID']['output'];
  isMPassIDConnected: Scalars['Boolean']['output'];
  languagePreference: Scalars['String']['output'];
  verifiedEmails: Array<Scalars['EmailAddress']['output']>;
};

export type TeacherUsageData = {
  __typename?: 'TeacherUsageData';
  id: Scalars['ID']['output'];
  monthlyTokensUsed: Scalars['Int']['output'];
  warning?: Maybe<WarningInfo>;
};

export type TokenUseWarning =
  | 'FIRST_WARNING'
  | 'SECOND_WARNING';

export type TranslatedString = {
  __typename?: 'TranslatedString';
  en?: Maybe<Scalars['String']['output']>;
  fi: Scalars['String']['output'];
  se?: Maybe<Scalars['String']['output']>;
};

export type UpdateClassParticipationCollectionInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environmentCode?: InputMaybe<Scalars['ID']['input']>;
  evaluations?: InputMaybe<Array<UpdateClassParticipationEvaluationInput>>;
  learningObjectiveCodes?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateClassParticipationEvaluationInput = {
  behaviourRating?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  skillsRating?: InputMaybe<Scalars['Int']['input']>;
  wasPresent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCollectionTypeInput = {
  category?: InputMaybe<CollectionTypeCategory>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateDefaultCollectionInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  evaluations?: InputMaybe<Array<UpdateDefaultEvaluationInput>>;
};

export type UpdateDefaultEvaluationInput = {
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  wasPresent?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateGroupInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  createCollectionTypeInputs?: InputMaybe<Array<CreateCollectionTypeInput>>;
  deleteCollectionTypeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  updateCollectionTypeInputs?: InputMaybe<Array<UpdateCollectionTypeInput>>;
};

export type UpdateStudentInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type WarningInfo = {
  __typename?: 'WarningInfo';
  threshhold: Scalars['Float']['output'];
  warning: TokenUseWarning;
};
