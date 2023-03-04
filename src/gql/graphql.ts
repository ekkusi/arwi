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
  Date: Date;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
};

export type Class = {
  __typename?: "Class";
  evaluationCollections: Array<EvaluationCollection>;
  evaluationTypes?: Maybe<Array<Scalars["String"]>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  students: Array<Student>;
  teacher: Teacher;
};

export type CreateClassInput = {
  name: Scalars["String"];
  students?: InputMaybe<Array<CreateStudentInput>>;
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

export type CreateStudentInput = {
  name: Scalars["String"];
};

export type CreateTeacherInput = {
  email: Scalars["EmailAddress"];
  password: Scalars["String"];
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
  evaluations: Array<Evaluation>;
  id: Scalars["ID"];
  type: Scalars["String"];
};

export type LoginResult = {
  __typename?: "LoginResult";
  teacher: Teacher;
};

export type Mutation = {
  __typename?: "Mutation";
  addEvaluations: Scalars["Int"];
  createClass: Class;
  createCollection: EvaluationCollection;
  login: LoginResult;
  register: Teacher;
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

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: CreateTeacherInput;
};

export type Query = {
  __typename?: "Query";
  getClass: Class;
  getClasses: Array<Class>;
  getTeacher: Teacher;
  getTeachers: Array<Teacher>;
};

export type QueryGetClassArgs = {
  id: Scalars["ID"];
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
  evaluations: Array<Evaluation>;
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Teacher = {
  __typename?: "Teacher";
  classes: Array<Class>;
  email: Scalars["EmailAddress"];
  id: Scalars["ID"];
};

export type RegisterForm_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterForm_RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type ClassOverviewPage_GetClassQueryVariables = Exact<{
  classId: Scalars["ID"];
}>;

export type ClassOverviewPage_GetClassQuery = {
  __typename?: "Query";
  getClass: {
    __typename?: "Class";
    id: string;
    name: string;
    students: Array<{ __typename?: "Student"; name: string }>;
    teacher: { __typename?: "Teacher"; id: string };
    evaluationCollections: Array<{
      __typename?: "EvaluationCollection";
      id: string;
      date: Date;
      type: string;
      description?: string | null;
      evaluations: Array<{
        __typename?: "Evaluation";
        skillsRating?: number | null;
        behaviourRating?: number | null;
        student: { __typename?: "Student"; name: string };
      }>;
    }>;
  };
};

export type CreateClassForm_CreateClassMutationVariables = Exact<{
  input: CreateClassInput;
}>;

export type CreateClassForm_CreateClassMutation = {
  __typename?: "Mutation";
  createClass: { __typename?: "Class"; id: string; name: string };
};

export type MainPage_GetTeacherQueryVariables = Exact<{
  teacherId: Scalars["ID"];
}>;

export type MainPage_GetTeacherQuery = {
  __typename?: "Query";
  getTeacher: {
    __typename?: "Teacher";
    email: string;
    id: string;
    classes: Array<
      { __typename?: "Class" } & {
        " $fragmentRefs"?: {
          ClassList_ClassFragmentFragment: ClassList_ClassFragmentFragment;
        };
      }
    >;
  };
};

export type ClassList_ClassFragmentFragment = {
  __typename?: "Class";
  id: string;
  name: string;
  teacher: { __typename?: "Teacher"; id: string };
} & { " $fragmentName"?: "ClassList_ClassFragmentFragment" };

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

export const ClassList_ClassFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ClassList_ClassFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Class" },
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
} as unknown as DocumentNode<ClassList_ClassFragmentFragment, unknown>;
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
export const ClassOverviewPage_GetClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClassOverviewPage_GetClass" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "classId" },
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
            name: { kind: "Name", value: "getClass" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classId" },
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
                  name: { kind: "Name", value: "teacher" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
  ClassOverviewPage_GetClassQuery,
  ClassOverviewPage_GetClassQueryVariables
>;
export const CreateClassForm_CreateClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateClassForm_CreateClass" },
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
              name: { kind: "Name", value: "CreateClassInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createClass" },
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
  CreateClassForm_CreateClassMutation,
  CreateClassForm_CreateClassMutationVariables
>;
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
                  name: { kind: "Name", value: "classes" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ClassList_ClassFragment",
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
      name: { kind: "Name", value: "ClassList_ClassFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Class" },
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
