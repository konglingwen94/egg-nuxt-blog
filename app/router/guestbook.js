console.log(__filename)


module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace(
    '/api',
     
  )

  /**
   * guestbooks
   *  */

  router.get('/admin/guestbooks', controller.guestbook.queryList)

  router.delete(
    'guestbook',
    '/admin/guestbooks/:id',

    controller.guestbook.deleteOne
  )

  router.delete(
    'guestbook',
    '/admin/guestbooks',

    controller.guestbook.deleteMany
  )

  router.post('/guestbooks/:id/digg', controller.guestbook.diggGuestbook)

  router.post('/guestbooks', controller.guestbook.createOne)

  // 回复评论
  router.post(
    'guestbook',
    '/guestbooks/:id/dialogues',
    controller.guestbook.responseToUser
  )

  router.get('/guestbooks', controller.guestbook.queryList)
}
