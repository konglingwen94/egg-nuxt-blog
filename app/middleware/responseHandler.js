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

    if (ctx.method === 'DELETE' || ctx.method === 'PATCH') {
      ctx.body = {
        status: response.ok === 1 ? '成功' : '失败',
        message: `${
          ctx.method === 'DELETE'
            ? `删除${response.deletedCount}`
            : `更新${response.nModified}`
        }条数据`,
      }

      return
    }

    if (data && response) {
      ctx.body = response
    }

    // if (ctx._matchedRoute && ctx.matched.length && !data) {
    //   ctx.status = 204
    // }
  }
}
