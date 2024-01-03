import { hash } from "bcryptjs";
import { CollectionType, CollectionTypeCategory, EducationLevel, Group, Module, Prisma, Student, Teacher } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/prismaClient";
import { BRCRYPT_SALT_ROUNDS } from "../config";
import { TestGraphQLRequest } from "./createTestServer";
import { graphql } from "./gql";

export const TEST_USER = {
  email: "test@email.com",
  password: "password",
};

export type TestTeacher = Omit<Teacher, "email"> & {
  password: string;
  email: string;
};

export async function testLogin(graphqlRequest: TestGraphQLRequest, userData: CreateUserInput = TEST_USER) {
  const query = graphql(`
    mutation Test_Login($email: String!, $password: String!) {
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
  email: string;
  password: string;
};

// Create test user
export async function createTestUser(userData: CreateUserInput = TEST_USER): Promise<TestTeacher> {
  const passwordHash = await hash(userData.password, BRCRYPT_SALT_ROUNDS);
  const teacher = await prisma.teacher.create({
    data: {
      email: userData.email,
      passwordHash,
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

export type TestGroup = Group & {
  students: Student[];
  collectionTypes: CollectionType[];
  currentModule: Module;
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
    },
  });
  await prisma.$transaction([groupCreate, moduleCreate]);
  return prisma.group.findFirstOrThrow({
    where: {
      id: groupId,
    },
    include: {
      students: true,
      collectionTypes: true,
      currentModule: true,
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
      date: new Date(),
      typeId,
      moduleId,
      environmentCode: VALID_LI_ENV_CODE,
      description: "Test Description",
      learningObjectiveCodes: ["T1", "T2"],
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
      evaluationCollectionId: collectionId,
      studentId,
      wasPresent: true,
      skillsRating: 5,
      behaviourRating: 4,
      notes: "Improved performance",
      ...dataOverride,
    },
  });
};
