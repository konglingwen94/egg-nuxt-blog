---
sidebar: auto
---

# 项目配置

## 数据库环境

### MongoDB

- [官方文档](https://docs.mongodb.com/manual/introduction/)
- [安装手册](https://docs.mongodb.com/manual/administration/install-on-linux/)

## 服务端环境

项目服务端基于 [nodejs.org](https://nodejs.org/) 进行开发。

### 版本要求

```
>= 10.x
```

### API 服务部署

#### 1. 安装项目依赖

```bash
npm install
```

#### 2. 编写配置文件

```js
// 开发环境配置文件 config/config.local.js
// 生产环境配置文件 config/config.prod.js

{
  keys: '随机安全 key',

  // MongoDB configs.
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    database: '数据库名称',
    user: '数据库账号',
    pass: '数据库密码',
  },
}
```

#### 3. 运行 API 服务

```bash
npm run start # 启动运行 API 服务
npm run stop # 停止运行 API 服务
```

#### 4. 执行初始化数据库脚本

```bash
# 仅在第一次配置时执行， 默认创建超级管理员ROOT
node scripts/init-admin.js  管理员用户名 管理员密码
```

### Web 客户端部署

```bash
# 1.执行构建页面
npm run web:build
```

### 管理后台部署

```bash
# 1. 执行构建页面
npm run admin:build
```
