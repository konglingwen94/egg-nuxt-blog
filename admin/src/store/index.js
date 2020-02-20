import Vue from 'vue'
import Vuex from 'vuex'
import siteintro from './siteintro'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    siteintro,
  },
  state: {
    tabs: [],
  },
  getters: {
    activeTab(state) {
      return 'list'
    },
  },
  mutations: {
    setTabs(state, tabs) {
      state.tabs = tabs
    },
  },
})

export default store
