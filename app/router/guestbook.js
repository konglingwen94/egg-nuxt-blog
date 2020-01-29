console.log(__filename)

module.exports = app => {
  const { controller, middleware } = app
  const router = app.ApiRouter

  /**
   * guestbooks
   *  */

  router.get('/admin/guestbook-messages', controller.guestbook.queryMessageList)
  router.get('/admin/guestbooks', controller.guestbook.queryGuestbookList)

  router.delete(
    'guestbook',
    '/admin/messages/:id',

    controller.guestbook.deleteOneMessage
  )

  router.delete(
    'guestbook',
    '/admin/guestbooks',

    controller.guestbook.deleteMany
  )

  router.post('/messages/:id/digg', controller.guestbook.diggGuestbook)

  router.post('/messages', controller.guestbook.createOne)  

  // 回复评论
  router.post(
    'guestbook',
    '/messages/:id/dialogues',
    controller.guestbook.responseToUser
  )

  router.get('/guestbook-messages', controller.guestbook.queryMessageList)
  router.get('/guestbooks', controller.guestbook.queryGuestbookList)
}
