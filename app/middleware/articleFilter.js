const { ObjectId } = require('mongoose').Types
module.exports = (opt, app) => {
  return async (ctx, next) => {
    const { logger } = app
    const { tagID, category } = ctx.query

    let filter = ctx.state.filter || { $and: [] }
    if (tagID) {
      filter.$and.push({
        tagIdList: ObjectId(tagID),
      })
    } else if (category) {
      filter.$and.push({
        category: ObjectId(category),
      })
    }

    ctx.state.filter = filter
     
    await next()
  }
}
