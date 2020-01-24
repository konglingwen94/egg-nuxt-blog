const { Document } = require('mongoose')

module.exports = (opts, app) => {
  return async (ctx, next) => {
    const data = await next()

    const response = (function recursion(data) {
      if (data instanceof Document) {
        return ctx.helper.patchFieldToData(data)
      }

      for (let key in data) {
        if (data[key] instanceof Document) {
          data[key] = ctx.helper.patchFieldToData(data[key])
        }
        if (typeof data[key] === 'object') {
          recursion(data[key])
        }
      }

      return data
    })(data)

    if (data && response) {
      return (ctx.body = response)
    }

    if (ctx._matchedRoute && ctx.matched.length && !data) {
      ctx.status = 204
    }
  }
}
