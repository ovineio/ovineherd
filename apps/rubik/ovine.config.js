/**
 * Ovine 编译配置
 * 保存会自动重新执行 dev server. 请勿短时间内多次编辑并保存
 * 请按文档内容编辑好后再保存。或者关闭 dev server 进行编辑。
 * 文档： https://ovine.igroupes.com/org/docs/advance/configurations
 */
const path = require('path')

module.exports = (option) => {
  const { env, port } = option

  const subPath = '/platform/apps_app/'

  const publicPathMap = {
    localhost: `http://localhost:${port}${subPath}`,
    staging: `http://ovine.igroupes.com${subPath}`,
    production: 'https://cdn-igroupes.com/ovine/',
  }

  const config = {
    publicPath: publicPathMap[env], // 静态资源公共路径
    favicon: '/static/images/favicon.ico',
    title: 'app',
    appKey: 'rubik',
    envModes: ['localhost', 'staging', 'production'], // 环境列表
    dll: {
      useJsdelivr: true,
    },
    devServer: {
      publicPath: subPath,
      openPage: '/platform/app',
    },
    ui: {
      appTheme: 'cxd',
    },
    template: {
      path: path.resolve(__dirname, './template.ejs'),
    },
    styledConfig: {
      namespace: 'app',
    },
    cacheGroups: {
      amisEditor: {
        chunks: 'async',
        name: 'amis_editor',
        test: /[\\/]node_modules[\\/]@ovine[\\/]editor[\\/]/,
        priority: 40,
      },
    },
  }

  return config
}
