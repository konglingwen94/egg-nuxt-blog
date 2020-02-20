const Inflector = require('inflected')
// global.Inflector = Inflector

module.exports = app => {
  const { controller, middleware,mongoose  } = app
  const router = (app.proxyRouter = app.router.namespace(
    '/api',
    middleware.requestParameterValidator()
  ))

  router.param('id', async (id, ctx, next) => {
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

    ctx.state.targetModel=targetModel
    const result = await targetModel.findById(id)
    if (!result) {
      ctx.throw(404, `Invalid ObjectId("${id}")`)
    }

    return next()
  })

  /**
   *
   * admin
   */

  router.post(
    'account',
    '/admin/auth/login',

    controller.account.login
  )

  router.patch(
    'account',
    '/admin/accounts/:id/change-password',

    controller.account.changePass
  )

  router.patch(
    'account',
    '/admin/accounts/:id',

    controller.account.changeAccount
  )
}
