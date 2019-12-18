const { resolve } = require('path')

module.exports = appInfo => {
  return {
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
        if (
          ctx.path.startsWith('/api/admin') &&
          ctx.path !== '/api/admin/auth/login'
        ) {
          return true
        } else {
          return false
        }
      },
    },

    webArticleFilter: {
      match: '/api/articles',
    },
    articleFilter: {
      match: ['/api/articles'],
    },
    nuxtRender: {
      nuxtConfig: {
        buildDir: resolve(__dirname, '../public/web'),
      },
      ignore: ['/api', '/admin', '/docs'],
    },
    responseHandler: {
      match: ['/api'],
    },
    errorHandler: {
      match: ['/api'],
    },
    parameterValidator: {
      methods: ['POST', 'PUT', 'PATCH'],
      
    },
    middleware: [
      'errorHandler',
      'siteTraffic',
      'adminRequired',
      'upload',
      
      'webArticleFilter',
      'articleFilter',
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
  }
}
