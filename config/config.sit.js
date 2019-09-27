module.exports = {
  keys: 'my-blog',
  static: {
    prefix: '/',
  },
  upload: {
    match: '/api/upload',
    dir: 'app/public/uploads/',
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
  siteTraffic: {
    match(ctx) {
      console.log(ctx.type)
      if (ctx.type === 'text/html') {
        return true
      }
      return true
    },
  },
  webArticleFilter: {
    match: '/api/articles',
  },
  nuxtRender: {
    ignore: ['/api'],
  },
  middleware: [
    'errorHandler',
    'siteTraffic',
    'adminRequired',
    'upload',
    'webArticleFilter',
    'articleFilter',
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
