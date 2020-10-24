const path = require('path')

const { name } = require('./package.json')

const { DEV_LIB } = process.env

module.exports = {
  output: {
    library: name,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
  resolve: {
    alias:
      DEV_LIB !== 'true'
        ? {}
        : {
            qs: path.resolve(__dirname, './node_modules/qs/dist/qs'),
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/@hot-loader/react-dom'),
            '@ovine/core': path.resolve(__dirname, '../../../ovine/packages/core'),
          },
  },
}
