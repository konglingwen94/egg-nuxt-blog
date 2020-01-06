module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace(
    '/api',
    middleware.commonParameterValidator()
  )

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
