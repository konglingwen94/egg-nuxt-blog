
module.exports = app => {
  const {
    controller,

    mongoose: { models },
  } = app

  const router = app.router.namespace('/api')

  router.param('id', async (id, ctx, next) => {
    ctx.validate({ id: { type: 'string', max: 24, min: 24 } }, { id })
    const result = models.Article.findById(id)
    if (!(await result)) {
      ctx.throw('400', 'Invalid Fields', {
        errors: {
          id: { kind: 'urlParam', url: ctx.path, value: id, code: 404 },
        },
      })
    }

    ctx.state.queryArticle = result
    // console.log(id)
    return  next()
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
