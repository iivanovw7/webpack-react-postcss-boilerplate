/**
 * Module contains main application constants.
 * @module config/constants
 */

export type LogLevelMap = {
    SUCCESS: string;
    INFO: string;
    DEBUG: string;
    ERROR: string;
    WARNING: string;
};

export type LogModeMap = {
    LOGGER_ERROR: string;
    LOGGER_DEBUG: string;
    LOGGER_OFF: string;
};

export type HttpMethodMap = {
    GET: string;
    POST: string;
    HEAD: string;
    DELETE: string;
    PUT: string;
    PATCH: string;
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
    GET: 'GET',
    POST: 'POST',
    HEAD: 'HEAD',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH',
};

/**
 * Logger mode map
 * @readonly
 * @type {{ERROR: string, DEBUG: string, OFF: string}}
 */
export const logModeMap: Readonly<LogModeMap> = {
    LOGGER_ERROR: 'error',
    LOGGER_DEBUG: 'debug',
    LOGGER_OFF: 'off',
};

/**
 * Log messages map.
 * @readonly
 * @type {{SUCCESS: string, ERROR: string, INFO: string, DEBUG: string, WARNING: string}}
 */
export const logLevelMap: Readonly<LogLevelMap> = {
    SUCCESS: 'success',
    INFO: 'info',
    DEBUG: 'debug',
    ERROR: 'error',
    WARNING: 'warning',
};

export const loggerColorMap: Readonly<LogLevelMap> = {
    SUCCESS: 'rgb(102,255,69)',
    INFO: 'rgb(49,196,251)',
    DEBUG: 'rgb(243,25,255)',
    ERROR: 'rgb(255, 105, 100)',
    WARNING: 'rgb(255, 220, 93)',
};

/**
 * Debounce delay in `ms`.
 * @type {number}
 */
export const DEBOUNCE_TIMEOUT = 50;

