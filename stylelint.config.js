/**
 * Stylelint configuration.
 * @module _/stylelint.config.js
 */
module.exports = {
    'extends': [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
    ],
    ignoreFiles: [
        'css/sanitize.css'
    ],
    plugins: [
        'stylelint-order',
        'stylelint-scss'
    ],
    rules: {
        'order/order': [
            'custom-properties',
            'declarations'
        ],
        'indentation': 4,
        'at-rule-empty-line-before': [
            'always',
            {
                except: [
                    'blockless-after-same-name-blockless',
                    'first-nested'
                ],
                ignore: [
                    'after-comment',
                    'blockless-after-blockless'
                ],
                ignoreAtRules: [
                    'else'
                ]
            }
        ],
        'at-rule-no-unknown': null,
        'declaration-colon-space-after': 'always-single-line',
        'declaration-colon-newline-after': 'always-multi-line',
        'declaration-no-important': true,
        'font-family-name-quotes': 'always-where-recommended',
        'function-name-case': false,
        'value-keyword-case': false,
        'max-empty-lines': 2,
        'max-nesting-depth': 3,
        'no-eol-whitespace': [
            true,
            {
                ignore: [
                    'empty-lines'
                ]
            }
        ],
        'no-missing-end-of-source-newline': null,
        'selector-max-attribute': 2,
        'selector-max-class': 4,
        'selector-max-combinators': 3,
        'selector-max-compound-selectors': 3,
        'selector-max-type': 1,
        'selector-max-universal': 1,
        'shorthand-property-no-redundant-values': null,
        'string-quotes': 'single',
        'selector-type-no-unknown': [
            true,
            {
                ignore: [
                    'custom-elements'
                ]
            }
        ],
        'scss/at-rule-no-unknown': true
    },
};
