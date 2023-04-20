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
  getSubjects: Array<Subject>;
  getYearInfos: Array<ClassYearInfo>;
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
  updateCollection: EvaluationCollection;
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
};

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
  evaluations?: InputMaybe<Array<CreateEvaluationInput>>;
};

export type UpdateCollectionInput = {
  date?: InputMaybe<Scalars["Date"]>;
  type?: InputMaybe<Scalars["String"]>;
  environmentCode?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  evaluations?: InputMaybe<Array<UpdateEvaluationInput>>;
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

export type CollectionsChart_EvaluationCollectionFragment = {
  __typename?: "EvaluationCollection";
  id: string;
  date: string;
  environment: { __typename?: "Environment"; label: string; code: string };
  evaluations: Array<{
    __typename?: "Evaluation";
    skillsRating?: Rating | null;
    behaviourRating?: Rating | null;
    wasPresent: boolean;
  }>;
} & { " $fragmentName"?: "CollectionsChart_EvaluationCollectionFragment" };

export type EvaluationsBarChart_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  skillsRating?: Rating | null;
  behaviourRating?: Rating | null;
  wasPresent: boolean;
  collection: {
    __typename?: "EvaluationCollection";
    environment: {
      __typename?: "Environment";
      label: string;
      code: string;
      color: string;
    };
  };
} & { " $fragmentName"?: "EvaluationsBarChart_EvaluationFragment" };

export type GroupList_GroupFragmentFragment = {
  __typename?: "Group";
  id: string;
  name: string;
  teacher: { __typename?: "Teacher"; id: string };
} & { " $fragmentName"?: "GroupList_GroupFragmentFragment" };

export type EvaluationsLineChart_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  skillsRating?: Rating | null;
  behaviourRating?: Rating | null;
  wasPresent: boolean;
  collection: {
    __typename?: "EvaluationCollection";
    date: string;
    environment: { __typename?: "Environment"; label: string; code: string };
  };
} & { " $fragmentName"?: "EvaluationsLineChart_EvaluationFragment" };

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
    environment: { __typename?: "Environment"; label: string };
  };
  student: { __typename?: "Student"; name: string };
} & { " $fragmentName"?: "EvaluationsAccordion_EvaluationFragment" };

export type UpdateCollectionForm_EnvironmentFragment = {
  __typename?: "Environment";
  label: string;
  code: string;
  color: string;
} & { " $fragmentName"?: "UpdateCollectionForm_EnvironmentFragment" };

export type UpdateCollectionForm_GroupFragment = {
  __typename?: "Group";
  subject: {
    __typename?: "Subject";
    environments: Array<
      { __typename?: "Environment" } & {
        " $fragmentRefs"?: {
          UpdateCollectionForm_EnvironmentFragment: UpdateCollectionForm_EnvironmentFragment;
        };
      }
    >;
  };
  students: Array<{ __typename?: "Student"; id: string; name: string }>;
} & { " $fragmentName"?: "UpdateCollectionForm_GroupFragment" };

export type UpdateCollectionForm_CollectionFragment = {
  __typename?: "EvaluationCollection";
  date: string;
  type: string;
  description?: string | null;
  environment: { __typename?: "Environment"; code: string };
  classYear: {
    __typename?: "ClassYear";
    group: {
      __typename?: "Group";
      subject: {
        __typename?: "Subject";
        environments: Array<
          { __typename?: "Environment" } & {
            " $fragmentRefs"?: {
              UpdateCollectionForm_EnvironmentFragment: UpdateCollectionForm_EnvironmentFragment;
            };
          }
        >;
      };
    };
  };
  evaluations: Array<{
    __typename?: "Evaluation";
    wasPresent: boolean;
    student: { __typename?: "Student"; id: string; name: string };
  }>;
} & { " $fragmentName"?: "UpdateCollectionForm_CollectionFragment" };

export type UpdateCollectionsList_CollectionFragment = {
  __typename?: "EvaluationCollection";
  id: string;
  date: string;
  environment: { __typename?: "Environment"; label: string };
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
  classYearId: Scalars["ID"];
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

export type StudentEvaluationRecap_EvaluationFragment = ({
  __typename?: "Evaluation";
  id: string;
  wasPresent: boolean;
  behaviourRating?: Rating | null;
  skillsRating?: Rating | null;
} & {
  " $fragmentRefs"?: {
    EvaluationsLineChart_EvaluationFragment: EvaluationsLineChart_EvaluationFragment;
    EvaluationsBarChart_EvaluationFragment: EvaluationsBarChart_EvaluationFragment;
  };
}) & { " $fragmentName"?: "StudentEvaluationRecap_EvaluationFragment" };

export type StudentEvaluationRecap_StudentFragment = {
  __typename?: "Student";
  id: string;
  name: string;
} & { " $fragmentName"?: "StudentEvaluationRecap_StudentFragment" };

export type UpdateEvaluationCard_EvaluationFragment = {
  __typename?: "Evaluation";
  id: string;
  skillsRating?: Rating | null;
  behaviourRating?: Rating | null;
  notes?: string | null;
  wasPresent: boolean;
  student: { __typename?: "Student"; id: string; name: string };
} & { " $fragmentName"?: "UpdateEvaluationCard_EvaluationFragment" };

export type RegisterPage_RegisterMutationVariables = Exact<{
  input: CreateTeacherInput;
}>;

export type RegisterPage_RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type CreateCollectionMutationVariables = Exact<{
  data: CreateCollectionInput;
  classYearId: Scalars["ID"];
}>;

export type CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
    description?: string | null;
    environment: { __typename?: "Environment"; code: string };
  };
};

export type CreateCollectionWithEvaluationsMutationVariables = Exact<{
  data: CreateCollectionInput;
  classYearId: Scalars["ID"];
}>;

export type CreateCollectionWithEvaluationsMutation = {
  __typename?: "Mutation";
  createCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
    description?: string | null;
    environment: { __typename?: "Environment"; code: string };
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

export type CreateCollectionWithInvalidSubjectCodeMutationVariables = Exact<{
  data: CreateCollectionInput;
  classYearId: Scalars["ID"];
}>;

export type CreateCollectionWithInvalidSubjectCodeMutation = {
  __typename?: "Mutation";
  createCollection: { __typename?: "EvaluationCollection"; id: string };
};

export type CreateStudentMutationVariables = Exact<{
  data: CreateStudentInput;
  classYearId: Scalars["ID"];
}>;

export type CreateStudentMutation = {
  __typename?: "Mutation";
  createStudent: {
    __typename?: "Student";
    id: string;
    name: string;
    group: { __typename?: "Group"; id: string };
  };
};

export type DeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars["ID"];
}>;

export type DeleteCollectionMutation = {
  __typename?: "Mutation";
  deleteCollection: boolean;
};

export type DeleteStudentMutationVariables = Exact<{
  studentId: Scalars["ID"];
}>;

export type DeleteStudentMutation = {
  __typename?: "Mutation";
  deleteStudent: boolean;
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

export type CreateGroupWithInvalidSubjectCodeMutationVariables = Exact<{
  data: CreateGroupInput;
}>;

export type CreateGroupWithInvalidSubjectCodeMutation = {
  __typename?: "Mutation";
  createGroup: { __typename?: "Group"; id: string };
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

export type DeleteGroupMutationVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type RegisterMutationVariables = Exact<{
  data: CreateTeacherInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "Teacher"; id: string; email: string };
};

export type UpdateCollectionTest_UpdateCollectionDefaultMutationVariables =
  Exact<{
    data: UpdateCollectionInput;
    collectionId: Scalars["ID"];
  }>;

export type UpdateCollectionTest_UpdateCollectionDefaultMutation = {
  __typename?: "Mutation";
  updateCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
    environment: { __typename?: "Environment"; code: string };
  };
};

export type UpdateCollectionTest_UpdateCollectionEvaluationMutationVariables =
  Exact<{
    data: UpdateCollectionInput;
    collectionId: Scalars["ID"];
  }>;

export type UpdateCollectionTest_UpdateCollectionEvaluationMutation = {
  __typename?: "Mutation";
  updateCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    evaluations: Array<{
      __typename?: "Evaluation";
      id: string;
      skillsRating?: Rating | null;
      behaviourRating?: Rating | null;
    }>;
  };
};

export type UpdateCollectionTest_UpdateCollectionErrorMutationVariables =
  Exact<{
    data: UpdateCollectionInput;
    collectionId: Scalars["ID"];
  }>;

export type UpdateCollectionTest_UpdateCollectionErrorMutation = {
  __typename?: "Mutation";
  updateCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    date: string;
  };
};

export type UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCodeMutationVariables =
  Exact<{
    data: UpdateCollectionInput;
    collectionId: Scalars["ID"];
  }>;

export type UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCodeMutation =
  {
    __typename?: "Mutation";
    updateCollection: {
      __typename?: "EvaluationCollection";
      id: string;
      date: string;
    };
  };

export type UpdateEvaluationTest_UpdateEvaluationDefaultMutationVariables =
  Exact<{
    data: UpdateEvaluationInput;
  }>;

export type UpdateEvaluationTest_UpdateEvaluationDefaultMutation = {
  __typename?: "Mutation";
  updateEvaluation: {
    __typename?: "Evaluation";
    id: string;
    wasPresent: boolean;
    skillsRating?: Rating | null;
    behaviourRating?: Rating | null;
    notes?: string | null;
  };
};

export type UpdateEvaluationTest_UpdateEvaluationErrorMutationVariables =
  Exact<{
    data: UpdateEvaluationInput;
  }>;

export type UpdateEvaluationTest_UpdateEvaluationErrorMutation = {
  __typename?: "Mutation";
  updateEvaluation: {
    __typename?: "Evaluation";
    id: string;
    wasPresent: boolean;
    skillsRating?: Rating | null;
    behaviourRating?: Rating | null;
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

export type UpdateEvaluationsMutationVariables = Exact<{
  data: Array<UpdateEvaluationInput> | UpdateEvaluationInput;
  collectionId: Scalars["ID"];
}>;

export type UpdateEvaluationsMutation = {
  __typename?: "Mutation";
  updateEvaluations: number;
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

export type CreateGroupPage_CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;

export type CreateGroupPage_CreateGroupMutation = {
  __typename?: "Mutation";
  createGroup: { __typename?: "Group"; id: string; name: string };
};

export type CreateGroupPage_GetSubjectsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CreateGroupPage_GetSubjectsQuery = {
  __typename?: "Query";
  getSubjects: Array<{ __typename?: "Subject"; code: string; label: string }>;
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
    description?: string | null;
    environment: { __typename?: "Environment"; label: string; color: string };
    classYear: {
      __typename?: "ClassYear";
      group: { __typename?: "Group"; name: string; id: string };
    };
    evaluations: Array<
      { __typename?: "Evaluation"; id: string } & {
        " $fragmentRefs"?: {
          EvaluationsAccordion_EvaluationFragment: EvaluationsAccordion_EvaluationFragment;
        };
      }
    >;
  };
};

export type CollectionPage_DeleteCollectionMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type CollectionPage_DeleteCollectionMutation = {
  __typename?: "Mutation";
  deleteCollection: boolean;
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
    currentClassEvaluations: Array<
      { __typename?: "Evaluation"; id: string; notes?: string | null } & {
        " $fragmentRefs"?: {
          EvaluationsAccordion_EvaluationFragment: EvaluationsAccordion_EvaluationFragment;
          StudentEvaluationRecap_EvaluationFragment: StudentEvaluationRecap_EvaluationFragment;
        };
      }
    >;
  } & {
    " $fragmentRefs"?: {
      StudentEvaluationRecap_StudentFragment: StudentEvaluationRecap_StudentFragment;
    };
  };
};

export type EditCollectionPageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EditCollectionPageQuery = {
  __typename?: "Query";
  getCollection: {
    __typename?: "EvaluationCollection";
    id: string;
    evaluations: Array<{
      __typename?: "Evaluation";
      id: string;
      student: { __typename?: "Student"; id: string };
    }>;
  } & {
    " $fragmentRefs"?: {
      UpdateCollectionForm_CollectionFragment: UpdateCollectionForm_CollectionFragment;
    };
  };
};

export type EditCollectionPage_UpdateCollectionMutationVariables = Exact<{
  input: UpdateCollectionInput;
  id: Scalars["ID"];
}>;

export type EditCollectionPage_UpdateCollectionMutation = {
  __typename?: "Mutation";
  updateCollection: { __typename?: "EvaluationCollection"; id: string };
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
      environment: { __typename?: "Environment"; label: string };
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

export type GroupOverviewPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: {
    __typename?: "Group";
    id: string;
    name: string;
    currentClassYear: {
      __typename?: "ClassYear";
      students: Array<{ __typename?: "Student"; id: string; name: string }>;
      evaluationCollections: Array<
        {
          __typename?: "EvaluationCollection";
          id: string;
          date: string;
          environment: { __typename?: "Environment"; label: string };
        } & {
          " $fragmentRefs"?: {
            CollectionsChart_EvaluationCollectionFragment: CollectionsChart_EvaluationCollectionFragment;
          };
        }
      >;
    };
  };
};

export type GroupOverviewPage_DeleteGroupMutationVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type GroupOverviewPage_DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
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
    subject: { __typename?: "Subject"; label: string };
    students: Array<
      { __typename?: "Student" } & {
        " $fragmentRefs"?: {
          UpdateStudentsList_StudentFragment: UpdateStudentsList_StudentFragment;
        };
      }
    >;
    currentClassYear: {
      __typename?: "ClassYear";
      id: string;
      evaluationCollections: Array<
        { __typename?: "EvaluationCollection" } & {
          " $fragmentRefs"?: {
            UpdateCollectionsList_CollectionFragment: UpdateCollectionsList_CollectionFragment;
          };
        }
      >;
    };
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

export type CreateCollectionPage_GetGroupQueryVariables = Exact<{
  groupId: Scalars["ID"];
}>;

export type CreateCollectionPage_GetGroupQuery = {
  __typename?: "Query";
  getGroup: {
    __typename?: "Group";
    id: string;
    currentClassYear: { __typename?: "ClassYear"; id: string };
  } & {
    " $fragmentRefs"?: {
      UpdateCollectionForm_GroupFragment: UpdateCollectionForm_GroupFragment;
    };
  };
};

export type CreateCollectionPage_CreateCollectionMutationVariables = Exact<{
  createCollectionInput: CreateCollectionInput;
  classYearId: Scalars["ID"];
}>;

export type CreateCollectionPage_CreateCollectionMutation = {
  __typename?: "Mutation";
  createCollection: { __typename?: "EvaluationCollection"; id: string };
};

export type StudentDetailsPageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type StudentDetailsPageQuery = {
  __typename?: "Query";
  getStudent: {
    __typename?: "Student";
    id: string;
    name: string;
    group: { __typename?: "Group"; id: string };
    currentClassEvaluations: Array<{
      __typename?: "Evaluation";
      id: string;
      notes?: string | null;
    }>;
  };
};

export const CollectionsChart_EvaluationCollectionFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CollectionsChart_EvaluationCollection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skillsRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "behaviourRating" },
                },
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CollectionsChart_EvaluationCollectionFragment,
  unknown
>;
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                    ],
                  },
                },
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
export const UpdateCollectionForm_EnvironmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionForm_Environment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Environment" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCollectionForm_EnvironmentFragment, unknown>;
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
            name: { kind: "Name", value: "subject" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environments" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "UpdateCollectionForm_Environment",
                        },
                      },
                    ],
                  },
                },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionForm_Environment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Environment" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
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
          { kind: "Field", name: { kind: "Name", value: "date" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "classYear" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subject" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "environments" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "FragmentSpread",
                                    name: {
                                      kind: "Name",
                                      value: "UpdateCollectionForm_Environment",
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
            },
          },
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
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UpdateCollectionForm_Environment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Environment" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCollectionForm_CollectionFragment, unknown>;
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
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCollectionsList_CollectionFragment, unknown>;
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
export const EvaluationsLineChart_EvaluationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationsLineChart_Evaluation" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EvaluationsLineChart_EvaluationFragment, unknown>;
export const EvaluationsBarChart_EvaluationFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationsBarChart_Evaluation" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
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
} as unknown as DocumentNode<EvaluationsBarChart_EvaluationFragment, unknown>;
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
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EvaluationsLineChart_Evaluation" },
          },
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EvaluationsBarChart_Evaluation" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationsLineChart_Evaluation" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
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
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationsBarChart_Evaluation" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
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
  StudentEvaluationRecap_EvaluationFragment,
  unknown
>;
export const StudentEvaluationRecap_StudentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentEvaluationRecap_Student" },
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
} as unknown as DocumentNode<StudentEvaluationRecap_StudentFragment, unknown>;
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
} as unknown as DocumentNode<UpdateEvaluationCard_EvaluationFragment, unknown>;
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
            name: { kind: "Name", value: "classYearId" },
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
                name: { kind: "Name", value: "classYearId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classYearId" },
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
            name: { kind: "Name", value: "classYearId" },
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
                name: { kind: "Name", value: "classYearId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classYearId" },
                },
              },
            ],
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
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
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
            name: { kind: "Name", value: "classYearId" },
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
                name: { kind: "Name", value: "classYearId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classYearId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
export const CreateCollectionWithInvalidSubjectCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCollectionWithInvalidSubjectCode" },
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
            name: { kind: "Name", value: "classYearId" },
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
                name: { kind: "Name", value: "classYearId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classYearId" },
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
  CreateCollectionWithInvalidSubjectCodeMutation,
  CreateCollectionWithInvalidSubjectCodeMutationVariables
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
            name: { kind: "Name", value: "classYearId" },
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
                name: { kind: "Name", value: "classYearId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classYearId" },
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
export const CreateGroupWithInvalidSubjectCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGroupWithInvalidSubjectCode" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateGroupWithInvalidSubjectCodeMutation,
  CreateGroupWithInvalidSubjectCodeMutationVariables
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
export const UpdateCollectionTest_UpdateCollectionDefaultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateCollectionTest_UpdateCollectionDefault",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateCollectionInput" },
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
            name: { kind: "Name", value: "updateCollection" },
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
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "date" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCollectionTest_UpdateCollectionDefaultMutation,
  UpdateCollectionTest_UpdateCollectionDefaultMutationVariables
>;
export const UpdateCollectionTest_UpdateCollectionEvaluationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateCollectionTest_UpdateCollectionEvaluation",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateCollectionInput" },
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
            name: { kind: "Name", value: "updateCollection" },
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
} as unknown as DocumentNode<
  UpdateCollectionTest_UpdateCollectionEvaluationMutation,
  UpdateCollectionTest_UpdateCollectionEvaluationMutationVariables
>;
export const UpdateCollectionTest_UpdateCollectionErrorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateCollectionTest_UpdateCollectionError",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateCollectionInput" },
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
            name: { kind: "Name", value: "updateCollection" },
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
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCollectionTest_UpdateCollectionErrorMutation,
  UpdateCollectionTest_UpdateCollectionErrorMutationVariables
>;
export const UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCodeDocument =
  {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "mutation",
        name: {
          kind: "Name",
          value: "UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCode",
        },
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: { kind: "Name", value: "data" },
            },
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "UpdateCollectionInput" },
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
              name: { kind: "Name", value: "updateCollection" },
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
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  { kind: "Field", name: { kind: "Name", value: "id" } },
                  { kind: "Field", name: { kind: "Name", value: "date" } },
                ],
              },
            },
          ],
        },
      },
    ],
  } as unknown as DocumentNode<
    UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCodeMutation,
    UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCodeMutationVariables
  >;
export const UpdateEvaluationTest_UpdateEvaluationDefaultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateEvaluationTest_UpdateEvaluationDefault",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEvaluationTest_UpdateEvaluationDefaultMutation,
  UpdateEvaluationTest_UpdateEvaluationDefaultMutationVariables
>;
export const UpdateEvaluationTest_UpdateEvaluationErrorDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateEvaluationTest_UpdateEvaluationError",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
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
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEvaluationTest_UpdateEvaluationErrorMutation,
  UpdateEvaluationTest_UpdateEvaluationErrorMutationVariables
>;
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
export const CreateGroupPage_GetSubjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "CreateGroupPage_GetSubjects" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getSubjects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateGroupPage_GetSubjectsQuery,
  CreateGroupPage_GetSubjectsQueryVariables
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "classYear" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "group" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                    ],
                  },
                },
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
export const CollectionPage_DeleteCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CollectionPage_DeleteCollection" },
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
  CollectionPage_DeleteCollectionMutation,
  CollectionPage_DeleteCollectionMutationVariables
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
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "StudentEvaluationRecap_Student",
                  },
                },
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
                  name: { kind: "Name", value: "currentClassEvaluations" },
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
      name: { kind: "Name", value: "EvaluationsLineChart_Evaluation" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
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
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "EvaluationsBarChart_Evaluation" },
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
          { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
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
      name: { kind: "Name", value: "StudentEvaluationRecap_Student" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                    ],
                  },
                },
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
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EvaluationsLineChart_Evaluation" },
          },
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "EvaluationsBarChart_Evaluation" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentPage_GetStudentQuery,
  StudentPage_GetStudentQueryVariables
>;
export const EditCollectionPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EditCollectionPage" },
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
            name: { kind: "Name", value: "getCollection" },
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
                    value: "UpdateCollectionForm_Collection",
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
      name: { kind: "Name", value: "UpdateCollectionForm_Environment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Environment" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
        ],
      },
    },
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
          { kind: "Field", name: { kind: "Name", value: "date" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "code" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "classYear" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subject" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "environments" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "FragmentSpread",
                                    name: {
                                      kind: "Name",
                                      value: "UpdateCollectionForm_Environment",
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
            },
          },
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
} as unknown as DocumentNode<
  EditCollectionPageQuery,
  EditCollectionPageQueryVariables
>;
export const EditCollectionPage_UpdateCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EditCollectionPage_UpdateCollection" },
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
              name: { kind: "Name", value: "UpdateCollectionInput" },
            },
          },
        },
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
            name: { kind: "Name", value: "updateCollection" },
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
                name: { kind: "Name", value: "collectionId" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EditCollectionPage_UpdateCollectionMutation,
  EditCollectionPage_UpdateCollectionMutationVariables
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "environment" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
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
                  name: { kind: "Name", value: "currentClassYear" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "students" },
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
                        name: { kind: "Name", value: "evaluationCollections" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "date" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "environment" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "label" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CollectionsChart_EvaluationCollection",
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
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CollectionsChart_EvaluationCollection" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvaluationCollection" },
      },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skillsRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "behaviourRating" },
                },
                { kind: "Field", name: { kind: "Name", value: "wasPresent" } },
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
                  name: { kind: "Name", value: "subject" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
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
                  name: { kind: "Name", value: "currentClassYear" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "environment" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
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
                  kind: "Field",
                  name: { kind: "Name", value: "currentClassYear" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
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
      name: { kind: "Name", value: "UpdateCollectionForm_Environment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Environment" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "label" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
          { kind: "Field", name: { kind: "Name", value: "color" } },
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
            name: { kind: "Name", value: "subject" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "environments" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "UpdateCollectionForm_Environment",
                        },
                      },
                    ],
                  },
                },
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
            name: { kind: "Name", value: "classYearId" },
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
                name: { kind: "Name", value: "classYearId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classYearId" },
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
export const StudentDetailsPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentDetailsPage" },
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
            name: { kind: "Name", value: "getStudent" },
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
                  name: { kind: "Name", value: "currentClassEvaluations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
  StudentDetailsPageQuery,
  StudentDetailsPageQueryVariables
>;
