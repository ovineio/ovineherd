### Ovine Herd

可在线构建管理系统  应用的平台.

#### 启动项目

> 前端部分启动

- `yarn install` 安装本项目依赖
- `yarn all:install` 安装子应用依赖，由于网络问题，全部安装，极其容易出错，当某个子应用安装出错，可以只对某一个重新安装就行，不需要每次都重复执行这一个命令
- `yarn all:gen` 生成子应用静态文件
- `yarn all:start` 启动所有项目

###### 注意:

由于本地使用了 `localhost:7049` 作为 API 接口，如果想使用测试服 API，可以将 对应配置注释

- `apps/platform/src/core/env.ts` 中 `localhost.domains.api` 注释
- `apps/rubik/src/core/env.ts` 中 `localhost.domains.api` 注释

比如:

```javascript
// 本地开发
  localhost: {
    domains: {
      // api: 'http://localhost:7049', // 注释此行，即可使用测试服API
    },
  }
```

#### 访问路由

- `http://localhost:7060/platform/center/sys/admin` 平台用户登录
  - 如果是测试服 API 可使用: `super01/super01` 登录

#### 本项目 服务端部分 `server/uniadmin/`

- [文档地址](http://doc.uniappadmin.cn/docs/baser_service/explain)
- [源代码仓库](https://gitee.com/uniappadmin/uniappadmin)

- 修改 `/server/uniadmin/conf/app.conf` 配置信息
- 执行 `/server/uniadmin/conf/uniappadmin.sql` 初始化数据库
- 按照 `uniappadmin` 文档启动项目
