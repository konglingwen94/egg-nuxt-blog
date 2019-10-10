const { historyApiFallback } = require('koa2-connect-history-api-fallback')

module.exports = option => {
  return historyApiFallback({
    rewrites: [
      {
        from: /[^\/docs\/assets\/.*]\/.*$/,
        to: function(context) {
          console.log(context.parsedUrl.pathname)
          if (context.parsedUrl.pathname.endsWith('.html')) {
            return context.parsedUrl.pathname
          }
          return context.parsedUrl.pathname + 'index.html'
        },
      },
    ],
  })
}
