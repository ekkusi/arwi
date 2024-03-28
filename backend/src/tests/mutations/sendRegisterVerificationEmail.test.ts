import { graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import { TestTeacher, createTestUserAndLogin } from "../testHelpers";
import prisma from "@/prismaClient";
import { teacherLoader } from "@/graphql/dataLoaders/teacher";

const query = graphql(`
  mutation SendVerificationTest_Query {
    sendRegisterVerificationEmail
  }
`);

jest.mock("@/utils/mail", () => ({
  sendEmailVerificationMail: jest.fn(),
}));

describe("Send Verification Email", () => {
  let graphqlRequest: TestGraphQLRequest;
  let existingTeacher: TestTeacher;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    existingTeacher = await createTestUserAndLogin(graphqlRequest);
  });

  it("should send verification email correctly", async () => {
    const response = await graphqlRequest(query);

    // TODO: How to mock resolving of promises inside process.nextTick?

    expect(response.errors).toBeUndefined();
    expect(response.data?.sendRegisterVerificationEmail).toBe(true);
  });

  it("should throw error if user is logged in without email", async () => {
    // Set email to null and mPassID to some value
    await prisma.teacher.update({
      where: { id: existingTeacher.id },
      data: { email: null, mPassID: "123456" },
    });
    teacherLoader.clear(existingTeacher.id);

    const response = await graphqlRequest(query);

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toBe("Et ole kirjautunut sähköpostilla. Vahvistusviestiä ei voida lähettää.");

    // Reset email and mPassID
    await prisma.teacher.update({
      where: { id: existingTeacher.id },
      data: { email: existingTeacher.email, mPassID: null },
    });
    teacherLoader.clear(existingTeacher.id);
  });
});
