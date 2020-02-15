 

module.exports = app => {
  const { controller, middleware } = app
  const router = app.ApiRouter

  /**
   * messages
   *  */

  router.get('/admin/messages', controller.message.queryList)

  router.delete(
    'message',
    '/admin/messages/:id',

    controller.message.deleteOneMessage
  )

  router.delete(
    'message',
    '/admin/messages',

    controller.message.deleteMany
  )

  router.post('/messages/:id/digg', controller.message.diggGuestbook)

  router.post('/messages', controller.message.createOne)  

  // 回复评论
  router.post(
    'message',
    '/messages/:id/dialogues',
    controller.message.responseToUser
  )

  router.get('/messages', controller.message.queryList)
}
