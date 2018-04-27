const path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.NODE_ENV || 'development';

var plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    inject: 'body',
  })
];

console.log('NODE_ENV:', env);

module.exports = {
  entry: (env !== 'production' ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ] : []).concat(['./src/index.js']),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './bundle.js'
  },
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.(s*)css$/,
        use: [
            { loader: 'style-loader'},
            {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            },
            {
              loader: "sass-loader"
            }
        ]
      }
    ],
  },
  plugins: plugins
};