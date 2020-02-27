// export const invokeDeepObject = (...args) => {
//   args.forEach(object => {
//     if (typeof object !== 'object') {
//       return
//     }

//     if (Array.isArray(object)) {
//       object.splice(0)
//       return 
//     }

//     for (let key in object) {
//       if (Array.isArray(object[key])) {
//         object[key].splice(0)
//         continue
//       }
//       switch (typeof object[key]) {
//         case 'string':
//           object[key] = ''
//           break

//         case 'number':
//           object[key] = -1
//           break
//         case 'boolean':
//           object[key] = false
//           break

//         case 'object':
//           invokeDeepObject(object[key])
//       }
//     }
//   })
// }
