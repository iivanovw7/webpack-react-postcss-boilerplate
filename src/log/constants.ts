/**
 * Module contains logger constants.
 * @module log/constants
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
