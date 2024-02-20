import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestGroup, TestTeacher, createTestUserAndLogin, createTestGroup, createTestUser } from "../testHelpers";
import { FEEDBACK_GENERATION_TOKEN_COST, MONTHLY_TOKEN_USE_LIMIT } from "@/config";
import { teacherLoader } from "@/graphql/dataLoaders/teacher";
import { updateTeacher } from "@/graphql/mutationWrappers/teacher";

const query = graphql(`
  mutation GenerateGroupFeedbackTest($groupId: ID!) {
    generateGroupFeedback(groupId: $groupId) {
      usageData {
        id
        monthlyTokensUsed
      }
    }
  }
`);

describe("generateGroupFeedback", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let group: TestGroup;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
  });

  afterEach(async () => {
    await prisma.feedback.deleteMany();
    await updateTeacher(teacher.id, { data: { monthlyTokensUsed: 0 } });
  });

  it("should successfully generate feedbacks for all students in the group", async () => {
    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assertions to ensure correct functionality
    expect(response.data?.generateGroupFeedback).toBeDefined();
    expect(response.data?.generateGroupFeedback.usageData.monthlyTokensUsed).toEqual(group.students.length * FEEDBACK_GENERATION_TOKEN_COST);

    const students = await prisma.student.findMany({ where: { groupId: group.id }, include: { feedbacks: true } });
    students.forEach((student) => {
      expect(student.feedbacks[0]).toEqual(expect.objectContaining({ text: "Mock response from OpenAI" }));
    });
  });

  it("should throw an error if the user does not belong to the group", async () => {
    // Assume createTestGroup creates a group not belonging to the teacher
    const newTeacher = await createTestUser({ email: "other-test-user@email.com" });
    const otherGroup = await createTestGroup(newTeacher.id);

    // Execute the request
    const response = await graphqlRequest(query, { groupId: otherGroup.id });

    // Assert the expected AuthorizationError is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Haettu ryhmä ei kuulu sinulle");
  });

  it("should throw an error if the user has insufficient tokens", async () => {
    // Setup user with insufficient tokens
    await prisma.teacher.update({
      where: { id: teacher.id },
      data: { monthlyTokensUsed: MONTHLY_TOKEN_USE_LIMIT }, // Assuming MONTHLY_TOKEN_USE_LIMIT is the limit
    });

    // Execute the request
    const response = await graphqlRequest(query, { groupId: group.id });

    // Assert the expected AuthorizationError is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Kuukausittainen toimintojen määrä on ylittynyt");
  });

  it("should update teacher's token usage correctly after feedback generation", async () => {
    // Execute the request
    await graphqlRequest(query, { groupId: group.id });

    // Check the teacher's token usage has been updated correctly
    const updatedTeacher = await prisma.teacher.findUnique({ where: { id: teacher.id } });
    expect(updatedTeacher?.monthlyTokensUsed).toEqual(group.students.length * FEEDBACK_GENERATION_TOKEN_COST);
  });
  // Execute the request and check the teacher's token usage has been updated correctly

  it("should update the DataLoader caches after generating feedback", async () => {
    // Fetch the initial state of the student from the DataLoaders
    const teacherFromLoader = await teacherLoader.load(teacher.id);
    expect(teacherFromLoader).toBeDefined();
    expect(teacherFromLoader.monthlyTokensUsed).toBe(0);

    // Execute the request
    await graphqlRequest(query, { groupId: group.id });

    // Fetch the updated state of the teacher from the DataLoaders
    const updatedTeacherFromLoader = await teacherLoader.load(teacher.id);

    // Check that the teacher's token usage has been updated correctly
    expect(updatedTeacherFromLoader).toBeDefined();
    expect(updatedTeacherFromLoader.monthlyTokensUsed).toEqual(group.students.length * FEEDBACK_GENERATION_TOKEN_COST);
  });

  it("should throw an error if the group ID does not exist", async () => {
    // Execute the request with a non-existing group ID
    const response = await graphqlRequest(query, { groupId: "nonExistingGroupId" });

    // Assert the expected error message for invalid ID is thrown
    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toContain("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."); // Replace with actual error message for invalid ID
  });
});
