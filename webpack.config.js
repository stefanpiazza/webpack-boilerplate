const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/js/main.js",
        // commons: []
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        publicPath: "/",
        filename: "./static/scripts/[name].js",
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
    },
    module: {
        rules: [{
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                        loader: "file-loader",
                        options: {
                            name: "/static/images/[name].[ext]"
                        }
                    },
                    {
                        loader: "image-webpack-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader",
                            options: {
                                camelCase: true,
                                // Keep same as class definition for now
                                localIdentName: "[local]",
                                importLoaders: 2,
                                modules: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "static/scripts/commons.js",
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: "static/styles/[name].css"
        }),
        new BrowserSyncPlugin({
	        host: 'localhost',
	        port: 3000,
	        server: {
	        	baseDir: './dist'
	        }
        }),
        new HtmlWebpackPlugin({

        })
    ]
}
