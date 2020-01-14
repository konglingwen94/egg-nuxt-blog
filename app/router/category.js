module.exports = app => {
  const { middleware, controller } = app

  const router = app.router.namespace(
    '/api',
    middleware.commonParameterValidator(),
    // app.router.allowedMethods()
    )
    
  /**
   * categories
   */
  router.get('/admin/categories', controller.category.queryList)

  router.get(
    '/admin/categories/:id',

    controller.category.queryOne
  )

  router.post('category', '/admin/categories', controller.category.createOne)

  router.patch(
    'category',
    '/admin/categories/:id',

    controller.category.updateOne
  )

  router.delete(
    'category',
    '/admin/categories/:id',

    controller.category.deleteOne
  )

  router.get('/categories', controller.category.queryList)

  router.get('/categories/:id', controller.category.queryOne)
  router.use(router.allowedMethods())

  // router.all('*', ctx => {
  //   ctx.status = 404
  //   return { message: 'NotFound' }
  // })
}
