const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

const modes = {
  production: 'production',
  development: 'development',
  testing: 'testing',
}

const MODE = process.env.NODE_ENV || modes.production
const IS_DEVELOPMENT = MODE === modes.development
const IS_PRODUCTION = MODE === modes.production
const IS_TESTING = MODE === modes.testing

const VERBOSE = false

const res = p => path.resolve(__dirname, p)

const nodeModules = res('../node_modules')
const entry = res('../server/render.js')
const output = path.resolve(__dirname, '../.dev/server')


module.exports = {
  name: 'server',
  devtool: 'source-map',
  target: 'node',
  mode: 'development',
  entry: ['regenerator-runtime/runtime.js', entry],
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            plugins: [
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css', '.styl'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BABEL_ENV: process.env.BABEL_ENV,
      NODE_ENV: process.env.NODE_ENV,
      IS_SERVER: true,
      DEBUG: IS_DEVELOPMENT,
      IS_DEVELOPMENT,
      IS_PRODUCTION,
      IS_TESTING,
      MODE,
    }),
    new WriteFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}
