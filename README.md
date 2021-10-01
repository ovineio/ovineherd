### Ovine Herd

可在线构建管理系统  应用的平台。本项目为前后端分离架构。前端采用 `react`与微前端 技术栈，后端采用 `golang` 开发。

## 前端部分

> 本地开发启动前端部分 [前端部分文档](https://ovine.igroupes.com/org/docs/intro/overview/)

- `yarn install` 安装本项目基础依赖
- `yarn all:install` 安装子应用依赖，由于网络问题，全部安装，极其容易出错，当某个子应用安装出错，可以只对某一个重新安装就行，不需要每次都重复执行这一个命令
- `yarn all:gen` 生成子应用静态文件
- `yarn all:start` 启动所有项目

###### 注意:

[前端项目详细文档](http://ovine.igroupes.com/org/docs/intro/overview/)

由于本地使用了 `localhost:7049` 作为 API 接口，因此需要你在本地启动API服务。（本地API服务启动方式，见下方）如果你不需要本地启动服务器，可以使用测试服 API，可以将 对应配置注释即可。


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

## 服务端部分
服务端部分代码 `./server/uniadmin/`

> 本地开发启动后端部分

- 配置项目: 修改 `./server/uniadmin/conf/app.conf` 对应内容
- 初始化mysql数据库（有以下两选择）
  - 方案1: 执行 `./server/uniadmin/conf/ovineherd_demo.sql` 初始化带有demo数据数据库，可以快速上手使用。 平台登录账号 `rootadmin/admin123`
  - 方案2: 执行 `./server/uniadmin/conf/db_tables.sql` 初始化空数据库，数据需要自己手动添加
- 启动服务
  - windows
    - 项目配置，初始化数据库后，直接执行 `./server/uniadmin/base_service.exe`
  - linux/macos
    - 安装 `golang` 运行环境
    - 在当前项目根目录下执行：`yarn start:server:uniadmin`

###### 注意:

目前新版本正在研发，**新版本将不再使用此后端部分。**



