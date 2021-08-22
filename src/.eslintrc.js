module.exports = {
    'extends': [
        'ts-guard/react',
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            'extends': [
                'plugin:import/typescript',
                'ts-guard/react',
                'ts-guard/ext',
            ],
            globals: {
                JSX: 'readonly',
            },
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: ['./../tsconfig.eslint.json'],
                tsconfigRootDir: __dirname,
            },
            rules: {
                '@typescript-eslint/no-unsafe-call': 0,
                '@typescript-eslint/no-unsafe-assignment': 0,
                '@typescript-eslint/no-unsafe-member-access': 0,
                '@typescript-eslint/naming-convention': 0,
                '@typescript-eslint/no-unused-vars': 0,
                'react/prop-types': 0,
                'react/no-unused-prop-types': 0,
            },
            settings: {
                'import/extensions': ['d.ts', '.ts', '.tsx'],
                'import/resolver': {
                    node: {
                        extensions: ['d.ts', '.ts', '.tsx'],
                    },
                    'typescript': {
                        'alwaysTryTypes': true
                    },
                },
            },
        },
        {
            files: ['**/Styled.ts'],
            rules: {
                'multiline-ternary': 'off',
            }
        }
    ],
};
