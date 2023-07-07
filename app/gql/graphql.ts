/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: string;
};

export type Query = {
  __typename?: "Query";
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

export type Main_GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type Main_GetCurrentUserQuery = { __typename?: "Query"; getCurrentUser: { __typename?: "Teacher"; email: string; id: string } };

export type LoginPage_LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginPage_LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "AuthPayload"; accessToken: string; teacher: { __typename?: "Teacher"; email: string; id: string } };
};

export type RegisterPage_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterPage_RegisterMutation = { __typename?: "Mutation"; register: { __typename?: "AuthPayload"; accessToken: string } };

export type MainPage_GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type MainPage_GetCurrentUserQuery = {
  __typename?: "Query";
  getCurrentUser: {
    __typename?: "Teacher";
    email: string;
    id: string;
    groups: Array<{
      __typename?: "Group";
      id: string;
      name: string;
      updatedAt: string;
      subject: { __typename?: "Subject"; label: string; code: string };
    }>;
  };
};

export type ProfileView_LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type ProfileView_LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type CollectionsLineChart_EvaluationCollectionFragment = {
  __typename?: "EvaluationCollection";
  id: string;
  date: string;
  environment: { __typename?: "Environment"; label: string; code: string };
  evaluations: Array<{
    __typename?: "Evaluation";
    skillsRating?: Rating | null;
    behaviourRating?: Rating | null;
    wasPresent: boolean;
    isStellar: boolean;
  }>;
} & { " $fragmentName"?: "CollectionsLineChart_EvaluationCollectionFragment" };

export type GroupListItemFragment = {
  __typename?: "Group";
  id: string;
  name: string;
  updatedAt: string;
  subject: { __typename?: "Subject"; label: string; code: string };
} & { " $fragmentName"?: "GroupListItemFragment" };

export type GroupOverviewPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: {
    __typename?: "Group";
    id: string;
    name: string;
    subject: { __typename?: "Subject"; label: string; code: string };
    currentClassYear: {
      __typename?: "ClassYear";
      info: { __typename?: "ClassYearInfo"; code: ClassYearCode; label: string };
      students: Array<{ __typename?: "Student"; id: string; name: string }>;
      evaluationCollections: Array<
        { __typename?: "EvaluationCollection"; id: string; date: string; environment: { __typename?: "Environment"; label: string } } & {
          " $fragmentRefs"?: { CollectionsLineChart_EvaluationCollectionFragment: CollectionsLineChart_EvaluationCollectionFragment };
        }
      >;
    };
  };
};

export type GroupOverviewPage_DeleteGroupMutationVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_DeleteGroupMutation = { __typename?: "Mutation"; deleteGroup: boolean };

export type CreateGroupPage_CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;

export type CreateGroupPage_CreateGroupMutation = { __typename?: "Mutation"; createGroup: { __typename?: "Group"; id: string; name: string } };

export const CollectionsLineChart_EvaluationCollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CollectionsLineChart_EvaluationCollection" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EvaluationCollection" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "date" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "evaluations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
                { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
                { kind: "Field", name: { kind: "Name", value: "isStellar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CollectionsLineChart_EvaluationCollectionFragment, unknown>;
export const GroupListItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "GroupListItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Group" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "subject" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupListItemFragment, unknown>;
export const Main_GetCurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Main_GetCurrentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCurrentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<Main_GetCurrentUserQuery, Main_GetCurrentUserQueryVariables>;
export const LoginPage_LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LoginPage_Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "email" }, value: { kind: "Variable", name: { kind: "Name", value: "email" } } },
              { kind: "Argument", name: { kind: "Name", value: "password" }, value: { kind: "Variable", name: { kind: "Name", value: "password" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "teacher" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginPage_LoginMutation, LoginPage_LoginMutationVariables>;
export const RegisterPage_RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RegisterPage_Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "CreateTeacherInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "data" }, value: { kind: "Variable", name: { kind: "Name", value: "input" } } },
            ],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "accessToken" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterPage_RegisterMutation, RegisterPage_RegisterMutationVariables>;
export const MainPage_GetCurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MainPage_GetCurrentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCurrentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "groups" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subject" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "label" } },
                            { kind: "Field", name: { kind: "Name", value: "code" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MainPage_GetCurrentUserQuery, MainPage_GetCurrentUserQueryVariables>;
export const ProfileView_LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ProfileView_Logout" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "logout" } }] },
    },
  ],
} as unknown as DocumentNode<ProfileView_LogoutMutation, ProfileView_LogoutMutationVariables>;
export const GroupOverviewPage_GetGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GroupOverviewPage_GetGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getGroup" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "id" }, value: { kind: "Variable", name: { kind: "Name", value: "groupId" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subject" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "currentClassYear" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "info" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "code" } },
                            { kind: "Field", name: { kind: "Name", value: "label" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "students" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "evaluationCollections" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "date" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "environment" },
                              selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "label" } }] },
                            },
                            { kind: "FragmentSpread", name: { kind: "Name", value: "CollectionsLineChart_EvaluationCollection" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CollectionsLineChart_EvaluationCollection" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "EvaluationCollection" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "date" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "evaluations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
                { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
                { kind: "Field", name: { kind: "Name", value: "isStellar" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupOverviewPage_GetGroupQuery, GroupOverviewPage_GetGroupQueryVariables>;
export const GroupOverviewPage_DeleteGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "GroupOverviewPage_DeleteGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "ID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteGroup" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "groupId" }, value: { kind: "Variable", name: { kind: "Name", value: "groupId" } } },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupOverviewPage_DeleteGroupMutation, GroupOverviewPage_DeleteGroupMutationVariables>;
export const CreateGroupPage_CreateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGroupPage_CreateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "CreateGroupInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createGroup" },
            arguments: [
              { kind: "Argument", name: { kind: "Name", value: "data" }, value: { kind: "Variable", name: { kind: "Name", value: "input" } } },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateGroupPage_CreateGroupMutation, CreateGroupPage_CreateGroupMutationVariables>;
