const { historyApiFallback } = require('koa2-connect-history-api-fallback')

module.exports = option => {
  return historyApiFallback({
    
    rewrites: [
      {
        from: /\/docs/,
        to: function(context) {
          const reg = /\/docs\/assets\//
         
          if (context.parsedUrl.pathname.match(reg)) {
            return context.parsedUrl.pathname
          }
          if (context.parsedUrl.pathname.endsWith('.html')) {
            return context.parsedUrl.pathname
          }
          return context.parsedUrl.pathname + '/index.html'
        },
      },
    ],
  })
}
