export default {
  // The test environment that will be used for testing
  testEnvironment: "node",

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>"],

  // The glob patterns Jest should use to detect test files
  testMatch: ["**/__tests__/**/*.test.js"],

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx"],

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "app/services/patientService.js",
    "!**/*.config.js",
    "!**/node_modules/**",
  ],

  // The minimum threshold enforcement for coverage results
  coverageThreshold: {
    "app/services/patientService.js": {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // A map from regular expressions to module names that allow to stub out resources with a mock
  moduleNameMapper: {
    // Handle import aliases if you're using them in your project
    "^@/(.*)$": "<rootDir>/$1",
  },

  transform: {},
};
