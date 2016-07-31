const assign = require('lodash.assign')
const webpackConfig = require('./webpack.config')

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['benchmark'],
    files: ['benchmark/**/*.js'],
    preprocessors: {
      'benchmark/**/*.js': ['webpack']
    },
    webpack: assign(webpackConfig, {
      devtool: 'inline-source-map'
    }),
    webpackServer: {
      noInfo: true
    },
    reporters: ['benchmark']
  })
}