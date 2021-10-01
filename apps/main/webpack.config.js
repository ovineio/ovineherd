const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const analyzer = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { BundleAnalyzerPlugin } = analyzer

const { ENV = 'localhost' } = process.env
const port = 7060
const subPath = '/platform/'

const presetConfig = {
  localhost: {
    publicPath: '/',
  },
  staging: {
    publicPath: `http://ovine.igroupes.com${subPath}`,
  },
  production: {
    publicPath: `http://ovine.igroupes.com${subPath}`,
  },
}

const config = presetConfig[ENV]

const webpackConfig = {
  mode: ENV === 'localhost' ? 'development' : 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    port,
    hot: true,
    publicPath: config.publicPath,
    clientLogLevel: 'warning',
    disableHostCheck: true,
    compress: true,
    open: true,
    openPage: 'platform/center/sys/admin',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  output: {
    filename: '[name]_[hash:6].js',
    publicPath: config.publicPath,
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js'],
  },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      ENV,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './template/index.ejs',
      loaderTemplate: fs.readFileSync('./template/loader.html', 'utf8'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
}

// webpackConfig.plugins.push(
//   new BundleAnalyzerPlugin({
//     analyzerPort: port + 1,
//   })
// )

module.exports = webpackConfig
