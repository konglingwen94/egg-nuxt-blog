module.exports = app => {
  const { router, controller, middleware } = app
  const adminRequired = middleware.adminRequired()
  
  router.prefix('/api')
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
    adminRequired,
    controller.admin.changePass
  )

  router.patch(
    '/admin/auth/change-account',
    adminRequired,

    controller.admin.changeAccount
  )

  /**
   * categories
   */
  router.get('/admin/categories', adminRequired, controller.category.queryList)

  router.get(
    '/admin/categories/:id',
    adminRequired,
    controller.category.queryOne
  )

  router.post('/admin/categories', adminRequired, controller.category.createOne)

  router.patch(
    '/admin/categories/:id',
    adminRequired,
    controller.category.updateOne
  )

  router.delete(
    '/admin/categories/:id',
    adminRequired,
    controller.category.deleteOne
  )

  router.get('/categories', controller.category.queryList)

  router.get('/categories/:id', controller.category.queryOne)
  /***
   *
   * articles
   */

  router.post('/admin/articles', adminRequired, controller.article.createOne)

  router.get('/admin/articles', adminRequired, controller.article.queryList)

  router.get('/admin/articles/:id', adminRequired, controller.article.queryOne)

  router.delete(
    '/admin/articles/:id',
    adminRequired,
    controller.article.deleteOne
  )

  router.post(
    '/admin/articles/delete',
    adminRequired,
    controller.article.delete
  )

  router.patch(
    '/admin/articles/:id',
    adminRequired,
    controller.article.updateOne
  )
  router.patch(
    '/admin/articles/:id/status',
    adminRequired,
    controller.article.updatePublishStatus
  )

  router.get('/articles', controller.article.queryList)

  router.get('/articles/suggestion', controller.article.querySuggestionList)

  router.get(
    '/categories/:id/articles',
    controller.article.queryListByCategoryId
  )
  router.get('/articles/:id', controller.article.queryOne)

  router.put('/articles/:id/visit', controller.article.incrementPv)

  router.patch('/articles/:id/star', controller.article.starOne)

  /**
   * tags
   *  */
  router.get('/admin/tags', adminRequired, controller.tag.queryList)
  router.post('/admin/tags', adminRequired, controller.tag.createOne)
  router.put('/admin/tags/:id', adminRequired, controller.tag.updateOne)
  router.delete('/admin/tags/:id', adminRequired, controller.tag.deleteOne)

  router.get('/tags', controller.tag.queryList)
  /**
   * comments
   */

  router.get('/admin/comments', adminRequired, controller.comment.queryList)

  router.delete(
    '/admin/comments/:id',
    adminRequired,
    controller.comment.deleteOne
  )

  router.post('/admin/comments', adminRequired, controller.comment.deleteList)

  router.get(
    '/admin/articles/:articleID/comments',

    adminRequired,
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

  router.get('/admin/guestbooks', adminRequired, controller.guestbook.queryList)
  router.delete(
    '/admin/guestbooks/:id',
    adminRequired,
    controller.guestbook.deleteOne
  )
  router.delete(
    '/admin/guestbooks/:id/dialogues/:responseID',
    adminRequired,
    controller.guestbook.deleteOneResponse
  )

  router.delete(
    '/admin/guestbooks',
    adminRequired,
    controller.guestbook.deleteMany
  )
  router.delete(
    '/admin/responses',
    adminRequired,
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
