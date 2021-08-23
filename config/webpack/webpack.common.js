/**
 * Module contains common webpack configuration
 * @module _/config/webpack/common
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin')['default'];
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const path = require('path');

// TODO Add offline support with https://developers.google.com/web/tools/workbox

module.exports = function getWebpackCommonConfig(env) {
    const isProd = env.mode === 'production';

    // Should enable tracing of deprecation warnings.
    if (env.traceDeprecation) {
        process.traceDeprecation = true;
    }

    const plugins = [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../../', isProd
                ? './assets/favicons/prod-favicon.png'
                : './assets/favicons/dev-favicon.png'
            ),
            title: 'Title',
            filename: './index.html',
            template: path.resolve(__dirname, './../../src/template/index.html'),
            inject: true,
            minify: isProd,
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].bundle.css',
            chunkFilename: 'assets/css/chunk-[id].css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
        new HtmlInlineCSSWebpackPlugin({
            filter: function filter(fileName) {
                return fileName.match(/^\/?critical(?:css)?\.css$/i) || fileName === 'index.html';
            },
            replace: {
                target: '</title>',
                position: 'after'
            }
        }),
    ];

    if (env.stats) {
        plugins.push(new StatsWriterPlugin({
            stats: {
                all: true,
            }
        }));
    }

    return {
        module: {
            rules: [
                {
                    test: /\.(sc|c|pc)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                url: false,
                            },
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ],
                },
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        },
                        {
                            loader: 'astroturf/loader',
                        },
                    ]
                },
                {
                    test: /\.html$/,
                    exclude: /index\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: env.mode === 'production',
                            },
                        },
                    ],
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    use: ['@svgr/webpack', 'url-loader'],
                },
                {
                    test: /\.(woff|eot|ttf|otf)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1000, // if less than 10 kb, adds base64 encoded image to css
                            name: 'assets/fonts/[hash].[ext]', // if more than 10 kb falls to file-loader
                        },
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico|webp)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                esModule: false,
                                limit: 10,
                                name: 'assets/img/[name].[ext]', // if more than 10 kb falls to file-loader
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.css', '.pcss', '.scss', '.ts', '.tsx'],
        },
        entry: {
            index: {
                'import': './src/app.tsx',
                dependOn: 'shared',
            },
            shared: 'core-js',
        },
        target: 'web',
        plugins,
        devtool: env.sourceMaps
            ? 'inline-source-map'
            : false,
        output: {
            filename: 'assets/js/[name].bundle.js',
            path: path.resolve(__dirname, '../../build/dist'),
            publicPath: '/',
        },
    };
};
