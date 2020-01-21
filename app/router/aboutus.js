module.exports = app => {
  

  const { controller, middleware } = app
  const router = (app.ApiRouter = app.router.namespace(
    '/api',
    middleware.requestParameterValidator()
  ))


  app.router.param('id', async (id, ctx, next) => {
    ctx.validate({ id: { type: 'string', max: 24, min: 24 } }, { id })

    if (!ctx.routerName) {
      return next()
    }

    const result = await ctx.model[_.upperFirst(ctx.routerName)].findById(id)

    if (!result) {
      ctx.throw(404, `Invalid ObjectId("${id}")`)
    }

    return next()
  })

  /***
   *
   * aboutus
   */
  router.put('aboutus', '/admin/aboutus/:id', controller.aboutus.overwriteOne)
  router.post('aboutus', '/admin/aboutus', controller.aboutus.createOne)
  router.patch('aboutus', '/admin/aboutus/:id', controller.aboutus.updateOne)
  router.get('/admin/aboutus', controller.aboutus.getOne)

  router.get('/aboutus', controller.aboutus.getOne)
}
