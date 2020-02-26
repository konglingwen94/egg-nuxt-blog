module.exports = app => {
  const {proxyRouter,controller} = app

  proxyRouter.post('/upload', controller.upload.uploadFile)

  proxyRouter.delete('/uploads/:filename',controller.upload.deleteFile)
}
