import Vue from 'vue'
import Router from 'vue-router'

import BasicLayout from '@/layouts/Basic'
import UserLayout from '@/layouts/User'
import NotFound from '@/layouts/NotFound'

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Security from '@/views/Security'
import ArticleList from '@/views/Articles/ArticleList.vue'
import ArticleEditor from '@/views/Articles/ArticleEditor'
import Categories from '@/views/Categories/List'
import Comment from '@/views/Comments/List'
import Guestbook from '@/views/Guestbooks/List'
import About from '@/views/About'
import Tag from '@/views/Tags'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      component: UserLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: Login,
        },
      ],
    },
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          redirect: 'dashboard',
        },
        {
          path: '/index.html',
          redirect: 'dashboard',
        },
        {
          name: 'dashboard',
          path: 'dashboard',
          component: Dashboard,
          meta: {
            activedMenuItem: 'dashboard',
          },
        },
        {
          name: 'abouts',
          path: 'abouts',
          component: About,
          meta: {
            activedMenuItem: 'about',
          },
        },
        {
          name: 'security',
          path: 'settings/security',
          component: Security,
          meta: {
            title: '修改密码',
            activedMenuItem: 'settings/security',
          },
        },
        {
          name: 'articles',
          path: 'articles',
          component: ArticleList,
          meta: {
            title: '文章列表',
            activedMenuItem: 'articles',
          },
        },
        {
          name: 'ArticleEditor',
          path: 'articles/:id/edit',
          component: ArticleEditor,
          meta: {
            title: '编辑文章',
          },
        },
        {
          name: 'ArticleCreator',
          path: 'articles/new',
          component: ArticleEditor,
          meta: {
            title: '新增文章',
          },
        },
        {
          name: 'article-categories',
          path: 'article-categories',
          component: Categories,
          meta: {
            title: '文章分类列表',
            activedMenuItem: 'article-categories',
          },
        },
        {
          name: 'article-comments',
          path: 'articles/:articleID/comments',
          component: Comment,
          meta: {
            title: '文章评论',
          },
        },
        {
          name: 'comments',
          path: 'comments',
          component: Comment,
          meta: {
            title: '全部评论',
          },
        },
        {
          name: 'guestbooks',
          path: 'guestbooks',
          component: Guestbook,
          meta: {
            title: '留言墙',
          },
        },
        {
          name: 'tags',
          path: 'tags',
          component: Tag,
          meta: {
            title: '标签列表',
          },
        },
      ],
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/auth/login') {
    return next()
  }
  const accessToken = localStorage.getItem('accessToken')

  return accessToken ? next() : next('/auth/login')
})

export default router
