const Inflector = require('inflected')
module.exports = app => {
  const { mongoose, controller, middleware } = app
  const router = (app.ApiRouter = app.router.namespace(
    '/api',
    middleware.requestParameterValidator()
  ))

  app.router.param('id', async (id, ctx, next) => {
    ctx.validate({ id: { type: 'string', max: 24, min: 24 } }, { id })
    try {
      mongoose.Types.ObjectId(id)
    } catch (error) {
      throw error
    }

    const routerPathArr = ctx.routerPath.split('/')

    const moduleName = Inflector.singularize(
      routerPathArr[routerPathArr.indexOf(':id') - 1]
    )

    // console.log(__filename, moduleName) 
    const resultModel = ctx.model[_.upperFirst(moduleName)]

    if (!resultModel) {
      return next()
    }

    const result = await resultModel.findById(id)
    if (!result) {
      ctx.throw(404, `Invalid ObjectId("${id}")`)
    }

    return next()
  })

  /***
   *
   * aboutus
   */
  // router.put('aboutus', '/admin/aboutus/:id', controller.aboutus.overwriteOne)
  // router.post('aboutus', '/admin/aboutus', controller.aboutus.createOne)
  router.patch('aboutus', '/admin/aboutus/:id', controller.aboutus.updateOne)
  router.get('/admin/aboutus', controller.aboutus.getOne)

  router.get('/aboutus', controller.aboutus.getOne)
}
