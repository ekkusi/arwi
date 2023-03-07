/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
};

export type Query = {
  __typename?: "Query";
  getTeacher: Teacher;
  getTeachers: Array<Teacher>;
  getGroups: Array<Group>;
  getGroup: Group;
  getCollection: EvaluationCollection;
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

export type Mutation = {
  __typename?: "Mutation";
  register: Teacher;
  login: LoginResult;
  createGroup: Group;
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

export type MutationCreateGroupArgs = {
  data: CreateGroupInput;
};

export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
  groupId: Scalars["ID"];
};

export type MutationUpdateEvaluationsArgs = {
  data: Array<UpdateEvaluationInput>;
  collectionId: Scalars["ID"];
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

export type Group = {
  __typename?: "Group";
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
  group: Group;
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
  group: Group;
  evaluations: Array<Evaluation>;
};

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
};

export type CreateGroupInput = {
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

export type GroupList_GroupFragmentFragment = {
  __typename?: "Group";
  id: string;
  name: string;
  teacher: { __typename?: "Teacher"; id: string };
} & { " $fragmentName"?: "GroupList_GroupFragmentFragment" };

export type MainPage_GetTeacherQueryVariables = Exact<{
  teacherId: Scalars["ID"];
}>;

export type MainPage_GetTeacherQuery = {
  __typename?: "Query";
  getTeacher: {
    __typename?: "Teacher";
    email: string;
    id: string;
    groups: Array<
      { __typename?: "Group" } & {
        " $fragmentRefs"?: {
          GroupList_GroupFragmentFragment: GroupList_GroupFragmentFragment;
        };
      }
    >;
  };
};

export type RegisterForm_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterForm_RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type CollectionPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type CollectionPage_GetCollectionQuery = {
  __typename?: "Query";
  getCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
    type: string;
    group: { __typename?: "Group"; name: string };
    evaluations: Array<{
      __typename?: "Evaluation";
      id: string;
      wasPresent: boolean;
      skillsRating?: Rating | null;
      behaviourRating?: Rating | null;
      notes?: string | null;
      student: { __typename?: "Student"; id: string; name: string };
    }>;
  };
};

export type Auth_LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type Auth_LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResult";
    teacher: { __typename?: "Teacher"; id: string; email: string };
  };
};

export type CreateGroupForm_CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;

export type CreateGroupForm_CreateGroupMutation = {
  __typename?: "Mutation";
  createGroup: { __typename?: "Group"; id: string; name: string };
};

export type UpdateEvaluationsList_CollectionFragment = {
  __typename?: "EvaluationCollection";
  id: string;
  evaluations: Array<{
    __typename?: "Evaluation";
    id: string;
    wasPresent: boolean;
    skillsRating?: Rating | null;
    behaviourRating?: Rating | null;
    notes?: string | null;
    student: { __typename?: "Student"; id: string; name: string };
  }>;
} & { " $fragmentName"?: "UpdateEvaluationsList_CollectionFragment" };

export type UpdateEvaluationsList_UpdateEvaluationsMutationVariables = Exact<{
  updateEvaluationsInput: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsList_UpdateEvaluationsMutation = {
  __typename?: "Mutation";
  updateEvaluations: number;
};

export type GroupOverviewPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: {
    __typename?: "Group";
    id: string;
    name: string;
    students: Array<{ __typename?: "Student"; name: string }>;
    evaluationCollections: Array<{
      __typename?: "EvaluationCollection";
      id: string;
      date: string;
      type: string;
      description?: string | null;
      evaluations: Array<{
        __typename?: "Evaluation";
        skillsRating?: Rating | null;
        behaviourRating?: Rating | null;
        student: { __typename?: "Student"; name: string };
      }>;
    }>;
  };
};

export type UpdateEvaluationsPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsPage_GetCollectionQuery = {
  __typename?: "Query";
  getCollection: { __typename?: "EvaluationCollection" } & {
    " $fragmentRefs"?: {
      UpdateEvaluationsList_CollectionFragment: UpdateEvaluationsList_CollectionFragment;
    };
  };
};

export type CreateCollectionForm_GroupFragment = {
  __typename?: "Group";
  id: string;
  evaluationTypes?: Array<string> | null;
  students: Array<
    { __typename?: "Student" } & {
      " $fragmentRefs"?: {
        StudentParticipationList_StudentFragment: StudentParticipationList_StudentFragment;
      };
    }
  >;
} & { " $fragmentName"?: "CreateCollectionForm_GroupFragment" };

export type CreateCollectionForm_CreateCollectionMutationVariables = Exact<{
  createCollectionInput: CreateCollectionInput;
  groupId: Scalars["ID"];
}>;

export type CreateCollectionForm_CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: { __typename?: "EvaluationCollection"; id: string };
};

export type StudentParticipationList_StudentFragment = {
  __typename?: "Student";
  id: string;
  name: string;
} & { " $fragmentName"?: "StudentParticipationList_StudentFragment" };

export type CreateCollectionPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type CreateCollectionPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: { __typename?: "Group" } & {
    " $fragmentRefs"?: {
      CreateCollectionForm_GroupFragment: CreateCollectionForm_GroupFragment;
    };
  };
};

export const GroupList_GroupFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "GroupList_GroupFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "teacher" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GroupList_GroupFragmentFragment, unknown>;
export const UpdateEvaluationsList_CollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateEvaluationsList_Collection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "evaluations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skillsRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "behaviourRating" },
                },
                { kind: "Field", name: { kind: "Name", value: "notes" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "student" },
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
      },
    },
  ],
} as unknown as DocumentNode<UpdateEvaluationsList_CollectionFragment, unknown>;
export const StudentParticipationList_StudentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentParticipationList_Student" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Student" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentParticipationList_StudentFragment, unknown>;
export const CreateCollectionForm_GroupFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CreateCollectionForm_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "evaluationTypes" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "students" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "StudentParticipationList_Student",
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
      name: { kind: "Name", value: "StudentParticipationList_Student" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Student" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCollectionForm_GroupFragment, unknown>;
export const MainPage_GetTeacherDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MainPage_GetTeacher" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "teacherId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTeacher" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "teacherId" },
                },
              },
            ],
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
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "GroupList_GroupFragment",
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
      name: { kind: "Name", value: "GroupList_GroupFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "teacher" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MainPage_GetTeacherQuery,
  MainPage_GetTeacherQueryVariables
>;
export const RegisterForm_RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RegisterForm_Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTeacherInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterForm_RegisterMutation,
  RegisterForm_RegisterMutationVariables
>;
export const CollectionPage_GetCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CollectionPage_GetCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "collectionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "collectionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "evaluations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "student" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "wasPresent" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "skillsRating" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "behaviourRating" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "notes" } },
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
} as unknown as DocumentNode<
  CollectionPage_GetCollectionQuery,
  CollectionPage_GetCollectionQueryVariables
>;
export const Auth_LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Auth_Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "teacher" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
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
} as unknown as DocumentNode<Auth_LoginMutation, Auth_LoginMutationVariables>;
export const CreateGroupForm_CreateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGroupForm_CreateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateGroupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
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
} as unknown as DocumentNode<
  CreateGroupForm_CreateGroupMutation,
  CreateGroupForm_CreateGroupMutationVariables
>;
export const UpdateEvaluationsList_UpdateEvaluationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateEvaluationsList_UpdateEvaluations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updateEvaluationsInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "UpdateEvaluationInput" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "collectionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEvaluations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updateEvaluationsInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "collectionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "collectionId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEvaluationsList_UpdateEvaluationsMutation,
  UpdateEvaluationsList_UpdateEvaluationsMutationVariables
>;
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
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "groupId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "groupId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "students" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "evaluations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "student" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "skillsRating" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "behaviourRating" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  GroupOverviewPage_GetGroupQuery,
  GroupOverviewPage_GetGroupQueryVariables
>;
export const UpdateEvaluationsPage_GetCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UpdateEvaluationsPage_GetCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "collectionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "collectionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "UpdateEvaluationsList_Collection",
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
      name: { kind: "Name", value: "UpdateEvaluationsList_Collection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "evaluations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skillsRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "behaviourRating" },
                },
                { kind: "Field", name: { kind: "Name", value: "notes" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "student" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEvaluationsPage_GetCollectionQuery,
  UpdateEvaluationsPage_GetCollectionQueryVariables
>;
export const CreateCollectionForm_CreateCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCollectionForm_CreateCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createCollectionInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateCollectionInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "groupId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createCollectionInput" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "groupId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCollectionForm_CreateCollectionMutation,
  CreateCollectionForm_CreateCollectionMutationVariables
>;
export const CreateCollectionPage_GetGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CreateCollectionPage_GetGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "groupId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "groupId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CreateCollectionForm_Group" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentParticipationList_Student" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Student" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CreateCollectionForm_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "evaluationTypes" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "students" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "StudentParticipationList_Student",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCollectionPage_GetGroupQuery,
  CreateCollectionPage_GetGroupQueryVariables
>;
