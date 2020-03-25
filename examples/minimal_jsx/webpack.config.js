const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: "./index.jsx"
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, '../dist'),
    },
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
        ],
    }
};