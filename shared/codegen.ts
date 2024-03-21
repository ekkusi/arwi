import type { CodegenConfig } from "@graphql-codegen/cli";

const customScalars = {
  Date: "string",
  EmailAddress: "string",
};

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  generates: {
    "types/graphql.ts": {
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
      ],
      config: {
        scalars: customScalars,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
