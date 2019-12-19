module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace('/api', middleware.parameterValidator())

  /**
   * tags
   *  */
  router.get('/admin/tags', controller.tag.queryList)
  router.post('/admin/tags', controller.tag.createOne)
  router.put('/admin/tags/:id', controller.tag.updateOne)
  router.delete('/admin/tags/:id', controller.tag.deleteOne)

  router.get('/tags', controller.tag.queryList)
}
