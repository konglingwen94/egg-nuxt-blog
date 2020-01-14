
module.exports = (opt, app) => {
  return async (ctx, next) => {
    try {
       await next()
       
    } catch (error) {
      console.error(error)
      // console.dir(error)

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
