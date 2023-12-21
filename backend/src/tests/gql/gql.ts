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
    "\n      mutation CreateCollection($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            student {\n              id\n            }\n            skillsRating\n            behaviourRating\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    ": types.CreateCollectionDocument,
    "\n      mutation CreateCollectionInvalidEnvironment($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateCollectionInvalidEnvironmentDocument,
    "\n      mutation CreateCollectionInvalidLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateCollectionInvalidLearningObjectivesDocument,
    "\n      mutation CreateCollectionNotEvaluatedLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateCollectionNotEvaluatedLearningObjectivesDocument,
    "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          subject {\n            code\n          }\n          students {\n            name\n          }\n          collectionTypes {\n            name\n            weight\n          }\n        }\n      }\n    ": types.CreateGroupDocument,
    "\n      mutation CreateGroupInvalidSubject($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ": types.CreateGroupInvalidSubjectDocument,
    "\n      mutation CreateGroupEmptyCollections($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ": types.CreateGroupEmptyCollectionsDocument,
    "\n      mutation CreateGroupInvalidWeights($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ": types.CreateGroupInvalidWeightsDocument,
    "\n      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n          group {\n            id\n          }\n        }\n      }\n    ": types.CreateStudentDocument,
    "\n        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n          createStudent(data: $data, moduleId: $moduleId) {\n            id\n          }\n        }\n      ": types.CreateDuplicateStudentDocument,
    "\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.DeleteCollectionDocument,
    "\n      mutation DeleteCollectionUnauthorized($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n          description\n        }\n      }\n    ": types.DeleteCollectionUnauthorizedDocument,
    "\n      mutation DeleteCollectionInvalidID($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.DeleteCollectionInvalidIdDocument,
    "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupDocument,
    "\n      mutation DeleteGroupUnauthorized($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupUnauthorizedDocument,
    "\n      mutation DeleteGroupInvalidID($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupInvalidIdDocument,
    "\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentDocument,
    "\n      mutation DeleteStudentUnauthorized($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentUnauthorizedDocument,
    "\n      mutation DeleteStudentInvalidID($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentInvalidIdDocument,
    "\n      mutation FixTextGrammaticsValidInput($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsValidInputDocument,
    "\n      mutation FixTextGrammaticsUnauthorized($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsUnauthorizedDocument,
    "\n      mutation FixTextGrammaticsInvalidStudent($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsInvalidStudentDocument,
    "\n      mutation FixTextGrammaticsEmptyText($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsEmptyTextDocument,
    "\n      mutation ChangeGroupModuleValidInput($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            id\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    ": types.ChangeGroupModuleValidInputDocument,
    "\n      mutation ChangeGroupModuleUnAuthorized($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleUnAuthorizedDocument,
    "\n      mutation ChangeGroupModuleInvalidID($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleInvalidIdDocument,
    "\n      mutation ChangeGroupModuleInvalidLearningObjectiveKey($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleInvalidLearningObjectiveKeyDocument,
    "\n      mutation LoginTest_ValidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_ValidLoginDocument,
    "\n      mutation LoginTest_InvalidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_InvalidLoginDocument,
    "\n      mutation LoginTest_NoEmailLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_NoEmailLoginDocument,
    "\n    mutation Test_Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        userData {\n          email\n        }\n      }\n    }\n  ": types.Test_LoginDocument,
    "\n    mutation Test_Logout {\n      logout\n    }\n  ": types.Test_LogoutDocument,
    "\n      mutation RequestPasswordResetValid($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    ": types.RequestPasswordResetValidDocument,
    "\n      mutation VerifyPasswordResetCodeValid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeValidDocument,
    "\n      mutation UpdatePasswordValid($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    ": types.UpdatePasswordValidDocument,
    "\n      mutation RequestPasswordResetInvalidEmail($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    ": types.RequestPasswordResetInvalidEmailDocument,
    "\n      mutation RequestPasswordResetExceedTries($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    ": types.RequestPasswordResetExceedTriesDocument,
    "\n      mutation VerifyPasswordResetCodeInvalid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeInvalidDocument,
    "\n      mutation VerifyPasswordResetCodeExpired($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeExpiredDocument,
    "\n      mutation VerifyPasswordResetCodeExceedTries($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeExceedTriesDocument,
    "\n      mutation RegisterTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterDocument,
    "\n      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterExistingEmailDocument,
    "\n      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterInvalidLanguageDocument,
    "\n      mutation UpdateCollection($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n            notes\n            wasPresent\n            isStellar\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    ": types.UpdateCollectionDocument,
    "\n      mutation UpdateCollectionUnauthorized($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateCollectionUnauthorizedDocument,
    "\n      mutation UpdateCollectionInvalidID($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateCollectionInvalidIdDocument,
    "\n      mutation UpdateCollectionInvalidEnvironment($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateCollectionInvalidEnvironmentDocument,
    "\n      mutation UpdateCollectionInvalidLearningObjectives($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateCollectionInvalidLearningObjectivesDocument,
    "\n      mutation UpdateCollectionEvaluationsNotInCollection($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateCollectionEvaluationsNotInCollectionDocument,
    "\n      mutation UpdateCollectionInvalidStudentPresence($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateCollectionInvalidStudentPresenceDocument,
    "\n      mutation UpdateEvaluation($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n          isStellar\n        }\n      }\n    ": types.UpdateEvaluationDocument,
    "\n      mutation UpdateEvaluationUnauthorized($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    ": types.UpdateEvaluationUnauthorizedDocument,
    "\n      mutation UpdateEvaluationInvalidID($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    ": types.UpdateEvaluationInvalidIdDocument,
    "\n      mutation UpdateEvaluationNotPresent($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    ": types.UpdateEvaluationNotPresentDocument,
    "\n      mutation UpdateEvaluations($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ": types.UpdateEvaluationsDocument,
    "\n      mutation UpdateEvaluationsUnauthenticated($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ": types.UpdateEvaluationsUnauthenticatedDocument,
    "\n      mutation UpdateEvaluationsUnauthorized($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ": types.UpdateEvaluationsUnauthorizedDocument,
    "\n      mutation UpdateEvaluationsInvalidID($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ": types.UpdateEvaluationsInvalidIdDocument,
    "\n      mutation UpdateEvaluationsNotInCollection($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ": types.UpdateEvaluationsNotInCollectionDocument,
    "\n      mutation UpdateEvaluationsNotPresent($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ": types.UpdateEvaluationsNotPresentDocument,
    "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupDocument,
    "\n      mutation UpdateGroupUnauthorized($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupUnauthorizedDocument,
    "\n      mutation UpdateGroupInvalidID($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupInvalidIdDocument,
    "\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentDocument,
    "\n      mutation UpdateStudentUnauthorized($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentUnauthorizedDocument,
    "\n      mutation UpdateStudentInvalidID($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentInvalidIdDocument,
    "\n      mutation UpdateStudentDuplicateName($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentDuplicateNameDocument,
    "\n      mutation SampleTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.SampleTest_RegisterDocument,
    "\n      mutation SampleTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.SampleTest_RegisterExistingEmailDocument,
    "\n      mutation GenerateStudentFeedbackValid($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackValidDocument,
    "\n      mutation GenerateStudentFeedbackUnAuthorized($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackUnAuthorizedDocument,
    "\n      mutation GenerateStudentFeedbackStudentDoesntExist($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackStudentDoesntExistDocument,
    "\n      mutation GenerateStudentFeedbackNoEvaluation($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackNoEvaluationDocument,
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
export function graphql(source: "\n      mutation CreateCollection($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            student {\n              id\n            }\n            skillsRating\n            behaviourRating\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateCollection($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            student {\n              id\n            }\n            skillsRating\n            behaviourRating\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateCollectionInvalidEnvironment($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateCollectionInvalidEnvironment($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateCollectionInvalidLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateCollectionInvalidLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateCollectionNotEvaluatedLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateCollectionNotEvaluatedLearningObjectives($data: CreateCollectionInput!, $moduleId: ID!) {\n        createCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          subject {\n            code\n          }\n          students {\n            name\n          }\n          collectionTypes {\n            name\n            weight\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateGroup($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          subject {\n            code\n          }\n          students {\n            name\n          }\n          collectionTypes {\n            name\n            weight\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateGroupInvalidSubject($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateGroupInvalidSubject($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateGroupEmptyCollections($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateGroupEmptyCollections($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateGroupInvalidWeights($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateGroupInvalidWeights($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n          group {\n            id\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n          group {\n            id\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n          createStudent(data: $data, moduleId: $moduleId) {\n            id\n          }\n        }\n      "): (typeof documents)["\n        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n          createStudent(data: $data, moduleId: $moduleId) {\n            id\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteCollectionUnauthorized($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n          description\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteCollectionUnauthorized($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n          description\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteCollectionInvalidID($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteCollectionInvalidID($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteGroupUnauthorized($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteGroupUnauthorized($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteGroupInvalidID($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteGroupInvalidID($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteStudentUnauthorized($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteStudentUnauthorized($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteStudentInvalidID($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteStudentInvalidID($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation FixTextGrammaticsValidInput($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "): (typeof documents)["\n      mutation FixTextGrammaticsValidInput($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation FixTextGrammaticsUnauthorized($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "): (typeof documents)["\n      mutation FixTextGrammaticsUnauthorized($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation FixTextGrammaticsInvalidStudent($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "): (typeof documents)["\n      mutation FixTextGrammaticsInvalidStudent($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation FixTextGrammaticsEmptyText($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "): (typeof documents)["\n      mutation FixTextGrammaticsEmptyText($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeGroupModuleValidInput($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            id\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleValidInput($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            id\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeGroupModuleUnAuthorized($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleUnAuthorized($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeGroupModuleInvalidID($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleInvalidID($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeGroupModuleInvalidLearningObjectiveKey($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleInvalidLearningObjectiveKey($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation LoginTest_ValidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation LoginTest_ValidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation LoginTest_InvalidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation LoginTest_InvalidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation LoginTest_NoEmailLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation LoginTest_NoEmailLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Test_Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        userData {\n          email\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation Test_Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        userData {\n          email\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Test_Logout {\n      logout\n    }\n  "): (typeof documents)["\n    mutation Test_Logout {\n      logout\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RequestPasswordResetValid($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    "): (typeof documents)["\n      mutation RequestPasswordResetValid($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation VerifyPasswordResetCodeValid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "): (typeof documents)["\n      mutation VerifyPasswordResetCodeValid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdatePasswordValid($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    "): (typeof documents)["\n      mutation UpdatePasswordValid($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RequestPasswordResetInvalidEmail($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    "): (typeof documents)["\n      mutation RequestPasswordResetInvalidEmail($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RequestPasswordResetExceedTries($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    "): (typeof documents)["\n      mutation RequestPasswordResetExceedTries($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation VerifyPasswordResetCodeInvalid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "): (typeof documents)["\n      mutation VerifyPasswordResetCodeInvalid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation VerifyPasswordResetCodeExpired($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "): (typeof documents)["\n      mutation VerifyPasswordResetCodeExpired($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation VerifyPasswordResetCodeExceedTries($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "): (typeof documents)["\n      mutation VerifyPasswordResetCodeExceedTries($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollection($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n            notes\n            wasPresent\n            isStellar\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollection($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n            notes\n            wasPresent\n            isStellar\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollectionUnauthorized($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollectionUnauthorized($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollectionInvalidID($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollectionInvalidID($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollectionInvalidEnvironment($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollectionInvalidEnvironment($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollectionInvalidLearningObjectives($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollectionInvalidLearningObjectives($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollectionEvaluationsNotInCollection($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollectionEvaluationsNotInCollection($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateCollectionInvalidStudentPresence($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateCollectionInvalidStudentPresence($data: UpdateCollectionInput!, $collectionId: ID!) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluation($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n          isStellar\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluation($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n          isStellar\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationUnauthorized($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationUnauthorized($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationInvalidID($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationInvalidID($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationNotPresent($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationNotPresent($data: UpdateEvaluationInput!) {\n        updateEvaluation(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluations($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluations($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationsUnauthenticated($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationsUnauthenticated($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationsUnauthorized($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationsUnauthorized($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationsInvalidID($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationsInvalidID($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationsNotInCollection($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationsNotInCollection($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateEvaluationsNotPresent($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "): (typeof documents)["\n      mutation UpdateEvaluationsNotPresent($data: [UpdateEvaluationInput!]!, $collectionId: ID!) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupUnauthorized($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupUnauthorized($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupInvalidID($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupInvalidID($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateStudentUnauthorized($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateStudentUnauthorized($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateStudentInvalidID($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateStudentInvalidID($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateStudentDuplicateName($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateStudentDuplicateName($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation SampleTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation SampleTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation SampleTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation SampleTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation GenerateStudentFeedbackValid($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "): (typeof documents)["\n      mutation GenerateStudentFeedbackValid($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation GenerateStudentFeedbackUnAuthorized($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "): (typeof documents)["\n      mutation GenerateStudentFeedbackUnAuthorized($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation GenerateStudentFeedbackStudentDoesntExist($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "): (typeof documents)["\n      mutation GenerateStudentFeedbackStudentDoesntExist($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation GenerateStudentFeedbackNoEvaluation($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "): (typeof documents)["\n      mutation GenerateStudentFeedbackNoEvaluation($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;