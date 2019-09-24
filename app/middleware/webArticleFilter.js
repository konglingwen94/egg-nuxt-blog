module.exports = (opt, app) => {
  return async (ctx, next) => {
    ctx.state.filter = {
      $and: [{ isPublished: true }],
    }

    await next()
  }
}
