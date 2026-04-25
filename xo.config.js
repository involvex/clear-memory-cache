/** @type {import('xo').FlatXoConfig} */
const xoConfig = [
	{
		semicolon: 'always',
		prettier: true,
		react: true,
		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-restricted-types': 'off',
			'@typescript-eslint/prefer-optional-chain': 'off',
		},
		ignores: ['eslint.config.js', 'test/**'],
	},
];

export default xoConfig;
