
export const actions = {
  async nuxtServerInit({dispatch}) {
    try {
      // return await Promise.all([
        await dispatch('configuration/fetchSiteConfig')
        await dispatch('configuration/fetchProfile')
        await dispatch('configuration/fetchProjectIntro')
        await dispatch('weather/fetchWeatherData')
      // ])
    } catch (error) {
      console.error(error)
      // .catch(err => Promise.reject(err))
    }

    
  },
}
