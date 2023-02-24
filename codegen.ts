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
      plugins: [],
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
          Date: "string",
          EmailAddress: "string",
        },
      },
    },
  },
};

export default config;
