/**
 * POSTCSS configuration.
 * @module _/postcss.config.js
 */
const autoprefixer = require('autoprefixer');
const postcss100vhFix = require('postcss-100vh-fix');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssDarkThemeClass = require('postcss-dark-theme-class');
const postcssFunctions = require('postcss-functions');
const postcssHexRgba = require('postcss-hexrgba');
const postcssImport = require('postcss-import');
const postcssMapGet = require('postcss-map-get');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssUrl = require('postcss-url');

const functions = require('./assets/js/functions');
const mixins = require('./assets/js/mixins');
const variables = require('./assets/js/variables');

module.exports = {
    syntax: 'postcss-scss',
    plugins: [
        postcssImport,
        postcssUrl,
        postcssCustomProperties,
        postcssMapGet,
        postcssHexRgba,
        postcssSimpleVars({
            variables
        }),
        postcssMixins({
            mixins
        }),
        postcssFunctions({
            functions
        }),
        postcssDarkThemeClass({
            darkSelector: '[data-theme="dark"]',
            lightSelector: '[data-theme="light"]'
        }),
        postcss100vhFix,
        autoprefixer,
        postcssNested,
        postcssPresetEnv({ browsers: 'last 2 versions' }),
        postcssReporter({ clearReportedMessages: true })
    ]
};
