/**
 * POSTCSS mixins.
 * @module _/assets/js/mixins.js
 */
const variables = require('./variables');

const { transitionDuration, breakpoints, screenHeight, regular } = variables;

/* eslint-disable max-params */

/**
 * Creates flex mixin with parameters.
 * @param {object} mixin - parent node
 * @param {string} [direction = 'column'] - flex direction property
 * @param {string} [wrap = 'no-wrap'] - flex-wrap direction property
 *
 * @return {Object.<string, string>} - returns mixin content.
 */
function flex(mixin, direction = 'column', wrap = 'no-wrap') {
    return {
        display: 'flex',
        'flex-direction': direction,
        'flex-wrap': wrap,
    };
}


/**
 * Mixin adds shadow styles of different sizes, returns `xs` shadow by default.
 * @param {object} mixin - mixin node.
 * @param {'xs' | 'md' | 'lg'} [type = 'xs'] - shadow descriptor.
 *
 * @return {Object.<string, string>} - returns mixin content.
 */
function shadows(mixin, type) {
    const boxShadow = 'box-shadow';
    const result = {
        [boxShadow]: '0 2px 4px 0 rgba(0,0,0,0.1)'
    };

    switch (type) {
        case 'md':
            result[boxShadow] = '0 4px 6px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)';
            break;
        case 'lg':
            result[boxShadow] = '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)';
            break;
    }

    return result;
}

/**
 * Sets base font rules.
 * @param {object} mixin - mixin node.
 * @param {number} [size = 16] - font size prop.
 * @param {number} [lineHeight = 28] - line height prop.
 * @param {number} [fontWeight = variables.regular] - font weight prop.
 *
 * @return {Object.<string, string>} - returns mixin content.
 */
function fontSize(mixin, size = 16, lineHeight = 28, fontWeight = regular) {
    const fontMixin = {
        'font-size': `${size}px`,
        'line-height': `${lineHeight}px`,
    };

    if (fontWeight !== regular) {
        fontMixin['font-weight'] = fontWeight;
    }

    return fontMixin;
}

/**
 * Aligns element`s children vertically and justifies horizontally (along main axis) using flex.
 * @param {object} mixin - mixin node.
 * @param {string} [justifyContent = 'center'] - justify flex property.
 * @param {string} [alignItems = 'center'] - align items property.
 *
 * @return {Object.<string, string>} - returns mixin content.
 *
 * @example
 *  `@mixin justifyAlignFlex`
 *  `@mixin justifyAlignFlex stretch flex-end`
 */
function justifyAlignFlex(mixin, justifyContent = 'center', alignItems = 'center') {
    return {
        display: 'flex',
        'align-items': alignItems,
        'justify-content': justifyContent
    };
}

/**
 * Mixin is used for adding shadow styles of different sizes
 * @param {object} mixin - mixin node.
 * @param {string} [property = 'color'] - transition property.
 * @param {string} [timing  = 'cubic-bezier(0.4, 0, 0.2, 1)'] - timing function.
 * @param {string} [duration = variables.transitionDuration] - duration in `ms`.
 *
 * @return {Object.<string, string>} - returns mixin content.
 */
function transition(mixin, property = 'color', timing = 'cubic-bezier(0.4, 0, 0.2, 1)', duration = transitionDuration) {
    return {
        transition: `${property} ${duration} ${timing}`
    };
}

/**
 * Returns media query with provided min & max breakpoint values.
 * Breakpoints are taken from `variables`, in case invalid key is provided - returns mixin with default breakpoint.
 * If no key or "width" has been passed  - width breakpoints will be used, in other case - "height" set will be applied.
 * @param {object} mixin - parent node.
 * @param {string} max - max-width breakpoint key.
 * @param {string} type - width or height type (selects set of breakpoints).
 * @param {string} min - min-width breakpoint key.
 *
 * @return {object} mixin - returns mixin content.
 *
 * @example
 * `@mixin media height, xxl {
 *  font-size: units(80);
 * }`
 *
 * `@mixin media width, xs, sm {
 *  font-size: units(35);
 * }`
 */
function media(mixin, max, type = 'width', min = 'xs') {
    const breakPointsSet = type === 'width'
        ? breakpoints
        : screenHeight;
    const breakpointKeys = Object.keys(breakPointsSet);

    /**
     * Gets breakpoint value depending on what breakpoint key was passed in parameters.
     * @param {string} value - breakpoint key string.
     *
     * @return {number} breakpoint value.
     */
    function setBreakpoint(value) {
        return breakpointKeys.includes(value)
            ? breakPointsSet[value]
            : breakPointsSet.xs;
    }

    const minQuery = `@media only screen and (min-${type}: ${setBreakpoint(min)}px)`;
    const mediaQuery = max && breakpointKeys.includes(max)
        ? (`${minQuery} and (max-${type}: ${setBreakpoint(max)}px)`)
        : minQuery;

    return {
        [mediaQuery]: {
            '@mixin-content': {}
        }
    };
}

/**
 * Sets clipping rules for non-fit text.
 *
 * @param {object} mixin - parent node.
 * @param {string} [textOverflowValue = 'ellipsis'] - css `text-overflow` prop value.
 * @param {boolean} [endWhitespace = true] - adds 'white-space' = 'nowrap' prop if `true`.
 *
 * @return {object} mixin - returns mixin content.
 *
 * @example
 * `@mixin textOverflow;`
 * `@mixin textOverflow ellipsis false;`
 */
function textOverflow(mixin, textOverflowValue = 'ellipsis', endWhitespace = true) {
    const overflowMixin = {
        overflow: 'hidden',
        'text-overflow': textOverflowValue,
    };

    if (endWhitespace) {
        overflowMixin['white-space'] = 'nowrap';
    }

    return overflowMixin;
}

/**
 *  Centers both horizontally and vertically or in one direction,
 *	    assuming parent element has `position: relative;` property.
 *
 * @param {object} mixin - parent node.
 * @param {"X" | "Y" | boolean} axis [false]
 * 		string represents `axis`, if nothing passed - centers in both directions.
 *
 * @return {object} mixin - returns mixin content.
 *
 * @example
 * `@mixin centerAbsolute;`
 * `@mixin centerAbsolute X;`
 */
function centerAbsolute(mixin, axis) {
    const positioning = {
        position: 'absolute'
    };

    switch (axis) {
        case 'X': {
            positioning.left = '50%';
            positioning.transform = 'translateX(-50%)';
            break;
        }
        case 'Y': {
            positioning.top = '50%';
            positioning.transform = 'translateY(-50%)';
            break;
        }
        default: {
            positioning.left = '50%';
            positioning.top = '50%';
            positioning.transform = 'translate(-50%, -50%)';
            break;
        }
    }

    return positioning;
}

module.exports = {
    flex,
    shadows,
    fontSize,
    justifyAlignFlex,
    media,
    transition,
    textOverflow,
    centerAbsolute
};

/* eslint-enable max-params */
