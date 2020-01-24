console.log(__filename)

module.exports = app => {
  const { ApiRouter, controller } = app

  /**
   * api router
   *
   *  */

  /***
   *
   * upload
   */
  ApiRouter.post('/upload', controller.upload.uploadFile)
}
