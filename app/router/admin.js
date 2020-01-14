module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace(
    '/api',
     
  )

  /**
   *
   * admin
   */

  router.post(
    'admin',
    '/admin/auth/login',

    controller.admin.login
  )

  router.patch(
    '/admin/accounts/:id/change-password',

    controller.admin.changePass
  )

  router.patch(
    'admin',
    '/admin/accounts/:id',

    controller.admin.changeAccount
  )
}
