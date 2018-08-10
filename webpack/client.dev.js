const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

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

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=true&noInfo=true',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../.dev/client'),
    publicPath: '/static/',
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
      {
        loader: 'eslint-loader', options: {
          configFile: path.resolve(__dirname, '..', '.eslintrc'),
          quiet: true,
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
      IS_SERVER: false,
      DEBUG: IS_DEVELOPMENT,
      IS_DEVELOPMENT,
      IS_PRODUCTION,
      IS_TESTING,
      MODE,
    }),
    new WriteFilePlugin(),
    new ExtractCssChunks(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}
