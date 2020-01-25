
module.exports = app => {
  const { router, controller } = app
  app.ApiRouter.post('/upload', controller.other.uploadFile)

  router.get('/api/weather', controller.other.fetchWeatherData)

  router.get('/api/location-city', controller.other.fetchLocationCity)
}
