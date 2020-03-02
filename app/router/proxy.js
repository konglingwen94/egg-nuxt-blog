
module.exports = app => {
  const { proxyRouter, controller } = app

  proxyRouter.get('/weather', controller.proxy.fetchWeatherData)

  
}
