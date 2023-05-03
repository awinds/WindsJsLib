export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ["./test/setup/init.js"],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    collectCoverage: false,
    collectCoverageFrom: [
        'src/**/*.js'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/test/',
        '/dist/',
        '/docs/',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: [
        'lcov',
        'text-summary'
    ],
    verbose: true,
    detectOpenHandles: true,
    forceExit: true,
    cache: false
}