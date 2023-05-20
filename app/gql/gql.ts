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
  "\n  fragment GroupListItem on Group {\n    id\n    name\n    subject {\n      label\n      code\n    }\n    updatedAt\n  }\n":
    types.GroupListItemFragmentDoc,
  "\n  mutation ApolloProvider_RefreshToken {\n    refreshToken {\n      accessToken\n    }\n  }\n": types.ApolloProvider_RefreshTokenDocument,
  "\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        updatedAt\n        subject {\n          label\n          code\n        }\n      }\n    }\n  }\n":
    types.MainPage_GetCurrentUserDocument,
  "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n    }\n  }\n":
    types.LoginPage_LoginDocument,
  "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n    }\n  }\n":
    types.RegisterPage_RegisterDocument,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n":
    types.GroupOverviewPage_DeleteGroupDocument,
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
  source: "\n  fragment GroupListItem on Group {\n    id\n    name\n    subject {\n      label\n      code\n    }\n    updatedAt\n  }\n"
): (typeof documents)["\n  fragment GroupListItem on Group {\n    id\n    name\n    subject {\n      label\n      code\n    }\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ApolloProvider_RefreshToken {\n    refreshToken {\n      accessToken\n    }\n  }\n"
): (typeof documents)["\n  mutation ApolloProvider_RefreshToken {\n    refreshToken {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        updatedAt\n        subject {\n          label\n          code\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        updatedAt\n        subject {\n          label\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"
): (typeof documents)["\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"
): (typeof documents)["\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
