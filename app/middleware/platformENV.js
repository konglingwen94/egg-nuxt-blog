module.exports = opt => {
  return async (ctx, next) => {
    if (ctx.path.startsWith('/api/admin')) {
      ctx.state.platformENV = 'admin'
    } else {
      ctx.state.platformENV = 'web'
    }

    await next()
  }
}
