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
  router.put('about', '/admin/abouts/:id', controller.about.overwriteOne)
  router.post('about', '/admin/abouts', controller.about.createOne)
  router.patch('about', '/admin/abouts/:id', controller.about.updateOne)
  router.get('/admin/about', controller.about.getOne)

  router.get('/about', controller.about.getOne)
}
