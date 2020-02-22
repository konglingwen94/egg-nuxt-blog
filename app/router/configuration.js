// Inflector.inflections('en', function(inflect) {
//   inflect.singular('aboutus', 'Aboutus')
// })
const Inflector = require('inflected')
module.exports = app => {
  const { controller, middleware } = app
  const router = app.router.namespace(
    '/api',
    middleware.requestParameterValidator(),
    async (ctx, next) => {
      
      let matchPath = ctx.path
        .match(/\/configuration-\w+\/?/)[0]
        .split('-')
        .pop()
        .replace('/', '')
     
      ctx.state.configurationModelName = Inflector.classify(matchPath)
      
      return next()
    }
  )
  

  //网站配置
  router.patch(
    'siteConfig',
    '/admin/configuration-siteconfigs/:id',
    controller.configuration.updateOneConfiguration
  )

  router.get(
    '/configuration-siteconfig',
    controller.configuration.queryOneConfiguration
  )
  router.get(
    '/admin/configuration-siteconfig',
    controller.configuration.queryOneConfiguration
  )
  // router.get('/admin/platform',controller.platform.queryOne)

  // 项目简介

  router.get(
    '/configuration-projectintro',
    controller.configuration.queryOneConfiguration
  )
  router.get(
    '/admin/configuration-projectintro',
    controller.configuration.queryOneConfiguration
  )
  router.patch(
    'projectIntro',
    '/admin/configuration-projectintros/:id',
    controller.configuration.updateOneConfiguration
  )

  // 个人简介 Profile

  router.get(
    '/configuration-profile',
    controller.configuration.queryOneConfiguration
  )
  router.get(
    '/admin/configuration-profile',
    controller.configuration.queryOneConfiguration
  )
  router.patch(
    'profile',
    '/admin/configuration-profiles/:id',
    controller.configuration.updateOneConfiguration
  )
}
