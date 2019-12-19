module.exports = app => {
 

  const { controller, middleware } = app


  const router = app.router.namespace('/api', middleware.parameterValidator())

  /***
   *
   * articles
   */

  router.post('article', '/admin/articles', controller.article.createOne)

  router.get('article', '/admin/articles', controller.article.queryList)

  router.get('article', '/admin/articles/:id', controller.article.queryOne)

  router.delete(
    '/admin/articles/:id',

    controller.article.deleteOne
  )

  router.post(
    '/admin/articles/delete',

    controller.article.delete
  )

  router.patch(
    'article',
    '/admin/articles/:id',

    controller.article.updateOne
  )
  router.patch(
    '/admin/articles/:id/status',

    controller.article.updatePublishStatus
  )

  router.get('/articles', controller.article.queryList)
  router.get('/articles/carousels', controller.article.queryCarouselList)
  router.get('/articles/suggestion', controller.article.querySuggestionList)

  router.get('/articles/:id', controller.article.queryOne)

  router.patch('/articles/:id/visit', controller.article.incrementPv)

  router.patch('/articles/:id/star', controller.article.starOne)
}
