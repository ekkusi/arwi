import { CodegenConfig } from "@graphql-codegen/cli";

const customScalars = {
  Date: "string",
  EmailAddress: "string",
};

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["./src/**/*.graphql"],
  ignoreNoDocuments: true,
  config: {
    sort: false, // Disable sorting so enums will be in same order as in schema (applies to others than enums as well as side effect)
    namingConvention: {
      enumValues: "change-case#upperCase",
    },
  },
  generates: {
    "./src/types/index.ts": {
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-resolvers",
      ],
      config: {
        scalars: customScalars,
        mapperTypeSuffix: "Prisma",
        mappers: {
          Teacher: "./contextTypes#UserInfo",
          EvaluationCollection: "@prisma/client#EvaluationCollection",
          Evaluation: "@prisma/client#Evaluation",
          Group: "@prisma/client#Group",
          Student: "@prisma/client#Student",
          Module: "@prisma/client#Module",
          Subject: "./subject#SubjectMinimal",
          Environment: "./subject#Environment",
        },
        contextType: "./contextTypes#CustomContext",
      },
    },
  },
};

export default config;
