/**
 * Module contains development webpack config.
 * @module _/config/webpack/dev
 */
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { merge } = require('webpack-merge');

const path = require('path');

const { TypesGenerator } = require('./../../tool/plugins');

module.exports = function getWebpackDevConfig(env) {
    const common = require('./webpack.common.js')(env);

    return merge(common, {
        mode: 'development',
        stats: {
            children: true
        },
        devtool: 'inline-source-map',
        plugins: [
            new DashboardPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                CONFIG: JSON.stringify('development'),
            }),
            new TypesGenerator({
                entry: path.join(__dirname, '../../', './assets/svg'),
                folderName: 'icons',
                typeAlias: 'IconType',
                output: {
                    filename: path.join(__dirname, '../../', './src/ui/elements/Icon/types.ts'),
                },
            }),
        ]
    });
};
