/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { UserInfo as UserInfoPrisma, CustomContext } from "./contextTypes";
import {
  EvaluationCollection as EvaluationCollectionPrisma,
  Evaluation as EvaluationPrisma,
  Group as GroupPrisma,
  Student as StudentPrisma,
  ClassYear as ClassYearPrisma,
} from "@prisma/client";
import { Subject as SubjectPrisma, Environment as EnvironmentPrisma } from "./subject";
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
  EmailAddress: string;
};

export type Query = {
  __typename?: "Query";
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
  refreshToken: AuthPayload;
  createGroup: Group;
  createCollection: EvaluationCollection;
  createStudent: Student;
  updateEvaluations: Scalars["Int"];
  updateCollection: EvaluationCollection;
  updateStudent: Student;
  updateGroup: Group;
  changeGroupYear: Group;
  updateEvaluation: Evaluation;
  deleteStudent: Scalars["Boolean"];
  deleteGroup: Scalars["Boolean"];
  deleteCollection: Scalars["Boolean"];
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
  classYearId: Scalars["ID"];
};

export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  classYearId: Scalars["ID"];
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

export type MutationChangeGroupYearArgs = {
  newYearCode: ClassYearCode;
  groupId: Scalars["ID"];
  transferEvaluations?: InputMaybe<Scalars["Boolean"]>;
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

export enum LearningObjectiveType {
  BEHAVIOUR = "BEHAVIOUR",
  SKILLS = "SKILLS",
  NOT_EVALUATED = "NOT_EVALUATED",
}

export type LearningObjective = {
  __typename?: "LearningObjective";
  code: Scalars["ID"];
  label: Scalars["String"];
  description: Scalars["String"];
  type: LearningObjectiveType;
};

export type Subject = {
  __typename?: "Subject";
  code: Scalars["ID"];
  label: Scalars["String"];
  environments: Array<Environment>;
};

export type Environment = {
  __typename?: "Environment";
  code: Scalars["ID"];
  color: Scalars["String"];
  label: Scalars["String"];
  subject: Subject;
};

export type Group = {
  __typename?: "Group";
  id: Scalars["ID"];
  name: Scalars["String"];
  students: Array<Student>;
  subject: Subject;
  teacher: Teacher;
  updatedAt: Scalars["Date"];
  currentClassYear: ClassYear;
  classYears: Array<ClassYear>;
};

export type ClassYearInfo = {
  __typename?: "ClassYearInfo";
  code: ClassYearCode;
  label: Scalars["String"];
};

export type ClassYear = {
  __typename?: "ClassYear";
  id: Scalars["ID"];
  info: ClassYearInfo;
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
  classYear: ClassYear;
  learningObjectives: Array<LearningObjective>;
};

export type Evaluation = {
  __typename?: "Evaluation";
  id: Scalars["ID"];
  student: Student;
  wasPresent: Scalars["Boolean"];
  skillsRating?: Maybe<Rating>;
  behaviourRating?: Maybe<Rating>;
  notes?: Maybe<Scalars["String"]>;
  isStellar: Scalars["Boolean"];
  collection: EvaluationCollection;
};

export type Student = {
  __typename?: "Student";
  id: Scalars["ID"];
  name: Scalars["String"];
  group: Group;
  currentClassEvaluations: Array<Evaluation>;
};

export enum Rating {
  POOR = "POOR",
  FAIR = "FAIR",
  GOOD = "GOOD",
  GREAT = "GREAT",
  EXCELLENT = "EXCELLENT",
}

export enum ClassYearCode {
  PRIMARY_FIRST = "PRIMARY_FIRST",
  PRIMARY_SECOND = "PRIMARY_SECOND",
  PRIMARY_THIRD = "PRIMARY_THIRD",
  PRIMARY_FOURTH = "PRIMARY_FOURTH",
  PRIMARY_FIFTH = "PRIMARY_FIFTH",
  PRIMARY_SIXTH = "PRIMARY_SIXTH",
  PRIMARY_SEVENTH = "PRIMARY_SEVENTH",
  PRIMARY_EIGHTH = "PRIMARY_EIGHTH",
  PRIMARY_NINTH = "PRIMARY_NINTH",
  HIGH_SCHOOL_FIRST = "HIGH_SCHOOL_FIRST",
  HIGH_SCHOOL_SECOND = "HIGH_SCHOOL_SECOND",
  HIGH_SCHOOL_THIRD = "HIGH_SCHOOL_THIRD",
  VOCATIONAL_FIRST = "VOCATIONAL_FIRST",
  VOCATIONAL_SECOND = "VOCATIONAL_SECOND",
  VOCATIONAL_THIRD = "VOCATIONAL_THIRD",
  VOCATIONAL_FOURTH = "VOCATIONAL_FOURTH",
}

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type CreateGroupInput = {
  name: Scalars["String"];
  teacherId: Scalars["ID"];
  subjectCode: Scalars["ID"];
  yearCode: ClassYearCode;
  students: Array<CreateStudentInput>;
};

export type UpdateGroupInput = {
  name?: InputMaybe<Scalars["String"]>;
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
  skillsRating?: InputMaybe<Rating>;
  behaviourRating?: InputMaybe<Rating>;
  notes?: InputMaybe<Scalars["String"]>;
  isStellar?: InputMaybe<Scalars["Boolean"]>;
};

export type UpdateEvaluationInput = {
  id: Scalars["ID"];
  wasPresent?: InputMaybe<Scalars["Boolean"]>;
  skillsRating?: InputMaybe<Rating>;
  behaviourRating?: InputMaybe<Rating>;
  notes?: InputMaybe<Scalars["String"]>;
  isStellar?: InputMaybe<Scalars["Boolean"]>;
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
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, "teacher"> & { teacher: ResolversTypes["Teacher"] }>;
  Teacher: ResolverTypeWrapper<UserInfoPrisma>;
  LoginResult: ResolverTypeWrapper<Omit<LoginResult, "teacher"> & { teacher: ResolversTypes["Teacher"] }>;
  LearningObjectiveType: LearningObjectiveType;
  LearningObjective: ResolverTypeWrapper<LearningObjective>;
  Subject: ResolverTypeWrapper<SubjectPrisma>;
  Environment: ResolverTypeWrapper<EnvironmentPrisma>;
  Group: ResolverTypeWrapper<GroupPrisma>;
  ClassYearInfo: ResolverTypeWrapper<ClassYearInfo>;
  ClassYear: ResolverTypeWrapper<ClassYearPrisma>;
  EvaluationCollection: ResolverTypeWrapper<EvaluationCollectionPrisma>;
  Evaluation: ResolverTypeWrapper<EvaluationPrisma>;
  Student: ResolverTypeWrapper<StudentPrisma>;
  Rating: Rating;
  ClassYearCode: ClassYearCode;
  CreateTeacherInput: CreateTeacherInput;
  CreateGroupInput: CreateGroupInput;
  UpdateGroupInput: UpdateGroupInput;
  CreateStudentInput: CreateStudentInput;
  UpdateStudentInput: UpdateStudentInput;
  CreateCollectionInput: CreateCollectionInput;
  UpdateCollectionInput: UpdateCollectionInput;
  CreateEvaluationInput: CreateEvaluationInput;
  UpdateEvaluationInput: UpdateEvaluationInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars["Date"];
  EmailAddress: Scalars["EmailAddress"];
  Query: {};
  ID: Scalars["ID"];
  Mutation: {};
  String: Scalars["String"];
  Int: Scalars["Int"];
  Boolean: Scalars["Boolean"];
  AuthPayload: Omit<AuthPayload, "teacher"> & { teacher: ResolversParentTypes["Teacher"] };
  Teacher: UserInfoPrisma;
  LoginResult: Omit<LoginResult, "teacher"> & { teacher: ResolversParentTypes["Teacher"] };
  LearningObjective: LearningObjective;
  Subject: SubjectPrisma;
  Environment: EnvironmentPrisma;
  Group: GroupPrisma;
  ClassYearInfo: ClassYearInfo;
  ClassYear: ClassYearPrisma;
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
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type QueryResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
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
  refreshToken?: Resolver<ResolversTypes["AuthPayload"], ParentType, ContextType>;
  createGroup?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationCreateGroupArgs, "data">>;
  createCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCollectionArgs, "data" | "classYearId">
  >;
  createStudent?: Resolver<ResolversTypes["Student"], ParentType, ContextType, RequireFields<MutationCreateStudentArgs, "data" | "classYearId">>;
  updateEvaluations?: Resolver<ResolversTypes["Int"], ParentType, ContextType, RequireFields<MutationUpdateEvaluationsArgs, "data" | "collectionId">>;
  updateCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCollectionArgs, "data" | "collectionId">
  >;
  updateStudent?: Resolver<ResolversTypes["Student"], ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, "data" | "studentId">>;
  updateGroup?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationUpdateGroupArgs, "data" | "groupId">>;
  changeGroupYear?: Resolver<ResolversTypes["Group"], ParentType, ContextType, RequireFields<MutationChangeGroupYearArgs, "newYearCode" | "groupId">>;
  updateEvaluation?: Resolver<ResolversTypes["Evaluation"], ParentType, ContextType, RequireFields<MutationUpdateEvaluationArgs, "data">>;
  deleteStudent?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeleteStudentArgs, "studentId">>;
  deleteGroup?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeleteGroupArgs, "groupId">>;
  deleteCollection?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType, RequireFields<MutationDeleteCollectionArgs, "collectionId">>;
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

export type LearningObjectiveResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["LearningObjective"] = ResolversParentTypes["LearningObjective"]
> = {
  code?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["LearningObjectiveType"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubjectResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Subject"] = ResolversParentTypes["Subject"]> = {
  code?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  environments?: Resolver<Array<ResolversTypes["Environment"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnvironmentResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Environment"] = ResolversParentTypes["Environment"]
> = {
  code?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  color?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes["Subject"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Group"] = ResolversParentTypes["Group"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  students?: Resolver<Array<ResolversTypes["Student"]>, ParentType, ContextType>;
  subject?: Resolver<ResolversTypes["Subject"], ParentType, ContextType>;
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  currentClassYear?: Resolver<ResolversTypes["ClassYear"], ParentType, ContextType>;
  classYears?: Resolver<Array<ResolversTypes["ClassYear"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassYearInfoResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["ClassYearInfo"] = ResolversParentTypes["ClassYearInfo"]
> = {
  code?: Resolver<ResolversTypes["ClassYearCode"], ParentType, ContextType>;
  label?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassYearResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["ClassYear"] = ResolversParentTypes["ClassYear"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  info?: Resolver<ResolversTypes["ClassYearInfo"], ParentType, ContextType>;
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
  classYear?: Resolver<ResolversTypes["ClassYear"], ParentType, ContextType>;
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
  skillsRating?: Resolver<Maybe<ResolversTypes["Rating"]>, ParentType, ContextType>;
  behaviourRating?: Resolver<Maybe<ResolversTypes["Rating"]>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isStellar?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  collection?: Resolver<ResolversTypes["EvaluationCollection"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<ContextType = CustomContext, ParentType extends ResolversParentTypes["Student"] = ResolversParentTypes["Student"]> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  group?: Resolver<ResolversTypes["Group"], ParentType, ContextType>;
  currentClassEvaluations?: Resolver<Array<ResolversTypes["Evaluation"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomContext> = {
  Date?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  LearningObjective?: LearningObjectiveResolvers<ContextType>;
  Subject?: SubjectResolvers<ContextType>;
  Environment?: EnvironmentResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  ClassYearInfo?: ClassYearInfoResolvers<ContextType>;
  ClassYear?: ClassYearResolvers<ContextType>;
  EvaluationCollection?: EvaluationCollectionResolvers<ContextType>;
  Evaluation?: EvaluationResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
};