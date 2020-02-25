
module.exports = app => {
  const { proxyRouter, controller } = app

  proxyRouter.get('/weather', controller.proxy.fetchWeatherData)

  proxyRouter.get('/location-city', controller.proxy.fetchLocationCity)
}
