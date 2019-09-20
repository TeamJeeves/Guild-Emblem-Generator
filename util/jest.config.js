module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/node_modules/**'
  ],
  coverageDirectory: './coverage/',
  rootDir: '../',
  reporters: [ 'default', 'jest-junit' ]
}
