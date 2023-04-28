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
  "\n  mutation ChangeClassYearModal_ChangeClassYear(\n    $groupId: ID!\n    $newYearCode: ClassYearCode!\n    $transferEvaluations: Boolean!\n  ) {\n    changeGroupYear(\n      groupId: $groupId\n      newYearCode: $newYearCode\n      transferEvaluations: $transferEvaluations\n    ) {\n      id\n    }\n  }\n":
    types.ChangeClassYearModal_ChangeClassYearDocument,
  "\n  fragment ChangeClassYearModal_Group on Group {\n    id\n    currentClassYear {\n      info {\n        code\n      }\n    }\n  }\n":
    types.ChangeClassYearModal_GroupFragmentDoc,
  "\n  fragment CollectionsChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n    }\n  }\n":
    types.CollectionsChart_EvaluationCollectionFragmentDoc,
  "\n  fragment EvaluationsAccordion_Evaluation on Evaluation {\n    id\n    notes\n    behaviourRating\n    skillsRating\n    wasPresent\n    isStellar\n    collection {\n      date\n      environment {\n        label\n      }\n    }\n    student {\n      name\n    }\n  }\n":
    types.EvaluationsAccordion_EvaluationFragmentDoc,
  "\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n":
    types.EvaluationsBarChart_EvaluationFragmentDoc,
  "\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label\n        code\n      }\n    }\n  }\n":
    types.EvaluationsLineChart_EvaluationFragmentDoc,
  "\n  fragment GroupList_GroupFragment on Group {\n    id\n    name\n    teacher {\n      id\n    }\n  }\n":
    types.GroupList_GroupFragmentFragmentDoc,
  "\n  fragment UpdateCollectionForm_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n    students {\n      id\n      name\n    }\n  }\n":
    types.UpdateCollectionForm_GroupFragmentDoc,
  "\n  fragment UpdateCollectionForm_Collection on EvaluationCollection {\n    date\n    type\n    description\n    environment {\n      code\n    }\n    classYear {\n      info {\n        code\n      }\n      group {\n        subject {\n          code\n        }\n      }\n    }\n    learningObjectives {\n      code\n    }\n    evaluations {\n      wasPresent\n      student {\n        id\n        name\n      }\n    }\n  }\n":
    types.UpdateCollectionForm_CollectionFragmentDoc,
  "\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n    }\n  }\n":
    types.UpdateCollectionsList_CollectionFragmentDoc,
  "\n  mutation UpdateCollectionList_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n":
    types.UpdateCollectionList_DeleteCollectionDocument,
  "\n  fragment UpdateEvaluationCard_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    notes\n    wasPresent\n    isStellar\n    student {\n      id\n      name\n      currentClassEvaluations {\n        notes\n      }\n    }\n  }\n":
    types.UpdateEvaluationCard_EvaluationFragmentDoc,
  "\n  fragment UpdateStudentsList_Student on Student {\n    id\n    name\n  }\n":
    types.UpdateStudentsList_StudentFragmentDoc,
  "\n  mutation UpdateStudentList_UpdateStudent(\n    $input: UpdateStudentInput!\n    $studentId: ID!\n  ) {\n    updateStudent(data: $input, studentId: $studentId) {\n      id\n    }\n  }\n":
    types.UpdateStudentList_UpdateStudentDocument,
  "\n  mutation UpdateStudentList_CreateStudent(\n    $input: CreateStudentInput!\n    $classYearId: ID!\n  ) {\n    createStudent(data: $input, classYearId: $classYearId) {\n      ...UpdateStudentsList_Student\n    }\n  }\n":
    types.UpdateStudentList_CreateStudentDocument,
  "\n  mutation UpdateStudentList_DeleteStudent($studentId: ID!) {\n    deleteStudent(studentId: $studentId)\n  }\n":
    types.UpdateStudentList_DeleteStudentDocument,
  "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n    isStellar\n    ...EvaluationsLineChart_Evaluation\n    ...EvaluationsBarChart_Evaluation\n  }\n":
    types.StudentEvaluationRecap_EvaluationFragmentDoc,
  "\n  fragment StudentEvaluationRecap_Student on Student {\n    id\n    name\n    group {\n      name\n    }\n  }\n":
    types.StudentEvaluationRecap_StudentFragmentDoc,
  "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n":
    types.RegisterPage_RegisterDocument,
  "\n      mutation ChangeGroupYearTest_ChangeGroupYear(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n          }\n        }\n      }\n    ":
    types.ChangeGroupYearTest_ChangeGroupYearDocument,
  "\n      mutation ChangeGroupYearTest_ChangeGroupYearError(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n          }\n        }\n      }\n    ":
    types.ChangeGroupYearTest_ChangeGroupYearErrorDocument,
  "\n      mutation ChangeGroupYearTest_ChangeGroupYearEvaluationCollections(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n            evaluationCollections {\n              id\n            }\n          }\n        }\n      }\n    ":
    types.ChangeGroupYearTest_ChangeGroupYearEvaluationCollectionsDocument,
  "\n      mutation ChangeGroupYearTest_ChangeGroupYearTransferEvaluations(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n        $transferEvaluations: Boolean\n      ) {\n        changeGroupYear(\n          groupId: $groupId\n          newYearCode: $newYearCode\n          transferEvaluations: $transferEvaluations\n        ) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n            evaluationCollections {\n              id\n            }\n          }\n        }\n      }\n    ":
    types.ChangeGroupYearTest_ChangeGroupYearTransferEvaluationsDocument,
  "\n      mutation CreateCollection(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n          date\n          environment {\n            code\n          }\n          description\n          learningObjectives {\n            code\n          }\n        }\n      }\n    ":
    types.CreateCollectionDocument,
  "\n        mutation CreateCollectionWithEvaluations(\n          $data: CreateCollectionInput!\n          $classYearId: ID!\n        ) {\n          createCollection(data: $data, classYearId: $classYearId) {\n            id\n            date\n            description\n            environment {\n              code\n            }\n            evaluations {\n              id\n              wasPresent\n              skillsRating\n              behaviourRating\n              notes\n            }\n          }\n        }\n      ":
    types.CreateCollectionWithEvaluationsDocument,
  "\n      mutation CreateCollectionWithInvalidSubjectCode(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n        }\n      }\n    ":
    types.CreateCollectionWithInvalidSubjectCodeDocument,
  "\n      mutation CreateCollectionWithInvalidLearningObjectiveCode(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n        }\n      }\n    ":
    types.CreateCollectionWithInvalidLearningObjectiveCodeDocument,
  "\n      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          currentClassYear {\n            info {\n              code\n            }\n          }\n          students {\n            id\n          }\n        }\n      }\n    ":
    types.CreateGroupWithoutStudentsDocument,
  "\n      mutation CreateGroupWithStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          students {\n            id\n            name\n          }\n        }\n      }\n    ":
    types.CreateGroupWithStudentsDocument,
  "\n      mutation CreateGroupWithInvalidSubjectCode($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    ":
    types.CreateGroupWithInvalidSubjectCodeDocument,
  "\n        mutation CreateStudent($data: CreateStudentInput!, $classYearId: ID!) {\n          createStudent(data: $data, classYearId: $classYearId) {\n            id\n            name\n            group {\n              id\n            }\n          }\n        }\n      ":
    types.CreateStudentDocument,
  "\n      mutation DeleteCollection($collectionId: ID!) {\n        deleteCollection(collectionId: $collectionId)\n      }\n    ":
    types.DeleteCollectionDocument,
  "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId)\n      }\n    ":
    types.DeleteGroupDocument,
  "\n      mutation DeleteStudent($studentId: ID!) {\n        deleteStudent(studentId: $studentId)\n      }\n    ":
    types.DeleteStudentDocument,
  "\n      mutation Login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n          teacher {\n            id\n            email\n          }\n        }\n      }\n    ":
    types.LoginDocument,
  "\n      mutation Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          id\n          email\n        }\n      }\n    ":
    types.RegisterDocument,
  "\n      mutation UpdateCollectionTest_UpdateCollectionDefault(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          environment {\n            code\n          }\n          date\n          learningObjectives {\n            code\n          }\n        }\n      }\n    ":
    types.UpdateCollectionTest_UpdateCollectionDefaultDocument,
  "\n      mutation UpdateCollectionTest_UpdateCollectionEvaluation(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n          }\n        }\n      }\n    ":
    types.UpdateCollectionTest_UpdateCollectionEvaluationDocument,
  "\n      mutation UpdateCollectionTest_UpdateCollectionError(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    ":
    types.UpdateCollectionTest_UpdateCollectionErrorDocument,
  "\n      mutation UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCode(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    ":
    types.UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCodeDocument,
  "\n      mutation UpdateCollectionTest_UpdateCollectionInvalidLearningObjectiveCodes(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    ":
    types.UpdateCollectionTest_UpdateCollectionInvalidLearningObjectiveCodesDocument,
  "\n      mutation UpdateEvaluationTest_UpdateEvaluationDefault(\n        $data: UpdateEvaluationInput!\n      ) {\n        updateEvaluation(data: $data) {\n          id\n          wasPresent\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    ":
    types.UpdateEvaluationTest_UpdateEvaluationDefaultDocument,
  "\n      mutation UpdateEvaluationTest_UpdateEvaluationError(\n        $data: UpdateEvaluationInput!\n      ) {\n        updateEvaluation(data: $data) {\n          id\n          wasPresent\n          skillsRating\n          behaviourRating\n        }\n      }\n    ":
    types.UpdateEvaluationTest_UpdateEvaluationErrorDocument,
  "\n      mutation UpdateEvaluations(\n        $data: [UpdateEvaluationInput!]!\n        $collectionId: ID!\n      ) {\n        updateEvaluations(data: $data, collectionId: $collectionId)\n      }\n    ":
    types.UpdateEvaluationsDocument,
  "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n        }\n      }\n    ":
    types.UpdateGroupDocument,
  "\n      mutation UpdateStudent($data: UpdateStudentInput!, $studentId: ID!) {\n        updateStudent(data: $data, studentId: $studentId) {\n          id\n          name\n        }\n      }\n    ":
    types.UpdateStudentDocument,
  "\n      query GetTeacher($id: ID!) {\n        getTeacher(id: $id) {\n          id\n          email\n        }\n      }\n    ":
    types.GetTeacherDocument,
  "\n  mutation Auth_Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      teacher {\n        id\n        email\n      }\n    }\n  }\n":
    types.Auth_LoginDocument,
  "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      environment {\n        label\n        color\n      }\n      description\n      classYear {\n        group {\n          name\n          id\n        }\n      }\n      learningObjectives {\n        code\n        label\n      }\n      evaluations {\n        id\n        ...EvaluationsAccordion_Evaluation\n      }\n    }\n  }\n":
    types.CollectionPage_GetCollectionDocument,
  "\n  mutation CollectionPage_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n":
    types.CollectionPage_DeleteCollectionDocument,
  "\n  mutation CreateGroupPage_CreateGroup($input: CreateGroupInput!) {\n    createGroup(data: $input) {\n      id\n      name\n    }\n  }\n":
    types.CreateGroupPage_CreateGroupDocument,
  "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n          }\n          ...CollectionsChart_EvaluationCollection\n        }\n      }\n      ...ChangeClassYearModal_Group\n    }\n  }\n":
    types.GroupOverviewPage_GetGroupDocument,
  "\n  mutation GroupOverviewPage_DeleteGroup($groupId: ID!) {\n    deleteGroup(groupId: $groupId)\n  }\n":
    types.GroupOverviewPage_DeleteGroupDocument,
  "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      ...StudentEvaluationRecap_Student\n      group {\n        id\n      }\n      currentClassEvaluations {\n        id\n        notes\n        ...EvaluationsAccordion_Evaluation\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n":
    types.StudentPage_GetStudentDocument,
  "\n  query EditCollectionPage($id: ID!) {\n    getCollection(id: $id) {\n      id\n      evaluations {\n        id\n        student {\n          id\n        }\n      }\n      ...UpdateCollectionForm_Collection\n    }\n  }\n":
    types.EditCollectionPageDocument,
  "\n  mutation EditCollectionPage_UpdateCollection(\n    $input: UpdateCollectionInput!\n    $id: ID!\n  ) {\n    updateCollection(data: $input, collectionId: $id) {\n      id\n    }\n  }\n":
    types.EditCollectionPage_UpdateCollectionDocument,
  "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        student {\n          name\n        }\n        ...UpdateEvaluationCard_Evaluation\n      }\n    }\n  }\n":
    types.UpdateEvaluationsPage_GetCollectionDocument,
  "\n  mutation UpdateEvaluationsPage_UpdateEvaluations(\n    $updateEvaluationsInput: [UpdateEvaluationInput!]!\n    $collectionId: ID!\n  ) {\n    updateEvaluations(\n      data: $updateEvaluationsInput\n      collectionId: $collectionId\n    )\n  }\n":
    types.UpdateEvaluationsPage_UpdateEvaluationsDocument,
  "\n  query EvaluationEditPage_GetEvaluation($evaluationId: ID!) {\n    getEvaluation(id: $evaluationId) {\n      notes\n      id\n      skillsRating\n      behaviourRating\n      student {\n        id\n      }\n      collection {\n        date\n        environment {\n          label\n        }\n      }\n      ...UpdateEvaluationCard_Evaluation\n    }\n  }\n":
    types.EvaluationEditPage_GetEvaluationDocument,
  "\n  mutation EvaluationsEditPage_UpdateEvaluation(\n    $input: UpdateEvaluationInput!\n  ) {\n    updateEvaluation(data: $input) {\n      id\n    }\n  }\n":
    types.EvaluationsEditPage_UpdateEvaluationDocument,
  "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentClassYear {\n        id\n      }\n      ...UpdateCollectionForm_Group\n    }\n  }\n":
    types.CreateCollectionPage_GetGroupDocument,
  "\n  mutation CreateCollectionPage_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $classYearId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, classYearId: $classYearId) {\n      id\n    }\n  }\n":
    types.CreateCollectionPage_CreateCollectionDocument,
  "\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n      }\n      students {\n        ...UpdateStudentsList_Student\n      }\n      currentClassYear {\n        id\n        info {\n          label\n        }\n        evaluationCollections {\n          ...UpdateCollectionsList_Collection\n        }\n      }\n    }\n  }\n":
    types.EditGroupPage_GetGroupDocument,
  "\n  mutation EditGroupPage_UpdateGroup($id: ID!, $input: UpdateGroupInput!) {\n    updateGroup(groupId: $id, data: $input) {\n      id\n    }\n  }\n":
    types.EditGroupPage_UpdateGroupDocument,
  "\n  query StudentDetailsPage($id: ID!) {\n    getStudent(id: $id) {\n      id\n      name\n      group {\n        id\n      }\n      currentClassEvaluations {\n        id\n        notes\n      }\n    }\n  }\n":
    types.StudentDetailsPageDocument,
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
  source: "\n  mutation ChangeClassYearModal_ChangeClassYear(\n    $groupId: ID!\n    $newYearCode: ClassYearCode!\n    $transferEvaluations: Boolean!\n  ) {\n    changeGroupYear(\n      groupId: $groupId\n      newYearCode: $newYearCode\n      transferEvaluations: $transferEvaluations\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation ChangeClassYearModal_ChangeClassYear(\n    $groupId: ID!\n    $newYearCode: ClassYearCode!\n    $transferEvaluations: Boolean!\n  ) {\n    changeGroupYear(\n      groupId: $groupId\n      newYearCode: $newYearCode\n      transferEvaluations: $transferEvaluations\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ChangeClassYearModal_Group on Group {\n    id\n    currentClassYear {\n      info {\n        code\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment ChangeClassYearModal_Group on Group {\n    id\n    currentClassYear {\n      info {\n        code\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionsChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n    }\n  }\n"
): (typeof documents)["\n  fragment CollectionsChart_EvaluationCollection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n      code\n    }\n    evaluations {\n      skillsRating\n      behaviourRating\n      wasPresent\n    }\n  }\n"];
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
  source: "\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsBarChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      environment {\n        label\n        code\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label\n        code\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment EvaluationsLineChart_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    wasPresent\n    collection {\n      date\n      environment {\n        label\n        code\n      }\n    }\n  }\n"];
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
  source: "\n  fragment UpdateCollectionForm_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n    students {\n      id\n      name\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateCollectionForm_Group on Group {\n    subject {\n      code\n    }\n    currentClassYear {\n      info {\n        code\n      }\n    }\n    students {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateCollectionForm_Collection on EvaluationCollection {\n    date\n    type\n    description\n    environment {\n      code\n    }\n    classYear {\n      info {\n        code\n      }\n      group {\n        subject {\n          code\n        }\n      }\n    }\n    learningObjectives {\n      code\n    }\n    evaluations {\n      wasPresent\n      student {\n        id\n        name\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateCollectionForm_Collection on EvaluationCollection {\n    date\n    type\n    description\n    environment {\n      code\n    }\n    classYear {\n      info {\n        code\n      }\n      group {\n        subject {\n          code\n        }\n      }\n    }\n    learningObjectives {\n      code\n    }\n    evaluations {\n      wasPresent\n      student {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateCollectionsList_Collection on EvaluationCollection {\n    id\n    date\n    environment {\n      label\n    }\n  }\n"];
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
  source: "\n  fragment UpdateEvaluationCard_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    notes\n    wasPresent\n    isStellar\n    student {\n      id\n      name\n      currentClassEvaluations {\n        notes\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment UpdateEvaluationCard_Evaluation on Evaluation {\n    id\n    skillsRating\n    behaviourRating\n    notes\n    wasPresent\n    isStellar\n    student {\n      id\n      name\n      currentClassEvaluations {\n        notes\n      }\n    }\n  }\n"];
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
  source: "\n  mutation UpdateStudentList_CreateStudent(\n    $input: CreateStudentInput!\n    $classYearId: ID!\n  ) {\n    createStudent(data: $input, classYearId: $classYearId) {\n      ...UpdateStudentsList_Student\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateStudentList_CreateStudent(\n    $input: CreateStudentInput!\n    $classYearId: ID!\n  ) {\n    createStudent(data: $input, classYearId: $classYearId) {\n      ...UpdateStudentsList_Student\n    }\n  }\n"];
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
  source: "\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n    isStellar\n    ...EvaluationsLineChart_Evaluation\n    ...EvaluationsBarChart_Evaluation\n  }\n"
): (typeof documents)["\n  fragment StudentEvaluationRecap_Evaluation on Evaluation {\n    id\n    wasPresent\n    behaviourRating\n    skillsRating\n    isStellar\n    ...EvaluationsLineChart_Evaluation\n    ...EvaluationsBarChart_Evaluation\n  }\n"];
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
  source: "\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"
): (typeof documents)["\n  mutation RegisterPage_Register($input: CreateTeacherInput!) {\n    register(data: $input) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation ChangeGroupYearTest_ChangeGroupYear(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation ChangeGroupYearTest_ChangeGroupYear(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation ChangeGroupYearTest_ChangeGroupYearError(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation ChangeGroupYearTest_ChangeGroupYearError(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation ChangeGroupYearTest_ChangeGroupYearEvaluationCollections(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n            evaluationCollections {\n              id\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation ChangeGroupYearTest_ChangeGroupYearEvaluationCollections(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n      ) {\n        changeGroupYear(groupId: $groupId, newYearCode: $newYearCode) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n            evaluationCollections {\n              id\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation ChangeGroupYearTest_ChangeGroupYearTransferEvaluations(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n        $transferEvaluations: Boolean\n      ) {\n        changeGroupYear(\n          groupId: $groupId\n          newYearCode: $newYearCode\n          transferEvaluations: $transferEvaluations\n        ) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n            evaluationCollections {\n              id\n            }\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation ChangeGroupYearTest_ChangeGroupYearTransferEvaluations(\n        $groupId: ID!\n        $newYearCode: ClassYearCode!\n        $transferEvaluations: Boolean\n      ) {\n        changeGroupYear(\n          groupId: $groupId\n          newYearCode: $newYearCode\n          transferEvaluations: $transferEvaluations\n        ) {\n          id\n          currentClassYear {\n            info {\n              code\n            }\n            evaluationCollections {\n              id\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateCollection(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n          date\n          environment {\n            code\n          }\n          description\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateCollection(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n          date\n          environment {\n            code\n          }\n          description\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation CreateCollectionWithEvaluations(\n          $data: CreateCollectionInput!\n          $classYearId: ID!\n        ) {\n          createCollection(data: $data, classYearId: $classYearId) {\n            id\n            date\n            description\n            environment {\n              code\n            }\n            evaluations {\n              id\n              wasPresent\n              skillsRating\n              behaviourRating\n              notes\n            }\n          }\n        }\n      "
): (typeof documents)["\n        mutation CreateCollectionWithEvaluations(\n          $data: CreateCollectionInput!\n          $classYearId: ID!\n        ) {\n          createCollection(data: $data, classYearId: $classYearId) {\n            id\n            date\n            description\n            environment {\n              code\n            }\n            evaluations {\n              id\n              wasPresent\n              skillsRating\n              behaviourRating\n              notes\n            }\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateCollectionWithInvalidSubjectCode(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateCollectionWithInvalidSubjectCode(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateCollectionWithInvalidLearningObjectiveCode(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateCollectionWithInvalidLearningObjectiveCode(\n        $data: CreateCollectionInput!\n        $classYearId: ID!\n      ) {\n        createCollection(data: $data, classYearId: $classYearId) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          currentClassYear {\n            info {\n              code\n            }\n          }\n          students {\n            id\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateGroupWithoutStudents($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n          name\n          teacher {\n            id\n          }\n          currentClassYear {\n            info {\n              code\n            }\n          }\n          students {\n            id\n          }\n        }\n      }\n    "];
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
  source: "\n      mutation CreateGroupWithInvalidSubjectCode($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "
): (typeof documents)["\n      mutation CreateGroupWithInvalidSubjectCode($data: CreateGroupInput!) {\n        createGroup(data: $data) {\n          id\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n        mutation CreateStudent($data: CreateStudentInput!, $classYearId: ID!) {\n          createStudent(data: $data, classYearId: $classYearId) {\n            id\n            name\n            group {\n              id\n            }\n          }\n        }\n      "
): (typeof documents)["\n        mutation CreateStudent($data: CreateStudentInput!, $classYearId: ID!) {\n          createStudent(data: $data, classYearId: $classYearId) {\n            id\n            name\n            group {\n              id\n            }\n          }\n        }\n      "];
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
  source: "\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId)\n      }\n    "
): (typeof documents)["\n      mutation DeleteGroup($groupId: ID!) {\n        deleteGroup(groupId: $groupId)\n      }\n    "];
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
  source: "\n      mutation Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          id\n          email\n        }\n      }\n    "
): (typeof documents)["\n      mutation Register($data: CreateTeacherInput!) {\n        register(data: $data) {\n          id\n          email\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateCollectionTest_UpdateCollectionDefault(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          environment {\n            code\n          }\n          date\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateCollectionTest_UpdateCollectionDefault(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          environment {\n            code\n          }\n          date\n          learningObjectives {\n            code\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateCollectionTest_UpdateCollectionEvaluation(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n          }\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateCollectionTest_UpdateCollectionEvaluation(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          evaluations {\n            id\n            skillsRating\n            behaviourRating\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateCollectionTest_UpdateCollectionError(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateCollectionTest_UpdateCollectionError(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCode(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateCollectionTest_UpdateCollectionInvalidEnvironmentCode(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateCollectionTest_UpdateCollectionInvalidLearningObjectiveCodes(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateCollectionTest_UpdateCollectionInvalidLearningObjectiveCodes(\n        $data: UpdateCollectionInput!\n        $collectionId: ID!\n      ) {\n        updateCollection(data: $data, collectionId: $collectionId) {\n          id\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateEvaluationTest_UpdateEvaluationDefault(\n        $data: UpdateEvaluationInput!\n      ) {\n        updateEvaluation(data: $data) {\n          id\n          wasPresent\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateEvaluationTest_UpdateEvaluationDefault(\n        $data: UpdateEvaluationInput!\n      ) {\n        updateEvaluation(data: $data) {\n          id\n          wasPresent\n          skillsRating\n          behaviourRating\n          notes\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n      mutation UpdateEvaluationTest_UpdateEvaluationError(\n        $data: UpdateEvaluationInput!\n      ) {\n        updateEvaluation(data: $data) {\n          id\n          wasPresent\n          skillsRating\n          behaviourRating\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateEvaluationTest_UpdateEvaluationError(\n        $data: UpdateEvaluationInput!\n      ) {\n        updateEvaluation(data: $data) {\n          id\n          wasPresent\n          skillsRating\n          behaviourRating\n        }\n      }\n    "];
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
  source: "\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n        }\n      }\n    "
): (typeof documents)["\n      mutation UpdateGroup($data: UpdateGroupInput!, $groupId: ID!) {\n        updateGroup(data: $data, groupId: $groupId) {\n          id\n          name\n        }\n      }\n    "];
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
  source: "\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      environment {\n        label\n        color\n      }\n      description\n      classYear {\n        group {\n          name\n          id\n        }\n      }\n      learningObjectives {\n        code\n        label\n      }\n      evaluations {\n        id\n        ...EvaluationsAccordion_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query CollectionPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      date\n      environment {\n        label\n        color\n      }\n      description\n      classYear {\n        group {\n          name\n          id\n        }\n      }\n      learningObjectives {\n        code\n        label\n      }\n      evaluations {\n        id\n        ...EvaluationsAccordion_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CollectionPage_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n"
): (typeof documents)["\n  mutation CollectionPage_DeleteCollection($id: ID!) {\n    deleteCollection(collectionId: $id)\n  }\n"];
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
  source: "\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n          }\n          ...CollectionsChart_EvaluationCollection\n        }\n      }\n      ...ChangeClassYearModal_Group\n    }\n  }\n"
): (typeof documents)["\n  query GroupOverviewPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n        code\n      }\n      currentClassYear {\n        info {\n          code\n          label\n        }\n        students {\n          id\n          name\n        }\n        evaluationCollections {\n          id\n          date\n          environment {\n            label\n          }\n          ...CollectionsChart_EvaluationCollection\n        }\n      }\n      ...ChangeClassYearModal_Group\n    }\n  }\n"];
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
  source: "\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      ...StudentEvaluationRecap_Student\n      group {\n        id\n      }\n      currentClassEvaluations {\n        id\n        notes\n        ...EvaluationsAccordion_Evaluation\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentPage_GetStudent($studentId: ID!) {\n    getStudent(id: $studentId) {\n      id\n      name\n      ...StudentEvaluationRecap_Student\n      group {\n        id\n      }\n      currentClassEvaluations {\n        id\n        notes\n        ...EvaluationsAccordion_Evaluation\n        ...StudentEvaluationRecap_Evaluation\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EditCollectionPage($id: ID!) {\n    getCollection(id: $id) {\n      id\n      evaluations {\n        id\n        student {\n          id\n        }\n      }\n      ...UpdateCollectionForm_Collection\n    }\n  }\n"
): (typeof documents)["\n  query EditCollectionPage($id: ID!) {\n    getCollection(id: $id) {\n      id\n      evaluations {\n        id\n        student {\n          id\n        }\n      }\n      ...UpdateCollectionForm_Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EditCollectionPage_UpdateCollection(\n    $input: UpdateCollectionInput!\n    $id: ID!\n  ) {\n    updateCollection(data: $input, collectionId: $id) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation EditCollectionPage_UpdateCollection(\n    $input: UpdateCollectionInput!\n    $id: ID!\n  ) {\n    updateCollection(data: $input, collectionId: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        student {\n          name\n        }\n        ...UpdateEvaluationCard_Evaluation\n      }\n    }\n  }\n"
): (typeof documents)["\n  query UpdateEvaluationsPage_GetCollection($collectionId: ID!) {\n    getCollection(id: $collectionId) {\n      id\n      evaluations {\n        id\n        wasPresent\n        skillsRating\n        behaviourRating\n        notes\n        student {\n          name\n        }\n        ...UpdateEvaluationCard_Evaluation\n      }\n    }\n  }\n"];
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
  source: "\n  query EvaluationEditPage_GetEvaluation($evaluationId: ID!) {\n    getEvaluation(id: $evaluationId) {\n      notes\n      id\n      skillsRating\n      behaviourRating\n      student {\n        id\n      }\n      collection {\n        date\n        environment {\n          label\n        }\n      }\n      ...UpdateEvaluationCard_Evaluation\n    }\n  }\n"
): (typeof documents)["\n  query EvaluationEditPage_GetEvaluation($evaluationId: ID!) {\n    getEvaluation(id: $evaluationId) {\n      notes\n      id\n      skillsRating\n      behaviourRating\n      student {\n        id\n      }\n      collection {\n        date\n        environment {\n          label\n        }\n      }\n      ...UpdateEvaluationCard_Evaluation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EvaluationsEditPage_UpdateEvaluation(\n    $input: UpdateEvaluationInput!\n  ) {\n    updateEvaluation(data: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation EvaluationsEditPage_UpdateEvaluation(\n    $input: UpdateEvaluationInput!\n  ) {\n    updateEvaluation(data: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentClassYear {\n        id\n      }\n      ...UpdateCollectionForm_Group\n    }\n  }\n"
): (typeof documents)["\n  query CreateCollectionPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      currentClassYear {\n        id\n      }\n      ...UpdateCollectionForm_Group\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateCollectionPage_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $classYearId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, classYearId: $classYearId) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateCollectionPage_CreateCollection(\n    $createCollectionInput: CreateCollectionInput!\n    $classYearId: ID!\n  ) {\n    createCollection(data: $createCollectionInput, classYearId: $classYearId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n      }\n      students {\n        ...UpdateStudentsList_Student\n      }\n      currentClassYear {\n        id\n        info {\n          label\n        }\n        evaluationCollections {\n          ...UpdateCollectionsList_Collection\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query EditGroupPage_GetGroup($groupId: ID!) {\n    getGroup(id: $groupId) {\n      id\n      name\n      subject {\n        label\n      }\n      students {\n        ...UpdateStudentsList_Student\n      }\n      currentClassYear {\n        id\n        info {\n          label\n        }\n        evaluationCollections {\n          ...UpdateCollectionsList_Collection\n        }\n      }\n    }\n  }\n"];
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
  source: "\n  query StudentDetailsPage($id: ID!) {\n    getStudent(id: $id) {\n      id\n      name\n      group {\n        id\n      }\n      currentClassEvaluations {\n        id\n        notes\n      }\n    }\n  }\n"
): (typeof documents)["\n  query StudentDetailsPage($id: ID!) {\n    getStudent(id: $id) {\n      id\n      name\n      group {\n        id\n      }\n      currentClassEvaluations {\n        id\n        notes\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
