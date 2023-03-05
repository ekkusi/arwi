/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import {
  Teacher as TeacherPrisma,
  EvaluationCollection as EvaluationCollectionPrisma,
  Evaluation as EvaluationPrisma,
  Class as ClassPrisma,
  Student as StudentPrisma,
} from "@prisma/client";
import { CustomContext } from "./contextTypes";
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
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
  getClasses: Array<Class>;
  getClass: Class;
  getCollection: EvaluationCollection;
};

export type QueryGetTeacherArgs = {
  id: Scalars["ID"];
};

export type QueryGetClassesArgs = {
  teacherId: Scalars["ID"];
};

export type QueryGetClassArgs = {
  id: Scalars["ID"];
};

export type QueryGetCollectionArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: Teacher;
  login: LoginResult;
  createClass: Class;
  createCollection: EvaluationCollection;
  updateEvaluations: Scalars["Int"];
};

export type MutationRegisterArgs = {
  data: CreateTeacherInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateClassArgs = {
  data: CreateClassInput;
};

export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
  classId: Scalars["ID"];
};

export type MutationUpdateEvaluationsArgs = {
  data: Array<UpdateEvaluationInput>;
  collectionId: Scalars["ID"];
};

export type Teacher = {
  __typename?: "Teacher";
  id: Scalars["ID"];
  email: Scalars["EmailAddress"];
  classes: Array<Class>;
};

export type LoginResult = {
  __typename?: "LoginResult";
  teacher: Teacher;
};

export type Class = {
  __typename?: "Class";
  id: Scalars["ID"];
  name: Scalars["String"];
  evaluationCollections: Array<EvaluationCollection>;
  students: Array<Student>;
  evaluationTypes?: Maybe<Array<Scalars["String"]>>;
  teacher: Teacher;
};

export type EvaluationCollection = {
  __typename?: "EvaluationCollection";
  id: Scalars["ID"];
  date: Scalars["Date"];
  type: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  evaluations: Array<Evaluation>;
  class: Class;
};

export enum Rating {
  Poor = "POOR",
  Fair = "FAIR",
  Good = "GOOD",
  Great = "GREAT",
  Excellent = "EXCELLENT",
}

export type Evaluation = {
  __typename?: "Evaluation";
  id: Scalars["ID"];
  student: Student;
  wasPresent: Scalars["Boolean"];
  skillsRating?: Maybe<Rating>;
  behaviourRating?: Maybe<Rating>;
  notes?: Maybe<Scalars["String"]>;
  collection: EvaluationCollection;
};

export type Student = {
  __typename?: "Student";
  id: Scalars["ID"];
  name: Scalars["String"];
  class: Class;
  evaluations: Array<Evaluation>;
};

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type CreateClassInput = {
  name: Scalars["String"];
  teacherId: Scalars["ID"];
  students?: InputMaybe<Array<CreateStudentInput>>;
};

export type CreateStudentInput = {
  name: Scalars["String"];
};

export type CreateCollectionInput = {
  date: Scalars["Date"];
  type: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  evaluations?: InputMaybe<Array<CreateEvaluationInput>>;
};

export type CreateEvaluationInput = {
  studentId: Scalars["ID"];
  wasPresent: Scalars["Boolean"];
  skillsRating?: InputMaybe<Rating>;
  behaviourRating?: InputMaybe<Rating>;
  notes?: InputMaybe<Scalars["String"]>;
};

export type UpdateEvaluationInput = {
  id: Scalars["ID"];
  wasPresent: Scalars["Boolean"];
  skillsRating?: InputMaybe<Rating>;
  behaviourRating?: InputMaybe<Rating>;
  notes?: InputMaybe<Scalars["String"]>;
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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
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
  Teacher: ResolverTypeWrapper<TeacherPrisma>;
  LoginResult: ResolverTypeWrapper<
    Omit<LoginResult, "teacher"> & { teacher: ResolversTypes["Teacher"] }
  >;
  Class: ResolverTypeWrapper<ClassPrisma>;
  EvaluationCollection: ResolverTypeWrapper<EvaluationCollectionPrisma>;
  Rating: Rating;
  Evaluation: ResolverTypeWrapper<EvaluationPrisma>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Student: ResolverTypeWrapper<StudentPrisma>;
  CreateTeacherInput: CreateTeacherInput;
  CreateClassInput: CreateClassInput;
  CreateStudentInput: CreateStudentInput;
  CreateCollectionInput: CreateCollectionInput;
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
  Teacher: TeacherPrisma;
  LoginResult: Omit<LoginResult, "teacher"> & {
    teacher: ResolversParentTypes["Teacher"];
  };
  Class: ClassPrisma;
  EvaluationCollection: EvaluationCollectionPrisma;
  Evaluation: EvaluationPrisma;
  Boolean: Scalars["Boolean"];
  Student: StudentPrisma;
  CreateTeacherInput: CreateTeacherInput;
  CreateClassInput: CreateClassInput;
  CreateStudentInput: CreateStudentInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateEvaluationInput: CreateEvaluationInput;
  UpdateEvaluationInput: UpdateEvaluationInput;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type QueryResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getTeacher?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    RequireFields<QueryGetTeacherArgs, "id">
  >;
  getTeachers?: Resolver<
    Array<ResolversTypes["Teacher"]>,
    ParentType,
    ContextType
  >;
  getClasses?: Resolver<
    Array<ResolversTypes["Class"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetClassesArgs, "teacherId">
  >;
  getClass?: Resolver<
    ResolversTypes["Class"],
    ParentType,
    ContextType,
    RequireFields<QueryGetClassArgs, "id">
  >;
  getCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<QueryGetCollectionArgs, "id">
  >;
};

export type MutationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  register?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "data">
  >;
  login?: Resolver<
    ResolversTypes["LoginResult"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  createClass?: Resolver<
    ResolversTypes["Class"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateClassArgs, "data">
  >;
  createCollection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCollectionArgs, "data" | "classId">
  >;
  updateEvaluations?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateEvaluationsArgs, "data" | "collectionId">
  >;
};

export type TeacherResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Teacher"] = ResolversParentTypes["Teacher"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["EmailAddress"], ParentType, ContextType>;
  classes?: Resolver<Array<ResolversTypes["Class"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["LoginResult"] = ResolversParentTypes["LoginResult"]
> = {
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Class"] = ResolversParentTypes["Class"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  evaluationCollections?: Resolver<
    Array<ResolversTypes["EvaluationCollection"]>,
    ParentType,
    ContextType
  >;
  students?: Resolver<
    Array<ResolversTypes["Student"]>,
    ParentType,
    ContextType
  >;
  evaluationTypes?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EvaluationCollectionResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["EvaluationCollection"] = ResolversParentTypes["EvaluationCollection"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  evaluations?: Resolver<
    Array<ResolversTypes["Evaluation"]>,
    ParentType,
    ContextType
  >;
  class?: Resolver<ResolversTypes["Class"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EvaluationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Evaluation"] = ResolversParentTypes["Evaluation"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  student?: Resolver<ResolversTypes["Student"], ParentType, ContextType>;
  wasPresent?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  skillsRating?: Resolver<
    Maybe<ResolversTypes["Rating"]>,
    ParentType,
    ContextType
  >;
  behaviourRating?: Resolver<
    Maybe<ResolversTypes["Rating"]>,
    ParentType,
    ContextType
  >;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  collection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudentResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Student"] = ResolversParentTypes["Student"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  class?: Resolver<ResolversTypes["Class"], ParentType, ContextType>;
  evaluations?: Resolver<
    Array<ResolversTypes["Evaluation"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomContext> = {
  Date?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  Class?: ClassResolvers<ContextType>;
  EvaluationCollection?: EvaluationCollectionResolvers<ContextType>;
  Evaluation?: EvaluationResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
};