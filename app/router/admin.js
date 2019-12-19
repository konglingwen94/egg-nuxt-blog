module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace('/api', middleware.parameterValidator())

  /**
   *
   * admin
   */

  router.post(
    '/admin/auth/login',

    controller.admin.login
  )

  router.put(
    '/admin/accounts/:id/change-password',

    controller.admin.changePass
  )

  router.put(
    '/admin/accounts/:id',

    controller.admin.changeAccount
  )
}
