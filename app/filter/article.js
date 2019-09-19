const { Types } = require('mongoose')
const { ObjectId } = Types

module.exports = {
  async queryFilter(ctx, next) {
    const filter = {}

    if (!/admin/.test(ctx.path)) {
      const { categoryID } = ctx.query
   
      if (categoryID) {
        filter.$and = [
          {
            categoryIds: ObjectId(categoryID),
          },
          {
            isPublished: true,
          },
        ]
      } else {
        filter.isPublished = true
      }
    }

    ctx.state.filter = filter
    
    return await next()
  },
}
