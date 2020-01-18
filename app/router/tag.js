console.log(__filename)



module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace(
    '/api',
    // middleware.commonParameterValidator()
  )

  /**
   * tags
   *  */
  router.get('tag','/admin/tags', controller.tag.queryList)
  router.post('tag', '/admin/tags', controller.tag.createOne)
  router.patch('tag', '/admin/tags/:id', controller.tag.updateOne)
  router.delete('/admin/tags/:id', controller.tag.deleteOne)

  router.get('/tags/:id', controller.tag.queryOne)
  router.get('/tags', controller.tag.queryList)
}
