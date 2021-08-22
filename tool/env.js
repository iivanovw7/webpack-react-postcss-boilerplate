/**
 * Env variables module.
 * @module _/tool/env
 */

/**
 * Contains default application ports.
 */
const defaultPorts = {
    /**
     * Used for `development` mode.
     * @type {number}
     */
    dev: 4425,
    /**
     * Used for `production` mode.
     * @type {number}
     */
    prod: 4426
};

/**
 * Env variables object.
 *
 * @typedef {Object} module:_/tool/env
 *
 * @property {('production'|'development')} [mode = 'development']
 *      Application running mode.
 * @property {(boolean)} traceDeprecation
 *      If webpack should log deprecation sources in console.
 * @property {(boolean)} stats
 *      If `true` stats description will be saved in `dist` folder as `stats.json` file.
 * @property {(boolean)} sourceMaps
 *      If `true` source maps generated.
 * @property {(string|number)} port
 *      Port number application will be served on.
 */

/**
 * Prepares environment variables, to be used in `webpack` configuration.
 * @param {('production'|'development'|undefined)} [mode = 'development'] - current application mode.
 *
 * @return {module:_/tool/env} object which represents env variables.
 */
function getEnv(mode) {
    const args = require('minimist')(process.argv.slice(2));
    const appMode = mode || 'development';

    // eslint-disable-next-line no-console
    console.log('cli-env-variables:', JSON.stringify(args, null, 4), '\n');

    return {
        mode: appMode,
        port: args.port || defaultPorts[appMode === 'production'
            ? 'prod'
            : 'dev'],
        sourceMaps: args['source-map'] || false,
        stats: args.stats || false,
        traceDeprecation: args.traceDeprecation || false
    };
}

module.exports = {
    getEnv,
};
