module.exports = app => {
  const { router, controller } = app

  /**
   * api router
   *
   *  */

  const apiRouter = router.namespace('/api')
  /***
   *
   * upload
   */
  apiRouter.post('/upload', controller.upload.uploadFile)

  /***
   *
   * about
   */
  apiRouter.post('/admin/abouts', controller.about.createOne)
  apiRouter.put('/admin/abouts/:id', controller.about.updateOne)
  apiRouter.get('/admin/about', controller.about.getOne)
  apiRouter.delete('/admin/abouts/:id', controller.about.deleteOne)

  apiRouter.get('/about', controller.about.getOne)
  /**
   *
   * admin
   */

  apiRouter.post(
    '/admin/auth/login',

    controller.admin.login
  )

  apiRouter.put(
    '/admin/accounts/:id/change-password',

    controller.admin.changePass
  )

  apiRouter.put(
    '/admin/accounts/:id',

    controller.admin.changeAccount
  )

  /**
   * categories
   */
  apiRouter.get('/admin/categories', controller.category.queryList)

  apiRouter.get(
    '/admin/categories/:id',

    controller.category.queryOne
  )

  apiRouter.post('/admin/categories', controller.category.createOne)

  apiRouter.patch(
    '/admin/categories/:id',

    controller.category.updateOne
  )

  apiRouter.delete(
    '/admin/categories/:id',

    controller.category.deleteOne
  )

  apiRouter.get('/categories', controller.category.queryList)

  apiRouter.get('/categories/:id', controller.category.queryOne)
  /***
   *
   * articles
   */

  apiRouter.post('/admin/articles', controller.article.createOne)

  apiRouter.get('/admin/articles', controller.article.queryList)

  apiRouter.get('/admin/articles/:id', controller.article.queryOne)

  apiRouter.delete(
    '/admin/articles/:id',

    controller.article.deleteOne
  )

  apiRouter.post(
    '/admin/articles/delete',

    controller.article.delete
  )

  apiRouter.patch(
    '/admin/articles/:id',

    controller.article.updateOne
  )
  apiRouter.patch(
    '/admin/articles/:id/status',

    controller.article.updatePublishStatus
  )

  apiRouter.get('/articles/carousels', controller.article.queryCarouselList)
  apiRouter.get('/articles', controller.article.queryList)

  apiRouter.get('/articles/suggestion', controller.article.querySuggestionList)

  apiRouter.get('/articles/:id', controller.article.queryOne)

  apiRouter.put('/articles/:id/visit', controller.article.incrementPv)

  apiRouter.patch('/articles/:id/star', controller.article.starOne)

  /**
   * tags
   *  */
  apiRouter.get('/admin/tags', controller.tag.queryList)
  apiRouter.post('/admin/tags', controller.tag.createOne)
  apiRouter.put('/admin/tags/:id', controller.tag.updateOne)
  apiRouter.delete('/admin/tags/:id', controller.tag.deleteOne)

  apiRouter.get('/tags', controller.tag.queryList)
  /**
   * comments
   */

  apiRouter.get('/admin/comments', controller.comment.queryList)

  apiRouter.delete(
    '/admin/comments/:id',

    controller.comment.deleteOne
  )

  apiRouter.post('/admin/comments', controller.comment.deleteList)

  apiRouter.get(
    '/admin/articles/:articleID/comments',

    controller.comment.queryList
  )

  apiRouter.get(
    '/articles/:articleID/comments',

    controller.comment.queryList
  )
  apiRouter.post('/articles/:articleID/comments', controller.comment.createOne)

  apiRouter.patch('/comments/:id/thumbup', controller.comment.thumbup)

  /**
   * guestbooks
   *  */

  apiRouter.get('/admin/guestbooks', controller.guestbook.queryList)
  apiRouter.delete(
    '/admin/guestbooks/:id',

    controller.guestbook.deleteOne
  )
  apiRouter.delete(
    '/admin/guestbooks/:id/dialogues/:responseID',

    controller.guestbook.deleteOneResponse
  )

  apiRouter.delete(
    '/admin/guestbooks',

    controller.guestbook.deleteMany
  )
  apiRouter.delete(
    '/admin/guestbooks/:id/dialogues',

    controller.guestbook.deleteManyResponse
  )

  apiRouter.patch(
    '/guestbooks/:id/dialogues/:responseID/digg',
    controller.guestbook.diggOneResponse
  )

  apiRouter.post('/guestbooks/:id/digg', controller.guestbook.diggGuestbook)

  apiRouter.post('/guestbooks', controller.guestbook.createOne)

  // 回复评论
  apiRouter.post(
    '/guestbooks/:id/dialogues',
    controller.guestbook.responseToUser
  )

  apiRouter.get('/guestbooks', controller.guestbook.queryList)
}
