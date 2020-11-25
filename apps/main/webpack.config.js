const HtmlWebpackPlugin = require('html-webpack-plugin')
// 不支持 webpack5
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// 【hotReload】(https://github.com/umijs/qiankun/issues/395)

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    port: 7060,
    hot: true,
    clientLogLevel: 'warning',
    disableHostCheck: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  output: {
    filename: '[name]_[hash:6]_bundle.js',
    publicPath: '/',
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
}
