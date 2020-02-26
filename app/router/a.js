const Inflector = require('inflected')

module.exports = app => {
  const { router,middleware,mongoose } = app

 
  app.proxyRouter = app.router.namespace(
    '/api',
    middleware.requestParameterValidator()
  )



  app.proxyRouter.param('id', async (id, ctx, next) => {
    ctx.validate({ id: 'objectId' }, { id })
  

    const routerPaths = ctx.routerPath.split('/')

    const modelName = Inflector.classify(
      routerPaths[routerPaths.indexOf(':id') - 1]
    )

    const targetModel = mongoose.models[modelName]

    if (!targetModel) {
      return next()
    }

    // ctx.state.targetModel = targetModel
    const result = await targetModel.findById(id)
    if (!result) {
      ctx.throw(404, `Invalid ObjectId("${id}")`)
    }

    return next()
  })

  return app.proxyRouter
}
