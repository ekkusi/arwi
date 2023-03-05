import { CodegenConfig } from "@graphql-codegen/cli";

const customScalars = {
  Date: "string",
  EmailAddress: "string",
};

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: [
    "src/**/*.{ts,tsx}",
    "./src/graphql-server/**/*.graphql",
    "!src/gql/**/*",
  ],
  ignoreNoDocuments: true,
  config: {
    sort: false, // Disable sorting so enums will be in same order as in schema (applies to others than enums as well as side effect)
  },
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
      ],
      config: {
        scalars: customScalars,
      },
    },
    "./src/graphql-server/types/index.ts": {
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
          Teacher: "@prisma/client#Teacher",
          EvaluationCollection: "@prisma/client#EvaluationCollection",
          Evaluation: "@prisma/client#Evaluation",
          Class: "@prisma/client#Class",
          Student: "@prisma/client#Student",
        },
        contextType: "./contextTypes#CustomContext",
      },
    },
  },
};

export default config;
