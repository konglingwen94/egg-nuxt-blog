const consola = require('consola')

module.exports = (opt,app) => {
  return async (ctx, next) => {
    
    try {
      await next()
    } catch (error) {
      consola.error({
        message: error,
        badge: true,
      })

      const response = {
        message: error.message || 'Internal Server Error',
      }
      if (error.errors) {
        response.errors = error.errors
      }
      ctx.status = error.status || 500
      ctx.body = response
    }
  }
}
