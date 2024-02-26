import { CodegenConfig } from "@graphql-codegen/cli";

const customScalars = {
  Date: "string",
  EmailAddress: "string",
};

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["./src/tests/**/*.{ts,tsx}", "!./src/tests/gql/**/*"],
  ignoreNoDocuments: true,
  config: {
    sort: false, // Disable sorting so enums will be in same order as in schema (applies to others than enums as well as side effect)
    enumsAsTypes: true,
    namingConvention: {
      enumValues: "change-case#upperCase",
    },
  },
  generates: {
    "./src/tests/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
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
  },
};

export default config;
