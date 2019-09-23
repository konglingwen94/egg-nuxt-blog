export const invokeDeepObject = (...args) => {
  console.log(args)
  if (typeof object !== 'object') {
    return
  }

  if (Array.isArray(object)) {
    object = []
  }

  for (let key in object) {
    if (Array.isArray(object[key])) {
      object[key] = []
      continue
    }
    switch (typeof object[key]) {
      case 'string':
        object[key] = ''
        break

      case 'number':
        object[key] = -1
        break

      case 'object':
        invokeDeepObject(object[key])
    }
  }
}
