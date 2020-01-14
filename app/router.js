module.exports = app => {
  app.router.use((ctx, next) => {
    console.log(__filename, ctx.path)
    next()
  })
}
