/**
 * Eslint configuration.
 * @module _/.eslintrc.js
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    'extends': [
        'plugin:import/errors',
        'plugin:import/warnings',
        'ts-guard/optimum-next',
        'ts-guard/editor',
        'ts-guard/jsdoc'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            ecmaVersion: 2018,
            jsx: true,
            modules: true,
        },
        project: ['./tsconfig.json'],
        sourceType: 'module'
    },
    plugins: ['import', 'redux-saga', 'react', 'react-hooks', 'jsx-a11y'],
    rules: {
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    ['parent'],
                    ['sibling', 'index'],
                    'object'
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
                    caseInsensitive: true /* ignore case. Options: [true, false] */,
                },
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['external'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
                optionalDependencies: false,
            },
        ],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                // NOTE: If this error triggers, either disable it or add
                // your custom components, labels and attributes via these options
                // prettier-ignore
                // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
                controlComponents: ['StyledInput'],
            },
        ],
    }
};
