const Application = require('egg-core').EggCore
const app = new Application({
  // baseDir: '/path/to/app',
})

app.router.all('/home', ctx => {
  console.log(ctx.request.body)
  ctx.body = `Hello ${ctx.request.body}`
})

app.ready(() =>
  app.listen(3000, () =>
    console.log('Server is listening at http://localhost:3000')
  )
)
