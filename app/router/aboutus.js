const Inflector = require('inflected')

Inflector.inflections('en', function(inflect) {
  inflect.singular('aboutus', 'Aboutus')
})

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

    const moduleName = Inflector.classify(
      routerPathArr[routerPathArr.indexOf(':id') - 1]
    )

    const resultModel = mongoose.models[moduleName]

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

router.patch('platform','/admin/platforms/:id',controller.platform.updateOne)
router.get('/admin/platform',controller.platform.queryOne)

  router.get('/aboutus', controller.aboutus.getOne)
}
