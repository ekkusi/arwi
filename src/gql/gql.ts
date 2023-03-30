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
  "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n":
    types.StudentParticipationList_StudentFragmentDoc,
  "\n  fragment UpdateEvaluationCard_Evaluation on Evaluation {\n    id\n    wasPresent\n    skillsRating\n    behaviourRating\n    notes\n    student {\n      id\n      name\n    }\n  }\n":
    types.UpdateEvaluationCard_EvaluationFragmentDoc,
  "\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    type\n  }\n":
    types.UpdateCollectionsList_CollectionFragmentDoc,
  "\n  mutation UpdateCollectionList_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n":
    types.UpdateCollectionList_DeleteCollectionDocument,
  "\n  fragment UpdateStudentsList_Student on Student {\n    id\n    name\n  }\n":
    types.UpdateStudentsList_StudentFragmentDoc,
  "\n  mutation UpdateStudentList_UpdateStudent(\n    $input: UpdateStudentInput!\n    $studentId: ID!\n  ) {\n    updateStudent(data: $input, studentId: $studentId) {\n      id\n    }\n  }\n":
    types.UpdateStudentList_UpdateStudentDocument,
  "\n  mutation UpdateStudentList_CreateStudent(\n    $input: CreateStudentInput!\n    $groupId: ID!\n  ) {\n    createStudent(data: $input, groupId: $groupId) {\n      ...UpdateStudentsList_Student\n    }\n  }\n":
    types.UpdateStudentList_CreateStudentDocument,
  "\n  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {\n    deleteStudent(studentId: $studentId)\n  }\n":
    types.UpdateStudentList_DeleteStudentDocument,
  "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n  }\n":
    types.StudentEvaluationRecap_EvaluationFragmentDoc,
  "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n":
    types.RegisterPage_RegisterDocument,
  "\n      mutation CreateCollection($data: CreateCollectionInput!, $groupId: ID!) {\n        createCollection(data: $data, groupId: $groupId) {\n          id\n          date\n          type\n          description\n        }\n      }\n    ":
    types.CreateCollectionDocument,
  "\n        mutation CreateCollectionWithEvaluations(\n          $data: CreateCollectionInput!\n          $groupId: ID!\n        ) {\n          createCollection(data: $data, groupId: $groupId) {\n            id\n            date\n            type\n            description\n            evaluations {\n              id\n              wasPresent\n              skillsRating\n              behaviourRating\n              notes\n            }\n          }\n        }\n      ":
    types.CreateCollectionWithEvaluationsDocument,
  "\n      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n          }\n        }\n      }\n    ":
    types.CreateGroupWithoutStudentsDocument,
  "\n      mutation CreateGroupWithStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n            name\n          }\n        }\n      }\n    ":
    types.CreateGroupWithStudentsDocument,
  "\n        mutation CreateStudent($data: CreateStudentInput!, $groupId: ID!) {\n          createStudent(data: $data, groupId: $groupId) {\n            id\n            name\n          }\n        }\n      ":
    types.CreateStudentDocument,
  "\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId)\n      }\n    ":
    types.DeleteCollectionDocument,
  "\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId)\n      }\n    ":
    types.DeleteStudentDocument,
  "\n      mutation Login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          teacher {\n            id\n            email\n          }\n        }\n      }\n    ":
    types.LoginDocument,
  "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId)\n      }\n    ":
    types.DeleteGroupDocument,
  "\n      mutation UpdateEvaluations(\n        $data: [UpdateEvaluationInput!]!\n        $collectionId: ID!\n      ) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ":
    types.UpdateEvaluationsDocument,
  "\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ":
    types.UpdateStudentDocument,
  "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n        }\n      }\n    ":
    types.UpdateGroupDocument,
  "\n      query GetTeacher($id: ID!) {\n        getTeacher(id: $id) {\n          id\n          email\n        }\n      }\n    ":
    types.GetTeacherDocument,
  "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n":
    types.Auth_LoginDocument,
  "\n      mutation Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          id\n          email\n        }\n      }\n    ":
    types.RegisterDocument,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        id\n        name\n      }\n      evaluationCollections {\n        id\n        date\n        type\n      }\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      group {\n        name\n        id\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n      }\n    }\n  }\n":
    types.CollectionPage_GetCollectionDocument,
  "\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateGroupPage_CreateGroupDocument,
  "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      group {\n        id\n      }\n      evaluations {\n        notes\n        id\n        collection {\n          date\n        }\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n":
    types.StudentPage_GetStudentDocument,
  "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        ...UpdateEvaluationCard_Evaluation\n      }\n    }\n  }\n":
    types.UpdateEvaluationsPage_GetCollectionDocument,
  "\n  mutation UpdateEvaluationsPage_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n":
    types.UpdateEvaluationsPage_UpdateEvaluationsDocument,
  "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      evaluationTypes\n      students {\n        ...StudentParticipationList_Student\n      }\n    }\n  }\n":
    types.CreateCollectionPage_GetGroupDocument,
  "\n  mutation CreateCollectionPage_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n":
    types.CreateCollectionPage_CreateCollectionDocument,
  "\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        ...UpdateStudentsList_Student\n      }\n      evaluationCollections {\n        ...UpdateCollectionsList_Collection\n      }\n    }\n  }\n":
    types.EditGroupPage_GetGroupDocument,
  "\n  mutation EditGroupPage_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n":
    types.EditGroupPage_UpdateGroupDocument,
  "\n  mutation EditGroupPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n":
    types.EditGroupPage_DeleteGroupDocument,
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
  source: "\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n"
): (typeof documents)["\n  fragment StudentParticipationList_Student on Student {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateEvaluationCard_Evaluation on Evaluation {\n    id\n    wasPresent\n    skillsRating\n    behaviourRating\n    notes\n    student {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateEvaluationCard_Evaluation on Evaluation {\n    id\n    wasPresent\n    skillsRating\n    behaviourRating\n    notes\n    student {\n      id\n      name\n    }\n  }\n"];
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
  source: "\n  mutation UpdateStudentList_CreateStudent(\n    $input: CreateStudentInput!\n    $groupId: ID!\n  ) {\n    createStudent(data: $input, groupId: $groupId) {\n      ...UpdateStudentsList_Student\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateStudentList_CreateStudent(\n    $input: CreateStudentInput!\n    $groupId: ID!\n  ) {\n    createStudent(data: $input, groupId: $groupId) {\n      ...UpdateStudentsList_Student\n    }\n  }\n"];
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
  source: "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n  }\n"
): (typeof documents)["\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateCollection($data: CreateCollectionInput!, $groupId: ID!) {\n        createCollection(data: $data, groupId: $groupId) {\n          id\n          date\n          type\n          description\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateCollection($data: CreateCollectionInput!, $groupId: ID!) {\n        createCollection(data: $data, groupId: $groupId) {\n          id\n          date\n          type\n          description\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation CreateCollectionWithEvaluations(\n          $data: CreateCollectionInput!\n          $groupId: ID!\n        ) {\n          createCollection(data: $data, groupId: $groupId) {\n            id\n            date\n            type\n            description\n            evaluations {\n              id\n              wasPresent\n              skillsRating\n              behaviourRating\n              notes\n            }\n          }\n        }\n      "
): (typeof documents)["\n        mutation CreateCollectionWithEvaluations(\n          $data: CreateCollectionInput!\n          $groupId: ID!\n        ) {\n          createCollection(data: $data, groupId: $groupId) {\n            id\n            date\n            type\n            description\n            evaluations {\n              id\n              wasPresent\n              skillsRating\n              behaviourRating\n              notes\n            }\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateGroupWithStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n            name\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateGroupWithStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n            name\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation CreateStudent($data: CreateStudentInput!, $groupId: ID!) {\n          createStudent(data: $data, groupId: $groupId) {\n            id\n            name\n          }\n        }\n      "
): (typeof documents)["\n        mutation CreateStudent($data: CreateStudentInput!, $groupId: ID!) {\n          createStudent(data: $data, groupId: $groupId) {\n            id\n            name\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId)\n      }\n    "
): (typeof documents)["\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId)\n      }\n    "
): (typeof documents)["\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation Login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          teacher {\n            id\n            email\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation Login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          teacher {\n            id\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId)\n      }\n    "
): (typeof documents)["\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateEvaluations(\n        $data: [UpdateEvaluationInput!]!\n        $collectionId: ID!\n      ) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "
): (typeof documents)["\n      mutation UpdateEvaluations(\n        $data: [UpdateEvaluationInput!]!\n        $collectionId: ID!\n      ) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      query GetTeacher($id: ID!) {\n        getTeacher(id: $id) {\n          id\n          email\n        }\n      }\n    "
): (typeof documents)["\n      query GetTeacher($id: ID!) {\n        getTeacher(id: $id) {\n          id\n          email\n        }\n      }\n    "];
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
  source: "\n      mutation Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          id\n          email\n        }\n      }\n    "
): (typeof documents)["\n      mutation Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          id\n          email\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        id\n        name\n      }\n      evaluationCollections {\n        id\n        date\n        type\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        id\n        name\n      }\n      evaluationCollections {\n        id\n        date\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      group {\n        name\n        id\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      type\n      group {\n        name\n        id\n      }\n      evaluations {\n        id\n        student {\n          id\n          name\n        }\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      group {\n        id\n      }\n      evaluations {\n        notes\n        id\n        collection {\n          date\n        }\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      group {\n        id\n      }\n      evaluations {\n        notes\n        id\n        collection {\n          date\n        }\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        ...UpdateEvaluationCard_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        ...UpdateEvaluationCard_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateEvaluationsPage_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n"
): (typeof documents)["\n  mutation UpdateEvaluationsPage_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      evaluationTypes\n      students {\n        ...StudentParticipationList_Student\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      evaluationTypes\n      students {\n        ...StudentParticipationList_Student\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateCollectionPage_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCollectionPage_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $groupId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, groupId: $groupId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        ...UpdateStudentsList_Student\n      }\n      evaluationCollections {\n        ...UpdateCollectionsList_Collection\n      }\n    }\n  }\n"
): (typeof documents)["\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      students {\n        ...UpdateStudentsList_Student\n      }\n      evaluationCollections {\n        ...UpdateCollectionsList_Collection\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EditGroupPage_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation EditGroupPage_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EditGroupPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"
): (typeof documents)["\n  mutation EditGroupPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
