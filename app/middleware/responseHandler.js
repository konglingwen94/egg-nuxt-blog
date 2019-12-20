module.exports = (opts, app) => {
  return async (ctx, next) => {
    const data = await next()

    const response = Array.isArray(data)
      ? data.map(ctx.helper.patchFieldForData)
      : ctx.helper.patchFieldForData(data)

    ctx.body = response
  }
}
