import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: [
    // "src/**/*.{ts,tsx}",
    "./src/graphql-server/**/*.graphql",
    "!src/gql/**/*",
  ],
  ignoreNoDocuments: true,
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
        scalars: {
          Date: "Date",
          EmailAddress: "string",
        },
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
