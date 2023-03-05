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

export type ClassList_ClassFragmentFragment = {
  __typename?: "Class";
  id: string;
  name: string;
  teacher: { __typename?: "Teacher"; id: string };
} & { " $fragmentName"?: "ClassList_ClassFragmentFragment" };

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

export type RegisterForm_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterForm_RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
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

export type CreateClassForm_CreateClassMutationVariables = Exact<{
  input: CreateClassInput;
}>;

export type CreateClassForm_CreateClassMutation = {
  __typename?: "Mutation";
  createClass: { __typename?: "Class"; id: string; name: string };
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
    class: { __typename?: "Class"; name: string };
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

export type StudentParticipationList_StudentFragment = {
  __typename?: "Student";
  id: string;
  name: string;
} & { " $fragmentName"?: "StudentParticipationList_StudentFragment" };

export type CreateCollectionForm_ClassFragment = {
  __typename?: "Class";
  id: string;
  evaluationTypes?: Array<string> | null;
  students: Array<
    { __typename?: "Student" } & {
      " $fragmentRefs"?: {
        StudentParticipationList_StudentFragment: StudentParticipationList_StudentFragment;
      };
    }
  >;
} & { " $fragmentName"?: "CreateCollectionForm_ClassFragment" };

export type CreateCollectionForm_CreateCollectionMutationVariables = Exact<{
  createCollectionInput: CreateCollectionInput;
  classId: Scalars["ID"];
}>;

export type CreateCollectionForm_CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: { __typename?: "EvaluationCollection"; id: string };
};

export type CreateCollectionPage_GetClassQueryVariables = Exact<{
  classId: Scalars["ID"];
}>;

export type CreateCollectionPage_GetClassQuery = {
  __typename?: "Query";
  getClass: { __typename?: "Class" } & {
    " $fragmentRefs"?: {
      CreateCollectionForm_ClassFragment: CreateCollectionForm_ClassFragment;
    };
  };
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

export type UpdateEvaluationsPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsPage_GetCollectionQuery = {
  __typename?: "Query";
  getCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    class: {
      __typename?: "Class";
      id: string;
      teacher: { __typename?: "Teacher"; id: string };
    };
  } & {
    " $fragmentRefs"?: {
      UpdateEvaluationsList_CollectionFragment: UpdateEvaluationsList_CollectionFragment;
    };
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
export const CreateCollectionForm_ClassFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CreateCollectionForm_Class" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Class" },
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
} as unknown as DocumentNode<CreateCollectionForm_ClassFragment, unknown>;
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
                  name: { kind: "Name", value: "class" },
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
                name: { kind: "Name", value: "classId" },
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
export const CreateCollectionPage_GetClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CreateCollectionPage_GetClass" },
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "CreateCollectionForm_Class" },
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
      name: { kind: "Name", value: "CreateCollectionForm_Class" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Class" },
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
  CreateCollectionPage_GetClassQuery,
  CreateCollectionPage_GetClassQueryVariables
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
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "class" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "teacher" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
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
