
// Inflector.inflections('en', function(inflect) {
//   inflect.singular('aboutus', 'Aboutus')
// })

module.exports = app => {
  const { controller, middleware } = app
  const router=app.proxyRouter
  router.use(ctx=>{
    console.log(__filename,ctx.path)
  })

  /***
   *
   * aboutus
   */
  // router.put('aboutus', '/admin/aboutus/:id', controller.aboutus.overwriteOne)

  //网站配置
  router.patch(
    'siteConfig',
    '/admin/configuration-siteconfigs/:id',
    controller.configuration.updateOneSiteConfig
  )

  router.get(
    '/configuration-siteconfig',
    controller.configuration.queryOneSiteConfig
  )
  router.get(
    '/admin/configuration-siteconfig',
    controller.configuration.queryOneSiteConfig
  )
  // router.get('/admin/platform',controller.platform.queryOne)

  // 项目简介

  router.get(
    '/configuration-projectintro',
    controller.configuration.queryOneProjectIntro
  )
  router.get(
    '/admin/configuration-projectintro',
    controller.configuration.queryOneProjectIntro
  )
  router.patch(
    'projectIntro',
    '/admin/configuration-projectintros/:id',
    controller.configuration.updateOneProjectIntro
  )
}
