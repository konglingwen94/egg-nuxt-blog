```egg-nuxt
├── admin
│   ├── src
│   │   ├── api
│   │   │   ├── aboutus.js
│   │   │   ├── articles.js
│   │   │   ├── auth.js
│   │   │   ├── categories.js
│   │   │   ├── comments.js
│   │   │   ├── guestbooks.js
│   │   │   ├── request.js
│   │   │   └── tags.js
│   │   ├── assets
│   │   │   ├── css
│   │   │   │   └── overwrite.css
│   │   │   └── logo.png
│   │   ├── components
│   │   │   ├── CellPopover.vue
│   │   │   ├── Header.vue
│   │   │   ├── Menu.vue
│   │   │   ├── Panel.vue
│   │   │   ├── Pell.vue
│   │   │   └── Upload.vue
│   │   ├── layouts
│   │   │   ├── Basic.vue
│   │   │   ├── NotFound.vue
│   │   │   └── User.vue
│   │   ├── store
│   │   │   ├── aboutus.js
│   │   │   └── index.js
│   │   ├── utils
│   │   │   ├── element-ui.js
│   │   │   ├── global-registration.js
│   │   │   └── helper.js
│   │   ├── views
│   │   │   ├── Article
│   │   │   │   ├── Editor.vue
│   │   │   │   └── List.vue
│   │   │   ├── Author
│   │   │   │   └── index.vue
│   │   │   ├── Carousel
│   │   │   │   └── index.vue
│   │   │   ├── Category
│   │   │   │   └── List.vue
│   │   │   ├── Comment
│   │   │   │   └── List.vue
│   │   │   ├── Dashboard
│   │   │   │   └── index.vue
│   │   │   ├── Guestbook
│   │   │   │   └── List.vue
│   │   │   ├── Login
│   │   │   │   └── index.vue
│   │   │   ├── Platform
│   │   │   │   └── index.vue
│   │   │   ├── Security
│   │   │   │   └── index.vue
│   │   │   └── Tag
│   │   │       └── index.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── router.js
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vue.config.js
├── app
│   ├── controller
│   │   ├── aboutus.js
│   │   ├── admin.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── guestbook.js
│   │   ├── tag.js
│   │   └── upload.js
│   ├── db
│   │   └── mongodb.js
│   ├── extend
│   │   ├── context.js
│   │   └── helper.js
│   ├── middleware
│   │   ├── adminRequired.js
│   │   ├── apiRouterParameterValidator.js
│   │   ├── compress.js
│   │   ├── docs.js
│   │   ├── errorHandler.js
│   │   ├── history.js
│   │   ├── nuxtRender.js
│   │   ├── platformENV.js
│   │   ├── responseHandler.js
│   │   ├── siteTraffic.js
│   │   └── upload.js
│   ├── model
│   │   ├── aboutus.js
│   │   ├── admin.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── guestbook.js
│   │   └── tag.js
│   ├── router
│   │   ├── aboutus.js
│   │   ├── admin.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── guestbook.js
│   │   ├── proxyService.js
│   │   ├── tag.js
│   │   └── upload.js
│   ├── service
│   │   ├── aboutus.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   └── tag.js
│   ├── types
│   │   └── request.js
│   ├── package.json
│   └── README.md
├── config
│   ├── config.default.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── defaultAboutusData.json
│   └── plugin.js
├── demo
│   ├── cors.html
│   ├── format.json
│   ├── mongodb.js
│   ├── mongoose.js
│   ├── README.md
│   └── single.vue
├── docs
│   ├── api
│   │   ├── admin.md
│   │   ├── article.md
│   │   ├── category.md
│   │   ├── comment.md
│   │   ├── guestbook.md
│   │   ├── README.md
│   │   └── tag.md
│   ├── database
│   │   ├── admin.md
│   │   ├── article.md
│   │   ├── category.md
│   │   ├── comment.md
│   │   ├── guestbook.md
│   │   ├── README.md
│   │   └── tag.md
│   ├── configurations.md
│   └── README.md
├── logs
├── run
├── scripts
│   └── init-admin.js
├── web
│   ├── assets
│   │   └── css
│   │       ├── global.less
│   │       ├── overwrite.css
│   │       └── variables.css
│   ├── components
│   │   ├── ArticleItem.vue
│   │   ├── ArticleList.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   └── Suggestion.vue
│   ├── layouts
│   │   ├── Article.vue
│   │   └── Public.vue
│   ├── middleware
│   ├── pages
│   │   ├── aboutus
│   │   │   └── index.vue
│   │   ├── archives
│   │   │   └── index.vue
│   │   ├── articles
│   │   │   ├── index.vue
│   │   │   └── _id.vue
│   │   ├── guestbooks
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── plugins
│   │   ├── element-ui.js
│   │   ├── global-components.js
│   │   ├── init-store.js
│   │   ├── service.js
│   │   ├── vconsole.js
│   │   └── vue-weather.js
│   ├── services
│   │   ├── aboutus.js
│   │   ├── articles.js
│   │   ├── axios.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   ├── guestbooks.js
│   │   ├── index.js
│   │   ├── request.js
│   │   └── tags.js
│   ├── static
│   │   └── favicon.ico
│   ├── store
│   │   ├── article.js
│   │   ├── index.js
│   │   └── weather.js
│   ├── jsconfig.json
│   ├── nuxt.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── app.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tree.md
```
egg-nuxt
├── admin
│   ├── src
│   │   ├── api
│   │   │   ├── aboutus.js
│   │   │   ├── articles.js
│   │   │   ├── auth.js
│   │   │   ├── categories.js
│   │   │   ├── comments.js
│   │   │   ├── guestbooks.js
│   │   │   ├── request.js
│   │   │   └── tags.js
│   │   ├── assets
│   │   │   ├── css
│   │   │   │   └── overwrite.css
│   │   │   └── logo.png
│   │   ├── components
│   │   │   ├── CellPopover.vue
│   │   │   ├── Header.vue
│   │   │   ├── Menu.vue
│   │   │   ├── Panel.vue
│   │   │   ├── Pell.vue
│   │   │   └── Upload.vue
│   │   ├── layouts
│   │   │   ├── Basic.vue
│   │   │   ├── NotFound.vue
│   │   │   └── User.vue
│   │   ├── store
│   │   │   ├── aboutus.js
│   │   │   └── index.js
│   │   ├── utils
│   │   │   ├── element-ui.js
│   │   │   ├── global-registration.js
│   │   │   └── helper.js
│   │   ├── views
│   │   │   ├── Article
│   │   │   │   ├── Editor.vue
│   │   │   │   └── List.vue
│   │   │   ├── Author
│   │   │   │   └── index.vue
│   │   │   ├── Carousel
│   │   │   │   └── index.vue
│   │   │   ├── Category
│   │   │   │   └── List.vue
│   │   │   ├── Comment
│   │   │   │   └── List.vue
│   │   │   ├── Dashboard
│   │   │   │   └── index.vue
│   │   │   ├── Guestbook
│   │   │   │   └── List.vue
│   │   │   ├── Login
│   │   │   │   └── index.vue
│   │   │   ├── Platform
│   │   │   │   └── index.vue
│   │   │   ├── Security
│   │   │   │   └── index.vue
│   │   │   └── Tag
│   │   │       └── index.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── router.js
│   ├── babel.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vue.config.js
├── app
│   ├── controller
│   │   ├── aboutus.js
│   │   ├── admin.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── guestbook.js
│   │   ├── tag.js
│   │   └── upload.js
│   ├── db
│   │   └── mongodb.js
│   ├── extend
│   │   ├── context.js
│   │   └── helper.js
│   ├── middleware
│   │   ├── adminRequired.js
│   │   ├── apiRouterParameterValidator.js
│   │   ├── compress.js
│   │   ├── docs.js
│   │   ├── errorHandler.js
│   │   ├── history.js
│   │   ├── nuxtRender.js
│   │   ├── platformENV.js
│   │   ├── responseHandler.js
│   │   ├── siteTraffic.js
│   │   └── upload.js
│   ├── model
│   │   ├── aboutus.js
│   │   ├── admin.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── guestbook.js
│   │   └── tag.js
│   ├── router
│   │   ├── aboutus.js
│   │   ├── admin.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   ├── guestbook.js
│   │   ├── proxyService.js
│   │   ├── tag.js
│   │   └── upload.js
│   ├── service
│   │   ├── aboutus.js
│   │   ├── article.js
│   │   ├── category.js
│   │   ├── comment.js
│   │   └── tag.js
│   ├── types
│   │   └── request.js
│   ├── package.json
│   └── README.md
├── config
│   ├── config.default.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── defaultAboutusData.json
│   └── plugin.js
├── demo
│   ├── cors.html
│   ├── format.json
│   ├── mongodb.js
│   ├── mongoose.js
│   ├── README.md
│   └── single.vue
├── docs
│   ├── api
│   │   ├── admin.md
│   │   ├── article.md
│   │   ├── category.md
│   │   ├── comment.md
│   │   ├── guestbook.md
│   │   ├── README.md
│   │   └── tag.md
│   ├── database
│   │   ├── admin.md
│   │   ├── article.md
│   │   ├── category.md
│   │   ├── comment.md
│   │   ├── guestbook.md
│   │   ├── README.md
│   │   └── tag.md
│   ├── configurations.md
│   └── README.md
├── logs
├── run
├── scripts
│   └── init-admin.js
├── web
│   ├── assets
│   │   └── css
│   │       ├── global.less
│   │       ├── overwrite.css
│   │       └── variables.css
│   ├── components
│   │   ├── ArticleItem.vue
│   │   ├── ArticleList.vue
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   └── Suggestion.vue
│   ├── layouts
│   │   ├── Article.vue
│   │   └── Public.vue
│   ├── middleware
│   ├── pages
│   │   ├── aboutus
│   │   │   └── index.vue
│   │   ├── archives
│   │   │   └── index.vue
│   │   ├── articles
│   │   │   ├── index.vue
│   │   │   └── _id.vue
│   │   ├── guestbooks
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── plugins
│   │   ├── element-ui.js
│   │   ├── global-components.js
│   │   ├── init-store.js
│   │   ├── service.js
│   │   ├── vconsole.js
│   │   └── vue-weather.js
│   ├── services
│   │   ├── aboutus.js
│   │   ├── articles.js
│   │   ├── axios.js
│   │   ├── categories.js
│   │   ├── comments.js
│   │   ├── guestbooks.js
│   │   ├── index.js
│   │   ├── request.js
│   │   └── tags.js
│   ├── static
│   │   └── favicon.ico
│   ├── store
│   │   ├── article.js
│   │   ├── index.js
│   │   └── weather.js
│   ├── jsconfig.json
│   ├── nuxt.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── app.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
 
