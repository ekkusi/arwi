import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  setupFilesAfterEnv: ["./src/__mocks__/mocks.ts"],
};

export default config;
