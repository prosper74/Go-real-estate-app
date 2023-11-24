import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
  ],
  moduleDirectories: [
    "<rootDir>/node_modules",
    "<rootDir>/src",
    "<rootDir>/pages",
  ],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@pages/(.*)": "<rootDir>/pages/$1",
    "@styles/(.*)": "<rootDir>/styles/$1",
  },
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

export default config;