### Ovine Herd

可在线构建管理系统  应用的平台.

#### 启动项目

> 由于 本项目直接依赖 @ovine 基础包，此包没目前没有发布稳定版本，因此使用本地包，相对来说运行本项目比较繁琐。不过，等本项目逐渐稳定，将使用 npm 线上 ovine 包。预计近 1-2 个月内，会将所有本地依赖包，迁移为线上包，

- 先要将 [`ovine`](https://github.com/CareyToboo/ovine) 源码项目克隆下来，先跑通。 [ovine 介绍地址](http://ovine.igroupes.com/org/blog/contribute), (要保证，`ovine` 与 `ovine-herd` 项目在同一目录下)
- 在项目 `ovine-herd/` 根目录下，本项目使用了 `qiankun` 微前端架构
  - `yarn install` 安装本项目依赖
  - `yarn all:install` 安装子应用依赖，由于网络问题，全部安装，极其容易出错，当某个子应用安装出错，可以只对某一个重新安装就行，不需要每次都重复执行这一个命令
  - `yarn gen:static` 生成子应用静态文件
  - `yarn all:start` 启动所有项目

#### 本项目 服务端部分 `server/uniadmin/`

- [文档地址](http://doc.uniappadmin.cn/docs/baser_service/explain)
- [源代码仓库](https://gitee.com/uniappadmin/uniappadmin)
