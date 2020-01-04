module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace(
    '/api',
    middleware.commonParameterValidator()
  )

  /***
   *
   * about
   */
  router.post('/admin/abouts', controller.about.createOne)
  router.put('/admin/abouts/:id', controller.about.updateOne)
  router.get('/admin/about', controller.about.getOne)
  router.delete('/admin/abouts/:id', controller.about.deleteOne)

  router.get('/about', controller.about.getOne)
}
