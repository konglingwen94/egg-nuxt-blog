module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace('/api', middleware.parameterValidator())

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
    '/admin/guestbooks/:id/dialogues',

    controller.guestbook.deleteManyResponse
  )

  router.patch(
    '/guestbooks/:id/dialogues/:responseID/digg',
    controller.guestbook.diggOneResponse
  )

  router.post('/guestbooks/:id/digg', controller.guestbook.diggGuestbook)

  router.post('/guestbooks', controller.guestbook.createOne)

  // 回复评论
  router.post('/guestbooks/:id/dialogues', controller.guestbook.responseToUser)

  router.get('/guestbooks', controller.guestbook.queryList)
}
