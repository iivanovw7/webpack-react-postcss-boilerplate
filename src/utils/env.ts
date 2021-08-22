/**
 * Module contains environment related utils.
 * @module utils/env
 */

/**
 * Indicates whether the `theme` is set to dark or not.
 *
 * @return {boolean}
 *  returns `true` if is in dark mode.
 */
const isDarkTheme = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

export default {
    isDarkTheme: isDarkTheme(),
    html: document.documentElement,
};
