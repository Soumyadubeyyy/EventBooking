module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterSetup: ['./tests/helpers/setup.js'],
  testTimeout: 30000,
};
