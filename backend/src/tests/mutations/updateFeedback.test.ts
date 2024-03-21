import { Feedback, Student } from "@prisma/client";
import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin } from "../testHelpers";
import { feedbacksLoader } from "@/graphql/dataLoaders/feedback";

const query = graphql(`
  mutation updateFeedback($feedbackId: ID!, $text: String!) {
    updateFeedback(feedbackId: $feedbackId, text: $text) {
      id
      text
    }
  }
`);

describe("updateFeedback", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  let feedback: Feedback;
  let group: TestGroup;
  let student: Student;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(teacher.id);
    [student] = group.students;
  });

  beforeEach(async () => {
    feedback = await prisma.feedback.create({
      data: {
        text: "Old feedback",
        studentId: student.id,
        moduleId: group.currentModuleId,
      },
    });
  });

  afterEach(async () => {
    await prisma.feedback.deleteMany();
  });

  it("should update feedback successfully", async () => {
    const text = "New feedback";
    const response = await graphqlRequest(query, {
      feedbackId: feedback.id,
      text,
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.updateFeedback).toEqual({
      id: feedback.id,
      text,
    });
  });

  it("should update Dataloader cache", async () => {
    const feedbacksFromLoaderBeforeUpdate = await feedbacksLoader.load({ studentId: student.id, moduleId: group.currentModuleId });
    expect(feedbacksFromLoaderBeforeUpdate).toContainEqual(expect.objectContaining({ id: feedback.id, text: feedback.text }));
    const text = "Another new feedback";
    await graphqlRequest(query, {
      feedbackId: feedback.id,
      text,
    });

    const feedbacksFromLoaderAfterUpdate = await feedbacksLoader.load({ studentId: student.id, moduleId: group.currentModuleId });
    expect(feedbacksFromLoaderAfterUpdate).toContainEqual(expect.objectContaining({ id: feedback.id, text }));
  });

  it("should throw error if feedback doesnt belong to teacher", async () => {
    await createTestUserAndLogin(graphqlRequest, { email: "other-user@email.com" });

    const text = "New feedback";
    const response = await graphqlRequest(query, {
      feedbackId: feedback.id,
      text,
    });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toBe("Haettu palaute ei kuulu sinulle");
  });
});
