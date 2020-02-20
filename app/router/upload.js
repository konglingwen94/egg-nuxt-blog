module.exports = app => {
  const {proxyRouter,controller} = app

  proxyRouter.post('/upload', controller.upload.uploadFile)
}
