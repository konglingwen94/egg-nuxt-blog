import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1e67853f = () => interopDefault(import('..\\..\\web\\pages\\about\\index.vue' /* webpackChunkName: "pages_about_index" */))
const _34b61b17 = () => interopDefault(import('..\\..\\web\\pages\\archives\\index.vue' /* webpackChunkName: "pages_archives_index" */))
const _f87d4d6a = () => interopDefault(import('..\\..\\web\\pages\\articles\\index.vue' /* webpackChunkName: "pages_articles_index" */))
const _78a9b916 = () => interopDefault(import('..\\..\\web\\pages\\guestbooks\\index.vue' /* webpackChunkName: "pages_guestbooks_index" */))
const _5ddb3273 = () => interopDefault(import('..\\..\\web\\pages\\articles\\_id.vue' /* webpackChunkName: "pages_articles__id" */))
const _502354a8 = () => interopDefault(import('..\\..\\web\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/about",
      component: _1e67853f,
      name: "about"
    }, {
      path: "/archives",
      component: _34b61b17,
      name: "archives"
    }, {
      path: "/articles",
      component: _f87d4d6a,
      name: "articles"
    }, {
      path: "/guestbooks",
      component: _78a9b916,
      name: "guestbooks"
    }, {
      path: "/articles/:id",
      component: _5ddb3273,
      name: "articles-id"
    }, {
      path: "/",
      component: _502354a8,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
