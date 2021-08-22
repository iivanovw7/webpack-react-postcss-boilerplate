/**
 * Module contains production webpack config.
 * @module _/config/webpack/prod
 */
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { merge } = require('webpack-merge');

const path = require('path');

module.exports = function getWebpackProdConfig(env) {
    const common = require('./webpack.common.js')(env);

    return merge(common, {
        mode: 'production',
        plugins: [
            new WebpackAssetsManifest({
                output: path.join(__dirname, '../../dist/asset-manifest.json'),
                merge: true,
            }),
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    plugins: [
                        ['gifsicle', { interlaced: true } ],
                        ['jpegtran', { progressive: true } ],
                        ['optipng', { optimizationLevel: 5 } ],
                        [
                            'svgo',
                            {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            },
                        ],
                    ],
                },
            }),
            new webpack.DefinePlugin({
                CONFIG: JSON.stringify('production'),
            }),
            new FaviconsWebpackPlugin(path.join(__dirname, '../../', './assets/favicons/prod-favicon.png')),
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            comparisons: false,
                        },
                        parse: {},
                        mangle: true,
                        output: {
                            comments: false,
                            // eslint-disable-next-line camelcase
                            ascii_only: true,
                        },
                    },
                    parallel: true,
                }),
            ],
            concatenateModules: true,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'async',
                maxInitialRequests: Infinity,
                minSize: 0,
                maxSize: 200000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        // eslint-disable-next-line no-shadow
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${ packageName.replace('@', '') }`;
                        },
                    },
                },
            },
        },
        performance: {
            assetFilter: (assetFilename) => ! /(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        output: {
            filename: 'assets/js/[name].[chunkhash].js',
            path: path.resolve(__dirname, '../../dist'),
        }
    });
};
