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

    const routerPaths = ctx.routerPath.split('/')

    const modelName = Inflector.classify(
      routerPaths[routerPaths.indexOf(':id') - 1]
    )

    const targetModel = mongoose.models[modelName]

    if (!targetModel) {
      return next()
    }

    const result = await targetModel.findById(id)
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


  //平台配置信息
router.patch('platform','/admin/platforms/:id',controller.platform.updateOne)

router.get('/platform',controller.platform.queryOne)
router.get('/admin/platform',controller.platform.queryOne)

// 网站简介

router.get('/siteintro',controller.siteintro.queryOne)
router.get('/admin/siteintro',controller.siteintro.queryOne)
router.patch('/admin/siteintro/:id',controller.siteintro.updateOne)

}
