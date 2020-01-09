module.exports = opt => {
  return async (ctx, next) => {
    if (ctx.path.startsWith('/api/admin')) {
      ctx.state.platformENV = 'admin'
    } else if (ctx.path.startsWith('/api')) {
      ctx.state.platformENV = 'web'
    }

    return await next()
  }
}
