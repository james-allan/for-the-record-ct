/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'jest-environment-jsdom',
	testPathIgnorePatterns: ['/dist/'],
	resolver: "jest-ts-webcompat-resolver",
	moduleNameMapper: {
		'^(.*/src/.*)\\.js$': '$1.ts',
	},
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
};
