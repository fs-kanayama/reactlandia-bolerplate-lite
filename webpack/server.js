const path = require('path')
const webpack = require('webpack')

const { IS_DEVELOPMENT, IS_PRODUCTION, IS_TESTING, MODE, IS_STATIC_BUILD } = require('../lib/mode')

module.exports = {
  name: IS_STATIC_BUILD ? 'static' : 'server',
  target: 'node',
  mode: MODE,
  devtool: 'source-map',

  entry: [
    path.resolve(__dirname, '../server/render.js'),
  ],

  output: {
    filename: IS_STATIC_BUILD ? 'static.js' : 'server.js',
    path: path.resolve(__dirname, '..', IS_STATIC_BUILD ? '.static' : IS_DEVELOPMENT ? '.dev' : '.prod', 'server'),
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader', options: {
          configFile: path.resolve(__dirname, '..', '.eslintrc'),
          quiet: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
              plugins: [IS_DEVELOPMENT && 'react-hot-loader/babel'].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'null-loader',
        ],
      },
    ],
  },

  resolve: { extensions: ['.js'] },

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

    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    IS_PRODUCTION && new webpack.optimize.ModuleConcatenationPlugin(),
    IS_PRODUCTION && new webpack.optimize.OccurrenceOrderPlugin(),
  ].filter(Boolean),
}
