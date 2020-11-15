/**
 * 应用环境配置
 *
 */

const env = {
  // 默认配置,如果对应的环境的变量不设置，就会使用默认的
  default: {
    disableLimit: true,
    domains: {
      api: 'https://ovine.igroupes.com', // ovine api 地址
    },
  },
  // 本地开发
  localhost: {
    domains: {
      api: 'http://39.105.197.166:5288',
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
