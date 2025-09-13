/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  // stub styles/assets so tests run reliably
  moduleNameMapper: {
    '\\.(css|less|sass|scss)(\\?.*)?$': '<rootDir>/jest.emptyModule.js',
    '\\.(gif|ttf|eot|svg|png|jpe?g|webp)(\\?.*)?$':
      '<rootDir>/jest.emptyModule.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
