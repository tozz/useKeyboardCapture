module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/__mocks__/*', '!src/js/main.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['<rootDir>/src/index.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.?(m)(t|j)s?(x)', '<rootDir>/test/**/*.test.?(m)(t|j)s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.svg$': '<rootDir>/test/jest.svg.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
