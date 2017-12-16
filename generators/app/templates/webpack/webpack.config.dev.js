var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin');

let postcssOptions = {
    config: {
        path: path.resolve(__dirname, "./webpack/postcss.config.js")
    }
}

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: [
        "webpack-hot-middleware/client",
        "./src/index.tsx" // Your appʼs entry point
    ],
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "js/bundle.js",
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
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]_[local]_[hash:4]"
                        }
                    }, {
                        loader: "postcss-loader",
                        options: postcssOptions
                    }, {
                        loader: "sass-loader"
                    }]
                }))
            },
            {
                test: /\.less$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: postcssOptions
                    },
                    {
                        loader: "less-loader"
                    }]
                }))
            },
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "postcss-loader",
                        options: postcssOptions
                    }]
                }))
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            VERSION: JSON.stringify(new Date().toLocaleString())
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: "css/styles.css"
        })
    ]
}