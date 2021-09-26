/**
 * Module contains main application constants.
 * @module config/constants
 */

export type LogLevelMap = {
    DEBUG: string;
    ERROR: string;
    INFO: string;
    SUCCESS: string;
    WARNING: string;
};

export type LogModeMap = {
    LOGGER_DEBUG: string;
    LOGGER_ERROR: string;
    LOGGER_OFF: string;
};

export type HttpMethodMap = {
    DELETE: string;
    GET: string;
    HEAD: string;
    PATCH: string;
    POST: string;
    PUT: string;
};

/**
 * Dark UI theme setting.
 * @type {string}
 */
export const LIGHT_THEME: Readonly<string> = 'light';

/**
 * Light UI theme setting.
 * @type {string}
 */
export const DARK_THEME: Readonly<string> = 'dark';

/**
 * Http methods map.
 * @readonly
 * @type {{HEAD: string, DELETE: string, POST: string, GET: string, PUT: string, PATCH: string}}
 */
export const httpMethodMap: Readonly<HttpMethodMap> = {
    DELETE: 'DELETE',
    GET: 'GET',
    HEAD: 'HEAD',
    PATCH: 'PATCH',
    POST: 'POST',
    PUT: 'PUT',
};

/**
 * Logger mode map
 * @readonly
 * @type {{ERROR: string, DEBUG: string, OFF: string}}
 */
export const logModeMap: Readonly<LogModeMap> = {
    LOGGER_DEBUG: 'debug',
    LOGGER_ERROR: 'error',
    LOGGER_OFF: 'off',
};

/**
 * Log messages map.
 * @readonly
 * @type {{SUCCESS: string, ERROR: string, INFO: string, DEBUG: string, WARNING: string}}
 */
export const logLevelMap: Readonly<LogLevelMap> = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
};

export const loggerColorMap: Readonly<LogLevelMap> = {
    DEBUG: 'rgb(243,25,255)',
    ERROR: 'rgb(255, 105, 100)',
    INFO: 'rgb(49,196,251)',
    SUCCESS: 'rgb(102,255,69)',
    WARNING: 'rgb(255, 220, 93)',
};

/**
 * Debounce delay in `ms`.
 * @type {number}
 */
export const DEBOUNCE_TIMEOUT = 500;

