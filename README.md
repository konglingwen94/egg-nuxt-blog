# egg-nuxt-blog

Nuxt.js（Web 端） + Egg.js（Api 服务） + Vue.js（管理后台）+ ElementUI（前端组件库）服务器渲染(SSR)搭建的个人博客系统

## 线上展示

[点我查看](https://konglingwen94.github.io)

## 本项目共三个子项目

- admin/ （浏览器管理后台）

* app/ （服务端接口项目）

- web/ （浏览器客户端）

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
node scripts/init-data.js  管理员用户名 管理员密码
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

### Api 文档部署

```bash
# 执行构建页面
npm run docs:build
```

## 目录结构

```javascript
 admin/  //管理后台目录
 ├── src/ //源文件
 │   ├── api/ // 请求接口
 │   │   ├── aboutus.js   // 关于我们
 │   │   ├── articles.js   // 文章管理
 │   │   ├── auth.js   //  管理员
 │   │   ├── categories.js   // 分类
 │   │   ├── comments.js   //  文章评论
 │   │   ├── messages.js   // 留言墙
 │   │   ├── request.js   //  Axios请求实例
 │   │   └── tags.js   // 标签
 │   ├── assets/   //  静态资源
 │   │   ├── css/   //  样式
 │   │   │   └── overwrite.css   // 覆盖默认样式
 │   │   └── logo.png   //图片
 │   ├── components/   // 组件
 │   │   ├── CellPopover.vue   //鼠标悬浮文字预览浮窗
 │   │   ├── Header.vue   //页面头部
 │   │   ├── Menu.vue   //左侧菜单
 │   │   ├── Panel.vue   //主体内容面板
 │   │   ├── Pell.vue   //富文本编辑器
 │   │   └── Upload.vue   //资源上传
 │   ├── layouts/   //页面功能布局
 │   │   ├── Basic.vue   //主体布局
 │   │   ├── NotFound.vue   //不存在路由页面展示
 │   │   └── User.vue   //用户登陆
 │   ├── store/   //数据状态
 │   │   ├── aboutus.js   //关于我们数据模块
 │   │   └── index.js   //全局数据模块
 │   ├── utils/   //功能文件
 │   │   ├── element-ui.js   // 按需引入组件
 │   │   ├── global-registration.js   //注册自定义组件
 │   │   └── helper.js   //帮助函数库
 │   ├── views/   //路由页面
 │   │   ├── Article/   //文章
 │   │   │   ├── Editor.vue   //文章编辑
 │   │   │   └── List.vue   //列表展示
 │   │   ├── Author/   //作者
 │   │   │   └── index.vue
 │   │   ├── Carousel/   //轮播图
 │   │   │   └── index.vue
 │   │   ├── Category/   //分类
 │   │   │   └── List.vue
 │   │   ├── Comment/   //文章评论
 │   │   │   └── List.vue
 │   │   ├── Dashboard/   //主面板
 │   │   │   └── index.vue
 │   │   ├── Guestbook/   //留言墙
 │   │   │   └── List.vue
 │   │   ├── Login/   //登陆
 │   │   │   └── index.vue
 │   │   ├── Platform/   //平台
 │   │   │   └── index.vue
 │   │   ├── Security/   //安全
 │   │   │   └── index.vue
 │   │   └── Tag/   //标签
 │   │       └── index.vue
 │   ├── App.vue   //入口组件
 │   ├── main.js   //入口文件
 │   └── router.js   //路由配置文件
 ├── babel.config.js
 ├── package-lock.json
 ├── package.json
 ├── README.md
 ├── vue.config.js
 app/  //服务端源文件
 ├── controller/   //控制器
 │   ├── aboutus.js   //关于我们
 │   ├── admin.js   //管理员
 │   ├── article.js   //文章
 │   ├── category.js   //文章分类
 │   ├── comment.js   //文章评论
 │   ├── guestbook.js   //留言墙
 │   ├── tag.js   //文章标签
 │   └── upload.js   //资源上传
 ├── extend/   //Egg框架功能扩展
 │   ├── context.js   //请求上下文
 │   └── helper.js   //帮助函数
 ├── middleware/   //中间件
 │   ├── adminRequired.js   //管理员是否登陆权限验证
 │   ├── apiRouterParameterValidator.js   //参数全局校验
 │   ├── compress.js   //资源压缩
 │   ├── docs.js   //文档资源托管
 │   ├── errorHandler.js   //错误处理
 │   ├── history.js   //处理vue-router使用history模式
 │   ├── nuxtRender.js   //服务端渲染
 │   ├── platformENV.js   //客户端平台判断
 │   ├── responseHandler.js   //统一数据响应
 │   ├── siteTraffic.js   //文件访问量跟踪（待完善）
 │   └── upload.js   //资源上传
 ├── model/   //数据库集合模型
 │   ├── aboutus.js   //关于我们
 │   ├── admin.js   //管理员
 │   ├── article.js   //文章
 │   ├── category.js   //分类
 │   ├── comment.js   //文章评论
 │   ├── guestbook.js   //留言墙
 │   └── tag.js   //标签
 ├── router/   //接口路由
 │   ├── aboutus.js   //关于我们
 │   ├── admin.js   //管理员
 │   ├── article.js   //文章
 │   ├── category.js   //分类
 │   ├── comment.js   //文章评论
 │   ├── guestbook.js   //留言墙
 │   ├── proxyService.js   //代理第三方数据请求
 │   ├── tag.js   // 标签
 │   └── upload.js   //资源上传
 ├── types/   //字段类型
 │   └── request.js   //请求类型定义
 ├── package.json
 ├── README.md
 config/   //项目配置
 ├── config.default.js   //默认配置
 ├── config.local.js   //本地环境
 ├── config.prod.js   //线上环境
 ├── defaultConfiguration.json   //数据库初始化数据
 ├── plugin.js   //插件
 documentations/   //文档
 ├── api/   //接口
 │   ├── admin.md   //管理员
 │   ├── article.md   //文章
 │   ├── category.md   //分类
 │   ├── comment.md   //文章评论
 │   ├── guestbook.md   //留言墙
 │   ├── README.md   //指南
 │   └── tag.md   //标签
 ├── database/   //数据库字段定义
 │   ├── admin.md   //管理员
 │   ├── article.md   //文章
 │   ├── category.md   //分类
 │   ├── comment.md   //文章评论
 │   ├── guestbook.md   //留言墙
 │   ├── README.md   //指南
 │   └── tag.md   //标签
 ├── configurations.md   //项目配置指南
 ├── README.md   //项目概述
 logs/   //服务器日志
 public/ // 项目打包目录
 run/   //服务器运行状态
 scripts/   //自定义脚本
 ├── init-data.js   //初始化管理员
 web/   //客户端源文件目录
 ├── assets/   //静态资源
 │   └── css/   //样式
 │       ├── global.css   //全局样式
 │       ├── mixin.less   //定义混合样式类
 │       ├── reset.css   //覆盖默认样式
 │       └── page-transition.css   //页面过渡动画
 ├── components/   //自定义组件
 │   ├── ArticleItem.vue   //文章项
 │   ├── ArticleList.vue   //文章列表
 │   ├── Footer.vue   //网站底部
 │   ├── Header.vue   //网站头部
 │   └── Suggestion.vue   //文章相关推荐
 ├── layouts/   //网站布局
 │   ├── Article.vue   //文章布局
 │   └── Public.vue   //公共布局
 ├── middleware/   //中间件
 ├── pages/   //路由页面
 │   ├── aboutus/   //关于我们
 │   │   └── index.vue   //
 │   ├── folders/   //文章分类
 │   │   └── index.vue
 │   ├── articles/
 │   │   ├── index.vue   // 文章首页列表
 │   │   └── _id.vue   //文章详情页
 │   ├── messages   //留言墙
 │   │   └── index.vue   //
 │   └── index.vue   //网站首页
 ├── plugins/   //插件
 │   ├── element-ui.js   //UI组件库
 │   ├── global-components.js   //全局注册自定义组件
 │   ├── init-store.js   //开启数据持久化
 │   └── lib.js  //第三方组件库
 ├── services/   //数据请求
 │   ├── aboutus.js   //关于我们
 │   ├── articles.js   //文章
 │   ├── categories.js   //分类
 │   ├── comments.js   //文章评论
 │   ├── messages.js   //留言墙
 │   ├── request.js   //Axios请求实例
 │   └── tags.js   //标签
 ├── static/   //静态资源
 │   └── favicon.ico   //
 ├── store/   //数据存储
 │   ├── article.js   //文章
 │   ├── configuration.js   //配置
 │   ├── index.js   //模块入口
 │   ├── messages.js   //留言
 │   └── weather.js   //天气
 ├── nuxt.config.js
 ├── package-lock.json
 ├── package.json
 ├── README.md
 app.js   //服务器启动入口文件
 package-lock.json   //
 package.json   //项目信息
 postcss.config.js   //
 README.md   //项目指南
```

## 项目技术栈

- 编程语言：HTML、CSS、Javascript、ES6(next)、Less、JSON

* 用户界面库: ElementUI (基于 VueJs 的桌面组件库)

- 底层框架：VueJs、KoaJs

* 客户端数据持久化：LocalStorage、Vuex

- 服务端渲染: Nuxt （封装了 VueJs+Vuex+VueRouter 的上层框架）

* 服务端数据接口 : EggJs(封装了 koa+koa-router 等 koa 功能模块的 NodeJs 上层框架)

- 数据库操作： Mongoose(支持异步操作 MongoDB 的库)

* 第三方插件: vue-weather-component(天气插件)、bcrypt(数据加密)、pell(富文本编辑器)、jsonwebtoken(权限认证)、axios(HTTP 请求工具)

- 辅助测试工具：Postman、ChromeInspector、

## 项目主要功能

### Web 客户端

- [x] 首页展示
  - [x] 根据网站访问地理位置自动展示当前城市天气
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

- [管理员](https://konglingwen94.github.io/egg-nuxt-blog/api/admin.html)
- [关于我们](https://konglingwen94.github.io/egg-nuxt-blog/api/aboutus.html)
- [文章分类](https://konglingwen94.github.io/egg-nuxt-blog/api/category.html)
- [文章标签](https://konglingwen94.github.io/egg-nuxt-blog/api/tag.html)
- [文章管理](https://konglingwen94.github.io/egg-nuxt-blog/api/article.html)
- [文章评论](https://konglingwen94.github.io/egg-nuxt-blog/api/comment.html)
- [留言管理](https://konglingwen94.github.io/egg-nuxt-blog/api/guestbook.html)

如果我的项目对您有所帮助，您可以点右上角 "Star" 支持一下 感谢～～！:blush:
