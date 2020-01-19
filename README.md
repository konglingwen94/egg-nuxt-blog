# egg-nuxt-blog

Nuxt.js（Web 端） + Egg.js（Api 服务） + Vue.js（管理后台）+ ElementUI（前端组件库）服务器渲染(SSR)搭建的个人博客系统

## 启动项目

```bash
# 1. 安装项目依赖
npm install
# 2.启动 Api 服务
npm run dev # http://localhost:7001
# 3.启动 Api 使用说明文档
npm run docs:dev # http://localhost:8080/docs
# 4.启动客户端
npm run web:dev # http://localhost:3000
# 5.启动管理后台
npm run admin:dev # http://localhost:8080
```

## 项目配置

### 数据库环境

#### MongoDB

- [官方文档](https://docs.mongodb.com/manual/introduction/)
- [安装手册](https://docs.mongodb.com/manual/administration/install-on-linux/)

#### 版本要求

    >= 4.x

### 服务器环境

    项目服务端基于 [nodejs.org](https://nodejs.org/) 进行开发。

#### 版本要求

    >= 10.x

## 项目部署

### 安装项目依赖

```bash
npm install
```

### API 服务

#### 1. 编写配置文件

```js
// 开发环境配置文件 config/config.default.js

// 本地测试环境配置文件 config/config.local.js

{
  keys: '随机安全 key',

  // MongoDB configs.
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    database: '数据库名称',
    username: '数据库账号',
    password: '数据库密码',
  },
}
```

#### 2. 运行 API 服务

```bash
npm run start # 启动运行 API 服务

npm run stop # 停止运行 API 服务
```

#### 3. 执行初始化数据库脚本

```bash
# 仅在第一次配置时执行 默认创建超级管理员 ROOT
node scripts/init-admin.js  管理员用户名 管理员密码
```

### 客户端部署

```bash
# 执行构建页面
npm run web:build
```

### 管理后台部署

```bash
# 执行构建页面
npm run admin:build
```

### 服务端 Api 文档部署

```bash
# 执行构建页面
npm run docs:build
```

## 项目使用技术栈

- UI: ElementUI (基于 VueJs 的客户端通用组件库)

  - Web 客户端:服务端渲染的多页面应用
  - 管理后台:单页面应用

- Base：HTML、CSS、Javascript
- Extensions：ES6(next)、Less、JSON、TypeScript（待使用）
- HTTP: Axios
- Renderer: Nuxt （封装了 VueJs+Vuex+VueRouter 的服务端数据渲染框架）
- Web 客户端数据持久化：LocalStorage、Vuex
- ServerApi : EggJs(封装了 koa+koa-router 等模块的 NodeJs 框架)
- Database： Mongoose(支持异步操作 MongoDB 的库)

- CodeDebugger：ChromeInspector、LinuxShell

- TestTools：Postman(Api 测试)、Chrome

## 项目主要功能

### Web 客户端

- [x] 首页展示
  - [x] 根据网站访问地理位置自动展示当前城市天气（目前展示本地郑州,此功能待完善。查看原因请[点击](#1-天气地理定位)）
  - [x] 首页按文章相关排序展示轮播图
  - [x] 点击文章标题查看文章内容
- [x] 文章详情页面交互
  - [x] 点击相关推荐链接查看推荐的文章
  - [x] 点击所属标签链接查看相关文章
  - [x] 输入相关评论发表一个评论
  - [x] 评论点赞
  - [x] 文章收藏
- [x] 关于我们内容展示页
- [x] 文章归档
  - [x] 点击文章分类展示相关文章
  - [x] 点击文章标签展示相关文章
- [x] 留言墙
  - [x] 输入相关留言发表一个留言
  - [x] 点击回复发表一个@用户回复
  - [x] 用户回复点赞
  - [ ] 用户留言点赞

### 管理后台

- [x] 项目信息动态配置
  - [x] 设置轮播图相关配置(个数，文章排序规则等等)
  - [x] 关于我们作者简介设置
  - [x] 博客相关平台内容设置
- [x] 文章分类数据的增删改查
- [x] 文章标签数据的增删改查
- [x] 文章管理

  - [x] 查看文章的有关数据（浏览量，收藏个数，评论个数等内容）
  - [x] 单个文章的增删改查
  - [x] 批量删除多个文章（功能待完善）
  - [x] 查看单个文章详情（需求待更新）
  - [x] 配置文章是否发布（发布后前台才可查看）

- [x] 文章评论管理
  - [x] 删除一个评论
  - [x] 批量删除评论
- [x] 留言管理

  - [x] 单个删除留言
  - [x] 批量删除留言
  - [x] 查看留言相关回复
  - [x] 单个删除留言回复
  - [x] 批量删除留言回复
  - [x] 通用图片上传功能（上传后前端才能展示，否则为空）

### 服务端 Api（点击查看接口详情）

- [管理员](/docs/api/admin.md)
- [关于我们](/docs/api/aboutus.md)
- [文章分类](/docs/api/category.md)
- [文章标签](/docs/api/tag.md)
- [文章管理](/docs/api/article.md)
- [文章评论](/docs/api/comment.md)
- [留言管理](/docs/api/guestbook.md)

如果我的项目对您有所帮助，您可以点右上角 "Star" 支持一下 感谢～～！

---

### 项目相关问题

##### 1. 天气地理定位

由于作者测试的浏览器地理定位 Api 出现误差，不知是否是此 Api 兼容性问题还是电脑硬件问题，希望查看此开源项目的您帮助测试一下此 Api(window.navigation.geolocation.getCurrentPosition())的相关准确性

<!-- [issur1](/docs/README.md) -->
