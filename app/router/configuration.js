
// Inflector.inflections('en', function(inflect) {
//   inflect.singular('aboutus', 'Aboutus')
// })

module.exports = app => {
  const { controller, middleware } = app
  const router=app.proxyRouter

  /***
   *
   * aboutus
   */
  // router.put('aboutus', '/admin/aboutus/:id', controller.aboutus.overwriteOne)

  //网站配置
  router.patch(
    'siteConfig',
    '/admin/configuration/siteConfigs/:id',
    controller.configuration.updateOneSiteConfig
  )

  router.get(
    '/configuration/siteConfig',
    controller.configuration.queryOneSiteConfig
  )
  router.get(
    '/admin/configuration/siteConfig',
    controller.configuration.queryOneSiteConfig
  )
  // router.get('/admin/platform',controller.platform.queryOne)

  // 项目简介

  router.get(
    '/configuration/projectIntro',
    controller.configuration.queryOneProjectIntro
  )
  router.get(
    '/admin/configuration/projectIntro',
    controller.configuration.queryOneProjectIntro
  )
  router.patch(
    'projectIntro',
    '/admin/configuration/projectIntros/:id',
    controller.configuration.updateOneProjectIntro
  )
}
