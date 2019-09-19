const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  if (!ctx.path.startsWith('/api/admin')) {
    return await next()
  }

  if (ctx.path === '/api/admin/auth/login') {
    return await next()
  }

  const { authorization } = ctx.headers
  const { secretKey, expiresIn } = security

  try {
    var data = jwt.verify(authorization, secretKey, {
      expiresIn,
    })
  } catch (error) {
    if (error.message === 'jwt expired') {
      return ctx.throw(401, '登陆已过期')
    }
    throw error
  }

  ctx.state.ownData = data
  await next()
}
