module.exports = (opts, app) => {
  return async (ctx, next) => {
    const data = await next()
    if (data) {
      const response = Array.isArray(data)
        ? data.map(ctx.helper.patchFieldForData)
        : ctx.helper.patchFieldForData(data)

      ctx.body = response
    }
  }
}
