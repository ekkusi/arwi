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
  "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n":
    types.RegisterForm_RegisterDocument,
  "\n  fragment CreateCollectionForm_Class on Class {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n":
    types.CreateCollectionForm_ClassFragmentDoc,
  "\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $classId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, classId: $classId) {\n      id\n    }\n  }\n":
    types.CreateCollectionForm_CreateCollectionDocument,
  "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n":
    types.StudentParticipationList_StudentFragmentDoc,
  "\n  query CreateCollectionPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      ...CreateCollectionForm_Class\n    }\n  }\n":
    types.CreateCollectionPage_GetClassDocument,
  "\n  query ClassOverviewPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      id\n      name\n      students {\n        name\n      }\n      teacher {\n        id\n      }\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n":
    types.ClassOverviewPage_GetClassDocument,
  "\n  mutation CreateClassForm_CreateClass($input: CreateClassInput!) {\n    createClass(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateClassForm_CreateClassDocument,
  "\n  fragment AddEvaluationsList_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      student {\n        id\n        name\n      }\n    }\n  }\n":
    types.AddEvaluationsList_CollectionFragmentDoc,
  "\n  mutation AddEvaluationsList_AddEvaluations(\n    $addEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(data: $addEvaluationsInput, collectionId: $collectionId)\n  }\n":
    types.AddEvaluationsList_AddEvaluationsDocument,
  "\n  query AddEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      class {\n        id\n        teacher {\n          id\n        }\n      }\n      ...AddEvaluationsList_Collection\n    }\n  }\n":
    types.AddEvaluationsPage_GetCollectionDocument,
  "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      class {\n        name\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n      }\n    }\n  }\n":
    types.CollectionPage_GetCollectionDocument,
  "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      classes {\n        ...ClassList_ClassFragment\n      }\n    }\n  }\n":
    types.MainPage_GetTeacherDocument,
  "\n  fragment ClassList_ClassFragment on Class {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n":
    types.ClassList_ClassFragmentFragmentDoc,
  "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n":
    types.Auth_LoginDocument,
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
  source: "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CreateCollectionForm_Class on Class {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n"
): (typeof documents)["\n  fragment CreateCollectionForm_Class on Class {\n    id\n    evaluationTypes\n    students {\n      ...StudentParticipationList_Student\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $classId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, classId: $classId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCollectionForm_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $classId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, classId: $classId) {\n      id\n    }\n  }\n"];
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
  source: "\n  query CreateCollectionPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      ...CreateCollectionForm_Class\n    }\n  }\n"
): (typeof documents)["\n  query CreateCollectionPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      ...CreateCollectionForm_Class\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ClassOverviewPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      id\n      name\n      students {\n        name\n      }\n      teacher {\n        id\n      }\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ClassOverviewPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      id\n      name\n      students {\n        name\n      }\n      teacher {\n        id\n      }\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateClassForm_CreateClass($input: CreateClassInput!) {\n    createClass(data: $input) {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateClassForm_CreateClass($input: CreateClassInput!) {\n    createClass(data: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AddEvaluationsList_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      student {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment AddEvaluationsList_Collection on EvaluationCollection {\n    id\n    evaluations {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      student {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddEvaluationsList_AddEvaluations(\n    $addEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(data: $addEvaluationsInput, collectionId: $collectionId)\n  }\n"
): (typeof documents)["\n  mutation AddEvaluationsList_AddEvaluations(\n    $addEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(data: $addEvaluationsInput, collectionId: $collectionId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AddEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      class {\n        id\n        teacher {\n          id\n        }\n      }\n      ...AddEvaluationsList_Collection\n    }\n  }\n"
): (typeof documents)["\n  query AddEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      class {\n        id\n        teacher {\n          id\n        }\n      }\n      ...AddEvaluationsList_Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      class {\n        name\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      class {\n        name\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      classes {\n        ...ClassList_ClassFragment\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      classes {\n        ...ClassList_ClassFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ClassList_ClassFragment on Class {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n"
): (typeof documents)["\n  fragment ClassList_ClassFragment on Class {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
