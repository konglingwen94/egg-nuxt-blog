# EGG-NUXT-BLOG

## Introduction

Nuxt.js（web 端） + Egg.js（api 服务） + Vue.js（管理后台）+ ElementUi（通用组件库）服务器渲染(SSR)搭建的个人博客系统

## Environment

- Node: v10.13.0
- MongoDB: v4.0.5

## Setup

### Development

- npm run dev(启动服务端 Api http://localhost:7001)

- npm run web:dev (启动客户端 http://localhost:3000)

- npm run admin:dev（启动管理后台 http://localhost:8080）

### Build

- npm run web:build（打包客户端）

- npm run admin:build (打包管理后台)
- npm start (启动项目)

  - Web: http://localhost:7001
  - Admin: http://localhost:7001/admin
  - Api: http://localhost:7001/api

## Technology stack

- UI: ElementUI (基于 VueJs 的组件库)

  - Web:服务端渲染的多页面应用
  - Manager:单页面应用

- HttpTool: Axios
- Renderer: Nuxt （基于 VueJs 的服务端渲染框架）
- Server : EggJs(封装了 koa+koa-router 的 NodeJs 框架)
- DataBase： Mongoose(支持异步操作 MongoDB 的库)

## Features

### Web 客户端

- [x] 首页展示博客所有文章
- [x] 首页按文章相关排序展示轮播图
- [x] 点击文章标题展示文章内容
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
