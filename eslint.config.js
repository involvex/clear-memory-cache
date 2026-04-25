import js from '@eslint/js';
import tsESLint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const {browser, node, es2021} = globals;

export default [
	{ignores: ['dist/', 'node_modules/']},
	js.configs.recommended,
	...tsESLint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {jsx: true},
			},
			globals: {...browser, ...node, ...es2021},
		},
		plugins: {react, 'react-hooks': reactHooks},
		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			globals: {...browser, ...node, ...es2021},
		},
		plugins: {react, 'react-hooks': reactHooks},
		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
];
