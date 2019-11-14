'use strict'

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const loader = require.resolve('../../..')
const cssLoader = require.resolve('css-loader')

module.exports = {
  context: path.join(__dirname),
  entry: {
    index: './actual/index.scss',
    index2: './actual/index2.sass'
  },
  output: {
    path: path.join(__dirname, '../../runtime/normal-no-url-resolve'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: cssLoader,
              options: {
                url: false
              }
            },
            {
              loader: loader,
              options: {
                includePaths: [ path.join(__dirname, 'extra'), 'sass_modules'],
                resolveURLs: false
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
