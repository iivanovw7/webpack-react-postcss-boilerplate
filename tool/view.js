/**
 * View util.
 * @module _/tool/view
 */
const LocalWebServer = require('local-web-server');

const env = require('./env').getEnv('production');

const webServer = LocalWebServer.create({
    directory: './dist',
    port: env.port,
    logFormat: 'dev',
    spa: 'index.html',
});

webServer.on('verbose', function verboseListener(key, value) {
    if (key === 'server.listening') {
        // eslint-disable-next-line no-console
        console.log('Serving at', value.map((item) => item.url).join(', '));
    }
});
