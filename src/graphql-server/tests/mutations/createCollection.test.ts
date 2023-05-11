import { graphql } from "@/gql";
import { Rating } from "@/gql/graphql";
import ValidationError from "@/graphql-server/errors/ValidationError";
import prisma from "@/graphql-server/prismaClient";
import serverRequest from "@/utils/serverRequest";
import { ClassYearCode } from "@prisma/client";

describe("ServerRequest - createCollection", () => {
  let classYearId: string;
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
        currentYearCode: ClassYearCode.PRIMARY_FIRST,
      },
    });
    const classYear = await prisma.classYear.create({
      data: {
        code: ClassYearCode.PRIMARY_FIRST,
        groupId: group.id,
      },
    });
    classYearId = classYear.id;
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
        description: "Test description",
        environmentCode: "LI_TALVI",
        learningObjectiveCodes: ["T1", "T2"],
      },
      classYearId,
    };
    const query = graphql(`
      mutation CreateCollection(
        $data: CreateCollectionInput!
        $classYearId: ID!
      ) {
        createCollection(data: $data, classYearId: $classYearId) {
          id
          date
          environment {
            code
          }
          description
          learningObjectives {
            code
          }
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
      description: variables.data.description,
      environment: {
        code: variables.data.environmentCode,
      },
      learningObjectives: [
        {
          code: variables.data.learningObjectiveCodes[0],
        },
        {
          code: variables.data.learningObjectiveCodes[1],
        },
      ],
    });
  });

  it("should create an evaluation collection with evaluations", async () => {
    const student1 = await prisma.student.create({
      data: {
        name: "Test Student 1",
        groupId,
        classYears: { connect: { id: classYearId } },
      },
    });
    const student2 = await prisma.student.create({
      data: {
        name: "Test Student 2",
        groupId,
        classYears: { connect: { id: classYearId } },
      },
    });
    // Arrange
    const variables = {
      data: {
        date: "2023-04-01",

        description: "Test description",
        environmentCode: "LI_TALVI",
        evaluations: [
          {
            studentId: student1.id,
            wasPresent: true,
            skillsRating: Rating.GOOD,
            behaviourRating: Rating.FAIR,
            notes: "Student 1 notes",
          },
          {
            studentId: student2.id,
            wasPresent: false,
            skillsRating: Rating.POOR,
            behaviourRating: Rating.GREAT,
            notes: "Student 2 notes",
          },
        ],
        learningObjectiveCodes: [],
      },
      classYearId,
    };
    const query = graphql(
      `
        mutation CreateCollectionWithEvaluations(
          $data: CreateCollectionInput!
          $classYearId: ID!
        ) {
          createCollection(data: $data, classYearId: $classYearId) {
            id
            date
            description
            environment {
              code
            }
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
      description: variables.data.description,
      environment: {
        code: variables.data.environmentCode,
      },
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
        description: "Test description",
        environmentCode: invalidEnvironmentCode,
        learningObjectiveCodes: [],
      },
      classYearId,
    };
    const query = graphql(`
      mutation CreateCollectionWithInvalidSubjectCode(
        $data: CreateCollectionInput!
        $classYearId: ID!
      ) {
        createCollection(data: $data, classYearId: $classYearId) {
          id
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

  it("should throw an error when invalid learningObjectiveCode is provided", async () => {
    // Arrange
    const invalidLearningObjectiveCode = "INVALID_CODE";
    const variables = {
      data: {
        date: "2023-04-01",
        description: "Test description",
        environmentCode: "LI_TALVI",
        learningObjectiveCodes: [invalidLearningObjectiveCode],
      },
      classYearId,
    };
    const query = graphql(`
      mutation CreateCollectionWithInvalidLearningObjectiveCode(
        $data: CreateCollectionInput!
        $classYearId: ID!
      ) {
        createCollection(data: $data, classYearId: $classYearId) {
          id
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
        `Osa oppimistavoitteista ei ole olemassa tai ei ole arvioitavia.`
      )
    );
  });
});
