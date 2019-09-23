module.exports = app => {
  const { router, controller, middleware } = app

  router.prefix('/api')

  /***
   *
   * upload
   */
  router.post('/upload', controller.upload.uploadFile)

  /**
   *
   * auth
   */

  router.post(
    '/admin/auth/login',

    controller.admin.login
  )

  router.patch(
    '/admin/auth/change-password',

    controller.admin.changePass
  )

  router.patch(
    '/admin/auth/change-account',

    controller.admin.changeAccount
  )

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
  /***
   *
   * articles
   */

  router.post('/admin/articles', controller.article.createOne)

  router.get('/admin/articles', controller.article.queryList)

  router.get('/admin/articles/:id', controller.article.queryOne)

  router.delete(
    '/admin/articles/:id',

    controller.article.deleteOne
  )

  router.post(
    '/admin/articles/delete',

    controller.article.delete
  )

  router.patch(
    '/admin/articles/:id',

    controller.article.updateOne
  )
  router.patch(
    '/admin/articles/:id/status',

    controller.article.updatePublishStatus
  )

  router.get('/articles', controller.article.queryList)

  router.get('/articles/suggestion', controller.article.querySuggestionList)

  
  router.get('/articles/:id', controller.article.queryOne)

  router.put('/articles/:id/visit', controller.article.incrementPv)

  router.patch('/articles/:id/star', controller.article.starOne)

  /**
   * tags
   *  */
  router.get('/admin/tags', controller.tag.queryList)
  router.post('/admin/tags', controller.tag.createOne)
  router.put('/admin/tags/:id', controller.tag.updateOne)
  router.delete('/admin/tags/:id', controller.tag.deleteOne)

  router.get('/tags', controller.tag.queryList)
  /**
   * comments
   */

  router.get('/admin/comments', controller.comment.queryList)

  router.delete(
    '/admin/comments/:id',

    controller.comment.deleteOne
  )

  router.post('/admin/comments', controller.comment.deleteList)

  router.get(
    '/admin/articles/:articleID/comments',

    controller.comment.queryList
  )

  router.get(
    '/articles/:articleID/comments',

    controller.comment.queryList
  )
  router.post('/articles/:articleID/comments', controller.comment.createOne)

  router.post('/comments/:id/like', controller.comment.thumbup)

  /**
   * guestbooks
   *  */

  router.get('/admin/guestbooks', controller.guestbook.queryList)
  router.delete(
    '/admin/guestbooks/:id',

    controller.guestbook.deleteOne
  )
  router.delete(
    '/admin/guestbooks/:id/dialogues/:responseID',

    controller.guestbook.deleteOneResponse
  )

  router.delete(
    '/admin/guestbooks',

    controller.guestbook.deleteMany
  )
  router.delete(
    '/admin/responses',

    controller.guestbook.deleteManyResponse
  )

  router.post(
    '/guestbooks/:id/responses/:responseID/digg',
    controller.guestbook.diggOneResponse
  )

  router.post('/guestbooks/:id/digg', controller.guestbook.diggGuestbook)

  router.post('/guestbooks', controller.guestbook.createOne)

  // 回复评论
  router.post('/guestbooks/:id/dialogues', controller.guestbook.responseToUser)

  router.get('/guestbooks', controller.guestbook.queryList)
}
