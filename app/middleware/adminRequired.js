const jwt = require('jsonwebtoken')

module.exports = (option, app) => {
  return async (ctx, next) => {
    const { authorization } = ctx.headers
    const { secretKey, expiresIn } = ctx.app.config.adminSecret
    if (!authorization) {
      return ctx.throw(401, 'Unauthorized token')
    }
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

    ctx.state.adminInfo = data
    await next()
  }
}
