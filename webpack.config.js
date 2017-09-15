'use strict'

module.exports = {
  entry: './browser/react/App.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  context: __dirname,
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
