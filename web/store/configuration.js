import PlatformService from '@/services/platform'

export const state = () => {
  return {
    carousel: {},
    message:{}
  }
}

export const mutations = {
  setData(state, payload) {
    state.carousel = payload.carousel
    state.message = payload.message
    
  },
}


export const actions={

  fetchData({commit}){
    
    PlatformService.fetchOne().then(response=>{

      commit('setData',response)
    }).catch((err)=>{
this.$message.error(err.message)
    })
  }
}