const path = require('path')
const webpack = require('webpack')
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
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../.prod/client'),
    publicPath: '/static/',
  },
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
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
  mode: 'development',
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
    new ExtractCssChunks(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
  ],
}
