module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  // testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  maxConcurrency: 8,
  globals: {
    'ts-jest': {
      useESM: true,
      tsConfig: {
        target: 'ESNext'
      }
    },
  },
};