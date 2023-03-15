/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      groups {\n        ...GroupList_GroupFragment\n      }\n    }\n  }\n":
    types.MainPage_GetTeacherDocument,
  "\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n":
    types.GroupList_GroupFragmentFragmentDoc,
  "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n":
    types.RegisterForm_RegisterDocument,
  "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      ...CollectionPageContent_Collection\n    }\n  }\n":
    types.CollectionPage_GetCollectionDocument,
  "\n  fragment CollectionPageContent_Collection on EvaluationCollection {\n    id\n    date\n    type\n    group {\n      name\n    }\n    evaluations {\n      id\n      student {\n        id\n        name\n      }\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n    }\n  }\n":
    types.CollectionPageContent_CollectionFragmentDoc,
  "\n  fragment GroupOverviewPageContent_Group on Group {\n    id\n    name\n    students {\n      id\n      name\n    }\n    evaluationCollections {\n      id\n      date\n      type\n    }\n  }\n":
    types.GroupOverviewPageContent_GroupFragmentDoc,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...GroupOverviewPageContent_Group\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  mutation CreateGroupForm_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateGroupForm_CreateGroupDocument,
  "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n":
    types.Auth_LoginDocument,
  "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      evaluations {\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n":
    types.StudentPage_GetStudentDocument,
  "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n  }\n":
    types.StudentEvaluationRecap_EvaluationFragmentDoc,
  "\n  fragment UpdateEvaluationsPageContent_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n":
    types.UpdateEvaluationsPageContent_CollectionFragmentDoc,
  "\n  mutation UpdateEvaluationsPageContent_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n":
    types.UpdateEvaluationsPageContent_UpdateEvaluationsDocument,
  "\n  fragment CreateCollectionForm_Group on Group {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n":
    types.CreateCollectionForm_GroupFragmentDoc,
  "\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n":
    types.CreateCollectionForm_CreateCollectionDocument,
  "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n":
    types.StudentParticipationList_StudentFragmentDoc,
  "\n  mutation DeleteGroupButton_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n":
    types.DeleteGroupButton_DeleteGroupDocument,
  "\n  fragment DeleteGroupButton_Group on Group {\n    id\n    name\n  }\n":
    types.DeleteGroupButton_GroupFragmentDoc,
  "\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    type\n  }\n":
    types.UpdateCollectionsList_CollectionFragmentDoc,
  "\n  mutation UpdateCollectionList_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n":
    types.UpdateCollectionList_DeleteCollectionDocument,
  "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      ...UpdateEvaluationsPageContent_Collection\n    }\n  }\n":
    types.UpdateEvaluationsPage_GetCollectionDocument,
  "\n  fragment EditGroupPageContent_Group on Group {\n    id\n    name\n    ...DeleteGroupButton_Group\n    students {\n      ...UpdateStudentsList_Student\n    }\n    evaluationCollections {\n      ...UpdateCollectionsList_Collection\n    }\n  }\n":
    types.EditGroupPageContent_GroupFragmentDoc,
  "\n  mutation EditGroupPageContent_UpdateGroup(\n    $id: ID!\n    $input: UpdateGroupInput!\n  ) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n":
    types.EditGroupPageContent_UpdateGroupDocument,
  "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...CreateCollectionForm_Group\n    }\n  }\n":
    types.CreateCollectionPage_GetGroupDocument,
  "\n  fragment UpdateStudentsList_Student on Student {\n    id\n    name\n  }\n":
    types.UpdateStudentsList_StudentFragmentDoc,
  "\n  mutation UpdateStudentList_UpdateStudent(\n    $input: UpdateStudentInput!\n    $studentId: ID!\n  ) {\n    updateStudent(data: $input, studentId: $studentId) {\n      id\n    }\n  }\n":
    types.UpdateStudentList_UpdateStudentDocument,
  "\n  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {\n    deleteStudent(studentId: $studentId)\n  }\n":
    types.UpdateStudentList_DeleteStudentDocument,
  "\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...EditGroupPageContent_Group\n    }\n  }\n":
    types.EditGroupPage_GetGroupDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      groups {\n        ...GroupList_GroupFragment\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      groups {\n        ...GroupList_GroupFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n"
): (typeof documents)["\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      ...CollectionPageContent_Collection\n    }\n  }\n"
): (typeof documents)["\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      ...CollectionPageContent_Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionPageContent_Collection on EvaluationCollection {\n    id\n    date\n    type\n    group {\n      name\n    }\n    evaluations {\n      id\n      student {\n        id\n        name\n      }\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionPageContent_Collection on EvaluationCollection {\n    id\n    date\n    type\n    group {\n      name\n    }\n    evaluations {\n      id\n      student {\n        id\n        name\n      }\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment GroupOverviewPageContent_Group on Group {\n    id\n    name\n    students {\n      id\n      name\n    }\n    evaluationCollections {\n      id\n      date\n      type\n    }\n  }\n"
): (typeof documents)["\n  fragment GroupOverviewPageContent_Group on Group {\n    id\n    name\n    students {\n      id\n      name\n    }\n    evaluationCollections {\n      id\n      date\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...GroupOverviewPageContent_Group\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...GroupOverviewPageContent_Group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateGroupForm_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateGroupForm_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      evaluations {\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      evaluations {\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n  }\n"
): (typeof documents)["\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateEvaluationsPageContent_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateEvaluationsPageContent_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateEvaluationsPageContent_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n"
): (typeof documents)["\n  mutation UpdateEvaluationsPageContent_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CreateCollectionForm_Group on Group {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n"
): (typeof documents)["\n  fragment CreateCollectionForm_Group on Group {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteGroupButton_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"
): (typeof documents)["\n  mutation DeleteGroupButton_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment DeleteGroupButton_Group on Group {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment DeleteGroupButton_Group on Group {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    type\n  }\n"
): (typeof documents)["\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateCollectionList_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n"
): (typeof documents)["\n  mutation UpdateCollectionList_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      ...UpdateEvaluationsPageContent_Collection\n    }\n  }\n"
): (typeof documents)["\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      ...UpdateEvaluationsPageContent_Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EditGroupPageContent_Group on Group {\n    id\n    name\n    ...DeleteGroupButton_Group\n    students {\n      ...UpdateStudentsList_Student\n    }\n    evaluationCollections {\n      ...UpdateCollectionsList_Collection\n    }\n  }\n"
): (typeof documents)["\n  fragment EditGroupPageContent_Group on Group {\n    id\n    name\n    ...DeleteGroupButton_Group\n    students {\n      ...UpdateStudentsList_Student\n    }\n    evaluationCollections {\n      ...UpdateCollectionsList_Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EditGroupPageContent_UpdateGroup(\n    $id: ID!\n    $input: UpdateGroupInput!\n  ) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation EditGroupPageContent_UpdateGroup(\n    $id: ID!\n    $input: UpdateGroupInput!\n  ) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...CreateCollectionForm_Group\n    }\n  }\n"
): (typeof documents)["\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...CreateCollectionForm_Group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateStudentsList_Student on Student {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment UpdateStudentsList_Student on Student {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateStudentList_UpdateStudent(\n    $input: UpdateStudentInput!\n    $studentId: ID!\n  ) {\n    updateStudent(data: $input, studentId: $studentId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateStudentList_UpdateStudent(\n    $input: UpdateStudentInput!\n    $studentId: ID!\n  ) {\n    updateStudent(data: $input, studentId: $studentId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {\n    deleteStudent(studentId: $studentId)\n  }\n"
): (typeof documents)["\n  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {\n    deleteStudent(studentId: $studentId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...EditGroupPageContent_Group\n    }\n  }\n"
): (typeof documents)["\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...EditGroupPageContent_Group\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
