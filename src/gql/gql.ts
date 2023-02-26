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
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\n  fragment ClassList_Class on Class {\n    id\n    name\n  }\n":
    types.ClassList_ClassFragmentDoc,
  "\n  mutation RegisterForm_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n":
    types.RegisterForm_RegisterDocument,
  "\n  query ClassOverviewPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      id\n      name\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n":
    types.ClassOverviewPage_GetClassDocument,
  "\n  mutation CreateClassForm_CreateClass($input: CreateClassInput!) {\n    createClass(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateClassForm_CreateClassDocument,
  "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      classes {\n        id\n        name\n      }\n    }\n  }\n":
    types.MainPage_GetTeacherDocument,
  "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n":
    types.Auth_LoginDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
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
  source: "\n  fragment ClassList_Class on Class {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment ClassList_Class on Class {\n    id\n    name\n  }\n"];
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
  source: "\n  query ClassOverviewPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      id\n      name\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ClassOverviewPage_GetClass($classId: ID!) {\n    getClass(id: $classId) {\n      id\n      name\n      evaluationCollections {\n        id\n        date\n        type\n        description\n        evaluations {\n          student {\n            name\n          }\n          skillsRating\n          behaviourRating\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      classes {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MainPage_GetTeacher($teacherId: ID!) {\n    getTeacher(id: $teacherId) {\n      email\n      id\n      classes {\n        id\n        name\n      }\n    }\n  }\n"];
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
