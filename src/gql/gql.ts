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
  "\n  query ClassOverviewPage_Query($classID: ID!) {\n    class(by: { id: $classID }) {\n      name\n      lessons(first: 10) {\n        edges {\n          node {\n            date\n            description\n            type\n            evaluations(first: 10) {\n              edges {\n                node {\n                  behaviourRating\n                  skillsRating\n                  notes\n                  student {\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.ClassOverviewPage_QueryDocument,
  "\n  mutation CreateClass($name: String!, $teacherID: ID!) {\n    classCreate(input: { name: $name, teacher: { link: $teacherID } }) {\n      class {\n        id\n        name\n      }\n    }\n  }\n":
    types.CreateClassDocument,
  "\n  query MainPage_Query($teacherEmail: Email!) {\n    teacher(by: { email: $teacherEmail }) {\n      email\n      name\n      class(first: 10) {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n":
    types.MainPage_QueryDocument,
  "\n  query GetTeacher($email: Email!) {\n    teacher(by: { email: $email }) {\n      id\n      email\n      name\n      passwordHash\n    }\n  }\n":
    types.GetTeacherDocument,
  "\n  mutation CreateTeacher(\n    $name: String!\n    $email: Email!\n    $passwordHash: String!\n  ) {\n    teacherCreate(\n      input: { name: $name, email: $email, passwordHash: $passwordHash }\n    ) {\n      teacher {\n        id\n        email\n        name\n        passwordHash\n      }\n    }\n  }\n":
    types.CreateTeacherDocument,
  "\n  mutation Register_RegisterTeacher(\n    $name: String!\n    $email: Email!\n    $passwordHash: String!\n  ) {\n    teacherCreate(\n      input: { name: $name, email: $email, passwordHash: $passwordHash }\n    ) {\n      teacher {\n        id\n        email\n        name\n        passwordHash\n      }\n    }\n  }\n":
    types.Register_RegisterTeacherDocument,
  "\n  query Register_GetTeacher($email: Email!) {\n    teacher(by: { email: $email }) {\n      email\n      id\n      name\n    }\n  }\n":
    types.Register_GetTeacherDocument,
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
  source: "\n  query ClassOverviewPage_Query($classID: ID!) {\n    class(by: { id: $classID }) {\n      name\n      lessons(first: 10) {\n        edges {\n          node {\n            date\n            description\n            type\n            evaluations(first: 10) {\n              edges {\n                node {\n                  behaviourRating\n                  skillsRating\n                  notes\n                  student {\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ClassOverviewPage_Query($classID: ID!) {\n    class(by: { id: $classID }) {\n      name\n      lessons(first: 10) {\n        edges {\n          node {\n            date\n            description\n            type\n            evaluations(first: 10) {\n              edges {\n                node {\n                  behaviourRating\n                  skillsRating\n                  notes\n                  student {\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateClass($name: String!, $teacherID: ID!) {\n    classCreate(input: { name: $name, teacher: { link: $teacherID } }) {\n      class {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateClass($name: String!, $teacherID: ID!) {\n    classCreate(input: { name: $name, teacher: { link: $teacherID } }) {\n      class {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MainPage_Query($teacherEmail: Email!) {\n    teacher(by: { email: $teacherEmail }) {\n      email\n      name\n      class(first: 10) {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MainPage_Query($teacherEmail: Email!) {\n    teacher(by: { email: $teacherEmail }) {\n      email\n      name\n      class(first: 10) {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetTeacher($email: Email!) {\n    teacher(by: { email: $email }) {\n      id\n      email\n      name\n      passwordHash\n    }\n  }\n"
): (typeof documents)["\n  query GetTeacher($email: Email!) {\n    teacher(by: { email: $email }) {\n      id\n      email\n      name\n      passwordHash\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTeacher(\n    $name: String!\n    $email: Email!\n    $passwordHash: String!\n  ) {\n    teacherCreate(\n      input: { name: $name, email: $email, passwordHash: $passwordHash }\n    ) {\n      teacher {\n        id\n        email\n        name\n        passwordHash\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateTeacher(\n    $name: String!\n    $email: Email!\n    $passwordHash: String!\n  ) {\n    teacherCreate(\n      input: { name: $name, email: $email, passwordHash: $passwordHash }\n    ) {\n      teacher {\n        id\n        email\n        name\n        passwordHash\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Register_RegisterTeacher(\n    $name: String!\n    $email: Email!\n    $passwordHash: String!\n  ) {\n    teacherCreate(\n      input: { name: $name, email: $email, passwordHash: $passwordHash }\n    ) {\n      teacher {\n        id\n        email\n        name\n        passwordHash\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation Register_RegisterTeacher(\n    $name: String!\n    $email: Email!\n    $passwordHash: String!\n  ) {\n    teacherCreate(\n      input: { name: $name, email: $email, passwordHash: $passwordHash }\n    ) {\n      teacher {\n        id\n        email\n        name\n        passwordHash\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Register_GetTeacher($email: Email!) {\n    teacher(by: { email: $email }) {\n      email\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  query Register_GetTeacher($email: Email!) {\n    teacher(by: { email: $email }) {\n      email\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
