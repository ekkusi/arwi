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
  "\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n":
    types.GroupList_GroupFragmentFragmentDoc,
  "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      groups {\n        ...GroupList_GroupFragment\n      }\n    }\n  }\n":
    types.MainPage_GetTeacherDocument,
  "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n":
    types.RegisterForm_RegisterDocument,
  "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n":
    types.Auth_LoginDocument,
  "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      group {\n        name\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n      }\n    }\n  }\n":
    types.CollectionPage_GetCollectionDocument,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        name\n      }\n      teacher {\n        id\n      }\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  fragment UpdateEvaluationsList_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n":
    types.UpdateEvaluationsList_CollectionFragmentDoc,
  "\n  mutation UpdateEvaluationsList_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n":
    types.UpdateEvaluationsList_UpdateEvaluationsDocument,
  "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      group {\n        id\n        teacher {\n          id\n        }\n      }\n      ...UpdateEvaluationsList_Collection\n    }\n  }\n":
    types.UpdateEvaluationsPage_GetCollectionDocument,
  "\n  mutation CreateGroupForm_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateGroupForm_CreateGroupDocument,
  "\n  fragment CreateCollectionForm_Group on Group {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n":
    types.CreateCollectionForm_GroupFragmentDoc,
  "\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n":
    types.CreateCollectionForm_CreateCollectionDocument,
  "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...CreateCollectionForm_Group\n    }\n  }\n":
    types.CreateCollectionPage_GetGroupDocument,
  "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n":
    types.StudentParticipationList_StudentFragmentDoc,
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
  source: "\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n"
): (typeof documents)["\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n"];
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
  source: "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"];
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
  source: "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      group {\n        name\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      group {\n        name\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        name\n      }\n      teacher {\n        id\n      }\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        name\n      }\n      teacher {\n        id\n      }\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateEvaluationsList_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateEvaluationsList_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateEvaluationsList_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n"
): (typeof documents)["\n  mutation UpdateEvaluationsList_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      group {\n        id\n        teacher {\n          id\n        }\n      }\n      ...UpdateEvaluationsList_Collection\n    }\n  }\n"
): (typeof documents)["\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      group {\n        id\n        teacher {\n          id\n        }\n      }\n      ...UpdateEvaluationsList_Collection\n    }\n  }\n"];
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
  source: "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...CreateCollectionForm_Group\n    }\n  }\n"
): (typeof documents)["\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      ...CreateCollectionForm_Group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
