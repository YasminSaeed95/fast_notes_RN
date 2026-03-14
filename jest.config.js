module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\.(jpg|png|svg)$": "<rootDir>/mocks/fileMock.js",
    "^@/(.*)$": "<rootDir>/$1",
  },
};