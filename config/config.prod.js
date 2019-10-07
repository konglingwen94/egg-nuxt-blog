const { resolve } = require('path')

module.exports = appInfo => {
  return {
    logger: {
      dir: resolve(appInfo.baseDir, `logs/${appInfo.name}`),
    },
    keys: appInfo.name,
    static: {
      prefix: '',
      dir: resolve(appInfo.baseDir, 'public'),
    },
    upload: {
      match: '/api/upload',
      dir: '/public/uploads/',
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
      database: 'egg-nuxt-blog',
      host: '172.17.0.4',
      port: '27017',
      username: 'konglingwen',
      password: 'klw3402926',
    },
  }
}
