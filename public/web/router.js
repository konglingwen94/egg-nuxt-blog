import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _17037355 = () => interopDefault(import('../../web/pages/aboutus/index.vue' /* webpackChunkName: "pages/aboutus/index" */))
const _43bdbfe9 = () => interopDefault(import('../../web/pages/articles/index.vue' /* webpackChunkName: "pages/articles/index" */))
const _4dc67c01 = () => interopDefault(import('../../web/pages/favorites/index.vue' /* webpackChunkName: "pages/favorites/index" */))
const _00ae19af = () => interopDefault(import('../../web/pages/folders/index.vue' /* webpackChunkName: "pages/folders/index" */))
const _d2acaf90 = () => interopDefault(import('../../web/pages/messages/index.vue' /* webpackChunkName: "pages/messages/index" */))
const _8f46aede = () => interopDefault(import('../../web/pages/articles/_id.vue' /* webpackChunkName: "pages/articles/_id" */))
const _20971479 = () => interopDefault(import('../../web/pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/aboutus",
    component: _17037355,
    name: "aboutus"
  }, {
    path: "/articles",
    component: _43bdbfe9,
    name: "articles"
  }, {
    path: "/favorites",
    component: _4dc67c01,
    name: "favorites"
  }, {
    path: "/folders",
    component: _00ae19af,
    name: "folders"
  }, {
    path: "/messages",
    component: _d2acaf90,
    name: "messages"
  }, {
    path: "/articles/:id",
    component: _8f46aede,
    name: "articles-id"
  }, {
    path: "/",
    component: _20971479,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
