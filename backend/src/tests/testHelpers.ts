import { hash } from "bcryptjs";
import { CollectionType, CollectionTypeCategory, EducationLevel, Group, Module, Prisma, Student, Teacher } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { TokenSet } from "openid-client";
import prisma from "@/prismaClient";
import { BRCRYPT_SALT_ROUNDS } from "../config";
import { TestGraphQLRequest } from "./createTestServer";
import { graphql } from "./graphql";
import { MpassIDUserInfo } from "@/routes/auth";

export const TEST_USER = {
  email: "test@email.com",
  password: "password",
};

export type TestTeacher = Omit<Teacher, "email"> & {
  password: string;
  email: string;
};

export const BASE_COLLECTION_DATA = {
  date: new Date(),
  description: "Test Description",
  learningObjectiveCodes: ["T1", "T2"],
};

export const BASE_EVALUATION_DATA = {
  wasPresent: true,
  notes: "Improved performance",
};

export async function testLogin(graphqlRequest: TestGraphQLRequest, user: CreateUserInput = TEST_USER) {
  const userData = {
    ...TEST_USER,
    ...user,
  };

  const query = graphql(`
    mutation Test_Login($email: EmailAddress!, $password: String!) {
      login(email: $email, password: $password) {
        userData {
          email
        }
      }
    }
  `);

  await graphqlRequest(query, userData);
}

export async function testLogout(graphqlRequest: TestGraphQLRequest) {
  const query = graphql(`
    mutation Test_Logout {
      logout
    }
  `);

  await graphqlRequest(query);
}

type CreateUserInput = {
  email?: string;
  password?: string;
  mPassID?: string | null;
};

// Create test user
export async function createTestUser(user: CreateUserInput = TEST_USER): Promise<TestTeacher> {
  const userData = {
    ...TEST_USER,
    ...user,
  };
  const passwordHash = await hash(userData.password, BRCRYPT_SALT_ROUNDS);
  const teacher = await prisma.teacher.create({
    data: {
      email: userData.email,
      passwordHash,
      mPassID: userData.mPassID,
    },
  });
  return {
    ...teacher,
    email: teacher.email!,
    password: userData.password,
  };
}

export async function createTestUserAndLogin(graphqlRequest: TestGraphQLRequest, userData?: CreateUserInput): Promise<TestTeacher> {
  const teacher = await createTestUser(userData);
  await testLogin(graphqlRequest, userData);
  return teacher;
}

export async function deleteTestUser() {
  await prisma.teacher.delete({
    where: {
      email: TEST_USER.email,
    },
  });
}

export const VALID_LI_ENV_CODE = "LI_ENV_TAL";

export type TestModule = Module & {
  collectionTypes: CollectionType[];
};

export type TestGroup = Group & {
  students: Student[];
  currentModule: TestModule;
};

export async function createTestGroup(teacherId: string): Promise<TestGroup> {
  const groupId = uuidv4();
  const moduleId = uuidv4();
  const groupCreate = prisma.group.create({
    data: {
      id: groupId,
      name: "Test Group",
      subjectCode: "LI",
      currentModuleId: moduleId,
      teacherId,
    },
  });
  const moduleCreate = prisma.module.create({
    data: {
      id: moduleId,
      educationLevel: EducationLevel.PRIMARY_SEVENTH,
      learningObjectiveGroupKey: "seven_to_nine_years",
      groupId,
      students: {
        create: [
          {
            groupId,
            name: "Student A",
          },
          {
            groupId,
            name: "Student B",
          },
        ],
      },
      collectionTypes: {
        createMany: {
          data: [
            {
              category: CollectionTypeCategory.EXAM,
              name: "Midterm",
              weight: 50,
            },
            {
              category: CollectionTypeCategory.CLASS_PARTICIPATION,
              name: "Participation",
              weight: 50,
            },
          ],
        },
      },
    },
  });
  await prisma.$transaction([groupCreate, moduleCreate]);

  return prisma.group.findFirstOrThrow({
    where: {
      id: groupId,
    },
    include: {
      students: true,
      currentModule: {
        include: {
          collectionTypes: true,
        },
      },
    },
  });
}

export const createTestEvaluationCollection = async (
  moduleId: string,
  typeId: string,
  dataOverride?: Omit<Partial<Prisma.EvaluationCollectionCreateInput>, "type" | "module" | "evaluations">
) => {
  return prisma.evaluationCollection.create({
    data: {
      ...BASE_COLLECTION_DATA,
      typeId,
      moduleId,
      environmentCode: VALID_LI_ENV_CODE,
      ...dataOverride,
    },
  });
};

export const createTestDefaultEvaluationCollection = async (
  moduleId: string,
  typeId: string,
  dataOverride?: Omit<Partial<Prisma.EvaluationCollectionCreateInput>, "type" | "module" | "evaluations">
) => {
  return prisma.evaluationCollection.create({
    data: {
      ...BASE_COLLECTION_DATA,
      typeId,
      moduleId,
      ...dataOverride,
    },
  });
};

export const createTestEvaluation = async (
  collectionId: string,
  studentId: string,
  dataOverride?: Omit<Partial<Prisma.EvaluationCreateInput>, "evaluationCollection" | "student">
) => {
  return prisma.evaluation.create({
    data: {
      ...BASE_EVALUATION_DATA,
      evaluationCollectionId: collectionId,
      studentId,
      skillsRating: 7,
      behaviourRating: 8,
      ...dataOverride,
    },
  });
};

export const createTestDefaultEvaluation = async (
  collectionId: string,
  studentId: string,
  dataOverride?: Omit<Partial<Prisma.EvaluationCreateInput>, "evaluationCollection" | "student">
) => {
  return prisma.evaluation.create({
    data: {
      ...BASE_EVALUATION_DATA,
      evaluationCollectionId: collectionId,
      studentId,
      generalRating: 8,
      ...dataOverride,
    },
  });
};

export const MOCK_TOKEN_SET: TokenSet = {
  access_token: "mockAccessToken",
  expired: () => false,
  claims: () => ({
    sub: "123456",
    aud: "mockAudience",
    exp: 123456789,
    iat: 123456789,
    iss: "mockIssuer",
  }),
};

export const MOCK_PARENT_ORGANIZATION_ID = "mock-parent-organization-id";

// Mocked response that contains the needed info that MPassID would normally send.
// The MPassID model can be found at https://wiki.eduuni.fi/pages/viewpage.action?pageId=313150371
export const MOCK_USER_INFO_RESPONSE: MpassIDUserInfo = {
  sub: "123456",
  "urn:oid:1.3.6.1.4.1.16161.1.1.27": "123456",
  "urn:mpass.id:schoolInfo": ["00000;Mansikkalan testi peruskoulu", "1.2.246.562.99.00000000002;Mansikkalan testi peruskoulu"], // Values copied from the sample of the previously given url
};

export const MOCK_VALID_CODE = "validCode";
