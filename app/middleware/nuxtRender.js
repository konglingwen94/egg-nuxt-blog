module.exports = (option, app) => {
  return async ctx => {
    ctx.status = 200
    ctx.respond = false
    // console.dir(ctx.render)
    ctx.render(ctx.req, ctx.res)
  }
}
