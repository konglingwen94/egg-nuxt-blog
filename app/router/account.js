module.exports = app => {
  const { controller, middleware } = app
  const router = app.proxyRouter

  /**
   *
   * admin
   */

  router.post(
    'account',
    '/admin/auth/login',

    controller.account.login
  )

  router.patch(
    'account',
    '/admin/accounts/:id/change-password',

    controller.account.changePass
  )

  router.patch(
    'account',
    '/admin/accounts/:id',

    controller.account.changeAccount
  )
}
