import _ from 'lodash'

export default Vue => {
  const requireComponent = require.context(
    // The relative path of the components folder.
    '../components',
    // Whether or not to look in subfolders.
    true,
    // The regular expression used to match base component filenames.
    /[a-zA-Z]\w+\.(vue|js)$/
  )

  requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName =
      componentConfig.default.name ||
      _.upperFirst(
        _.camelCase(
          // Strip the leading `./` and extension from the filename
          fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$1')
        )
      )

    

    // Register component globally.
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
    )
  })
}
