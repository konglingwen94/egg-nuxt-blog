const _ = require('lodash')

module.exports = app => {
  const { controller, middleware } = app

  const router = app.router.namespace('/api', async (ctx, next) => {
    const { id } = ctx.params
console.log(__filename,ctx.params)

    if (id) {
      ctx.validate({ id: { type: 'string', max: 24, min: 24 } }, { id })

      const result = await ctx.model.Article.findById(id)

      if (!result) {
        ctx.throw(404, `无效的ID`, { path: ctx.path, field: 'id', value: id })
      }
    }

    if (ctx.method === 'POST' && ctx.method === 'PATCH') {
      const validationSchema = _.cloneDeep(ctx.validationRule.article)
      if (ctx.method === 'PATCH') {
        for (let key in validationSchema) {
          validationSchema[key].required = false
        }
      }

      ctx.validate(validationSchema, ctx.request.body)

      ctx.state.body = _.pick(payload, [
        'title',
        'categoryID',
        'tagIdList',
        'content',
        'cover',
        'isPublished',
      ])
    }
    return await next()
  })

  /***
   *
   * articles
   */

  router.post('article', '/admin/articles', controller.article.createOne)

  router.get('article', '/admin/articles', controller.article.queryList)

  router.get('article', '/admin/articles/:id', controller.article.queryOne)

  router.delete('article', '/admin/articles', controller.article.deleteMany)

  router.delete(
    '/admin/articles/:id',

    controller.article.deleteOne
  )

  router.patch(
    'article',
    '/admin/articles/:id',

    controller.article.updateOne
  )
  router.patch(
    '/admin/articles/:id/status',

    controller.article.updatePublishStatus
  )

  router.get('/articles', controller.article.queryList)

  router.get('/ownertags-articles', controller.article.queryOwnerTagsList)
  router.get(
    '/ownercategories-articles',
    controller.article.queryOwnerCategoriesList
  )

  router.get('/article-carousels', controller.article.queryCarouselList)
  router.get('/articles/:id/suggestion', controller.article.querySuggestionList)

  router.get('/articles/:id', controller.article.queryOne)

  router.patch('/articles/:id/visit', controller.article.incrementPv)

  router.patch('/articles/:id/star', controller.article.starOne)
}
