import { CollectionTypeCategory } from "@prisma/client";
import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import {
  TestGroup,
  TestTeacher,
  createTestEvaluation,
  createTestEvaluationCollection,
  createTestGroup,
  createTestUser,
  createTestUserAndLogin,
} from "../testHelpers";
import prisma from "@/prismaClient";
import { StudentWithFeedbacksAndEvaluations } from "@/utils/feedback";

const query = graphql(`
  mutation SendFeedbackEmail_Query($email: EmailAddress!, $groupId: ID!) {
    sendFeedbackEmail(email: $email, groupId: $groupId)
  }
`);

jest.mock("@/utils/feedback", () => ({
  generateFeedbackPDF: jest.fn().mockReturnValue(new Uint8Array()),
}));

jest.mock("@/utils/mail", () => ({
  sendMail: jest.fn(),
}));

describe("Send Feedback Email", () => {
  let graphqlRequest: TestGraphQLRequest;
  let user: TestTeacher;
  let group: TestGroup;
  let studentsWithFeedbackData: StudentWithFeedbacksAndEvaluations[];

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    user = await createTestUserAndLogin(graphqlRequest);
    group = await createTestGroup(user.id);
    const collectionType = group.currentModule.collectionTypes.find((ct) => ct.category === CollectionTypeCategory.CLASS_PARTICIPATION)!;
    const collection = await createTestEvaluationCollection(group.currentModuleId, collectionType.id);

    const studentPromises = group.students.map(async (student) => {
      const evaluation = await createTestEvaluation(collection.id, student.id);
      const feedback = await prisma.feedback.create({
        data: {
          studentId: student.id,
          moduleId: group.currentModuleId,
          text: `Feedback text for ${student.name}`,
        },
      });
      return {
        ...student,
        feedbacks: [feedback],
        evaluations: [
          {
            ...evaluation,
            evaluationCollection: {
              ...collection,
              type: collectionType,
            },
          },
        ],
      };
    });
    studentsWithFeedbackData = await Promise.all(studentPromises);
  });

  it("should send verification email correctly", async () => {
    const response = await graphqlRequest(query, { email: user.email, groupId: group.id });

    // TODO: How to mock resolving of promises inside process.nextTick?

    expect(response.errors).toBeUndefined();
    expect(response.data?.sendFeedbackEmail).toBe("GENERATION_STARTED_SUCCESSFULLY");
  });

  it("should throw error if group doesn't belong to user", async () => {
    const otherUser = await createTestUser({ email: "test2@email.com" });
    const otherGroup = await createTestGroup(otherUser.id);

    const response = await graphqlRequest(query, { groupId: otherGroup.id, email: user.email });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toBe("Haettu ryhmä ei kuulu sinulle");
  });
});
