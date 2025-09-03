module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:n8n-nodes-base/nodes',
	],
	rules: {
		'n8n-nodes-base/node-dirname-against-convention': 'error',
		'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
		'n8n-nodes-base/node-class-description-outputs-wrong': 'error',
		'no-console': 'warn',
		'no-unused-vars': 'off', // TypeScript handles this
	},
	ignorePatterns: [
		'dist/**',
		'node_modules/**',
		'gulpfile.js',
		'scripts/**',
		'*.js',
	],
};
