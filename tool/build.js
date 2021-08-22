/**
 * Build util.
 * @module _/tool/build
 */
const webpack = require('webpack');

const env = require('./env').getEnv('production');

// eslint-disable-next-line import/order
const config = require('../config/webpack/webpack.prod.js')(env);

webpack(config, function handler(err, stats) {
    if (err) {
        // eslint-disable-next-line no-console
        console.error(err.stack || err);

        if (err.details) {
            // eslint-disable-next-line no-console
            console.error(err.details);
        }
    }
    else {
        // eslint-disable-next-line no-console
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true, // Shows colors in the console
            })
        );

        if (stats.hasErrors()) {
            // eslint-disable-next-line no-console
            console.error('✗ Build was stopped due to errors.');
        }
        // eslint-disable-next-line no-console
        console.log('✓ Build is finished.');
    }
});
