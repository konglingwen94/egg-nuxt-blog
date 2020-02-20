
module.exports = app => {
  const { proxyRouter, controller } = app

  proxyRouter.get('/api/weather', controller.proxy.fetchWeatherData)

  proxyRouter.get('/api/location-city', controller.proxy.fetchLocationCity)
}
