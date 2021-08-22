/**
 * POSTCSS functions.
 * @module _/assets/js/functions.js
 */
const variables = require('./variables');

const { fontSize, zIndexes } = variables;

/**
 * Recalculates input in `px` to `em` according to context size or base font size.
 *
 * @param {number | string} pixels - amount of pixels to be recalculated.
 * @param {number} [context = fontSize] - context font size (or default from config).
 *
 * @return {string} size in `em`.
 *
 * @example
 *  font-size: units(80);
 *
 */
function units(pixels, context = fontSize) {
    return `${ parseFloat(pixels) / context }em`;
}

/**
 * Applies `z-index` property according to config file.
 * Value is taken out of variables by string key, if nothing found - `default` value will be used
 * @see {@link module:_/assets/js/variables.js}
 *
 * @param {string} key - zIndex key string
 *
 * @return {string} - returns `z-index` value
 */
function zIndex(key) {
    const value = Object.keys(zIndexes).includes(key)
        ? zIndexes[key]
        : zIndexes['default'];

    return value.toString();
}

module.exports = {
    units,
    zIndex
};
