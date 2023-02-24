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
  Date: Date;
  EmailAddress: string;
};

export type Class = {
  __typename?: "Class";
  evalationCollections?: Maybe<Array<EvaluationCollection>>;
  evaluationTypes?: Maybe<Array<Scalars["String"]>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  students?: Maybe<Array<Student>>;
  teacher: Teacher;
};

export type CreateClassInput = {
  name: Scalars["String"];
  teacherId: Scalars["ID"];
};

export type CreateCollectionInput = {
  date: Scalars["Date"];
  description?: InputMaybe<Scalars["String"]>;
  evaluations?: InputMaybe<Array<CreateEvaluationInput>>;
  type: Scalars["String"];
};

export type CreateEvaluationInput = {
  behaviourRating?: InputMaybe<Scalars["Int"]>;
  notes?: InputMaybe<Scalars["String"]>;
  skillsRating?: InputMaybe<Scalars["Int"]>;
  studentId: Scalars["ID"];
};

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  name: Scalars["String"];
};

export type Evaluation = {
  __typename?: "Evaluation";
  behaviourRating?: Maybe<Scalars["Int"]>;
  collection: EvaluationCollection;
  id: Scalars["ID"];
  notes?: Maybe<Scalars["String"]>;
  skillsRating?: Maybe<Scalars["Int"]>;
  student: Student;
};

export type EvaluationCollection = {
  __typename?: "EvaluationCollection";
  class: Class;
  date: Scalars["Date"];
  description?: Maybe<Scalars["String"]>;
  evaluations?: Maybe<Array<Evaluation>>;
  id: Scalars["ID"];
  type: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  addEvaluations: Scalars["Int"];
  createClass: Class;
  createCollection: EvaluationCollection;
  createTeacher: Teacher;
};

export type MutationAddEvaluationsArgs = {
  collectionId: Scalars["ID"];
  data: Array<CreateEvaluationInput>;
};

export type MutationCreateClassArgs = {
  data: CreateClassInput;
};

export type MutationCreateCollectionArgs = {
  classId: Scalars["ID"];
  data: CreateCollectionInput;
};

export type MutationCreateTeacherArgs = {
  data: CreateTeacherInput;
};

export type Query = {
  __typename?: "Query";
  getClasses?: Maybe<Array<Class>>;
  getTeacher: Teacher;
};

export type QueryGetClassesArgs = {
  teacherId: Scalars["ID"];
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
  classes?: Maybe<Array<Class>>;
  email: Scalars["EmailAddress"];
  id: Scalars["ID"];
  name: Scalars["String"];
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
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Class: ResolverTypeWrapper<ClassPrisma>;
  CreateClassInput: CreateClassInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateEvaluationInput: CreateEvaluationInput;
  CreateTeacherInput: CreateTeacherInput;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  Evaluation: ResolverTypeWrapper<EvaluationPrisma>;
  EvaluationCollection: ResolverTypeWrapper<EvaluationCollectionPrisma>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Student: ResolverTypeWrapper<StudentPrisma>;
  Teacher: ResolverTypeWrapper<TeacherPrisma>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Class: ClassPrisma;
  CreateClassInput: CreateClassInput;
  CreateCollectionInput: CreateCollectionInput;
  CreateEvaluationInput: CreateEvaluationInput;
  CreateTeacherInput: CreateTeacherInput;
  Date: Scalars["Date"];
  EmailAddress: Scalars["EmailAddress"];
  Evaluation: EvaluationPrisma;
  EvaluationCollection: EvaluationCollectionPrisma;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Mutation: {};
  Query: {};
  String: Scalars["String"];
  Student: StudentPrisma;
  Teacher: TeacherPrisma;
};

export type ClassResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Class"] = ResolversParentTypes["Class"]
> = {
  evalationCollections?: Resolver<
    Maybe<Array<ResolversTypes["EvaluationCollection"]>>,
    ParentType,
    ContextType
  >;
  evaluationTypes?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  students?: Resolver<
    Maybe<Array<ResolversTypes["Student"]>>,
    ParentType,
    ContextType
  >;
  teacher?: Resolver<ResolversTypes["Teacher"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["EmailAddress"], any> {
  name: "EmailAddress";
}

export type EvaluationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Evaluation"] = ResolversParentTypes["Evaluation"]
> = {
  behaviourRating?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  collection?: Resolver<
    ResolversTypes["EvaluationCollection"],
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  skillsRating?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  student?: Resolver<ResolversTypes["Student"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EvaluationCollectionResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["EvaluationCollection"] = ResolversParentTypes["EvaluationCollection"]
> = {
  class?: Resolver<ResolversTypes["Class"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  evaluations?: Resolver<
    Maybe<Array<ResolversTypes["Evaluation"]>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addEvaluations?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<MutationAddEvaluationsArgs, "collectionId" | "data">
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
    RequireFields<MutationCreateCollectionArgs, "classId" | "data">
  >;
  createTeacher?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTeacherArgs, "data">
  >;
};

export type QueryResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getClasses?: Resolver<
    Maybe<Array<ResolversTypes["Class"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetClassesArgs, "teacherId">
  >;
  getTeacher?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    RequireFields<QueryGetTeacherArgs, "id">
  >;
};

export type StudentResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Student"] = ResolversParentTypes["Student"]
> = {
  class?: Resolver<ResolversTypes["Class"], ParentType, ContextType>;
  evaluations?: Resolver<
    Maybe<Array<ResolversTypes["Evaluation"]>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeacherResolvers<
  ContextType = CustomContext,
  ParentType extends ResolversParentTypes["Teacher"] = ResolversParentTypes["Teacher"]
> = {
  classes?: Resolver<
    Maybe<Array<ResolversTypes["Class"]>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["EmailAddress"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = CustomContext> = {
  Class?: ClassResolvers<ContextType>;
  Date?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Evaluation?: EvaluationResolvers<ContextType>;
  EvaluationCollection?: EvaluationCollectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
};
