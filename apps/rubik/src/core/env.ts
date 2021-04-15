/**
 * 应用环境配置
 *
 * ovine cli命令:  build/dev  --env=xxx 可以使用对应配置
 * dev 默认环境为 localhost, build 默认环境为 production
 */

const env = {
  // 默认配置,如果对应的环境的变量不设置，就会使用默认的
  default: {
    // disableLimit: true,
    domains: {
      api: 'http://39.105.197.166:5288', // ovine api 地址
    },
  },
  // 本地开发
  localhost: {
    // disableLimit: false,
    domains: {
      api: 'http://localhost:7049',
    },
    // 日志配置
    logger: {
      // 可根据需要写正则匹配
      moduleName: '.*',
    },
  },
  // 测试环境
  staging: {
    domains: {
      api: 'http://39.105.197.166:5288',
    },
  },
  // 生产环境
  production: {
    isProd: true,
    domains: {
      api: 'https://ovine.igroupes.com',
    },
  },
}

export default env
