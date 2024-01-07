import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  rootDir: "src",
  testTimeout: 60000,
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  setupFilesAfterEnv: ["./__mocks__/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
};

export default config;
