module.exports = app => {
  const { router, controller, middleware } = app
  console.log(controller.category.queryList)
  router.get('/api/admin/categories', controller.category.queryList)
  router.get('/api/admin/articles', controller.article.queryList)
}
