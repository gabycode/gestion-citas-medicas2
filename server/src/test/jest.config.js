module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/*.test.ts'],  // Busca tests en /test
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Setup global
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/../$1',  // Para imports como @/services
    },
    clearMocks: true,  // Limpia mocks entre pruebas
  };