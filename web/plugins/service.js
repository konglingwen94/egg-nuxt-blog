import ArticleService from '@/services/articles'
import AboutusService from '@/services/aboutus'

export default (context, inject) => {
  // console.log(context, inject)
  context.app.service = {
    article: ArticleService,
    aboutus:AboutusService
  }
}
