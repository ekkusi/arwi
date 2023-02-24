/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
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
  Date: string;
  EmailAddress: string;
};

export type Class = {
  __typename?: "Class";
  id: Scalars["ID"];
  lessonTypes?: Maybe<Array<Scalars["String"]>>;
  lessons?: Maybe<Array<Lesson>>;
  name: Scalars["String"];
  students?: Maybe<Array<Student>>;
  teacher: Teacher;
};

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  name: Scalars["String"];
};

export type Evaluation = {
  __typename?: "Evaluation";
  behaviourRating?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  lesson: Lesson;
  notes?: Maybe<Scalars["String"]>;
  skillsRating?: Maybe<Scalars["Int"]>;
  student: Student;
};

export type Lesson = {
  __typename?: "Lesson";
  class: Class;
  date: Scalars["Date"];
  description?: Maybe<Scalars["String"]>;
  evaluations?: Maybe<Array<Evaluation>>;
  id: Scalars["ID"];
  type: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTeacher: Teacher;
};

export type MutationCreateTeacherArgs = {
  data: CreateTeacherInput;
};

export type Query = {
  __typename?: "Query";
  getClasses?: Maybe<Array<Class>>;
  getTeacher: Teacher;
  greetings: Scalars["String"];
};

export type QueryGetClassesArgs = {
  teacherID: Scalars["ID"];
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
  class?: Maybe<Array<Class>>;
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
  Class: ResolverTypeWrapper<Class>;
  CreateTeacherInput: CreateTeacherInput;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  EmailAddress: ResolverTypeWrapper<Scalars["EmailAddress"]>;
  Evaluation: ResolverTypeWrapper<Evaluation>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Lesson: ResolverTypeWrapper<Lesson>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Student: ResolverTypeWrapper<Student>;
  Teacher: ResolverTypeWrapper<Teacher>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  Class: Class;
  CreateTeacherInput: CreateTeacherInput;
  Date: Scalars["Date"];
  EmailAddress: Scalars["EmailAddress"];
  Evaluation: Evaluation;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Lesson: Lesson;
  Mutation: {};
  Query: {};
  String: Scalars["String"];
  Student: Student;
  Teacher: Teacher;
};

export type ClassResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Class"] = ResolversParentTypes["Class"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lessonTypes?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  lessons?: Resolver<
    Maybe<Array<ResolversTypes["Lesson"]>>,
    ParentType,
    ContextType
  >;
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
  ContextType = any,
  ParentType extends ResolversParentTypes["Evaluation"] = ResolversParentTypes["Evaluation"]
> = {
  behaviourRating?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lesson?: Resolver<ResolversTypes["Lesson"], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  skillsRating?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  student?: Resolver<ResolversTypes["Student"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LessonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Lesson"] = ResolversParentTypes["Lesson"]
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
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createTeacher?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTeacherArgs, "data">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getClasses?: Resolver<
    Maybe<Array<ResolversTypes["Class"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetClassesArgs, "teacherID">
  >;
  getTeacher?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    RequireFields<QueryGetTeacherArgs, "id">
  >;
  greetings?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type StudentResolvers<
  ContextType = any,
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
  ContextType = any,
  ParentType extends ResolversParentTypes["Teacher"] = ResolversParentTypes["Teacher"]
> = {
  class?: Resolver<
    Maybe<Array<ResolversTypes["Class"]>>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["EmailAddress"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Class?: ClassResolvers<ContextType>;
  Date?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  Evaluation?: EvaluationResolvers<ContextType>;
  Lesson?: LessonResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
};
