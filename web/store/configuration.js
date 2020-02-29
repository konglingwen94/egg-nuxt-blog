import Vue from 'vue'
import ConfigurationService from '@/services/configurations'

export const state = () => {
  return {
    siteConfig: {
      
    },
    projectIntro: {
       
    },
    profile: {
       
    },
  }
}

export const mutations = {
  
  setState(state, payload) {
    

    for (let key in state) {
      state[key] = payload.find(item => {
        return item.kind.toLowerCase() === key.toLowerCase()
      })
    }
 
  },
}

export const actions = {
  fetchAllConfigurations({ commit }) {
    return ConfigurationService.fetchList().then(response => {
     

      commit('setState', response)
      
    })
  },

  
}
