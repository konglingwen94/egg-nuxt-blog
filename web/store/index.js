
export const actions = {
  async nuxtServerInit({dispatch}) {
    try {
      
        await dispatch('configuration/fetchAllConfigurations')
       await dispatch('weather/fetchWeatherData')
      
    } catch (error) {
      console.error(error)
      // .catch(err => Promise.reject(err))
    }

    
  },
}
