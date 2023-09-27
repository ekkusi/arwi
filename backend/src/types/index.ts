/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { UserInfo as UserInfoPrisma, CustomContext } from "./contextTypes";
import {
  EvaluationCollection as EvaluationCollectionPrisma,
  Evaluation as EvaluationPrisma,
  Group as GroupPrisma,
  Student as StudentPrisma,
  Module as ModulePrisma,
} from "@prisma/client";
import { SubjectMinimal as SubjectMinimalPrisma, Environment as EnvironmentPrisma } from "./subject";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: any;
  EmailAddress: string;
};

export type Query = {
  __typename?: "Query";
  getAppMetadata: AppMetadata;
  getCurrentUser: Teacher;
  getTeacher: Teacher;
  getTeachers: Array<Teacher>;
  getGroups: Array<Group>;
  getGroup: Group;
  getCollection: EvaluationCollection;
  getStudent: Student;
  getEvaluation: Evaluation;
};

export type QueryGetTeacherArgs = {
  id: Scalars["ID"];
};

export type QueryGetGroupsArgs = {
  teacherId: Scalars["ID"];
};

export type QueryGetGroupArgs = {
  id: Scalars["ID"];
};

export type QueryGetCollectionArgs = {
  id: Scalars["ID"];
};

export type QueryGetStudentArgs = {
  id: Scalars["ID"];
};

export type QueryGetEvaluationArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: AuthPayload;
  login: AuthPayload;
  logout: Scalars["Boolean"];
  refreshToken: AuthPayload;
  createGroup: Group;
  createCollection: EvaluationCollection;
  createStudent: Student;
  updateEvaluations: Scalars["Int"];
  updateCollection: EvaluationCollection;
  updateStudent: Student;
  updateGroup: Group;
  updateEvaluation: Evaluation;
  deleteStudent: Student;
  deleteGroup: Group;
  deleteCollection: EvaluationCollection;
  changeGroupModule: Group;
  generateStudentFeedback: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: CreateTeacherInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};

export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
  moduleId: Scalars["ID"];
};

export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  moduleId: Scalars["ID"];
};

export type MutationUpdateEvaluationsArgs = {
  data: Array<UpdateEvaluationInput>;
  collectionId: Scalars["ID"];
};

export type MutationUpdateCollectionArgs = {
  data: UpdateCollectionInput;
  collectionId: Scalars["ID"];
};

export type MutationUpdateStudentArgs = {
  data: UpdateStudentInput;
  studentId: Scalars["ID"];
};

export type MutationUpdateGroupArgs = {
  data: UpdateGroupInput;
  groupId: Scalars["ID"];
};

export type MutationUpdateEvaluationArgs = {
  data: UpdateEvaluationInput;
};

export type MutationDeleteStudentArgs = {
  studentId: Scalars["ID"];
};

export type MutationDeleteGroupArgs = {
  groupId: Scalars["ID"];
};

export type MutationDeleteCollectionArgs = {
  collectionId: Scalars["ID"];
};

export type MutationChangeGroupModuleArgs = {
  data: ChangeGroupModuleInput;
  groupId: Scalars["String"];
};

export type MutationGenerateStudentFeedbackArgs = {
  studentId: Scalars["ID"];
  moduleId: Scalars["ID"];
};

export type MutationFixTextGrammaticsArgs = {
  studentId: Scalars["ID"];
  text: Scalars["String"];
};

export type AppMetadata = {
  __typename?: "AppMetadata";
  minimumAppVersion: Scalars["String"];
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  accessToken: Scalars["String"];
  teacher: Teacher;
};

export type Teacher = {
  __typename?: "Teacher";
  id: Scalars["ID"];
  email: Scalars["EmailAddress"];
  groups: Array<Group>;
};

export type LoginResult = {
  __typename?: "LoginResult";
  teacher: Teacher;
};

export type TranslatedString = {
  __typename?: "TranslatedString";
  fi: Scalars["String"];
  en?: Maybe<Scalars["String"]>;
  se?: Maybe<Scalars["String"]>;
};

export enum LearningObjectiveType {
  BEHAVIOUR = "BEHAVIOUR",
  SKILLS = "SKILLS",
  SKILLS_AND_BEHAVIOUR = "SKILLS_AND_BEHAVIOUR",
  NOT_EVALUATED = "NOT_EVALUATED",
}

export type LearningObjective = {
  __typename?: "LearningObjective";
  code: Scalars["ID"];
  label: TranslatedString;
  description: TranslatedString;
  type: LearningObjectiveType;
};

export type Subject = {
  __typename?: "Subject";
  code: Scalars["ID"];
  label: TranslatedString;
  environments: Array<Environment>;
};

export type Environment = {
  __typename?: "Environment";
  code: Scalars["ID"];
  color: Scalars["String"];
  label: TranslatedString;
  subject: Subject;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["ID"];
  name: Scalars["String"];
  students: Array<Student>;
  subject: Subject;
  teacher: Teacher;
  updatedAt: Scalars["DateTime"];
  archived: Scalars["Boolean"];
  currentModule: Module;
  modules: Array<Module>;
};

export type ModuleInfo = {
  __typename?: "ModuleInfo";
  educationLevel: EducationLevel;
  learningObjectiveGroupKey: Scalars["String"];
  label: TranslatedString;
};

export type Module = {
  __typename?: "Module";
  id: Scalars["ID"];
  info: ModuleInfo;
  evaluationCollections: Array<EvaluationCollection>;
  students: Array<Student>;
  group: Group;
};

export type EvaluationCollection = {
  __typename?: "EvaluationCollection";
  id: Scalars["ID"];
  date: Scalars["Date"];
  type: Scalars["String"];
  environment: Environment;
  description?: Maybe<Scalars["String"]>;
  evaluations: Array<Evaluation>;
  module: Module;
  learningObjectives: Array<LearningObjective>;
};

export type Evaluation = {
  __typename?: "Evaluation";
  id: Scalars["ID"];
  student: Student;
  wasPresent: Scalars["Boolean"];
  skillsRating?: Maybe<Scalars["Int"]>;
  behaviourRating?: Maybe<Scalars["Int"]>;
  notes?: Maybe<Scalars["String"]>;
  isStellar: Scalars["Boolean"];
  collection: EvaluationCollection;
};

export type Student = {
  __typename?: "Student";
  id: Scalars["ID"];
  name: Scalars["String"];
  group: Group;
  currentModuleEvaluations: Array<Evaluation>;
};

export enum EducationLevel {
  PRIMARY_FIRST = "PRIMARY_FIRST",
  PRIMARY_SECOND = "PRIMARY_SECOND",
  PRIMARY_THIRD = "PRIMARY_THIRD",
  PRIMARY_FOURTH = "PRIMARY_FOURTH",
  PRIMARY_FIFTH = "PRIMARY_FIFTH",
  PRIMARY_SIXTH = "PRIMARY_SIXTH",
  PRIMARY_SEVENTH = "PRIMARY_SEVENTH",
  PRIMARY_EIGHTH = "PRIMARY_EIGHTH",
  PRIMARY_NINTH = "PRIMARY_NINTH",
  HIGH_SCHOOL = "HIGH_SCHOOL",
  VOCATIONAL = "VOCATIONAL",
}

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type CreateGroupInput = {
  name: Scalars["String"];
  teacherId: Scalars["ID"];
  subjectCode: Scalars["ID"];
  educationLevel: EducationLevel;
  learningObjectiveGroupKey: Scalars["String"];
  students: Array<CreateStudentInput>;
};

export type UpdateGroupInput = {
  name?: InputMaybe<Scalars["String"]>;
  archived?: InputMaybe<Scalars["Boolean"]>;
};

export type CreateStudentInput = {
  name: Scalars["String"];
};

export type UpdateStudentInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type CreateCollectionInput = {
  date: Scalars["Date"];
  type?: InputMaybe<Scalars["String"]>;
  environmentCode: Scalars["ID"];
  description?: InputMaybe<Scalars["String"]>;
  learningObjectiveCodes: Array<Scalars["ID"]>;
  evaluations?: InputMaybe<Array<CreateEvaluationInput>>;
};

export type UpdateCollectionInput = {
  date?: InputMaybe<Scalars["Date"]>;
  type?: InputMaybe<Scalars["String"]>;
  environmentCode?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  learningObjectiveCodes?: InputMaybe<Array<Scalars["ID"]>>;
  evaluations?: InputMaybe<Array<UpdateEvaluationInput>>;
};

export type CreateEvaluationInput = {
  studentId: Scalars["ID"];
  wasPresent: Scalars["Boolean"];
  skillsRating?: InputMaybe<Scalars["Int"]>;
  behaviourRating?: InputMaybe<Scalars["Int"]>;
  notes?: InputMaybe<Scalars["String"]>;
  isStellar?: InputMaybe<Scalars["Boolean"]>;
};

export type UpdateEvaluationInput = {
  id: Scalars["ID"];
  wasPresent?: InputMaybe<Scalars["Boolean"]>;
  skillsRating?: InputMaybe<Scalars["Int"]>;
  behaviourRating?: InputMaybe<Scalars["Int"]>;
  notes?: InputMaybe<Scalars["String"]>;
  isStellar?: InputMaybe<Scalars["Boolean"]>;
};

export type ChangeGroupModuleInput = {
  newEducationLevel: EducationLevel;
  newLearningObjectiveGroupKey: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  AppMetadata: ResolverTypeWrapper<AppMetadata>;
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, "teacher"> & { teacher: ResolversTypes["Teacher"] }>;
  Teacher: ResolverTypeWrapper<UserInfoPrisma>;
  LoginResult: ResolverTypeWrapper<Omit<LoginResult, "teacher"> & { teacher: ResolversTypes["Teacher"] }>;
  TranslatedString: ResolverTypeWrapper<TranslatedString>;
  LearningObjectiveType: LearningObjectiveType;
  LearningObjective: ResolverTypeWrapper<LearningObjective>;
  Subject: ResolverTypeWrapper<SubjectMinimalPrisma>;
  Environment: ResolverTypeWrapper<EnvironmentPrisma>;
  Group: ResolverTypeWrapper<GroupPrisma>;
  ModuleInfo: ResolverTypeWrapper<ModuleInfo>;
  Module: ResolverTypeWrapper<ModulePrisma>;
  EvaluationCollection: ResolverTypeWrapper<EvaluationCollectionPrisma>;
  Evaluation: ResolverTypeWrapper<EvaluationPrisma>;
  Student: ResolverTypeWrapper<StudentPrisma>;
  EducationLevel: EducationLevel;
  CreateTeacherInput: CreateTeacherInput;
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  CreateStudentInput: CreateStudentInput;
  UpdateStudentInput: UpdateStudentInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CreateEvaluationInput: CreateEvaluationInput;
  UpdateEvaluationInput: UpdateEvaluationInput;
  ChangeGroupModuleInput: ChangeGroupModuleInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  EmailAddress: Scalars["EmailAddress"];
  Query: {};
  ID: Scalars["ID"];
  Mutation: {};
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  Int: Scalars["Int"];
  AppMetadata: AppMetadata;
  AuthPayload: Omit<AuthPayload, "teacher"> & { teacher: ResolversParentTypes["Teacher"] };
  Teacher: UserInfoPrisma;
  LoginResult: Omit<LoginResult, "teacher"> & { teacher: ResolversParentTypes["Teacher"] };
  TranslatedString: TranslatedString;
  LearningObjective: LearningObjective;
  Subject: SubjectMinimalPrisma;
  Environment: EnvironmentPrisma;
  Group: GroupPrisma;
  ModuleInfo: ModuleInfo;
  Module: ModulePrisma;
  EvaluationCollection: EvaluationCollectionPrisma;
  Evaluation: EvaluationPrisma;
  Student: StudentPrisma;
  CreateTeacherInput: CreateTeacherInput;
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  CreateStudentInput: CreateStudentInput;
  UpdateStudentInput: UpdateStudentInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CreateEvaluationInput: CreateEvaluationInput;
  UpdateEvaluationInput: UpdateEvaluationInput;
  ChangeGroupModuleInput: ChangeGroupModuleInput;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type QueryResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
  getAppMetadata?: Resolver<ResolversTypes["AppMetadata"], ParentType, ContextType>;
  getCurrentUser?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  getTeacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType, RequireFields<QueryGetTeacherArgs, "id">>;
  getTeachers?: Resolver<Array<ResolversTypes["Teacher"]>, ParentType, ContextType>;
  getGroups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType, RequireFields<QueryGetGroupsArgs, "teacherId">>;
  getGroup?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<QueryGetGroupArgs, "id">>;
  getCollection?: Resolver<ResolversTypes["EvaluationCollection"], ParentType, ContextType, RequireFields<QueryGetCollectionArgs, "id">>;
  getStudent?: Resolver<ResolversTypes["Student"], ParentType, ContextType, RequireFields<QueryGetStudentArgs, "id">>;
  getEvaluation?: Resolver<ResolversTypes["Evaluation"], ParentType, ContextType, RequireFields<QueryGetEvaluationArgs, "id">>;
};

export type MutationResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = {
  register?: Resolver<ResolversTypes["AuthPayload"], ParentType, ContextType, RequireFields<MutationRegisterArgs, "data">>;
  login?: Resolver<ResolversTypes["AuthPayload"], ParentType, ContextType, RequireFields<MutationLoginArgs, "email" | "password">>;
  logout?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["AuthPayload"], ParentType, ContextType>;
  createGroup?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, "data">>;
  createCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCollectionArgs, "data" | "moduleId">
  >;
  createStudent?: Resolver<ResolversTypes["Student"], ParentType, ContextType, RequireFields<MutationCreateStudentArgs, "data" | "moduleId">>;
  updateEvaluations?: Resolver<ResolversTypes["Int"], ParentType, ContextType, RequireFields<MutationUpdateEvaluationsArgs, "data" | "collectionId">>;
  updateCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCollectionArgs, "data" | "collectionId">
  >;
  updateStudent?: Resolver<ResolversTypes["Student"], ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, "data" | "studentId">>;
  updateGroup?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, "data" | "groupId">>;
  updateEvaluation?: Resolver<ResolversTypes["Evaluation"], ParentType, ContextType, RequireFields<MutationUpdateEvaluationArgs, "data">>;
  deleteStudent?: Resolver<ResolversTypes["Student"], ParentType, ContextType, RequireFields<MutationDeleteStudentArgs, "studentId">>;
  deleteGroup?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, "groupId">>;
  deleteCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCollectionArgs, "collectionId">
  >;
  changeGroupModule?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationChangeGroupModuleArgs, "data" | "groupId">>;
  generateStudentFeedback?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationGenerateStudentFeedbackArgs, "studentId" | "moduleId">
  >;
  fixTextGrammatics?: Resolver<ResolversTypes["String"], ParentType, ContextType, RequireFields<MutationFixTextGrammaticsArgs, "studentId" | "text">>;
};

export type AppMetadataResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["AppMetadata"] = ResolversParentTypes["AppMetadata"]
> = {
  minimumAppVersion?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeacherResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Teacher"] = ResolversParentTypes["Teacher"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["EmailAddress"], ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes["Group"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["LoginResult"] = ResolversParentTypes["LoginResult"]
> = {
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TranslatedStringResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["TranslatedString"] = ResolversParentTypes["TranslatedString"]
> = {
  fi?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  en?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  se?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LearningObjectiveResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["LearningObjective"] = ResolversParentTypes["LearningObjective"]
> = {
  code?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["TranslatedString"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["TranslatedString"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["LearningObjectiveType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubjectResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Subject"] = ResolversParentTypes["Subject"]> = {
  code?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["TranslatedString"], ParentType, ContextType>;
  environments?: Resolver<Array<ResolversTypes["Environment"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnvironmentResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Environment"] = ResolversParentTypes["Environment"]
> = {
  code?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  color?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["TranslatedString"], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes["Subject"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes["Student"]>, ParentType, ContextType>;
  subject?: Resolver<ResolversTypes["Subject"], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  archived?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  currentModule?: Resolver<ResolversTypes["Module"], ParentType, ContextType>;
  modules?: Resolver<Array<ResolversTypes["Module"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModuleInfoResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["ModuleInfo"] = ResolversParentTypes["ModuleInfo"]
> = {
  educationLevel?: Resolver<ResolversTypes["EducationLevel"], ParentType, ContextType>;
  learningObjectiveGroupKey?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["TranslatedString"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModuleResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Module"] = ResolversParentTypes["Module"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  info?: Resolver<ResolversTypes["ModuleInfo"], ParentType, ContextType>;
  evaluationCollections?: Resolver<Array<ResolversTypes["EvaluationCollection"]>, ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes["Student"]>, ParentType, ContextType>;
  group?: Resolver<ResolversTypes["Group"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EvaluationCollectionResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["EvaluationCollection"] = ResolversParentTypes["EvaluationCollection"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes["Environment"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  evaluations?: Resolver<Array<ResolversTypes["Evaluation"]>, ParentType, ContextType>;
  module?: Resolver<ResolversTypes["Module"], ParentType, ContextType>;
  learningObjectives?: Resolver<Array<ResolversTypes["LearningObjective"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EvaluationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Evaluation"] = ResolversParentTypes["Evaluation"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  student?: Resolver<ResolversTypes["Student"], ParentType, ContextType>;
  wasPresent?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  skillsRating?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  behaviourRating?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isStellar?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes["EvaluationCollection"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Student"] = ResolversParentTypes["Student"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  group?: Resolver<ResolversTypes["Group"], ParentType, ContextType>;
  currentModuleEvaluations?: Resolver<Array<ResolversTypes["Evaluation"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomContext> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AppMetadata?: AppMetadataResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  TranslatedString?: TranslatedStringResolvers<ContextType>;
  LearningObjective?: LearningObjectiveResolvers<ContextType>;
  Subject?: SubjectResolvers<ContextType>;
  Environment?: EnvironmentResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  ModuleInfo?: ModuleInfoResolvers<ContextType>;
  Module?: ModuleResolvers<ContextType>;
  EvaluationCollection?: EvaluationCollectionResolvers<ContextType>;
  Evaluation?: EvaluationResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
};
