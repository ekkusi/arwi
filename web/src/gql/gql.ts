/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  mutation Header_Logout {\n    logout\n  }\n": types.Header_LogoutDocument,
    "\n  mutation DeleteUserAndModalButton_DeleteTeacher($id: ID!) {\n    deleteTeacher(teacherId: $id) {\n      id\n    }\n  }\n": types.DeleteUserAndModalButton_DeleteTeacherDocument,
    "\n  query AccountDeletePage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n    }\n  }\n": types.AccountDeletePage_GetCurrentUserDocument,
    "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      userData {\n        email\n        id\n        languagePreference\n        consentsAnalytics\n        isMPassIDConnected\n      }\n    }\n  }\n": types.LoginPage_LoginDocument,
    "\n  query Testi_GetCurrentUser {\n    getCurrentUser {\n      email\n      languagePreference\n      consentsAnalytics\n      id\n      isMPassIDConnected\n    }\n  }\n": types.Testi_GetCurrentUserDocument,
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
export function graphql(source: "\n  mutation Header_Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Header_Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUserAndModalButton_DeleteTeacher($id: ID!) {\n    deleteTeacher(teacherId: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUserAndModalButton_DeleteTeacher($id: ID!) {\n    deleteTeacher(teacherId: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AccountDeletePage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n    }\n  }\n"): (typeof documents)["\n  query AccountDeletePage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      userData {\n        email\n        id\n        languagePreference\n        consentsAnalytics\n        isMPassIDConnected\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      userData {\n        email\n        id\n        languagePreference\n        consentsAnalytics\n        isMPassIDConnected\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Testi_GetCurrentUser {\n    getCurrentUser {\n      email\n      languagePreference\n      consentsAnalytics\n      id\n      isMPassIDConnected\n    }\n  }\n"): (typeof documents)["\n  query Testi_GetCurrentUser {\n    getCurrentUser {\n      email\n      languagePreference\n      consentsAnalytics\n      id\n      isMPassIDConnected\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;