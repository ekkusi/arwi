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
    "\n    mutation Test_Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        userData {\n          email\n        }\n      }\n    }\n  ": types.Test_LoginDocument,
    "\n    mutation Test_Logout {\n      logout\n    }\n  ": types.Test_LogoutDocument,
    "\n      mutation ChangeGroupModuleValidInput($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            id\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    ": types.ChangeGroupModuleValidInputDocument,
    "\n      mutation ChangeGroupModuleUnAuthorized($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleUnAuthorizedDocument,
    "\n      mutation ChangeGroupModuleInvalidID($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleInvalidIdDocument,
    "\n      mutation ChangeGroupModuleInvalidLearningObjectiveKey($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleInvalidLearningObjectiveKeyDocument,
    "\n      mutation ChangeGroupModuleInvalidEducationLevelFromPrimary($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleInvalidEducationLevelFromPrimaryDocument,
    "\n      mutation ChangeGroupModuleInvalidEducationLevelFromHighSchool($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    ": types.ChangeGroupModuleInvalidEducationLevelFromHighSchoolDocument,
    "\n      mutation ChangeGroupModuleDataLoadersCheck($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          currentModule {\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    ": types.ChangeGroupModuleDataLoadersCheckDocument,
    "\n  mutation ConnectLocalCredentials($email: String!, $password: String!) {\n    connectLocalCredentials(email: $email, password: $password) {\n      userData {\n        id\n        email\n        groups {\n          id\n        }\n      }\n    }\n  }\n": types.ConnectLocalCredentialsDocument,
    "\n  mutation ConnectLocalCredentials_MPassIDLogin($code: String!) {\n    mPassIDLogin(code: $code) {\n      payload {\n        userData {\n          id\n          isMPassIDConnected\n        }\n      }\n      newUserCreated\n    }\n  }\n": types.ConnectLocalCredentials_MPassIdLoginDocument,
    "\n      mutation CreateClassParticipationCollection($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          __typename\n          environment {\n            code\n          }\n          learningObjectives {\n            code\n          }\n          description\n          evaluations {\n            student {\n              id\n            }\n            __typename\n            skillsRating\n            behaviourRating\n          }\n        }\n      }\n    ": types.CreateClassParticipationCollectionDocument,
    "\n      mutation CreateClassParticipationCollectionInvalidEnvironment($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateClassParticipationCollectionInvalidEnvironmentDocument,
    "\n      mutation CreateClassParticipationCollectionInvalidLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateClassParticipationCollectionInvalidLearningObjectivesDocument,
    "\n      mutation CreateClassParticipationCollectionNotEvaluatedLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateClassParticipationCollectionNotEvaluatedLearningObjectivesDocument,
    "\n      mutation CreateClassParticipationCollectionInvalidType($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateClassParticipationCollectionInvalidTypeDocument,
    "\n      mutation CreateClassParticipationCollectionDataLoaderCheck($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n        }\n      }\n    ": types.CreateClassParticipationCollectionDataLoaderCheckDocument,
    "\n      mutation CreateDefaultCollection($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          __typename\n          description\n          evaluations {\n            student {\n              id\n            }\n            __typename\n            notes\n            rating\n          }\n        }\n      }\n    ": types.CreateDefaultCollectionDocument,
    "\n      mutation CreateDefaultCollectionDuplicate($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateDefaultCollectionDuplicateDocument,
    "\n      mutation CreateDefaultCollectionInvalidType($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    ": types.CreateDefaultCollectionInvalidTypeDocument,
    "\n      mutation CreateDefaultCollectionDataLoaderCheck($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n        }\n      }\n    ": types.CreateDefaultCollectionDataLoaderCheckDocument,
    "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          subject {\n            code\n          }\n          students {\n            name\n          }\n          currentModule {\n            collectionTypes {\n              name\n              weight\n            }\n          }\n        }\n      }\n    ": types.CreateGroupDocument,
    "\n      mutation CreateGroupInvalidSubject($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ": types.CreateGroupInvalidSubjectDocument,
    "\n      mutation CreateGroupEmptyCollections($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ": types.CreateGroupEmptyCollectionsDocument,
    "\n      mutation CreateGroupInvalidWeights($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ": types.CreateGroupInvalidWeightsDocument,
    "\n      mutation CreateGroupDataLoadersCheck($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n        }\n      }\n    ": types.CreateGroupDataLoadersCheckDocument,
    "\n      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n          group {\n            id\n          }\n          currentModuleEvaluations {\n            id\n            collection {\n              id\n            }\n          }\n        }\n      }\n    ": types.CreateStudentDocument,
    "\n        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n          createStudent(data: $data, moduleId: $moduleId) {\n            id\n          }\n        }\n      ": types.CreateDuplicateStudentDocument,
    "\n      mutation CreateStudentDataLoaderCheck($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n        }\n      }\n    ": types.CreateStudentDataLoaderCheckDocument,
    "\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentDocument,
    "\n      mutation DeleteStudentUnauthorized($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentUnauthorizedDocument,
    "\n      mutation DeleteStudentInvalidID($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentInvalidIdDocument,
    "\n      mutation DeleteStudentDataLoaderCheck($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    ": types.DeleteStudentDataLoaderCheckDocument,
    "\n      mutation DeleteTeacher($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    ": types.DeleteTeacherDocument,
    "\n      mutation DeleteTeacherUnauthorized($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    ": types.DeleteTeacherUnauthorizedDocument,
    "\n      mutation DeleteTeacherDataLoaderCheck($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    ": types.DeleteTeacherDataLoaderCheckDocument,
    "\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.DeleteCollectionDocument,
    "\n      mutation DeleteCollectionUnauthorized($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n          description\n        }\n      }\n    ": types.DeleteCollectionUnauthorizedDocument,
    "\n      mutation DeleteCollectionInvalidID($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.DeleteCollectionInvalidIdDocument,
    "\n      mutation DeleteCollectionDataLoaderCheck($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.DeleteCollectionDataLoaderCheckDocument,
    "\n      mutation GenerateStudentFeedbackValid($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackValidDocument,
    "\n      mutation GenerateStudentFeedbackUnAuthorized($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackUnAuthorizedDocument,
    "\n      mutation GenerateStudentFeedbackStudentDoesntExist($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackStudentDoesntExistDocument,
    "\n      mutation GenerateStudentFeedbackNoEvaluation($studentId: ID!, $moduleId: ID!) {\n        generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n      }\n    ": types.GenerateStudentFeedbackNoEvaluationDocument,
    "\n  mutation MPassIDLogin($code: String!) {\n    mPassIDLogin(code: $code) {\n      payload {\n        userData {\n          id\n          isMPassIDConnected\n        }\n      }\n      newUserCreated\n    }\n  }\n": types.MPassIdLoginDocument,
    "\n  mutation ConnectMPassID($code: String!) {\n    connectMPassID(code: $code) {\n      userData {\n        id\n        isMPassIDConnected\n        groups {\n          id\n        }\n      }\n    }\n  }\n": types.ConnectMPassIdDocument,
    "\n      mutation SampleTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.SampleTest_RegisterDocument,
    "\n      mutation SampleTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.SampleTest_RegisterExistingEmailDocument,
    "\n      mutation FixTextGrammaticsValidInput($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsValidInputDocument,
    "\n      mutation FixTextGrammaticsUnauthorized($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsUnauthorizedDocument,
    "\n      mutation FixTextGrammaticsInvalidStudent($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsInvalidStudentDocument,
    "\n      mutation FixTextGrammaticsEmptyText($studentId: ID!, $text: String!) {\n        fixTextGrammatics(studentId: $studentId, text: $text)\n      }\n    ": types.FixTextGrammaticsEmptyTextDocument,
    "\n      mutation RegisterTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterDocument,
    "\n      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterExistingEmailDocument,
    "\n      mutation RegisterTest_RegisterEmailInLowerCase($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterEmailInLowerCaseDocument,
    "\n      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.RegisterTest_RegisterInvalidLanguageDocument,
    "\n      mutation LoginTest_ValidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_ValidLoginDocument,
    "\n      mutation LoginTest_ValidLoginInDifferentCase($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_ValidLoginInDifferentCaseDocument,
    "\n      mutation LoginTest_InvalidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_InvalidLoginDocument,
    "\n      mutation LoginTest_NoEmailLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    ": types.LoginTest_NoEmailLoginDocument,
    "\n      mutation RequestPasswordResetValid($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    ": types.RequestPasswordResetValidDocument,
    "\n      mutation VerifyPasswordResetCodeValid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeValidDocument,
    "\n      mutation UpdatePasswordValid($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    ": types.UpdatePasswordValidDocument,
    "\n      mutation RequestPasswordResetInvalidEmail($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    ": types.RequestPasswordResetInvalidEmailDocument,
    "\n      mutation RequestPasswordResetExceedTries($email: String!) {\n        requestPasswordReset(email: $email)\n      }\n    ": types.RequestPasswordResetExceedTriesDocument,
    "\n      mutation VerifyPasswordResetCodeInvalid($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeInvalidDocument,
    "\n      mutation VerifyPasswordResetCodeExpired($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeExpiredDocument,
    "\n      mutation VerifyPasswordResetCodeExceedTries($code: String!) {\n        verifyPasswordResetCode(code: $code)\n      }\n    ": types.VerifyPasswordResetCodeExceedTriesDocument,
    "\n      mutation UpdatePasswordDataLoaders($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    ": types.UpdatePasswordDataLoadersDocument,
    "\n      mutation UpdateClassParticipationCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n            notes\n            wasPresent\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    ": types.UpdateClassParticipationCollectionDocument,
    "\n      mutation UpdateClassParticipationCollectionUnauthorized($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionUnauthorizedDocument,
    "\n      mutation UpdateClassParticipationCollectionInvalidID($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionInvalidIdDocument,
    "\n      mutation UpdateClassParticipationCollectionInvalidEnvironment($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionInvalidEnvironmentDocument,
    "\n      mutation UpdateClassParticipationCollectionInvalidLearningObjectives($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionInvalidLearningObjectivesDocument,
    "\n      mutation UpdateClassParticipationCollectionEvaluationsNotInCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionEvaluationsNotInCollectionDocument,
    "\n      mutation UpdateClassParticipationCollectionInvalidStudentPresence($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionInvalidStudentPresenceDocument,
    "\n      mutation UpdateClassParticipationCollectionInvalidEvaluationType($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionInvalidEvaluationTypeDocument,
    "\n      mutation UpdateClassParticipationCollectionDataLoaderCheck($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationCollectionDataLoaderCheckDocument,
    "\n      mutation UpdateClassParticipationEvaluation($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationDocument,
    "\n      mutation UpdateClassParticipationEvaluationBehaviourRatingLow($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationBehaviourRatingLowDocument,
    "\n      mutation UpdateClassParticipationEvaluationBehaviourRatingHigh($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationBehaviourRatingHighDocument,
    "\n      mutation UpdateClassParticipationEvaluationSkillsRatingLow($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationSkillsRatingLowDocument,
    "\n      mutation UpdateClassParticipationEvaluationSkillsRatingHigh($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationSkillsRatingHighDocument,
    "\n      mutation UpdateClassParticipationEvaluationUnauthorized($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationUnauthorizedDocument,
    "\n      mutation UpdateClassParticipationEvaluationInvalidID($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationInvalidIdDocument,
    "\n      mutation UpdateClassParticipationEvaluationNotPresent($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationNotPresentDocument,
    "\n      mutation UpdateClassParticipationEvaluationWrongCollectionType($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationWrongCollectionTypeDocument,
    "\n      mutation UpdateClassParticipationEvaluationDataLoaderCheck($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    ": types.UpdateClassParticipationEvaluationDataLoaderCheckDocument,
    "\n      mutation UpdateDefaultCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          description\n          evaluations {\n            id\n            notes\n            wasPresent\n            rating\n          }\n        }\n      }\n    ": types.UpdateDefaultCollectionDocument,
    "\n      mutation UpdateDefaultCollectionUnauthorized($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateDefaultCollectionUnauthorizedDocument,
    "\n      mutation UpdateDefaultCollectionInvalidID($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateDefaultCollectionInvalidIdDocument,
    "\n      mutation UpdateDefaultCollectionEvaluationsNotInCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateDefaultCollectionEvaluationsNotInCollectionDocument,
    "\n      mutation UpdateDefaultCollectionInvalidStudentPresence($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateDefaultCollectionInvalidStudentPresenceDocument,
    "\n      mutation UpdateDefaultCollectionInvalidEvaluationType($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateDefaultCollectionInvalidEvaluationTypeDocument,
    "\n      mutation UpdateDefaultCollectionDataLoaderCheck($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    ": types.UpdateDefaultCollectionDataLoaderCheckDocument,
    "\n      mutation UpdateDefaultEvaluation($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n          rating\n          notes\n        }\n      }\n    ": types.UpdateDefaultEvaluationDocument,
    "\n      mutation UpdateDefaultEvaluationRatingLow($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationRatingLowDocument,
    "\n      mutation UpdateDefaultEvaluationRatingInvalidInterval($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationRatingInvalidIntervalDocument,
    "\n      mutation UpdateDefaultEvaluationRatingHigh($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationRatingHighDocument,
    "\n      mutation UpdateDefaultEvaluationUnauthorized($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationUnauthorizedDocument,
    "\n      mutation UpdateDefaultEvaluationInvalidID($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationInvalidIdDocument,
    "\n      mutation UpdateDefaultEvaluationNotPresent($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationNotPresentDocument,
    "\n      mutation UpdateDefaultEvaluationClassParticipationUpdate($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    ": types.UpdateDefaultEvaluationClassParticipationUpdateDocument,
    "\n      mutation UpdateDefaultEvaluationDataLoaderCheck($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n          rating\n          notes\n        }\n      }\n    ": types.UpdateDefaultEvaluationDataLoaderCheckDocument,
    "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupDocument,
    "\n      mutation UpdateGroupUnauthorized($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupUnauthorizedDocument,
    "\n      mutation UpdateGroupInvalidID($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupInvalidIdDocument,
    "\n      mutation UpdateGroupDataLoaderCheck($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    ": types.UpdateGroupDataLoaderCheckDocument,
    "\n      mutation UpdateGroupCollectionTypes($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesDocument,
    "\n      mutation UpdateGroupCollectionTypesDuplicateIds($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesDuplicateIdsDocument,
    "\n      mutation UpdateGroupCollectionTypesUnmatchedIds($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesUnmatchedIdsDocument,
    "\n      mutation UpdateGroupCollectionTypesInvalidCategoryChange($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesInvalidCategoryChangeDocument,
    "\n      mutation UpdateGroupCollectionTypesInvalidCategoryChange2($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesInvalidCategoryChange2Document,
    "\n      mutation UpdateGroupCollectionTypesInvalidTotalWeight($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesInvalidTotalWeightDocument,
    "\n      mutation UpdateGroupCollectionTypesInvalidCategoryCount($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesInvalidCategoryCountDocument,
    "\n      mutation UpdateGroupCollectionTypesInvalidCategoryCount2($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    ": types.UpdateGroupCollectionTypesInvalidCategoryCount2Document,
    "\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentDocument,
    "\n      mutation UpdateStudentUnauthorized($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentUnauthorizedDocument,
    "\n      mutation UpdateStudentInvalidID($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentInvalidIdDocument,
    "\n      mutation UpdateStudentDuplicateName($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentDuplicateNameDocument,
    "\n      mutation UpdateStudentDataLoaderCheck($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ": types.UpdateStudentDataLoaderCheckDocument,
    "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupDocument,
    "\n      mutation DeleteGroupUnauthorized($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupUnauthorizedDocument,
    "\n      mutation DeleteGroupInvalidID($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupInvalidIdDocument,
    "\n      mutation DeleteGroupDataLoaderCheck($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    ": types.DeleteGroupDataLoaderCheckDocument,
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
export function graphql(source: "\n    mutation Test_Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        userData {\n          email\n        }\n      }\n    }\n  "): (typeof documents)["\n    mutation Test_Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        userData {\n          email\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Test_Logout {\n      logout\n    }\n  "): (typeof documents)["\n    mutation Test_Logout {\n      logout\n    }\n  "];
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
export function graphql(source: "\n      mutation ChangeGroupModuleInvalidEducationLevelFromPrimary($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleInvalidEducationLevelFromPrimary($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeGroupModuleInvalidEducationLevelFromHighSchool($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleInvalidEducationLevelFromHighSchool($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation ChangeGroupModuleDataLoadersCheck($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          currentModule {\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation ChangeGroupModuleDataLoadersCheck($data: ChangeGroupModuleInput!, $groupId: ID!) {\n        changeGroupModule(data: $data, groupId: $groupId) {\n          currentModule {\n            info {\n              educationLevel\n              learningObjectiveGroupKey\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConnectLocalCredentials($email: String!, $password: String!) {\n    connectLocalCredentials(email: $email, password: $password) {\n      userData {\n        id\n        email\n        groups {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ConnectLocalCredentials($email: String!, $password: String!) {\n    connectLocalCredentials(email: $email, password: $password) {\n      userData {\n        id\n        email\n        groups {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConnectLocalCredentials_MPassIDLogin($code: String!) {\n    mPassIDLogin(code: $code) {\n      payload {\n        userData {\n          id\n          isMPassIDConnected\n        }\n      }\n      newUserCreated\n    }\n  }\n"): (typeof documents)["\n  mutation ConnectLocalCredentials_MPassIDLogin($code: String!) {\n    mPassIDLogin(code: $code) {\n      payload {\n        userData {\n          id\n          isMPassIDConnected\n        }\n      }\n      newUserCreated\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateClassParticipationCollection($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          __typename\n          environment {\n            code\n          }\n          learningObjectives {\n            code\n          }\n          description\n          evaluations {\n            student {\n              id\n            }\n            __typename\n            skillsRating\n            behaviourRating\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateClassParticipationCollection($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          __typename\n          environment {\n            code\n          }\n          learningObjectives {\n            code\n          }\n          description\n          evaluations {\n            student {\n              id\n            }\n            __typename\n            skillsRating\n            behaviourRating\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateClassParticipationCollectionInvalidEnvironment($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateClassParticipationCollectionInvalidEnvironment($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateClassParticipationCollectionInvalidLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateClassParticipationCollectionInvalidLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateClassParticipationCollectionNotEvaluatedLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateClassParticipationCollectionNotEvaluatedLearningObjectives($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateClassParticipationCollectionInvalidType($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateClassParticipationCollectionInvalidType($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateClassParticipationCollectionDataLoaderCheck($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateClassParticipationCollectionDataLoaderCheck($data: CreateClassParticipationCollectionInput!, $moduleId: ID!) {\n        createClassParticipationCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateDefaultCollection($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          __typename\n          description\n          evaluations {\n            student {\n              id\n            }\n            __typename\n            notes\n            rating\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateDefaultCollection($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n          type {\n            id\n          }\n          __typename\n          description\n          evaluations {\n            student {\n              id\n            }\n            __typename\n            notes\n            rating\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateDefaultCollectionDuplicate($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateDefaultCollectionDuplicate($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateDefaultCollectionInvalidType($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateDefaultCollectionInvalidType($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateDefaultCollectionDataLoaderCheck($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateDefaultCollectionDataLoaderCheck($data: CreateDefaultCollectionInput!, $moduleId: ID!) {\n        createDefaultCollection(data: $data, moduleId: $moduleId) {\n          id\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateGroup($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          subject {\n            code\n          }\n          students {\n            name\n          }\n          currentModule {\n            collectionTypes {\n              name\n              weight\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateGroup($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          subject {\n            code\n          }\n          students {\n            name\n          }\n          currentModule {\n            collectionTypes {\n              name\n              weight\n            }\n          }\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation CreateGroupDataLoadersCheck($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateGroupDataLoadersCheck($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n          group {\n            id\n          }\n          currentModuleEvaluations {\n            id\n            collection {\n              id\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n          group {\n            id\n          }\n          currentModuleEvaluations {\n            id\n            collection {\n              id\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n          createStudent(data: $data, moduleId: $moduleId) {\n            id\n          }\n        }\n      "): (typeof documents)["\n        mutation CreateDuplicateStudent($data: CreateStudentInput!, $moduleId: ID!) {\n          createStudent(data: $data, moduleId: $moduleId) {\n            id\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateStudentDataLoaderCheck($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateStudentDataLoaderCheck($data: CreateStudentInput!, $moduleId: ID!) {\n        createStudent(data: $data, moduleId: $moduleId) {\n          id\n          name\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation DeleteStudentDataLoaderCheck($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteStudentDataLoaderCheck($studentId: ID!) {\n        deleteStudent(studentId: $studentId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteTeacher($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteTeacher($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteTeacherUnauthorized($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteTeacherUnauthorized($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteTeacherDataLoaderCheck($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteTeacherDataLoaderCheck($teacherId: ID!) {\n        deleteTeacher(teacherId: $teacherId) {\n          id\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation DeleteCollectionDataLoaderCheck($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteCollectionDataLoaderCheck($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MPassIDLogin($code: String!) {\n    mPassIDLogin(code: $code) {\n      payload {\n        userData {\n          id\n          isMPassIDConnected\n        }\n      }\n      newUserCreated\n    }\n  }\n"): (typeof documents)["\n  mutation MPassIDLogin($code: String!) {\n    mPassIDLogin(code: $code) {\n      payload {\n        userData {\n          id\n          isMPassIDConnected\n        }\n      }\n      newUserCreated\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConnectMPassID($code: String!) {\n    connectMPassID(code: $code) {\n      userData {\n        id\n        isMPassIDConnected\n        groups {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ConnectMPassID($code: String!) {\n    connectMPassID(code: $code) {\n      userData {\n        id\n        isMPassIDConnected\n        groups {\n          id\n        }\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n      mutation RegisterTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_RegisterExistingEmail($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterTest_RegisterEmailInLowerCase($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_RegisterEmailInLowerCase($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation RegisterTest_RegisterInvalidLanguage($data: CreateTeacherInput!) {\n        register(data: $data) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation LoginTest_ValidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation LoginTest_ValidLogin($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation LoginTest_ValidLoginInDifferentCase($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation LoginTest_ValidLoginInDifferentCase($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          userData {\n            email\n          }\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation UpdatePasswordDataLoaders($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    "): (typeof documents)["\n      mutation UpdatePasswordDataLoaders($newPassword: String!, $recoveryCode: String!) {\n        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n            notes\n            wasPresent\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          environment {\n            code\n          }\n          description\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n            notes\n            wasPresent\n          }\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionUnauthorized($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionUnauthorized($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionInvalidID($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionInvalidID($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionInvalidEnvironment($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionInvalidEnvironment($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionInvalidLearningObjectives($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionInvalidLearningObjectives($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionEvaluationsNotInCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionEvaluationsNotInCollection($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionInvalidStudentPresence($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionInvalidStudentPresence($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionInvalidEvaluationType($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionInvalidEvaluationType($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationCollectionDataLoaderCheck($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationCollectionDataLoaderCheck($data: UpdateClassParticipationCollectionInput!, $collectionId: ID!) {\n        updateClassParticipationCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluation($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluation($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationBehaviourRatingLow($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationBehaviourRatingLow($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationBehaviourRatingHigh($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationBehaviourRatingHigh($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationSkillsRatingLow($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationSkillsRatingLow($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationSkillsRatingHigh($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationSkillsRatingHigh($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationUnauthorized($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationUnauthorized($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationInvalidID($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationInvalidID($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationNotPresent($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationNotPresent($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationWrongCollectionType($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationWrongCollectionType($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateClassParticipationEvaluationDataLoaderCheck($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateClassParticipationEvaluationDataLoaderCheck($input: UpdateClassParticipationEvaluationInput!) {\n        updateClassParticipationEvaluation(input: $input) {\n          id\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          description\n          evaluations {\n            id\n            notes\n            wasPresent\n            rating\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n          type {\n            id\n          }\n          description\n          evaluations {\n            id\n            notes\n            wasPresent\n            rating\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollectionUnauthorized($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollectionUnauthorized($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollectionInvalidID($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollectionInvalidID($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollectionEvaluationsNotInCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollectionEvaluationsNotInCollection($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollectionInvalidStudentPresence($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollectionInvalidStudentPresence($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollectionInvalidEvaluationType($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollectionInvalidEvaluationType($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultCollectionDataLoaderCheck($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultCollectionDataLoaderCheck($data: UpdateDefaultCollectionInput!, $collectionId: ID!) {\n        updateDefaultCollection(data: $data, collectionId: $collectionId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluation($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n          rating\n          notes\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluation($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n          rating\n          notes\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationRatingLow($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationRatingLow($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationRatingInvalidInterval($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationRatingInvalidInterval($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationRatingHigh($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationRatingHigh($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationUnauthorized($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationUnauthorized($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationInvalidID($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationInvalidID($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationNotPresent($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationNotPresent($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationClassParticipationUpdate($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationClassParticipationUpdate($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultEvaluationDataLoaderCheck($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n          rating\n          notes\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultEvaluationDataLoaderCheck($input: UpdateDefaultEvaluationInput!) {\n        updateDefaultEvaluation(input: $input) {\n          id\n          rating\n          notes\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation UpdateGroupDataLoaderCheck($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupDataLoaderCheck($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n          archived\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypes($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypes($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesDuplicateIds($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesDuplicateIds($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesUnmatchedIds($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesUnmatchedIds($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesInvalidCategoryChange($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesInvalidCategoryChange($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesInvalidCategoryChange2($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesInvalidCategoryChange2($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesInvalidTotalWeight($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesInvalidTotalWeight($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesInvalidCategoryCount($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesInvalidCategoryCount($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateGroupCollectionTypesInvalidCategoryCount2($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateGroupCollectionTypesInvalidCategoryCount2($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          currentModule {\n            collectionTypes {\n              id\n              name\n              weight\n              category\n            }\n          }\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation UpdateStudentDataLoaderCheck($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateStudentDataLoaderCheck($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    "];
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
export function graphql(source: "\n      mutation DeleteGroupDataLoaderCheck($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteGroupDataLoaderCheck($groupId: ID!) {\n        deleteGroup(groupId: $groupId) {\n          id\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;