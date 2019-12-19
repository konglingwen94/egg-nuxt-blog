module.exports = app => {
  const { middleware, controller } = app
  const router = app.router.namespace('/api', middleware.parameterValidator())

  /**
   * categories
   */
  router.get('/admin/categories', controller.category.queryList)

  router.get(
    '/admin/categories/:id',

    controller.category.queryOne
  )

  router.post('/admin/categories', controller.category.createOne)

  router.patch(
    '/admin/categories/:id',

    controller.category.updateOne
  )

  router.delete(
    '/admin/categories/:id',

    controller.category.deleteOne
  )

  router.get('/categories', controller.category.queryList)

  router.get('/categories/:id', controller.category.queryOne)
}
