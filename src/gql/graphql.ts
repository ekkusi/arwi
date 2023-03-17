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
  wasPresent: Scalars["Boolean"];
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

export type RegisterForm_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterForm_RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type CollectionPageContent_CollectionFragment = {
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
} & { " $fragmentName"?: "CollectionPageContent_CollectionFragment" };

export type CollectionPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type CollectionPage_GetCollectionQuery = {
  __typename?: "Query";
  getCollection: { __typename?: "EvaluationCollection" } & {
    " $fragmentRefs"?: {
      CollectionPageContent_CollectionFragment: CollectionPageContent_CollectionFragment;
    };
  };
};

export type StudentEvaluationRecap_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  wasPresent: boolean;
  behaviourRating?: Rating | null;
  skillsRating?: Rating | null;
} & { " $fragmentName"?: "StudentEvaluationRecap_EvaluationFragment" };

export type GroupOverviewPageContent_GroupFragment = {
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
} & { " $fragmentName"?: "GroupOverviewPageContent_GroupFragment" };

export type CreateGroupForm_CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;

export type CreateGroupForm_CreateGroupMutation = {
  __typename?: "Mutation";
  createGroup: { __typename?: "Group"; id: string; name: string };
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
    evaluations: Array<
      { __typename?: "Evaluation" } & {
        " $fragmentRefs"?: {
          StudentEvaluationRecap_EvaluationFragment: StudentEvaluationRecap_EvaluationFragment;
        };
      }
    >;
  };
};

export type UpdateEvaluationCard_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  wasPresent: boolean;
  skillsRating?: Rating | null;
  behaviourRating?: Rating | null;
  notes?: string | null;
  student: { __typename?: "Student"; id: string; name: string };
} & { " $fragmentName"?: "UpdateEvaluationCard_EvaluationFragment" };

export type GroupOverviewPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: { __typename?: "Group" } & {
    " $fragmentRefs"?: {
      GroupOverviewPageContent_GroupFragment: GroupOverviewPageContent_GroupFragment;
    };
  };
};

export type UpdateEvaluationsPageContent_CollectionFragment = {
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
    } & {
      " $fragmentRefs"?: {
        UpdateEvaluationCard_EvaluationFragment: UpdateEvaluationCard_EvaluationFragment;
      };
    }
  >;
} & { " $fragmentName"?: "UpdateEvaluationsPageContent_CollectionFragment" };

export type UpdateEvaluationsPageContent_UpdateEvaluationsMutationVariables =
  Exact<{
    updateEvaluationsInput:
      | Array<UpdateEvaluationInput>
      | UpdateEvaluationInput;
    collectionId: Scalars["ID"];
  }>;

export type UpdateEvaluationsPageContent_UpdateEvaluationsMutation = {
  __typename?: "Mutation";
  updateEvaluations: number;
};

export type UpdateEvaluationsPage_GetCollectionQueryVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsPage_GetCollectionQuery = {
  __typename?: "Query";
  getCollection: { __typename?: "EvaluationCollection" } & {
    " $fragmentRefs"?: {
      UpdateEvaluationsPageContent_CollectionFragment: UpdateEvaluationsPageContent_CollectionFragment;
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

export type DeleteGroupButton_DeleteGroupMutationVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type DeleteGroupButton_DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type DeleteGroupButton_GroupFragment = {
  __typename?: "Group";
  id: string;
  name: string;
} & { " $fragmentName"?: "DeleteGroupButton_GroupFragment" };

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

export type EditGroupPageContent_GroupFragment = ({
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
} & {
  " $fragmentRefs"?: {
    DeleteGroupButton_GroupFragment: DeleteGroupButton_GroupFragment;
  };
}) & { " $fragmentName"?: "EditGroupPageContent_GroupFragment" };

export type EditGroupPageContent_UpdateGroupMutationVariables = Exact<{
  id: Scalars["ID"];
  input: UpdateGroupInput;
}>;

export type EditGroupPageContent_UpdateGroupMutation = {
  __typename?: "Mutation";
  updateGroup: { __typename?: "Group"; id: string };
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

export type EditGroupPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type EditGroupPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: { __typename?: "Group" } & {
    " $fragmentRefs"?: {
      EditGroupPageContent_GroupFragment: EditGroupPageContent_GroupFragment;
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
export const CollectionPageContent_CollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CollectionPageContent_Collection" },
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CollectionPageContent_CollectionFragment, unknown>;
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
export const GroupOverviewPageContent_GroupFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "GroupOverviewPageContent_Group" },
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
} as unknown as DocumentNode<GroupOverviewPageContent_GroupFragment, unknown>;
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
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
export const UpdateEvaluationsPageContent_CollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateEvaluationsPageContent_Collection" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
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
  UpdateEvaluationsPageContent_CollectionFragment,
  unknown
>;
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
export const DeleteGroupButton_GroupFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DeleteGroupButton_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
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
} as unknown as DocumentNode<DeleteGroupButton_GroupFragment, unknown>;
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
export const EditGroupPageContent_GroupFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EditGroupPageContent_Group" },
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
            kind: "FragmentSpread",
            name: { kind: "Name", value: "DeleteGroupButton_Group" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "students" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DeleteGroupButton_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
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
} as unknown as DocumentNode<EditGroupPageContent_GroupFragment, unknown>;
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
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "CollectionPageContent_Collection",
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
      name: { kind: "Name", value: "CollectionPageContent_Collection" },
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
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
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
                  name: { kind: "Name", value: "evaluations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "GroupOverviewPageContent_Group",
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
      name: { kind: "Name", value: "GroupOverviewPageContent_Group" },
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
} as unknown as DocumentNode<
  GroupOverviewPage_GetGroupQuery,
  GroupOverviewPage_GetGroupQueryVariables
>;
export const UpdateEvaluationsPageContent_UpdateEvaluationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateEvaluationsPageContent_UpdateEvaluations",
      },
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
  UpdateEvaluationsPageContent_UpdateEvaluationsMutation,
  UpdateEvaluationsPageContent_UpdateEvaluationsMutationVariables
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
                    value: "UpdateEvaluationsPageContent_Collection",
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateEvaluationsPageContent_Collection" },
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
export const DeleteGroupButton_DeleteGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteGroupButton_DeleteGroup" },
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
  DeleteGroupButton_DeleteGroupMutation,
  DeleteGroupButton_DeleteGroupMutationVariables
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
export const EditGroupPageContent_UpdateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EditGroupPageContent_UpdateGroup" },
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
  EditGroupPageContent_UpdateGroupMutation,
  EditGroupPageContent_UpdateGroupMutationVariables
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "EditGroupPageContent_Group" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DeleteGroupButton_Group" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Group" },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EditGroupPageContent_Group" },
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
            kind: "FragmentSpread",
            name: { kind: "Name", value: "DeleteGroupButton_Group" },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "students" },
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
} as unknown as DocumentNode<
  EditGroupPage_GetGroupQuery,
  EditGroupPage_GetGroupQueryVariables
>;
