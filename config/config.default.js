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
    match: '/api/admin',
  },
  middleware: ['errorHandler', 'adminRequired', 'upload'],
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
