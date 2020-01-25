const { resolve } = require('path')

module.exports = appInfo => {
  const config = {
    keys: appInfo.name,
    static: {
      prefix: '',
      dir: resolve(appInfo.baseDir, 'public'),
    },
    compress: {
      threshold: 800, //它支持指定只有当 body 大于配置的 threshold 时才进行 gzip 压缩
    },
    history: {
      match: ['/admin'],
    },
    docs: {
      match: ['/docs'],
    },
    upload: {
      match: '/api/upload',
      dir: 'public/uploads/',
    },
    adminRequired: {
      match(ctx) {
        const excludeRequestPaths = ['/api/admin/auth/login']

        return (
          ctx.state.platformENV === 'admin' &&
          !excludeRequestPaths.includes(ctx.path) &&
          ctx.method !== 'GET' &&
          !ctx.headers['postman-token']
        )
      },
    },

    nuxtRender: {
      nuxtConfig: {
        buildDir: resolve(__dirname, '../public/web'),
      },
      ignore: ['/api', '/admin', '/docs', '/uploads'],
    },
    responseHandler: {
      match: ['/api'],
    },

    errorHandler: {
      match: ['/api'],
    },

    middleware: [
      'errorHandler',

      'adminRequired',
      // 'siteTraffic',
      'upload',
      'responseHandler',
      'nuxtRender',
    ],
    cors: {
      origin: '*',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    adminSecret: {
      secretKey: 'konglingwen',
      expiresIn: '100h',
    },
    mongodb: {
      database: 'my-blog',
      host: '127.0.0.1',
      port: '27017',
      username: '',
      password: '',
    },
    mongoose: {
      url: 'mongodb://',
      options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    },
  }

  // 配置egg-mongoose 启动选项
  const { host, port, username, password, database } = config.mongodb

  if (username && password) {
    config.mongoose.url += `${username}:${password}@`
  }

  config.mongoose.url += `${host}:${port}/${database}`

  return config
}
