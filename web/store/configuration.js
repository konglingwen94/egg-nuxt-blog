import Vue from 'vue'
import ConfigurationService from '@/services/configurations'

export const state = () => {
  return {
    siteConfig: {
      // carousel: {},
      // message: {},
    },
    projectIntro: {
      // platform: {},
    },
    profile: {
      // personal: {},
      // technology: {},
    },
  }
}

export const mutations = {
  // setSiteConfig(state, payload) {
  //   state.siteConfig = payload
  // },
  // setProfile(state, payload) {
  //   state.profile = payload
  // },
  // setProjectIntro(state, payload) {

  //   state.projectIntro = payload
  // },
  setState(state, payload) {
    // payload.forEach(item=>{

    for (let key in state) {
      state[key] = payload.find(item => {
        return item.kind.toLowerCase() === key.toLowerCase()
      })
    }

    // Vue.set(state,item.kind,item)
    // })
  },
}

export const actions = {
  fetchAllConfigurations({ commit }) {
    return ConfigurationService.fetchList().then(response => {
      console.log(response)

      commit('setState', response)
      // commit('')
    })
  },

  // fetchSiteConfig({ commit }) {
  //   return ConfigurationService.fetchSiteConfig()
  //     .then(response => {
  //       commit('setSiteConfig', response)
  //     })
  //     .catch(err => {
  //       return Promise.reject(err)
  //     })
  // },
  // fetchProjectIntro({ commit }) {
  //   return ConfigurationService.fetchProjectIntro()
  //     .then(response => {
  //       commit('setProjectIntro', response)
  //     })
  //     .catch(err => Promise.reject(err))
  // },
  // fetchProfile({ commit }) {
  //   return ConfigurationService.fetchProfile()
  //     .then(response => {
  //       commit('setProfile', response)
  //     })
  //     .catch(error => Promise.reject(error))
  // },
}
