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
  "\n  query Main_GetAppMetadata {\n    getAppMetadata {\n      minimumAppVersion\n    }\n  }\n": types.Main_GetAppMetadataDocument,
  "\n  mutation EvaluationCard_FixTextGrammatics($studentId: ID!, $text: String!) {\n    fixTextGrammatics(studentId: $studentId, text: $text)\n  }\n":
    types.EvaluationCard_FixTextGrammaticsDocument,
  "\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n    student {\n      name\n    }\n  }\n":
    types.EvaluationsAccordion_EvaluationFragmentDoc,
  "\n  fragment GroupListItem on Group {\n    id\n    name\n    archived\n    subject {\n      label {\n        fi\n      }\n      code\n    }\n    updatedAt\n  }\n":
    types.GroupListItemFragmentDoc,
  "\n  query ArchivePage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n        }\n      }\n    }\n  }\n":
    types.ArchivePage_GetCurrentUserDocument,
  "\n  mutation LoginPage_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n":
    types.LoginPage_LoginDocument,
  "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      accessToken\n      teacher {\n        email\n        id\n      }\n    }\n  }\n":
    types.RegisterPage_RegisterDocument,
  "\n  mutation AddNewStudent_CreateStudent($id: ID!, $input: CreateStudentInput!) {\n    createStudent(moduleId: $id, data: $input) {\n      id\n      name\n      group {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n          students {\n            id\n            name\n            currentModuleEvaluations {\n              id\n              wasPresent\n            }\n          }\n          evaluationCollections {\n            id\n            date\n            environment {\n              label {\n                fi\n              }\n              code\n              color\n            }\n            learningObjectives {\n              code\n              label {\n                fi\n              }\n              description {\n                fi\n              }\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.AddNewStudent_CreateStudentDocument,
  "\n  mutation ChangeArchiveStatus_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n      archived\n    }\n  }\n":
    types.ChangeArchiveStatus_UpdateGroupDocument,
  "\n  query ChangeModule_GetGroup($id: ID!) {\n    getGroup(id: $id) {\n      id\n      subject {\n        code\n      }\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n      }\n    }\n  }\n":
    types.ChangeModule_GetGroupDocument,
  "\n  mutation ChangeModule_ChangeModule($data: ChangeGroupModuleInput!, $groupId: String!) {\n    changeGroupModule(data: $data, groupId: $groupId) {\n      id\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label {\n              fi\n            }\n            code\n            color\n          }\n          learningObjectives {\n            code\n            label {\n              fi\n            }\n            description {\n              fi\n            }\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n":
    types.ChangeModule_ChangeModuleDocument,
  "\n  mutation ChangeGroupName_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n      name\n    }\n  }\n":
    types.ChangeGroupName_UpdateGroupDocument,
  "\n  mutation ChangeStudentName_UpdateStudent($id: ID!, $input: UpdateStudentInput!) {\n    updateStudent(studentId: $id, data: $input) {\n      id\n      name\n    }\n  }\n":
    types.ChangeStudentName_UpdateStudentDocument,
  "\n  mutation CollectionHeaderRightButton_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id) {\n      id\n      module {\n        id\n        evaluationCollections {\n          id\n        }\n        group {\n          id\n          name\n        }\n      }\n    }\n  }\n":
    types.CollectionHeaderRightButton_DeleteCollectionDocument,
  "\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n        }\n      }\n    }\n  }\n":
    types.MainPage_GetCurrentUserDocument,
  "\n  mutation StudentHeaderRightButton_DeleteStudent($id: ID!) {\n    deleteStudent(studentId: $id) {\n      id\n      name\n      group {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n          students {\n            id\n            name\n            currentModuleEvaluations {\n              id\n              wasPresent\n            }\n          }\n          evaluationCollections {\n            id\n            date\n            environment {\n              label {\n                fi\n              }\n              code\n              color\n            }\n            learningObjectives {\n              code\n              label {\n                fi\n              }\n              description {\n                fi\n              }\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.StudentHeaderRightButton_DeleteStudentDocument,
  "\n  mutation ProfileView_Logout {\n    logout\n  }\n": types.ProfileView_LogoutDocument,
  "\n  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label {\n        fi\n      }\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n      isStellar\n    }\n  }\n":
    types.CollectionsLineChart_EvaluationCollectionFragmentDoc,
  "\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n  }\n":
    types.EvaluationsBarChart_EvaluationFragmentDoc,
  "\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n  }\n":
    types.EvaluationsLineChart_EvaluationFragmentDoc,
  "\n  query CollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      environment {\n        code\n        label {\n          fi\n        }\n        color\n      }\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n    }\n  }\n":
    types.CollectionEditAllEvaluationsView_GetCollectionDocument,
  "\n  mutation CollectionEvaluationsView_UpdateCollection($updateCollectionInput: UpdateCollectionInput!, $collectionId: ID!) {\n    updateCollection(data: $updateCollectionInput, collectionId: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n    }\n  }\n":
    types.CollectionEvaluationsView_UpdateCollectionDocument,
  "\n  query EditGeneralDetails_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      module {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n        }\n        group {\n          id\n          subject {\n            code\n          }\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        type\n      }\n    }\n  }\n":
    types.EditGeneralDetails_GetCollectionDocument,
  "\n  mutation EditGeneralDetails_UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(collectionId: $id, data: $input) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n      }\n      module {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n        }\n        group {\n          id\n          subject {\n            code\n          }\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        description {\n          fi\n        }\n        type\n      }\n    }\n  }\n":
    types.EditGeneralDetails_UpdateCollectionDocument,
  "\n  query EvaluationEditView_GetEvaluation($evaluationId: ID!) {\n    getEvaluation(id: $evaluationId) {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      isStellar\n      collection {\n        id\n        date\n        environment {\n          code\n          label {\n            fi\n          }\n          color\n        }\n      }\n      student {\n        id\n        name\n        currentModuleEvaluations {\n          id\n          notes\n        }\n      }\n    }\n  }\n":
    types.EvaluationEditView_GetEvaluationDocument,
  "\n  mutation EvaluationEditView_UpdateEvaluation($updateEvaluationInput: UpdateEvaluationInput!) {\n    updateEvaluation(data: $updateEvaluationInput) {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      isStellar\n    }\n  }\n":
    types.EvaluationEditView_UpdateEvaluationDocument,
  "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      module {\n        group {\n          name\n          id\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n      }\n      evaluations {\n        id\n        ...EvaluationsAccordion_Evaluation\n      }\n    }\n  }\n":
    types.CollectionPage_GetCollectionDocument,
  "\n  query StudentFeedbackView_GetStudent($id: ID!) {\n    getStudent(id: $id) {\n      id\n      group {\n        id\n        archived\n        currentModule {\n          id\n        }\n      }\n      currentModuleEvaluations {\n        id\n        notes\n        wasPresent\n        behaviourRating\n        skillsRating\n        isStellar\n        collection {\n          id\n          date\n          environment {\n            code\n            label {\n              fi\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.StudentFeedbackView_GetStudentDocument,
  "\n  mutation StudentFeedbackView_GenerateFeedback($studentId: ID!, $moduleId: ID!) {\n    generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n  }\n":
    types.StudentFeedbackView_GenerateFeedbackDocument,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      archived\n      subject {\n        label {\n          fi\n        }\n        code\n      }\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label {\n              fi\n            }\n            code\n            color\n          }\n          learningObjectives {\n            code\n            label {\n              fi\n            }\n            description {\n              fi\n            }\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      group {\n        id\n        name\n        subject {\n          code\n          label {\n            fi\n          }\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n        }\n      }\n      currentModuleEvaluations {\n        id\n        notes\n        wasPresent\n        behaviourRating\n        skillsRating\n        isStellar\n        collection {\n          id\n          environment {\n            code\n            label {\n              fi\n            }\n          }\n        }\n        ...EvaluationsAccordion_Evaluation\n        ...EvaluationsLineChart_Evaluation\n        ...EvaluationsBarChart_Evaluation\n      }\n    }\n  }\n":
    types.StudentPage_GetStudentDocument,
  "\n  query CollectionCreationProvider_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentModule {\n        id\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n      ...CollectionGeneralInfoView_Group\n    }\n  }\n":
    types.CollectionCreationProvider_GetGroupDocument,
  "\n  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $moduleId: ID!) {\n    createCollection(data: $createCollectionInput, moduleId: $moduleId) {\n      id\n      date\n      description\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        description {\n          fi\n        }\n        type\n      }\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          currentModuleEvaluations {\n            id\n          }\n        }\n      }\n      module {\n        id\n        evaluationCollections {\n          id\n        }\n        group {\n          id\n          updatedAt\n        }\n      }\n    }\n  }\n":
    types.CollectionEvaluationsView_CreateCollectionDocument,
  "\n  fragment CollectionParticipationsView_Group on Group {\n    students {\n      id\n      name\n    }\n  }\n":
    types.CollectionParticipationsView_GroupFragmentDoc,
  "\n  fragment CollectionGeneralInfoView_Group on Group {\n    subject {\n      code\n    }\n    currentModule {\n      id\n      info {\n        educationLevel\n        learningObjectiveGroupKey\n      }\n    }\n  }\n":
    types.CollectionGeneralInfoView_GroupFragmentDoc,
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
  source: "\n  query Main_GetAppMetadata {\n    getAppMetadata {\n      minimumAppVersion\n    }\n  }\n"
): (typeof documents)["\n  query Main_GetAppMetadata {\n    getAppMetadata {\n      minimumAppVersion\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EvaluationCard_FixTextGrammatics($studentId: ID!, $text: String!) {\n    fixTextGrammatics(studentId: $studentId, text: $text)\n  }\n"
): (typeof documents)["\n  mutation EvaluationCard_FixTextGrammatics($studentId: ID!, $text: String!) {\n    fixTextGrammatics(studentId: $studentId, text: $text)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n    student {\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n    student {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment GroupListItem on Group {\n    id\n    name\n    archived\n    subject {\n      label {\n        fi\n      }\n      code\n    }\n    updatedAt\n  }\n"
): (typeof documents)["\n  fragment GroupListItem on Group {\n    id\n    name\n    archived\n    subject {\n      label {\n        fi\n      }\n      code\n    }\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ArchivePage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ArchivePage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  mutation AddNewStudent_CreateStudent($id: ID!, $input: CreateStudentInput!) {\n    createStudent(moduleId: $id, data: $input) {\n      id\n      name\n      group {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n          students {\n            id\n            name\n            currentModuleEvaluations {\n              id\n              wasPresent\n            }\n          }\n          evaluationCollections {\n            id\n            date\n            environment {\n              label {\n                fi\n              }\n              code\n              color\n            }\n            learningObjectives {\n              code\n              label {\n                fi\n              }\n              description {\n                fi\n              }\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation AddNewStudent_CreateStudent($id: ID!, $input: CreateStudentInput!) {\n    createStudent(moduleId: $id, data: $input) {\n      id\n      name\n      group {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n          students {\n            id\n            name\n            currentModuleEvaluations {\n              id\n              wasPresent\n            }\n          }\n          evaluationCollections {\n            id\n            date\n            environment {\n              label {\n                fi\n              }\n              code\n              color\n            }\n            learningObjectives {\n              code\n              label {\n                fi\n              }\n              description {\n                fi\n              }\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ChangeArchiveStatus_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n      archived\n    }\n  }\n"
): (typeof documents)["\n  mutation ChangeArchiveStatus_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n      archived\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ChangeModule_GetGroup($id: ID!) {\n    getGroup(id: $id) {\n      id\n      subject {\n        code\n      }\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query ChangeModule_GetGroup($id: ID!) {\n    getGroup(id: $id) {\n      id\n      subject {\n        code\n      }\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ChangeModule_ChangeModule($data: ChangeGroupModuleInput!, $groupId: String!) {\n    changeGroupModule(data: $data, groupId: $groupId) {\n      id\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label {\n              fi\n            }\n            code\n            color\n          }\n          learningObjectives {\n            code\n            label {\n              fi\n            }\n            description {\n              fi\n            }\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation ChangeModule_ChangeModule($data: ChangeGroupModuleInput!, $groupId: String!) {\n    changeGroupModule(data: $data, groupId: $groupId) {\n      id\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label {\n              fi\n            }\n            code\n            color\n          }\n          learningObjectives {\n            code\n            label {\n              fi\n            }\n            description {\n              fi\n            }\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ChangeGroupName_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  mutation ChangeGroupName_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ChangeStudentName_UpdateStudent($id: ID!, $input: UpdateStudentInput!) {\n    updateStudent(studentId: $id, data: $input) {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  mutation ChangeStudentName_UpdateStudent($id: ID!, $input: UpdateStudentInput!) {\n    updateStudent(studentId: $id, data: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CollectionHeaderRightButton_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id) {\n      id\n      module {\n        id\n        evaluationCollections {\n          id\n        }\n        group {\n          id\n          name\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CollectionHeaderRightButton_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id) {\n      id\n      module {\n        id\n        evaluationCollections {\n          id\n        }\n        group {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query MainPage_GetCurrentUser {\n    getCurrentUser {\n      email\n      id\n      groups {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation StudentHeaderRightButton_DeleteStudent($id: ID!) {\n    deleteStudent(studentId: $id) {\n      id\n      name\n      group {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n          students {\n            id\n            name\n            currentModuleEvaluations {\n              id\n              wasPresent\n            }\n          }\n          evaluationCollections {\n            id\n            date\n            environment {\n              label {\n                fi\n              }\n              code\n              color\n            }\n            learningObjectives {\n              code\n              label {\n                fi\n              }\n              description {\n                fi\n              }\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation StudentHeaderRightButton_DeleteStudent($id: ID!) {\n    deleteStudent(studentId: $id) {\n      id\n      name\n      group {\n        id\n        name\n        archived\n        updatedAt\n        subject {\n          label {\n            fi\n          }\n          code\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n          students {\n            id\n            name\n            currentModuleEvaluations {\n              id\n              wasPresent\n            }\n          }\n          evaluationCollections {\n            id\n            date\n            environment {\n              label {\n                fi\n              }\n              code\n              color\n            }\n            learningObjectives {\n              code\n              label {\n                fi\n              }\n              description {\n                fi\n              }\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label {\n        fi\n      }\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n      isStellar\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionsLineChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label {\n        fi\n      }\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n      isStellar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      environment {\n        code\n        label {\n          fi\n        }\n        color\n      }\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionEditAllEvaluationsView_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      environment {\n        code\n        label {\n          fi\n        }\n        color\n      }\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CollectionEvaluationsView_UpdateCollection($updateCollectionInput: UpdateCollectionInput!, $collectionId: ID!) {\n    updateCollection(data: $updateCollectionInput, collectionId: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CollectionEvaluationsView_UpdateCollection($updateCollectionInput: UpdateCollectionInput!, $collectionId: ID!) {\n    updateCollection(data: $updateCollectionInput, collectionId: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EditGeneralDetails_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      module {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n        }\n        group {\n          id\n          subject {\n            code\n          }\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        type\n      }\n    }\n  }\n"
): (typeof documents)["\n  query EditGeneralDetails_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      module {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n        }\n        group {\n          id\n          subject {\n            code\n          }\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EditGeneralDetails_UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(collectionId: $id, data: $input) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n      }\n      module {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n        }\n        group {\n          id\n          subject {\n            code\n          }\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        description {\n          fi\n        }\n        type\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation EditGeneralDetails_UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {\n    updateCollection(collectionId: $id, data: $input) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n      }\n      module {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n        }\n        group {\n          id\n          subject {\n            code\n          }\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        description {\n          fi\n        }\n        type\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EvaluationEditView_GetEvaluation($evaluationId: ID!) {\n    getEvaluation(id: $evaluationId) {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      isStellar\n      collection {\n        id\n        date\n        environment {\n          code\n          label {\n            fi\n          }\n          color\n        }\n      }\n      student {\n        id\n        name\n        currentModuleEvaluations {\n          id\n          notes\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query EvaluationEditView_GetEvaluation($evaluationId: ID!) {\n    getEvaluation(id: $evaluationId) {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      isStellar\n      collection {\n        id\n        date\n        environment {\n          code\n          label {\n            fi\n          }\n          color\n        }\n      }\n      student {\n        id\n        name\n        currentModuleEvaluations {\n          id\n          notes\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EvaluationEditView_UpdateEvaluation($updateEvaluationInput: UpdateEvaluationInput!) {\n    updateEvaluation(data: $updateEvaluationInput) {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      isStellar\n    }\n  }\n"
): (typeof documents)["\n  mutation EvaluationEditView_UpdateEvaluation($updateEvaluationInput: UpdateEvaluationInput!) {\n    updateEvaluation(data: $updateEvaluationInput) {\n      id\n      wasPresent\n      skillsRating\n      behaviourRating\n      notes\n      isStellar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      module {\n        group {\n          name\n          id\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n      }\n      evaluations {\n        id\n        ...EvaluationsAccordion_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      description\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      module {\n        group {\n          name\n          id\n        }\n      }\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n      }\n      evaluations {\n        id\n        ...EvaluationsAccordion_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StudentFeedbackView_GetStudent($id: ID!) {\n    getStudent(id: $id) {\n      id\n      group {\n        id\n        archived\n        currentModule {\n          id\n        }\n      }\n      currentModuleEvaluations {\n        id\n        notes\n        wasPresent\n        behaviourRating\n        skillsRating\n        isStellar\n        collection {\n          id\n          date\n          environment {\n            code\n            label {\n              fi\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentFeedbackView_GetStudent($id: ID!) {\n    getStudent(id: $id) {\n      id\n      group {\n        id\n        archived\n        currentModule {\n          id\n        }\n      }\n      currentModuleEvaluations {\n        id\n        notes\n        wasPresent\n        behaviourRating\n        skillsRating\n        isStellar\n        collection {\n          id\n          date\n          environment {\n            code\n            label {\n              fi\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation StudentFeedbackView_GenerateFeedback($studentId: ID!, $moduleId: ID!) {\n    generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n  }\n"
): (typeof documents)["\n  mutation StudentFeedbackView_GenerateFeedback($studentId: ID!, $moduleId: ID!) {\n    generateStudentFeedback(studentId: $studentId, moduleId: $moduleId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      archived\n      subject {\n        label {\n          fi\n        }\n        code\n      }\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label {\n              fi\n            }\n            code\n            color\n          }\n          learningObjectives {\n            code\n            label {\n              fi\n            }\n            description {\n              fi\n            }\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      archived\n      subject {\n        label {\n          fi\n        }\n        code\n      }\n      currentModule {\n        id\n        info {\n          educationLevel\n          learningObjectiveGroupKey\n          label {\n            fi\n          }\n        }\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            wasPresent\n          }\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label {\n              fi\n            }\n            code\n            color\n          }\n          learningObjectives {\n            code\n            label {\n              fi\n            }\n            description {\n              fi\n            }\n            type\n          }\n          ...CollectionsLineChart_EvaluationCollection\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      group {\n        id\n        name\n        subject {\n          code\n          label {\n            fi\n          }\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n        }\n      }\n      currentModuleEvaluations {\n        id\n        notes\n        wasPresent\n        behaviourRating\n        skillsRating\n        isStellar\n        collection {\n          id\n          environment {\n            code\n            label {\n              fi\n            }\n          }\n        }\n        ...EvaluationsAccordion_Evaluation\n        ...EvaluationsLineChart_Evaluation\n        ...EvaluationsBarChart_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      group {\n        id\n        name\n        subject {\n          code\n          label {\n            fi\n          }\n        }\n        currentModule {\n          id\n          info {\n            educationLevel\n            learningObjectiveGroupKey\n            label {\n              fi\n            }\n          }\n        }\n      }\n      currentModuleEvaluations {\n        id\n        notes\n        wasPresent\n        behaviourRating\n        skillsRating\n        isStellar\n        collection {\n          id\n          environment {\n            code\n            label {\n              fi\n            }\n          }\n        }\n        ...EvaluationsAccordion_Evaluation\n        ...EvaluationsLineChart_Evaluation\n        ...EvaluationsBarChart_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CollectionCreationProvider_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentModule {\n        id\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n      ...CollectionGeneralInfoView_Group\n    }\n  }\n"
): (typeof documents)["\n  query CollectionCreationProvider_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentModule {\n        id\n        students {\n          id\n          name\n          currentModuleEvaluations {\n            id\n            notes\n          }\n        }\n      }\n      ...CollectionGeneralInfoView_Group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $moduleId: ID!) {\n    createCollection(data: $createCollectionInput, moduleId: $moduleId) {\n      id\n      date\n      description\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        description {\n          fi\n        }\n        type\n      }\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          currentModuleEvaluations {\n            id\n          }\n        }\n      }\n      module {\n        id\n        evaluationCollections {\n          id\n        }\n        group {\n          id\n          updatedAt\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CollectionEvaluationsView_CreateCollection($createCollectionInput: CreateCollectionInput!, $moduleId: ID!) {\n    createCollection(data: $createCollectionInput, moduleId: $moduleId) {\n      id\n      date\n      description\n      learningObjectives {\n        code\n        label {\n          fi\n        }\n        description {\n          fi\n        }\n        type\n      }\n      environment {\n        label {\n          fi\n        }\n        code\n        color\n      }\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        isStellar\n        student {\n          id\n          currentModuleEvaluations {\n            id\n          }\n        }\n      }\n      module {\n        id\n        evaluationCollections {\n          id\n        }\n        group {\n          id\n          updatedAt\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  fragment CollectionGeneralInfoView_Group on Group {\n    subject {\n      code\n    }\n    currentModule {\n      id\n      info {\n        educationLevel\n        learningObjectiveGroupKey\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionGeneralInfoView_Group on Group {\n    subject {\n      code\n    }\n    currentModule {\n      id\n      info {\n        educationLevel\n        learningObjectiveGroupKey\n      }\n    }\n  }\n"];
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
