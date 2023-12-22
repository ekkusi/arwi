import { compare } from "bcryptjs";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "@/prismaClient";
import { createTestUserAndLogin, TestTeacher } from "../testHelpers";
import { sendMail } from "@/utils/mail";
import { generateCode } from "@/utils/passwordRecovery";
import {
  MAX_AMOUNT_OF_RESET_CODE_TRIES,
  MAX_AMOUNT_OF_RESET_PASSWORD_REQUEST,
  REQUEST_PASSWORD_RESET_EXPIRY_IN_MS,
  RESET_CODE_EXPIRY_TIME_MS,
} from "../../graphql/utils/validators";
import { teacherLoader } from "../../graphql/dataLoaders/teacher";

jest.mock("@/utils/passwordRecovery");

describe("Password Reset Flow", () => {
  let graphqlRequest: TestGraphQLRequest;
  let teacher: TestTeacher;
  const mockCode = "123456";

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
    teacher = await createTestUserAndLogin(graphqlRequest);
    (generateCode as jest.Mock).mockReturnValue(mockCode);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it("should handle the complete password reset flow", async () => {
    // Step 1: Request Password Reset
    const requestResetMutation = graphql(`
      mutation RequestPasswordResetValid($email: String!) {
        requestPasswordReset(email: $email)
      }
    `);

    const resetResponse = await graphqlRequest(requestResetMutation, { email: teacher.email });
    expect(resetResponse.data?.requestPasswordReset).toBeTruthy();
    expect(sendMail).toHaveBeenCalledWith(teacher.email, "Salasanan palautus", expect.any(String));

    // Step 2: Verify Password Reset Code
    const verifyCodeMutation = graphql(`
      mutation VerifyPasswordResetCodeValid($code: String!) {
        verifyPasswordResetCode(code: $code)
      }
    `);

    const verifyResponse = await graphqlRequest(verifyCodeMutation, { code: mockCode });
    expect(verifyResponse.data?.verifyPasswordResetCode).toBeTruthy();

    // Step 3: Update Password
    const newPassword = "newSecurePassword123";
    const updatePasswordMutation = graphql(`
      mutation UpdatePasswordValid($newPassword: String!, $recoveryCode: String!) {
        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)
      }
    `);

    const updateResponse = await graphqlRequest(updatePasswordMutation, { newPassword, recoveryCode: mockCode });
    expect(updateResponse.data?.updatePassword).toBeTruthy();

    // Verify password was updated
    const updatedTeacher = await prisma.teacher.findUnique({ where: { id: teacher.id } });
    expect(await compare(newPassword, updatedTeacher?.passwordHash!)).toBeTruthy();
  });

  it("should not send email for non-existing email", async () => {
    const requestResetMutation = graphql(`
      mutation RequestPasswordResetInvalidEmail($email: String!) {
        requestPasswordReset(email: $email)
      }
    `);

    const nonExistingEmail = "nonexistent@example.com";
    const resetResponse = await graphqlRequest(requestResetMutation, { email: nonExistingEmail });

    expect(resetResponse.data?.requestPasswordReset).toBeTruthy();
    expect(sendMail).not.toHaveBeenCalledWith(nonExistingEmail, "Salasanan palautus", expect.any(String));
  });

  it("should throw an error if the maximum number of reset attempts is exceeded and reset after the expiry time", async () => {
    // Simulate multiple password reset requests to exceed the max amount of tries
    const requestResetMutation = graphql(`
      mutation RequestPasswordResetExceedTries($email: String!) {
        requestPasswordReset(email: $email)
      }
    `);

    /* eslint-disable no-await-in-loop */
    for (let i = 0; i <= MAX_AMOUNT_OF_RESET_PASSWORD_REQUEST; i += 1) {
      await graphqlRequest(requestResetMutation, { email: teacher.email });
    }
    /* eslint-enable no-await-in-loop */

    const errorResponse = await graphqlRequest(requestResetMutation, { email: teacher.email });
    expect(errorResponse.errors).toBeDefined();
    expect(errorResponse.errors?.[0].message).toContain(
      "Olet pyytänyt uutta koodia salasanasi vaihtamiseen liian monta kertaa. Yritä uudelleen 15 minuutin kuluttua."
    );

    // Reset the password reset tries
    jest.spyOn(Date, "now").mockReturnValue(Date.now() + REQUEST_PASSWORD_RESET_EXPIRY_IN_MS + 1000);

    const response = await graphqlRequest(requestResetMutation, { email: teacher.email });
    expect(response.data?.requestPasswordReset).toBeTruthy();
    expect(sendMail).toHaveBeenCalledWith(teacher.email, "Salasanan palautus", expect.any(String));
  });

  it("should throw an error if the code is invalid", async () => {
    const invalidCode = "invalid123";
    const verifyCodeMutation = graphql(`
      mutation VerifyPasswordResetCodeInvalid($code: String!) {
        verifyPasswordResetCode(code: $code)
      }
    `);

    const verifyResponse = await graphqlRequest(verifyCodeMutation, { code: invalidCode });
    expect(verifyResponse.errors).toBeDefined();
    expect(verifyResponse.errors?.[0].message).toContain("Syötetty koodi on virheellinen tai se on vanhentunut.");
  });

  it("should throw an error if the code is expired", async () => {
    // Simulate code expiry
    jest.spyOn(Date, "now").mockReturnValue(Date.now() + RESET_CODE_EXPIRY_TIME_MS + 1000);

    const verifyCodeMutation = graphql(`
      mutation VerifyPasswordResetCodeExpired($code: String!) {
        verifyPasswordResetCode(code: $code)
      }
    `);

    const verifyResponse = await graphqlRequest(verifyCodeMutation, { code: mockCode });
    expect(verifyResponse.errors).toBeDefined();
    expect(verifyResponse.errors?.[0].message).toContain("Syötetty koodi on virheellinen tai se on vanhentunut.");
  });

  it("should throw an error if the maximum number of reset attempts is exceeded", async () => {
    const verifyCodeMutation = graphql(`
      mutation VerifyPasswordResetCodeExceedTries($code: String!) {
        verifyPasswordResetCode(code: $code)
      }
    `);

    // Simulate failed verification attempts
    const invalidCode = "wrongCode";
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i <= MAX_AMOUNT_OF_RESET_CODE_TRIES; i += 1) {
      await graphqlRequest(verifyCodeMutation, { code: invalidCode });
    }
    /* eslint-enable no-await-in-loop */

    const errorResponse = await graphqlRequest(verifyCodeMutation, { code: invalidCode });
    expect(errorResponse.errors).toBeDefined();
    expect(errorResponse.errors?.[0].message).toContain("Koodia on yritetty liian monta kertaa. Generoi uusi koodi.");
  });

  it("should update the DataLoader after a password update", async () => {
    // Step 1: Request Password Reset
    const newPassword = "newSecurePassword123";

    // Fetch teacher's information before password update
    const teacherBeforeUpdate = await teacherLoader.load(teacher.id);
    expect(await compare("password", teacherBeforeUpdate.passwordHash!)).toBeTruthy();

    // Step 2: Update Password
    const updatePasswordMutation = graphql(`
      mutation UpdatePasswordDataLoaders($newPassword: String!, $recoveryCode: String!) {
        updatePassword(newPassword: $newPassword, recoveryCode: $recoveryCode)
      }
    `);

    await graphqlRequest(updatePasswordMutation, { newPassword, recoveryCode: mockCode });

    // Fetch teacher's information after password update
    const updatedTeacher = await teacherLoader.load(teacher.id);
    expect(await compare(newPassword, updatedTeacher.passwordHash!)).toBeTruthy();
  });
});
