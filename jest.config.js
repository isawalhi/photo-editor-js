module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  testEnvironment: "jsdom",
  collectCoverageFrom: ["<rootDir>/app/src/components/**/*.(jsx|js|tsx|ts)"],
  coveragePathIgnorePatterns: ["node_modules", "coverage", "dist"],
  coverageReporters: ["html", "json", "text-summary"],
  moduleFileExtensions: ["json", "ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "/__tests__/.*\\.(spec|test)\\.[tj]sx?$",
  setupFiles: ["jest-canvas-mock","./unit_test/setup.js"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },
};
