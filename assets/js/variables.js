/**
 * POSTCSS variables.
 * @module _/assets/js/variables.js
 */

const fonts = {
    /**
     * Bold font weight.
     * @type number
     */
    bold: 600,
    /**
     * Base font size in px.
     * @type number
     */
    fontSize: 16,
    /**
     * Local font name.
     * @type string
     */
    fontLocal: 'Nunito',
    /**
     * Local font family.
     * @type string
     */
    fontFamily: '"Nunito", sans-serif, Fallback, sans-serif',
    /**
     * Light font weight.
     * @type number
     */
    light: 100,
    /**
     * Regular font weight.
     * @type number
     */
    regular: 400,
};

const common = {
    /**
     * Default border radius.
     * @type string
     */
    borderRadius: '6px',
    /**
     * Default transition duration.
     * @type {String}
     */
    transitionDuration: '250ms',
    /**
     * Set of `z-indexes` used in styles.
     * @type {Object.<string, number>}
     */
    zIndexes: {
        'default': 1,
        'switchContainer': 2,
        'switchHandle': 3
    },
};

module.exports = {
    ...fonts,
    ...common,
    /**
     * Horizontal breakpoints.
     * @type {Object.<string, number>}
     */
    breakpoints: {
        xs: 0,
        sm: 767,
        md: 928,
        lg: 1280,
        xl: 1920,
        xxl: 2560
    },
    /**
     * Vertical breakpoints.
     * @type {Object.<string, number>}
     */
    screenHeight: {
        xs: 0,
        /** iPhone 5 */
        sm: 568,
        /** Samsung Galaxy S3 */
        md: 640,
        /** iPhone 6, 7, 8 */
        lg: 667,
        /** iPhone 6+, 7+, 8+ */
        xl: 736,
        /** iPhone X */
        xxl: 812,
        /** iPhone XS Max, XR */
        xxxl: 896
    },
};
