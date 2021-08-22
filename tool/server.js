/**
 * Dev server util.
 * @module _/tool/server
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const env = require('./env').getEnv('development');

// eslint-disable-next-line import/order
const config = require('../config/webpack/webpack.dev')(env);
const port = env.port;

new WebpackDevServer(webpack(config), {
    historyApiFallback: true,
    contentBase: config.output.path,
    publicPath: config.output.publicPath,
    port,
    hot: true,
    disableHostCheck: true,
}).listen(port, 'localhost', function handleStart(err, result) {
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    if (err) {
        // eslint-disable-next-line no-console
        return console.log(err);
    }

    // eslint-disable-next-line no-console
    return console.log(`Listening at http://localhost:${ port }\n`);
});
