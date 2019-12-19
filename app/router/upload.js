module.exports = app => {
  const { router, controller, middleware } = app

  /**
   * api router
   *
   *  */

  const apiRouter = router.namespace('/api', middleware.parameterValidator())

  /***
   *
   * upload
   */
  apiRouter.post('/upload', controller.upload.uploadFile)
}
