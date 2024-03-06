import { hash } from "bcryptjs";
import { Teacher } from "@prisma/client";
import { BRCRYPT_SALT_ROUNDS } from "../../config";
import { VariablesOf, graphql } from "../graphql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import { createTestUser, deleteTestUser } from "../testHelpers";

describe("Sample", () => {
  let graphqlRequest: TestGraphQLRequest;
  let existingTeacher: Teacher;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());

    existingTeacher = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser();
  });

  it("should register a new teacher", async () => {
    const password = "password";
    const passwordHash = await hash(password, BRCRYPT_SALT_ROUNDS);

    const query = graphql(`
      mutation SampleTest_Register($data: CreateTeacherInput!) {
        register(data: $data) {
          userData {
            email
          }
        }
      }
    `);

    const teacherData: VariablesOf<typeof query> = {
      data: {
        email: "new-teacher@email.com",
        password: passwordHash,
      },
    };

    const response = await graphqlRequest(query, teacherData);

    expect(response.data?.register.userData.email).toEqual(teacherData.data.email);
  });

  it("should throw an error if email is already in use", async () => {
    const passwordHash = await hash("password", BRCRYPT_SALT_ROUNDS);
    const userData = {
      data: {
        email: existingTeacher.email!,
        password: passwordHash,
      },
    };

    const query = graphql(`
      mutation SampleTest_RegisterExistingEmail($data: CreateTeacherInput!) {
        register(data: $data) {
          userData {
            email
          }
        }
      }
    `);

    const response = await graphqlRequest(query, userData);

    expect(response.errors?.[0].message).toEqual(`Sähköposti '${userData.data.email}' on jo käytössä`);
  });
});
