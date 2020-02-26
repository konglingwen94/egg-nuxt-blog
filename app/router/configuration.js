module.exports = app => {
  const { controller, middleware } = app
  const router = app.proxyRouter

  router.get(
    '/admin/configurations',
    controller.configuration.queryConfigurations
  )
  router.get('/configurations', controller.configuration.queryConfigurations)

  router.patch(
    'configuration.siteConfig',
    '/admin/configurations/:id/site-config',
    controller.configuration.updateSiteConfig
  )
  router.patch(
    'configuration.projectIntro',
    '/admin/configurations/:id/project-intro',
    controller.configuration.updateProjectIntro
  )
  router.patch(
    'configuration.profile',
    '/admin/configurations/:id/profile',
    controller.configuration.updateProfile
  )
}
