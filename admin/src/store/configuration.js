import _ from 'lodash'
import ConfigurationApi from '@/api/configurations'

const mapKindToMutationTypes = {
  Projectintro: 'setProjectIntro',
  Siteconfig: 'setSiteConfig',
  Profile: 'setProfile',
}

export default {
  state: {
    projectIntro: {
      platform: {},
    },
    siteConfig: {
      carousel: {},
      message: {},
    },
    profile: {
      personal: {},
      technology: {},
    },
  },
  mutations: {
    setSiteConfig(state, payload) {
      _.assign(state.siteConfig, payload)
    },
    setProjectIntro(state, payload) {
      _.assign(state.projectIntro, payload)
    },
    setProfile(state, payload) {
      _.assign(state.profile, payload)
    },
  },
  actions: {
    // fetchConfiguration({dispatch}){
    //   dispatch('configuration/fetchSiteConfig')
    // },

    initData({ commit }) {
      ConfigurationApi.fetchAllConfigurations().then(response => {
        response.forEach(item => {
          commit(mapKindToMutationTypes[item.kind], item)
        })
      })
    },
    updateSiteConfig({ commit, state }, payload) {
      return ConfigurationApi.updateSiteConfig(state.siteConfig.id, payload)
        .then(() => {
          commit('setSiteConfig', payload)
        })
        .catch(error => Promise.reject(error))
    },
    updateProjectIntro({ commit, state }, payload) {
      return ConfigurationApi.updateProjectIntro(state.projectIntro.id, payload)
        .then(() => {
          commit('setProjectIntro', payload)
        })
        .catch(error => Promise.reject(error))
    },
    updateProfile({ commit, state }, payload) {
      return ConfigurationApi.updateProfile(state.profile.id, payload)
        .then(() => {
          commit('setProfile', payload)
        })
        .catch(error => Promise.reject(error))
    },
 
  },
}
