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
  register: Teacher;
  login: LoginResult;
  createGroup: Group;
  createCollection: EvaluationCollection;
  createStudent: Student;
  updateEvaluations: Scalars["Int"];
  updateStudent: Student;
  updateGroup: Group;
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
  groupId: Scalars["ID"];
};

export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
  groupId: Scalars["ID"];
};

export type MutationUpdateEvaluationsArgs = {
  data: Array<UpdateEvaluationInput>;
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
  updatedAt: Scalars["Date"];
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
  wasPresent?: InputMaybe<Scalars["Boolean"]>;
  skillsRating?: InputMaybe<Rating>;
  behaviourRating?: InputMaybe<Rating>;
  notes?: InputMaybe<Scalars["String"]>;
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
    groups: Array<
      { __typename?: "Group" } & {
        " $fragmentRefs"?: {
          GroupList_GroupFragmentFragment: GroupList_GroupFragmentFragment;
        };
      }
    >;
  };
};

export type GroupList_GroupFragmentFragment = {
  __typename?: "Group";
  id: string;
  name: string;
  teacher: { __typename?: "Teacher"; id: string };
} & { " $fragmentName"?: "GroupList_GroupFragmentFragment" };

export type EvaluationsAccordion_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  notes?: string | null;
  behaviourRating?: Rating | null;
  skillsRating?: Rating | null;
  wasPresent: boolean;
  collection: {
    __typename?: "EvaluationCollection";
    date: string;
    type: string;
  };
  student: { __typename?: "Student"; name: string };
} & { " $fragmentName"?: "EvaluationsAccordion_EvaluationFragment" };

export type UpdateCollectionForm_GroupFragment = {
  __typename?: "Group";
  students: Array<{ __typename?: "Student"; id: string; name: string }>;
} & { " $fragmentName"?: "UpdateCollectionForm_GroupFragment" };

export type UpdateCollectionForm_CollectionFragment = {
  __typename?: "EvaluationCollection";
  type: string;
  date: string;
  description?: string | null;
  evaluations: Array<{
    __typename?: "Evaluation";
    wasPresent: boolean;
    student: { __typename?: "Student"; id: string; name: string };
  }>;
} & { " $fragmentName"?: "UpdateCollectionForm_CollectionFragment" };

export type UpdateStudentsList_StudentFragment = {
  __typename?: "Student";
  id: string;
  name: string;
} & { " $fragmentName"?: "UpdateStudentsList_StudentFragment" };

export type UpdateStudentList_UpdateStudentMutationVariables = Exact<{
  input: UpdateStudentInput;
  studentId: Scalars["ID"];
}>;

export type UpdateStudentList_UpdateStudentMutation = {
  __typename?: "Mutation";
  updateStudent: { __typename?: "Student"; id: string };
};

export type UpdateStudentList_CreateStudentMutationVariables = Exact<{
  input: CreateStudentInput;
  groupId: Scalars["ID"];
}>;

export type UpdateStudentList_CreateStudentMutation = {
  __typename?: "Mutation";
  createStudent: { __typename?: "Student" } & {
    " $fragmentRefs"?: {
      UpdateStudentsList_StudentFragment: UpdateStudentsList_StudentFragment;
    };
  };
};

export type UpdateStudentList_DeleteStudentMutationVariables = Exact<{
  studentId: Scalars["ID"];
}>;

export type UpdateStudentList_DeleteStudentMutation = {
  __typename?: "Mutation";
  deleteStudent: boolean;
};

export type UpdateCollectionsList_CollectionFragment = {
  __typename?: "EvaluationCollection";
  id: string;
  date: string;
  type: string;
} & { " $fragmentName"?: "UpdateCollectionsList_CollectionFragment" };

export type UpdateCollectionList_DeleteCollectionMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UpdateCollectionList_DeleteCollectionMutation = {
  __typename?: "Mutation";
  deleteCollection: boolean;
};

export type UpdateEvaluationCard_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  skillsRating?: Rating | null;
  behaviourRating?: Rating | null;
  notes?: string | null;
  student: { __typename?: "Student"; id: string; name: string };
} & { " $fragmentName"?: "UpdateEvaluationCard_EvaluationFragment" };

export type StudentEvaluationRecap_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  wasPresent: boolean;
  behaviourRating?: Rating | null;
  skillsRating?: Rating | null;
} & { " $fragmentName"?: "StudentEvaluationRecap_EvaluationFragment" };

export type RegisterPage_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterPage_RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type CreateCollectionMutationVariables = Exact<{
  data: CreateCollectionInput;
  groupId: Scalars["ID"];
}>;

export type CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
    type: string;
    description?: string | null;
  };
};

export type CreateCollectionWithEvaluationsMutationVariables = Exact<{
  data: CreateCollectionInput;
  groupId: Scalars["ID"];
}>;

export type CreateCollectionWithEvaluationsMutation = {
  __typename?: "Mutation";
  createCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
    type: string;
    description?: string | null;
    evaluations: Array<{
      __typename?: "Evaluation";
      id: string;
      wasPresent: boolean;
      skillsRating?: Rating | null;
      behaviourRating?: Rating | null;
      notes?: string | null;
    }>;
  };
};

export type CreateGroupWithoutStudentsMutationVariables = Exact<{
  data: CreateGroupInput;
}>;

export type CreateGroupWithoutStudentsMutation = {
  __typename?: "Mutation";
  createGroup: {
    __typename?: "Group";
    id: string;
    name: string;
    teacher: { __typename?: "Teacher"; id: string };
    students: Array<{ __typename?: "Student"; id: string }>;
  };
};

export type CreateGroupWithStudentsMutationVariables = Exact<{
  data: CreateGroupInput;
}>;

export type CreateGroupWithStudentsMutation = {
  __typename?: "Mutation";
  createGroup: {
    __typename?: "Group";
    id: string;
    name: string;
    teacher: { __typename?: "Teacher"; id: string };
    students: Array<{ __typename?: "Student"; id: string; name: string }>;
  };
};

export type CreateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
  groupId: Scalars["ID"];
}>;

export type CreateStudentMutation = {
  __typename?: "Mutation";
  createStudent: { __typename?: "Student"; id: string; name: string };
};

export type DeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type DeleteCollectionMutation = {
  __typename?: "Mutation";
  deleteCollection: boolean;
};

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type DeleteStudentMutationVariables = Exact<{
  studentId: Scalars["ID"];
}>;

export type DeleteStudentMutation = {
  __typename?: "Mutation";
  deleteStudent: boolean;
};

export type RegisterMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type UpdateEvaluationsMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsMutation = {
  __typename?: "Mutation";
  updateEvaluations: number;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResult";
    teacher: { __typename?: "Teacher"; id: string; email: string };
  };
};

export type UpdateGroupMutationVariables = Exact<{
  data: UpdateGroupInput;
  groupId: Scalars["ID"];
}>;

export type UpdateGroupMutation = {
  __typename?: "Mutation";
  updateGroup: { __typename?: "Group"; id: string; name: string };
};

export type GetTeacherQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetTeacherQuery = {
  __typename?: "Query";
  getTeacher: { __typename?: "Teacher"; id: string; email: string };
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
    description?: string | null;
    group: { __typename?: "Group"; name: string; id: string };
    evaluations: Array<
      { __typename?: "Evaluation"; id: string } & {
        " $fragmentRefs"?: {
          EvaluationsAccordion_EvaluationFragment: EvaluationsAccordion_EvaluationFragment;
        };
      }
    >;
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

export type UpdateStudentMutationVariables = Exact<{
  data: UpdateStudentInput;
  studentId: Scalars["ID"];
}>;

export type UpdateStudentMutation = {
  __typename?: "Mutation";
  updateStudent: { __typename?: "Student"; id: string; name: string };
};

export type CreateGroupPage_CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;

export type CreateGroupPage_CreateGroupMutation = {
  __typename?: "Mutation";
  createGroup: { __typename?: "Group"; id: string; name: string };
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
    students: Array<{ __typename?: "Student"; id: string; name: string }>;
    evaluationCollections: Array<{
      __typename?: "EvaluationCollection";
      id: string;
      date: string;
      type: string;
    }>;
  };
};

export type GroupOverviewPage_DeleteGroupMutationVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type StudentPage_GetStudentQueryVariables = Exact<{
  studentId: Scalars["ID"];
}>;

export type StudentPage_GetStudentQuery = {
  __typename?: "Query";
  getStudent: {
    __typename?: "Student";
    id: string;
    name: string;
    group: { __typename?: "Group"; id: string };
    evaluations: Array<
      { __typename?: "Evaluation"; id: string; notes?: string | null } & {
        " $fragmentRefs"?: {
          EvaluationsAccordion_EvaluationFragment: EvaluationsAccordion_EvaluationFragment;
          StudentEvaluationRecap_EvaluationFragment: StudentEvaluationRecap_EvaluationFragment;
        };
      }
    >;
  };
};

export type UpdateEvaluationsPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsPage_GetCollectionQuery = {
  __typename?: "Query";
  getCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    evaluations: Array<
      {
        __typename?: "Evaluation";
        id: string;
        wasPresent: boolean;
        skillsRating?: Rating | null;
        behaviourRating?: Rating | null;
        notes?: string | null;
        student: { __typename?: "Student"; name: string };
      } & {
        " $fragmentRefs"?: {
          UpdateEvaluationCard_EvaluationFragment: UpdateEvaluationCard_EvaluationFragment;
        };
      }
    >;
  };
};

export type UpdateEvaluationsPage_UpdateEvaluationsMutationVariables = Exact<{
  updateEvaluationsInput: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsPage_UpdateEvaluationsMutation = {
  __typename?: "Mutation";
  updateEvaluations: number;
};

export type CreateCollectionPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type CreateCollectionPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: { __typename?: "Group"; id: string } & {
    " $fragmentRefs"?: {
      UpdateCollectionForm_GroupFragment: UpdateCollectionForm_GroupFragment;
    };
  };
};

export type CreateCollectionPage_CreateCollectionMutationVariables = Exact<{
  createCollectionInput: CreateCollectionInput;
  groupId: Scalars["ID"];
}>;

export type CreateCollectionPage_CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: { __typename?: "EvaluationCollection"; id: string };
};

export type EvaluationEditPage_GetEvaluationQueryVariables = Exact<{
  evaluationId: Scalars["ID"];
}>;

export type EvaluationEditPage_GetEvaluationQuery = {
  __typename?: "Query";
  getEvaluation: {
    __typename?: "Evaluation";
    notes?: string | null;
    id: string;
    skillsRating?: Rating | null;
    behaviourRating?: Rating | null;
    student: { __typename?: "Student"; id: string };
    collection: {
      __typename?: "EvaluationCollection";
      date: string;
      type: string;
    };
  } & {
    " $fragmentRefs"?: {
      UpdateEvaluationCard_EvaluationFragment: UpdateEvaluationCard_EvaluationFragment;
    };
  };
};

export type EvaluationsEditPage_UpdateEvaluationMutationVariables = Exact<{
  input: UpdateEvaluationInput;
}>;

export type EvaluationsEditPage_UpdateEvaluationMutation = {
  __typename?: "Mutation";
  updateEvaluation: { __typename?: "Evaluation"; id: string };
};

export type EditGroupPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type EditGroupPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: {
    __typename?: "Group";
    id: string;
    name: string;
    students: Array<
      { __typename?: "Student" } & {
        " $fragmentRefs"?: {
          UpdateStudentsList_StudentFragment: UpdateStudentsList_StudentFragment;
        };
      }
    >;
    evaluationCollections: Array<
      { __typename?: "EvaluationCollection" } & {
        " $fragmentRefs"?: {
          UpdateCollectionsList_CollectionFragment: UpdateCollectionsList_CollectionFragment;
        };
      }
    >;
  };
};

export type EditGroupPage_UpdateGroupMutationVariables = Exact<{
  id: Scalars["ID"];
  input: UpdateGroupInput;
}>;

export type EditGroupPage_UpdateGroupMutation = {
  __typename?: "Mutation";
  updateGroup: { __typename?: "Group"; id: string };
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
export const EvaluationsAccordion_EvaluationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationsAccordion_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "notes" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EvaluationsAccordion_EvaluationFragment, unknown>;
export const UpdateCollectionForm_GroupFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionForm_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCollectionForm_GroupFragment, unknown>;
export const UpdateCollectionForm_CollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionForm_Collection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "date" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "evaluations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
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
} as unknown as DocumentNode<UpdateCollectionForm_CollectionFragment, unknown>;
export const UpdateStudentsList_StudentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateStudentsList_Student" },
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
} as unknown as DocumentNode<UpdateStudentsList_StudentFragment, unknown>;
export const UpdateCollectionsList_CollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionsList_Collection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "date" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCollectionsList_CollectionFragment, unknown>;
export const UpdateEvaluationCard_EvaluationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateEvaluationCard_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
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
} as unknown as DocumentNode<UpdateEvaluationCard_EvaluationFragment, unknown>;
export const StudentEvaluationRecap_EvaluationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentEvaluationRecap_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentEvaluationRecap_EvaluationFragment,
  unknown
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
export const UpdateStudentList_UpdateStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateStudentList_UpdateStudent" },
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
              name: { kind: "Name", value: "UpdateStudentInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studentId" },
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
            name: { kind: "Name", value: "updateStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "studentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studentId" },
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
  UpdateStudentList_UpdateStudentMutation,
  UpdateStudentList_UpdateStudentMutationVariables
>;
export const UpdateStudentList_CreateStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateStudentList_CreateStudent" },
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
              name: { kind: "Name", value: "CreateStudentInput" },
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
            name: { kind: "Name", value: "createStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "UpdateStudentsList_Student" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateStudentsList_Student" },
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
} as unknown as DocumentNode<
  UpdateStudentList_CreateStudentMutation,
  UpdateStudentList_CreateStudentMutationVariables
>;
export const UpdateStudentList_DeleteStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateStudentList_DeleteStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studentId" },
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
            name: { kind: "Name", value: "deleteStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "studentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studentId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateStudentList_DeleteStudentMutation,
  UpdateStudentList_DeleteStudentMutationVariables
>;
export const UpdateCollectionList_DeleteCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCollectionList_DeleteCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
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
            name: { kind: "Name", value: "deleteCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "collectionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCollectionList_DeleteCollectionMutation,
  UpdateCollectionList_DeleteCollectionMutationVariables
>;
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
  RegisterPage_RegisterMutation,
  RegisterPage_RegisterMutationVariables
>;
export const CreateCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
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
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;
export const CreateCollectionWithEvaluationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCollectionWithEvaluations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
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
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "evaluations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
  CreateCollectionWithEvaluationsMutation,
  CreateCollectionWithEvaluationsMutationVariables
>;
export const CreateGroupWithoutStudentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGroupWithoutStudents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
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
                  name: { kind: "Name", value: "students" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  CreateGroupWithoutStudentsMutation,
  CreateGroupWithoutStudentsMutationVariables
>;
export const CreateGroupWithStudentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGroupWithStudents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
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
                  name: { kind: "Name", value: "students" },
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
  CreateGroupWithStudentsMutation,
  CreateGroupWithStudentsMutationVariables
>;
export const CreateStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateStudentInput" },
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
            name: { kind: "Name", value: "createStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
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
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateStudentMutation,
  CreateStudentMutationVariables
>;
export const DeleteCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCollection" },
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
            name: { kind: "Name", value: "deleteCollection" },
            arguments: [
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
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>;
export const DeleteGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteGroup" },
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
            name: { kind: "Name", value: "deleteGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "groupId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const DeleteStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studentId" },
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
            name: { kind: "Name", value: "deleteStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "studentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studentId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteStudentMutation,
  DeleteStudentMutationVariables
>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
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
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const UpdateEvaluationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateEvaluations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
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
  UpdateEvaluationsMutation,
  UpdateEvaluationsMutationVariables
>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
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
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateGroupInput" },
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
            name: { kind: "Name", value: "updateGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
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
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const GetTeacherDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTeacher" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
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
                  name: { kind: "Name", value: "id" },
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
} as unknown as DocumentNode<GetTeacherQuery, GetTeacherQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "EvaluationsAccordion_Evaluation",
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
      name: { kind: "Name", value: "EvaluationsAccordion_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "notes" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
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
export const UpdateStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateStudentInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studentId" },
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
            name: { kind: "Name", value: "updateStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "studentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studentId" },
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
  UpdateStudentMutation,
  UpdateStudentMutationVariables
>;
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
  CreateGroupPage_CreateGroupMutation,
  CreateGroupPage_CreateGroupMutationVariables
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
                      { kind: "Field", name: { kind: "Name", value: "type" } },
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
            name: { kind: "Name", value: "deleteGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "groupId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GroupOverviewPage_DeleteGroupMutation,
  GroupOverviewPage_DeleteGroupMutationVariables
>;
export const StudentPage_GetStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentPage_GetStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "studentId" },
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
            name: { kind: "Name", value: "getStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "studentId" },
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
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
                      { kind: "Field", name: { kind: "Name", value: "notes" } },
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "EvaluationsAccordion_Evaluation",
                        },
                      },
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "StudentEvaluationRecap_Evaluation",
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
      name: { kind: "Name", value: "EvaluationsAccordion_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "notes" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "student" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentEvaluationRecap_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentPage_GetStudentQuery,
  StudentPage_GetStudentQueryVariables
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
                  name: { kind: "Name", value: "evaluations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "UpdateEvaluationCard_Evaluation",
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
      name: { kind: "Name", value: "UpdateEvaluationCard_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
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
} as unknown as DocumentNode<
  UpdateEvaluationsPage_GetCollectionQuery,
  UpdateEvaluationsPage_GetCollectionQueryVariables
>;
export const UpdateEvaluationsPage_UpdateEvaluationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateEvaluationsPage_UpdateEvaluations" },
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
  UpdateEvaluationsPage_UpdateEvaluationsMutation,
  UpdateEvaluationsPage_UpdateEvaluationsMutationVariables
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
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "UpdateCollectionForm_Group" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionForm_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCollectionPage_GetGroupQuery,
  CreateCollectionPage_GetGroupQueryVariables
>;
export const CreateCollectionPage_CreateCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCollectionPage_CreateCollection" },
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
  CreateCollectionPage_CreateCollectionMutation,
  CreateCollectionPage_CreateCollectionMutationVariables
>;
export const EvaluationEditPage_GetEvaluationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EvaluationEditPage_GetEvaluation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "evaluationId" },
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
            name: { kind: "Name", value: "getEvaluation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "evaluationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "notes" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skillsRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "behaviourRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "student" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "date" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                    ],
                  },
                },
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "UpdateEvaluationCard_Evaluation",
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
      name: { kind: "Name", value: "UpdateEvaluationCard_Evaluation" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Evaluation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "skillsRating" } },
          { kind: "Field", name: { kind: "Name", value: "behaviourRating" } },
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
} as unknown as DocumentNode<
  EvaluationEditPage_GetEvaluationQuery,
  EvaluationEditPage_GetEvaluationQueryVariables
>;
export const EvaluationsEditPage_UpdateEvaluationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EvaluationsEditPage_UpdateEvaluation" },
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
              name: { kind: "Name", value: "UpdateEvaluationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEvaluation" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EvaluationsEditPage_UpdateEvaluationMutation,
  EvaluationsEditPage_UpdateEvaluationMutationVariables
>;
export const EditGroupPage_GetGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EditGroupPage_GetGroup" },
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
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "UpdateStudentsList_Student",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "evaluationCollections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "UpdateCollectionsList_Collection",
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
      name: { kind: "Name", value: "UpdateStudentsList_Student" },
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
      name: { kind: "Name", value: "UpdateCollectionsList_Collection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "date" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EditGroupPage_GetGroupQuery,
  EditGroupPage_GetGroupQueryVariables
>;
export const EditGroupPage_UpdateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EditGroupPage_UpdateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
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
              name: { kind: "Name", value: "UpdateGroupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EditGroupPage_UpdateGroupMutation,
  EditGroupPage_UpdateGroupMutationVariables
>;
