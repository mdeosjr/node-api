import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/types/**/*.ts",
    "!src/config/**/*.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "clover"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  verbose: true,
};

export default config;
