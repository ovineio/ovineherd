const { name } = require('./package.json')

module.exports = {
  output: {
    library: name,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
}
