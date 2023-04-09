import { graphql } from "@/gql";
import { Rating } from "@/gql/graphql";
import ValidationError from "@/graphql-server/errors/ValidationError";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";

describe("ServerRequest - createCollection", () => {
  let groupId: string;

  beforeAll(async () => {
    const teacher = await prisma.teacher.create({
      data: {
        email: "testteacher@example.com",
        passwordHash: "hashed-password",
      },
    });
    const group = await prisma.group.create({
      data: {
        name: "Test Group",
        subjectCode: "LI",
        teacherId: teacher.id,
      },
    });
    groupId = group.id;
  });

  afterAll(async () => {
    await prisma.student.deleteMany();
    await prisma.evaluationCollection.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should create an evaluation collection without evaluations", async () => {
    // Arrange
    const variables = {
      data: {
        date: "2023-04-01",
        type: "Test Evaluation",
        description: "Test description",
        environmentCode: "LI_TALVI",
      },
      groupId,
    };
    const query = graphql(`
      mutation CreateCollection($data: CreateCollectionInput!, $groupId: ID!) {
        createCollection(data: $data, groupId: $groupId) {
          id
          date
          type
          description
        }
      }
    `);

    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.createCollection).toEqual({
      id: expect.any(String),
      date: variables.data.date,
      type: variables.data.type,
      description: variables.data.description,
    });
  });

  it("should create an evaluation collection with evaluations", async () => {
    const student1 = await prisma.student.create({
      data: {
        name: "Test Student 1",
        groupId,
      },
    });
    const student2 = await prisma.student.create({
      data: {
        name: "Test Student 2",
        groupId,
      },
    });
    // Arrange
    const variables = {
      data: {
        date: "2023-04-01",

        type: "Test Evaluation",
        description: "Test description",
        environmentCode: "LI_TALVI",
        evaluations: [
          {
            studentId: student1.id,
            wasPresent: true,
            skillsRating: Rating.Good,
            behaviourRating: Rating.Fair,
            notes: "Student 1 notes",
          },
          {
            studentId: student2.id,
            wasPresent: false,
            skillsRating: Rating.Poor,
            behaviourRating: Rating.Great,
            notes: "Student 2 notes",
          },
        ],
      },
      groupId,
    };
    const query = graphql(
      `
        mutation CreateCollectionWithEvaluations(
          $data: CreateCollectionInput!
          $groupId: ID!
        ) {
          createCollection(data: $data, groupId: $groupId) {
            id
            date
            type
            description
            evaluations {
              id
              wasPresent
              skillsRating
              behaviourRating
              notes
            }
          }
        }
      `
    );
    // Act
    const result = await serverRequest(
      { document: query, prismaOverride: prisma },
      variables
    );

    // Assert
    expect(result.createCollection).toEqual({
      id: expect.any(String),
      date: variables.data.date,
      type: variables.data.type,
      description: variables.data.description,
      evaluations: [
        {
          id: expect.any(String),
          wasPresent: true,
          skillsRating: "GOOD",
          behaviourRating: "FAIR",
          notes: "Student 1 notes",
        },
        {
          id: expect.any(String),
          wasPresent: false,
          skillsRating: "POOR",
          behaviourRating: "GREAT",
          notes: "Student 2 notes",
        },
      ],
    });
  });
  it("should throw an error when invalid environmentCode is provided", async () => {
    // Arrange
    const invalidEnvironmentCode = "INVALID_CODE";
    const variables = {
      data: {
        date: "2023-04-01",
        type: "Test Evaluation",
        description: "Test description",
        environmentCode: invalidEnvironmentCode,
      },
      groupId,
    };
    const query = graphql(`
      mutation CreateCollectionWithInvalidSubjectCode(
        $data: CreateCollectionInput!
        $groupId: ID!
      ) {
        createCollection(data: $data, groupId: $groupId) {
          id
          date
          type
          description
        }
      }
    `);

    // Act
    const result = serverRequest(
      { document: query, prismaOverride: prisma },
      {
        ...variables,
      }
    ).catch((e) => e);

    // Assert
    await expect(result).resolves.toThrow(
      new ValidationError(
        `Ympäristöä koodilla '${invalidEnvironmentCode}' ei ole olemassa.`
      )
    );
  });
});
