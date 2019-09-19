const { ObjectId } = require('mongoose').Types

module.exports = {
  async queryList(ctx, next) {
    const filter = {}
    const { articleID } = ctx.params

    
    if (articleID) {
      filter.articleID = ObjectId(articleID)
    }
    
    ctx.state.filter = filter
    
    return await next()
  },
}
