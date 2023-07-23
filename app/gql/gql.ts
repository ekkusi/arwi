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
  "\n  query Main_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n    }\n  }\n": types.Main_GetCurrentUserDocument,
  "\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n    student {\n      name\n    }\n  }\n":
    types.EvaluationsAccordion_EvaluationFragmentDoc,
  "\n  fragment GroupListItem on Group {\n    id\n    name\n    subject {\n      label\n      code\n    }\n    updatedAt\n  }\n":
    types.GroupListItemFragmentDoc,
  "\n  fragment UpdateCollectionForm_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n    students {\n      id\n      name\n    }\n  }\n":
    types.UpdateCollectionForm_GroupFragmentDoc,
  "\n  fragment UpdateCollectionForm_Collection on EvaluationCollection {\n    date\n    type\n    description\n    environment {\n      code\n      label\n      color\n    }\n    classYear {\n      id\n      info {\n        code\n      }\n      group {\n        subject {\n          code\n        }\n      }\n    }\n    learningObjectives {\n      code\n      label\n      type\n    }\n    evaluations {\n      wasPresent\n      student {\n        id\n        name\n      }\n    }\n  }\n":
    types.UpdateCollectionForm_CollectionFragmentDoc,
  "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n    isStellar\n    collection {\n      id\n      environment {\n        code\n        label\n      }\n    }\n    ...EvaluationsLineChart_Evaluation\n    ...EvaluationsBarChart_Evaluation\n  }\n":
    types.StudentEvaluationRecap_EvaluationFragmentDoc,
  "\n  fragment StudentEvaluationRecap_Student on Student {\n    id\n    name\n    group {\n      name\n    }\n  }\n":
    types.StudentEvaluationRecap_StudentFragmentDoc,
  "\n  fragment OpenAIUtils_Evaluation on Evaluation {\n    notes\n    skillsRating\n    behaviourRating\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n  }\n":
    types.OpenAiUtils_EvaluationFragmentDoc,
  "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n":
    types.LoginPage_LoginDocument,
  "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n":
    types.RegisterPage_RegisterDocument,
  "\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        updatedAt\n        subject {\n          label\n          code\n        }\n      }\n    }\n  }\n":
    types.MainPage_GetCurrentUserDocument,
  "\n  mutation ProfileView_Logout {\n    logout\n  }\n": types.ProfileView_LogoutDocument,
  "\n  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n      isStellar\n    }\n  }\n":
    types.CollectionsLineChart_EvaluationCollectionFragmentDoc,
  "\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n":
    types.EvaluationsLineChart_EvaluationFragmentDoc,
  "\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n":
    types.EvaluationsBarChart_EvaluationFragmentDoc,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n          currentClassEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n            color\n          }\n          learningObjectives {\n            code\n            label\n            description\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n":
    types.GroupOverviewPage_DeleteGroupDocument,
  "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      ...StudentEvaluationRecap_Student\n      group {\n        id\n        name\n        subject {\n          code\n          label\n        }\n        currentClassYear {\n          info {\n            code\n            label\n          }\n        }\n      }\n      currentClassEvaluations {\n        id\n        notes\n        ...EvaluationsAccordion_Evaluation\n        ...StudentEvaluationRecap_Evaluation\n        ...OpenAIUtils_Evaluation\n      }\n    }\n  }\n":
    types.StudentPage_GetStudentDocument,
  "\n  query CollectionCreationProvider_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentClassYear {\n        id\n      }\n      students {\n        id\n        name\n      }\n      ...CollectionGeneralInfoView_Group\n    }\n  }\n":
    types.CollectionCreationProvider_GetGroupDocument,
  "\n  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {\n    createCollection(data: $createCollectionInput, classYearId: $classYearId) {\n      id\n    }\n  }\n":
    types.CollectionEvaluationsView_CreateCollectionDocument,
  "\n  fragment CollectionGeneralInfoView_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n  }\n":
    types.CollectionGeneralInfoView_GroupFragmentDoc,
  "\n  fragment CollectionParticipationsView_Group on Group {\n    students {\n      id\n      name\n    }\n  }\n":
    types.CollectionParticipationsView_GroupFragmentDoc,
  "\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateGroupPage_CreateGroupDocument,
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
  source: "\n  query Main_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n    }\n  }\n"
): (typeof documents)["\n  query Main_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n    student {\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n    student {\n      name\n    }\n  }\n"];
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
  source: "\n  fragment UpdateCollectionForm_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n    students {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateCollectionForm_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n    students {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateCollectionForm_Collection on EvaluationCollection {\n    date\n    type\n    description\n    environment {\n      code\n      label\n      color\n    }\n    classYear {\n      id\n      info {\n        code\n      }\n      group {\n        subject {\n          code\n        }\n      }\n    }\n    learningObjectives {\n      code\n      label\n      type\n    }\n    evaluations {\n      wasPresent\n      student {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateCollectionForm_Collection on EvaluationCollection {\n    date\n    type\n    description\n    environment {\n      code\n      label\n      color\n    }\n    classYear {\n      id\n      info {\n        code\n      }\n      group {\n        subject {\n          code\n        }\n      }\n    }\n    learningObjectives {\n      code\n      label\n      type\n    }\n    evaluations {\n      wasPresent\n      student {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n    isStellar\n    collection {\n      id\n      environment {\n        code\n        label\n      }\n    }\n    ...EvaluationsLineChart_Evaluation\n    ...EvaluationsBarChart_Evaluation\n  }\n"
): (typeof documents)["\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n    isStellar\n    collection {\n      id\n      environment {\n        code\n        label\n      }\n    }\n    ...EvaluationsLineChart_Evaluation\n    ...EvaluationsBarChart_Evaluation\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment StudentEvaluationRecap_Student on Student {\n    id\n    name\n    group {\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment StudentEvaluationRecap_Student on Student {\n    id\n    name\n    group {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment OpenAIUtils_Evaluation on Evaluation {\n    notes\n    skillsRating\n    behaviourRating\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment OpenAIUtils_Evaluation on Evaluation {\n    notes\n    skillsRating\n    behaviourRating\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n"];
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
  source: "\n  mutation ProfileView_Logout {\n    logout\n  }\n"
): (typeof documents)["\n  mutation ProfileView_Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n      isStellar\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n      isStellar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n          currentClassEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n            color\n          }\n          learningObjectives {\n            code\n            label\n            description\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n          currentClassEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n            color\n          }\n          learningObjectives {\n            code\n            label\n            description\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"
): (typeof documents)["\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      ...StudentEvaluationRecap_Student\n      group {\n        id\n        name\n        subject {\n          code\n          label\n        }\n        currentClassYear {\n          info {\n            code\n            label\n          }\n        }\n      }\n      currentClassEvaluations {\n        id\n        notes\n        ...EvaluationsAccordion_Evaluation\n        ...StudentEvaluationRecap_Evaluation\n        ...OpenAIUtils_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      ...StudentEvaluationRecap_Student\n      group {\n        id\n        name\n        subject {\n          code\n          label\n        }\n        currentClassYear {\n          info {\n            code\n            label\n          }\n        }\n      }\n      currentClassEvaluations {\n        id\n        notes\n        ...EvaluationsAccordion_Evaluation\n        ...StudentEvaluationRecap_Evaluation\n        ...OpenAIUtils_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionCreationProvider_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentClassYear {\n        id\n      }\n      students {\n        id\n        name\n      }\n      ...CollectionGeneralInfoView_Group\n    }\n  }\n"
): (typeof documents)["\n  query CollectionCreationProvider_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentClassYear {\n        id\n      }\n      students {\n        id\n        name\n      }\n      ...CollectionGeneralInfoView_Group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {\n    createCollection(data: $createCollectionInput, classYearId: $classYearId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $classYearId: ID!) {\n    createCollection(data: $createCollectionInput, classYearId: $classYearId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionGeneralInfoView_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionGeneralInfoView_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionParticipationsView_Group on Group {\n    students {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionParticipationsView_Group on Group {\n    students {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
