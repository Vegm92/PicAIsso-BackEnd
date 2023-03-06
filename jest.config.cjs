/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/server/index.ts",
    "!src/server/startServer.ts",
    "!src/loadEnvironment.ts",
    "!src/database/connectDataBase.ts",
  ],
};
