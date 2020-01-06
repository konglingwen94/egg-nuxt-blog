import ArticleService from '@/services/articles'
import AboutusService from '@/services/aboutus'

export default (context, inject) => {
  // console.log(context, inject)
  context.service = {
    article: ArticleService,
    aboutus:AboutusService
  }
}
