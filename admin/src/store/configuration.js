import _ from 'lodash'
import ConfigurationApi from '@/api/configurations'

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
    fetchSiteConfig({ commit }) {
      return ConfigurationApi.fetchOneSiteConfig()
        .then(result => {
          commit('setSiteConfig', result)
        })
        .catch()
    },
    updateSiteConfig({ commit, state }, payload) {
      return ConfigurationApi.updateOneSiteConfig(state.siteConfig.id, payload)
        .then(result => {
          commit('setSiteConfig', payload)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },
    fetchProjectIntro({ commit }) {
      return ConfigurationApi.fetchOneProjectIntro()
        .then(result => {
          commit('setProjectIntro', result)
        })
        .catch()
    },
    updateProjectIntro({ commit, state }, payload) {
      // const clonedProjectIntro = _.cloneDeep(
      //   _.pick(state.projectIntro, ['profile', 'platform'])
      // )
      // _.assign(clonedProjectIntro, payload)
      // payload = clonedProjectIntro
      // payload = _.pick({ ...state.projectIntro, ...payload },['platform','profile'])
      console.log('payload', payload)
      return ConfigurationApi.updateOneProjectIntro(
        state.projectIntro.id,
        payload
      )
        .then(result => {
          commit('setProjectIntro', payload)
        })
        .catch(error => {
          return Promise.reject(error)
        })
    },
    fetchProfile({ commit }) {
      return ConfigurationApi.fetchOneProfile()
        .then(response => {
          commit('setProfile', response)
        })
        .catch(err => {})
    },
    updateProfile({ commit, state }, payload) {
      return ConfigurationApi.updateOneProfile(state.profile.id, payload).then(()=>{
        commit('setProfile',payload)
      }).catch(err=>{})
    },
  },
}
