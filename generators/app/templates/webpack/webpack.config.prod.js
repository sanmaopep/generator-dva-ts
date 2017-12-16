process.env.NODE_ENV = 'production';
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

let postcssOptions = {
    config: {
        path: path.resolve(__dirname, "./webpack/postcss.config.js")
    }
}

module.exports = {
    devtool: "source-map",
    entry: {
        app: "./src/index.tsx", // Your appʼs entry point
        vendor: ['react', 'react-dom']
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: path.join(__dirname, "../build/static"),
        filename: "js/[name].[chunkhash].js",
        publicPath: "/static/"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', "jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'lib',
                            style: true
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(ttf|eot|woff)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "font/[hash:16].[ext]"
                    }
                }],
                exclude: [
                    path.resolve(__dirname, "./node_modules")
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "img/[hash:16].[ext]"
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: "[hash:base64]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: postcssOptions
                    },
                    {
                        loader: "sass-loader"
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false,
                            minimize: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: postcssOptions
                    },
                    {
                        loader: "less-loader"
                    }]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "postcss-loader",
                        options: postcssOptions
                    },]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            title: 'Eigen',
            template: './index.ejs'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify(new Date().toLocaleString())
        }),
        new webpack.optimize.UglifyJsPlugin(
            {
                sourceMap: false,
                warnings: false
            }
        ),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
        }),
        new ExtractTextPlugin({
            filename: "css/styles.[chunkhash].css"
        })
    ]
}