/**
 * 定义需要的 api
 */

export const apis = {
  user: {
    login: {
      api: 'POST /v1/user/login',
    },
    list: {
      api: 'GET /v1/user',
    },
    one: {
      api: 'GET /v1/user/$id',
    },
    add: {
      api: 'POST /v1/user/login',
    },
    edit: {
      api: 'PUT /v1/user/$id',
    },
    del: {
      api: 'DELETE /v1/user/$id',
    },
  },
  config: {
    list: {
      api: 'GET /v1/config',
    },
    one: {
      api: 'GET /v1/config/$id',
    },
    add: {
      api: 'POST /v1/config/login',
    },
    edit: {
      api: 'PUT /v1/config/$id',
    },
    del: {
      api: 'DELETE /v1/config/$id',
    },
  },
  file: {
    upload: {
      api: 'POST /v1/file',
    },
  },
  category: {
    // 配置
    list: {
      api: 'GET /v1/category',
    },
    one: {
      api: 'GET /v1/category/$id',
    },
    add: {
      api: 'POST /v1/category/login',
    },
    edit: {
      api: 'PUT /v1/category/$id',
    },
    del: {
      api: 'DELETE /v1/category/$id',
    },
  },
  product: {
    list: {
      api: 'GET /v1/product',
    },
    one: {
      api: 'GET /v1/product/$id',
    },
    add: {
      api: 'POST /v1/product/login',
    },
    edit: {
      api: 'PUT /v1/product/$id',
    },
    del: {
      api: 'DELETE /v1/product/$id',
    },
  },
}
