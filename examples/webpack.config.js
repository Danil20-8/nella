const path = require('path');
const webpack = require('webpack');
module.exports = {
  //mode: 'development',
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
};