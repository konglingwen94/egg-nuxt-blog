const _ = require('lodash')
const { Controller } = require('egg') 

class AboutController extends Controller {
  async getOne() {
    const { ctx, service, config } = this
    const result = await ctx.model.Aboutus.findOne()
    const isPublishedArticleCount = await ctx.model.Article.countDocuments({
      isPublished: true,
    })
    result.carousel.number = Math.min(
      result.carousel.number,
      isPublishedArticleCount
    )
    result._doc.carousel.isPublishedArticleCount = isPublishedArticleCount
    
    return result
  }
   
  async updateOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const payload = ctx.state.body

    const result = await ctx.model.Aboutus.findById(id)

    

     

    _.merge(result, payload)
    await result.save() 
    return { ok: 1, n: 1, nModified: 1 }
  }
   
}

module.exports = AboutController
