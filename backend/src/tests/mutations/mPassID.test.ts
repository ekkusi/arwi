import { Teacher } from "@prisma/client";
import { graphql } from "../gql";
import createServer, { TestGraphQLRequest } from "../createTestServer";
import prisma from "../../prismaClient";
import { MOCK_USER_INFO_RESPONSE, MOCK_VALID_CODE, TestGroup, TestTeacher, createTestGroup, createTestUserAndLogin } from "../testHelpers";
import { groupsByTeacherLoader } from "../../graphql/dataLoaders/group";
import { teacherLoader } from "../../graphql/dataLoaders/teacher";

const mPassIDLoginQuery = graphql(`
  mutation MPassIDLogin($code: String!) {
    mPassIDLogin(code: $code) {
      payload {
        userData {
          id
          isMPassIDConnected
        }
      }
      newUserCreated
    }
  }
`);

const connectMPassIDQuery = graphql(`
  mutation ConnectMPassID($code: String!) {
    connectMPassID(code: $code) {
      userData {
        id
        isMPassIDConnected
        groups {
          id
        }
      }
    }
  }
`);

describe("mPassID", () => {
  let graphqlRequest: TestGraphQLRequest;
  let nonMPassIDUser: TestTeacher;
  let existingMPassIDUser: Teacher;
  let group: TestGroup;

  beforeAll(async () => {
    ({ graphqlRequest } = await createServer());
  });

  beforeEach(async () => {
    nonMPassIDUser = await createTestUserAndLogin(graphqlRequest);
    existingMPassIDUser = await prisma.teacher.create({ data: { mPassID: MOCK_USER_INFO_RESPONSE.sub } });
    group = await createTestGroup(existingMPassIDUser.id);
  });

  afterEach(async () => {
    await prisma.teacher.deleteMany();
  });

  it("should successfully login and create a session for non existing user", async () => {
    await prisma.teacher.deleteMany();

    const response = await graphqlRequest(mPassIDLoginQuery, { code: MOCK_VALID_CODE });

    expect(response.data?.mPassIDLogin).toBeDefined();
    expect(response.data?.mPassIDLogin.newUserCreated).toBe(true);
    expect(response.data?.mPassIDLogin.payload.userData.isMPassIDConnected).toEqual(true);
  });

  it("should successfully login and create a session for existing user", async () => {
    const response = await graphqlRequest(mPassIDLoginQuery, { code: MOCK_VALID_CODE });

    expect(response.data?.mPassIDLogin).toBeDefined();
    expect(response.data?.mPassIDLogin.newUserCreated).toBe(false);
    expect(response.data?.mPassIDLogin.payload.userData.isMPassIDConnected).toEqual(true);
  });

  it("should throw an error if the code is invalid", async () => {
    const response = await graphqlRequest(mPassIDLoginQuery, { code: "invalidCode" });

    expect(response.errors?.[0].message).toEqual("Invalid code");
  });

  it("should successfully connect mPassID for a user without an existing mPassID", async () => {
    const response = await graphqlRequest(connectMPassIDQuery, { code: MOCK_VALID_CODE });

    expect(response.data?.connectMPassID).toBeDefined();
    expect(response.data?.connectMPassID.userData.id).toEqual(nonMPassIDUser.id);
    expect(response.data?.connectMPassID.userData.isMPassIDConnected).toEqual(true);
    expect(response.data?.connectMPassID.userData.groups).toContainEqual({ id: group.id });

    // Check that the matching user has been deleted
    const oldUser = await prisma.teacher.findUnique({ where: { id: existingMPassIDUser.id } });
    expect(oldUser).toBeNull();
  });

  it("should throw an error if user already has mPassID connected", async () => {
    // Pre-connect mPassID for the current user
    await prisma.teacher.deleteMany();
    nonMPassIDUser = await createTestUserAndLogin(graphqlRequest, { mPassID: MOCK_USER_INFO_RESPONSE.sub });

    const response = await graphqlRequest(connectMPassIDQuery, { code: MOCK_VALID_CODE });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual("Tilisi on jo liitetty mpass-id tunnuksiin");
  });

  it("should throw an error if the mPassID is already linked to another user", async () => {
    // Connect mPassID to another user
    await prisma.teacher.update({
      where: {
        mPassID: MOCK_USER_INFO_RESPONSE.sub,
      },
      data: {
        email: "otheruser@test.com",
      },
    });

    const response = await graphqlRequest(connectMPassIDQuery, { code: MOCK_VALID_CODE });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual("Kyseinen mpass-id on jo liitetty toiseen käyttäjään");
  });

  it("should throw an error if the OpenID grant fails", async () => {
    const invalidCode = "invalidCode"; // Code that causes the grant to fail

    const response = await graphqlRequest(connectMPassIDQuery, { code: invalidCode });

    expect(response.errors).toBeDefined();
    expect(response.errors?.[0].message).toEqual("Invalid code");
  });

  it("should clear the Dataloader cache for the user when connected", async () => {
    // Fetch initial state from DataLoaders
    const teacherBeforeUpdate = await teacherLoader.load(existingMPassIDUser.id);
    const groupsBeforeUpdate = await groupsByTeacherLoader.load(existingMPassIDUser.id);
    expect(teacherBeforeUpdate).toBeDefined();
    expect(groupsBeforeUpdate).toContainEqual(expect.objectContaining({ id: group.id }));

    const response = await graphqlRequest(connectMPassIDQuery, { code: MOCK_VALID_CODE });

    expect(response.data?.connectMPassID).toBeDefined();

    // Assert DataLoader errors for deleted teacher and its related entities
    await Promise.all([
      expect(teacherLoader.load(existingMPassIDUser.id)).rejects.toThrowError("Hakemaasi resurssia ei löytynyt. Tarkista syöttämäsi id:t."),
      expect(groupsByTeacherLoader.load(existingMPassIDUser.id)).resolves.not.toContainEqual(expect.objectContaining({ id: group.id })),
    ]);
  });
});
