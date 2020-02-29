const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    main: './src/index.js',
    editor: './src/editor.js',
    withContext: './src/withContext.js',
    withUii: "./src/withUii.js"
  },
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
};