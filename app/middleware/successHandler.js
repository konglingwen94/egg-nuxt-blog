module.exports = async (ctx, next) => {
  try {
    var response = await next()
  } catch (error) {
    throw error
  }

   

  if (response) {
    ctx.body = response
  }
}
