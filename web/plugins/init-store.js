export default ({ app }) => {
  try {
    var store = JSON.parse(localStorage.store)
  } catch (error) {
    store = {}
  }
  window.onload = () => {
    app.store.replaceState(Object.assign({}, store, app.store.state))
  }

  window.onbeforeunload = () => {
    console.log(app.store.state)
    localStorage.store = JSON.stringify(app.store.state)
  }
}
