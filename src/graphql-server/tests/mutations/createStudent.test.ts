import { graphql } from "@/gql";
import prisma from "@/graphql-server/prismaClient";
import { serverRequest } from "@/pages/api/graphql";
import { ClassYearCode } from "@prisma/client";

describe("ServerRequest - createStudent", () => {
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
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();
    await prisma.group.deleteMany();
  });

  it("should create a student", async () => {
    // Arrange
    const variables = {
      data: {
        name: "Test Student",
      },
      classYearId,
    };
    const query = graphql(
      `
        mutation CreateStudent($data: CreateStudentInput!, $classYearId: ID!) {
          createStudent(data: $data, classYearId: $classYearId) {
            id
            name
            group {
              id
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
    expect(result.createStudent).toEqual({
      id: expect.any(String),
      name: variables.data.name,
      group: {
        id: groupId,
      },
    });

    // Check that student-classyear connection gets added properly
    const classYearStudents = await prisma.student.findMany({
      where: { classYears: { some: { id: classYearId } } },
    });

    expect(classYearStudents).toHaveLength(1);
  });
});
