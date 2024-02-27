import { CollectionTypeCategory, Student } from "@prisma/client";
import { graphql } from "@/tests/graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import {
  TestGroup,
  TestTeacher,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUserAndLogin,
  testLogin,
} from "../testHelpers";
import { groupLoader, groupsByTeacherLoader } from "../../graphql/dataLoaders/group";
import { evaluationLoader, evaluationsByCollectionLoader } from "../../graphql/dataLoaders/evaluation";
import { moduleLoader, modulesByGroupLoader } from "../../graphql/dataLoaders/module";
import { collectionLoader, collectionsByModuleLoader } from "../../graphql/dataLoaders/collection";
import { studentLoader, studentsByGroupLoader } from "../../graphql/dataLoaders/student";
import { collectionTypeLoader, collectionTypesByModuleLoader } from "../../graphql/dataLoaders/collectionType";
import { teacherLoader } from "../../graphql/dataLoaders/teacher";

describe("deleteTeacher", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;
  let student: Student;
  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
  });

  beforeEach(async () => {
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id); // Assuming createTestGroup exists
    [student] = group.students;
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should successfully delete a teacher", async () => {
    const query = graphql(`
      mutation DeleteTeacher($teacherId: ID!) {
        deleteTeacher(teacherId: $teacherId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { teacherId: teacher.id });

    expect(response.data?.deleteTeacher).toBeDefined();
    expect(response.data?.deleteTeacher.id).toEqual(teacher.id);
  });

  it("should throw error if user is not authorized for the teacher", async () => {
    await createTestUserAndLogin(graphqlRequest, { email: "new-user@email.com", password: "password" });

    const query = graphql(`
      mutation DeleteTeacherUnauthorized($teacherId: ID!) {
        deleteTeacher(teacherId: $teacherId) {
          id
        }
      }
    `);

    const response = await graphqlRequest(query, { teacherId: teacher.id });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Et voi hakea muiden opettajien tietoja kuin omiasi");
  });

  it("should update Dataloaderes and throw errors after deleting a teacher and it's related entities", async () => {
    // Create a collection and evaluation
    const collectionType = group.currentModule.collectionTypes.find((type) => type.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id);
    const evaluation = await createTestEvaluation(collection.id, student.id);

    const teacherFromTeacherLoader = await teacherLoader.load(teacher.id);
    expect(teacherFromTeacherLoader).toBeDefined();

    const modules = await modulesByGroupLoader.load(group.id);
    const collectionTypesByModulePromises = modules.map((module) => ({ types: collectionTypesByModuleLoader.load(module.id), moduleId: module.id }));

    // Fetch all related data DataLoaders before delete
    await Promise.all([
      moduleLoader.load(group.currentModuleId),
      modulesByGroupLoader.load(group.id),
      collectionLoader.load(collection.id),
      collectionsByModuleLoader.load(group.currentModuleId),
      evaluationLoader.load(evaluation.id),
      evaluationsByCollectionLoader.load(collection.id),
      studentLoader.load(student.id),
      studentsByGroupLoader.load(group.id),
      collectionTypeLoader.load(collectionType.id),
    ]);
    const collectionTypesByModules = await Promise.all(collectionTypesByModulePromises);

    const deleteTeacherQuery = graphql(`
      mutation DeleteTeacherDataLoaderCheck($teacherId: ID!) {
        deleteTeacher(teacherId: $teacherId) {
          id
        }
      }
    `);

    await graphqlRequest(deleteTeacherQuery, { teacherId: teacher.id });

    // Assert DataLoader errors for deleted group and its related entities
    await Promise.all([
      expect(teacherLoader.load(teacher.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(groupLoader.load(group.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(groupsByTeacherLoader.load(teacher.id)).resolves.not.toContainEqual(expect.objectContaining({ id: group.id })),
      expect(moduleLoader.load(group.currentModuleId)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(modulesByGroupLoader.load(group.id)).resolves.not.toContainEqual(expect.objectContaining({ id: group.currentModuleId })),
      expect(collectionLoader.load(collection.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(collectionsByModuleLoader.load(group.currentModuleId)).resolves.not.toContainEqual(expect.objectContaining({ id: collection.id })),
      expect(evaluationLoader.load(evaluation.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(evaluationsByCollectionLoader.load(collection.id)).resolves.not.toContainEqual(expect.objectContaining({ id: evaluation.id })),
      expect(studentLoader.load(student.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(studentsByGroupLoader.load(group.id)).resolves.not.toContainEqual(expect.objectContaining({ id: student.id })),
      expect(collectionTypeLoader.load(collectionType.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
    ]);

    // Assert DataLoader errors for deleted group and its related entities
    await Promise.all(
      collectionTypesByModules.map((data) =>
        expect(collectionTypesByModuleLoader.load(data.moduleId)).not.toContainEqual(expect.objectContaining({ id: data.types }))
      )
    );
  });
});
