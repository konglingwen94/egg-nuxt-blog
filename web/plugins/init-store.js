import _ from 'lodash'
export default ({ app }) => {
  try {
    var store = JSON.parse(localStorage.store)
  } catch (error) {
    store = {}
  }

  app.store.replaceState(_.merge({}, store, app.store.state))

  window.onbeforeunload = () => {
    localStorage.store = JSON.stringify(
      _.pick(app.store.state, ['message','article'])
    )
  }
}
