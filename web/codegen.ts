import { CodegenConfig } from "@graphql-codegen/cli";

const schemaURL = "http://localhost:4000/graphql";

// const schemaURL = "https://arwi-test.lm.r.appspot.com/graphql"; // For testing with deployed backend

const customScalars = {
  Date: "string",
  EmailAddress: "string",
};

const config: CodegenConfig = {
  schema: schemaURL,
  documents: ["**/*.{ts,tsx}", "!gql/**/*"],
  ignoreNoDocuments: true,
  config: {
    sort: false, // Disable sorting so enums will be in same order as in schema (applies to others than enums as well as side effect)
    namingConvention: {
      enumValues: "change-case#upperCase",
    },
  },
  generates: {
    "./src/gql/": {
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
