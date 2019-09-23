const { ObjectId } = require('mongoose').Types
module.exports = (opt, app) => {
  return async (ctx, next) => {
    const { tagID, categoryID } = ctx.query
    
    let filter = ctx.state.filter || {}

    if (tagID) {
      filter.$and.push({
        tagIdList: ObjectId(tagID),
      })
    } else if (categoryID) {
      filter.$and.push({
        categoryID: ObjectId(categoryID),
      })
    }

    ctx.state.filter = filter
    await next()
  }
}
