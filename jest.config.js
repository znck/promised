module.exports = {
  collectCoverageFrom: ['src/**'],
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/?(*.)spec.ts'],
  testEnvironment: 'node'
}
