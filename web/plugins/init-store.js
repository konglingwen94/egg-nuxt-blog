import _ from 'lodash'
export default ({ app }) => {
  try {
    var store = JSON.parse(localStorage.store)
  } catch (error) {
    store = {}
  }

  app.store.replaceState(_.assign({}, app.store.state, store))

  window.onbeforeunload = () => {
    localStorage.store = JSON.stringify(_.omit(app.store.state, 'configuration'))
  }
}
