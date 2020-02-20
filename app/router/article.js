
module.exports = app => {
  const { controller, middleware } = app

  const router = app.proxyRouter

  /***
   *
   *
   *
   * articles
   */

  router.post(
    'article',
    '/admin/articles',

    controller.article.createOne
  )

  router.get(
    'article',
    '/admin/articles',
    controller.article.queryListByOptions
  )

  router.get('article', '/admin/articles/:id', controller.article.queryOne)

  router.delete('article', '/admin/articles', controller.article.deleteMany)

  router.delete(
    'article',
    '/admin/articles/:id',

    controller.article.deleteOne
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

  router.get('/articles', controller.article.queryListByOptions)

  router.get('/articles/:id/suggestion', controller.article.querySuggestionList)

  router.get('/articles/:id', controller.article.queryOne)

  router.patch('/articles/:id/visit', controller.article.incrementPv)

  router.patch('/articles/:id/star', controller.article.starOne)
}
