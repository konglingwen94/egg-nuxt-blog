# EGG-NUXT-BLOG

## Introduction

Nuxt.js（web 端） + Egg.js（api 服务） + Vue.js（管理后台）+ ElementUi（通用组件库）服务器渲染(SSR)搭建的个人博客系统

## Environment

- Node: v10.13.0
- Mongodb: v4.0.5

## Setup

### Development

- npm run dev(启动服务端 Api http://localhost:7001)

- npm run web:dev (启动客户端 http://localhost:3000)

- npm run admin:dev（启动管理后台 http://localhost:8080）

### Build

- npm run web:build（打包客户端）

- npm run admin:build (打包管理后台)

### Production

npm start (启动项目)

- Web: http://localhost:7001
- Admin: http://localhost:7001/admin
- Api: http://localhost:7001/api

## Technology stack

- UI: ElementUI (基于 VueJs 的组件库)
    * Web:服务端渲染的多页面应用
    * Manager:单页面应用

- HttpTool: Axios
- Renderer: Nuxt （基于 VueJs 的服务端渲染框架）
- Server : EggJs(封装了 koa+koa-router 的 NodeJs 框架)
- DataBase： Mongoose(支持异步操作 MongoDB 的库)

