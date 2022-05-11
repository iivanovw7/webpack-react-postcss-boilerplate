/**
 * Module contains main application configuration.
 * @module config
 */

import { logModeMap } from '../log/constants';

export type RunningMode = 'test' | 'production' | 'development';

export const runningMode = CONFIG;

const { LOGGER_ERROR, LOGGER_DEBUG, LOGGER_OFF } = logModeMap;

const settings = {
    /**
     * Log level, can be set to below options:
     *  - error [default, only errors]
     *  - debug [all levels]
     *  - off   [no logging]
     * @type {string}
     */
    logLevel: LOGGER_ERROR,
    /**
     * Locale config.
     * Sets up default locale config.
     * @type {string}
     */
    locale: navigator.language || navigator['userLanguage'] || navigator['browserLanguage'], // eslint-disable-line
    /**
     * Network config.
     * @type {Object}
     */
    net: {
        /**
         * Npm api url string.
         * @see {@link https://api-docs.npms.io}
         * @type {string}
         */
        npmApiUrl: 'https://api.npms.io/v2',
        /**
         * Default request timeout.
         * @type {number}
         */
        requestTimeout: 10000,
    },
};

/**
 *  Changes config according to application running mode.
 *
 *  @param {object} object - initial settings.
 *  @param {string} mode - application mode, defined during build by webpack.
 *  @returns {void} - adds modifications before exporting variable.
 *
 */
(function merge(object: typeof settings, mode: RunningMode): void {
    let logLevel = LOGGER_ERROR;

    if (mode === 'test') {
        logLevel = LOGGER_OFF;
    }

    if (mode === 'development') {
        logLevel = LOGGER_DEBUG;
    }

    Object.assign(object, { logLevel });

})(settings, runningMode);

export default settings;
