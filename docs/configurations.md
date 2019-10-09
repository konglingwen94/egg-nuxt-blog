---
sidebar: auto
---

# 项目配置

## 数据库环境

### MongoDB

- [官方文档](https://docs.mongodb.com/manual/introduction/)
- [安装手册](https://docs.mongodb.com/manual/administration/install-on-linux/)

### Redis

- [官方文档](https://redis.io/)
- [安装地址](https://redis.io/download)

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

  uploadedFiles: {
    base: '/uploads/',
    dir: '/var/www/jiaoyutu/public/uploads',  // 静态资源上传存放地址，需可被 Nginx 代理访问
  },

  // MongoDB configs.
  mongodb: {
    host: '127.0.0.1',
    port: 27017,
    database: '数据库名称',
    user: '数据库账号',
    pass: '数据库密码',
  },

  // Redis configs.
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: '数据库密码',
  },

  sms: {

  },
}
```

#### 3. 运行 API 服务

```bash
npm run start # 启动运行 API 服务
npm run stop # 停止运行 API 服务
```

#### 4. 配置 Nginx 反向代理

1. 创建 `/var/www/jiaoyutu/public` 目录作为 Nginx 静态文件反向代理目录。
2. 配置 Nginx 接收请求转发到静态文件和 API 服务上

#### 5. 执行初始化数据库脚本

```bash
# 仅在第一次配置时执行
node scripts/init-admin.js 管理员用户名 管理员密码 ROOT
```

### 管理后台部署

```bash
# 1. 执行构建页面
npm run admin:build

# 2. 部署静态文件到 nginx 静态目录
cp -r ./app/public/admin/. /var/www/jiaoyutu/public/admin
```

## Nginx 反向代理配置

```nginx
upstream jiaoyutu_upstream {
  server 127.0.0.1:7001;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen 443 ssl;
  server_name   jiaoyutu.test.codesign.me;
  root  /var/www/jiaoyutu/public/;

  # logging
  access_log    /var/log/nginx/jiaoyutu/access.log;
  error_log     /var/log/nginx/jiaoyutu/error.log warn;

  # gzip
  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;

  ssl_certificate   "/etc/nginx/cert/jiaoyutu.test.codesign.me.pem";
  ssl_certificate_key  "/etc/nginx/cert/jiaoyutu.test.codesign.me.key";
  ssl_session_cache shared:SSL:1m;
  ssl_session_timeout  10m;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  client_max_body_size 50m;

  # assets
  location ~* ^.+\.(jpg|jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|pdf|txt|tar|wav|bmp|rtf|eot|woff|ttf|svg|css|js|flv|swf|html|htm)$ {
    access_log off;

    # Control “Expires” and “Cache-Control” header fields to implement browser caching.
    # You also can set to 24h, modified +24h, max, off.
    # If your assets is named with unique hash or something, maybe set to max is a good choice.
    # See more http://nginx.org/en/docs/http/ngx_http_headers_module.html.
    # expires 30d;

    try_files $uri $uri/ =404;
  }

  location /admin {
    try_files $uri $uri/index.html /admin/index.html;
  }

  location / {

    try_files $uri $uri/index.html /index.html @app;
  }

  # reverse proxy
  location @app {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Nginx-Proxy true;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;
    proxy_cache_bypass $http_upgrade;


    proxy_pass  http://jiaoyutu_upstream;
  }
}
```
