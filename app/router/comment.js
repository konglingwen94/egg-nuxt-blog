module.exprots = app => {
  const { controller, middleware } = app
  const router = app.router.namespace('/api', middleware.parameterValidator())
  /**
   * comments
   */

  router.get('/admin/comments', controller.comment.queryList)

  router.delete(
    '/admin/comments/:id',

    controller.comment.deleteOne
  )

  router.post('comment', '/admin/comments', controller.comment.deleteList)

  router.get(
    '/admin/articles/:articleID/comments',

    controller.comment.queryList
  )

  router.get(
    '/articles/:articleID/comments',

    controller.comment.queryList
  )
  router.post('comment', '/articles/:id/comments', controller.comment.createOne)

  router.patch('/comments/:id/thumbup', controller.comment.thumbup)
}
