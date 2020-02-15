import Vue from 'vue'
import ElementUI from 'element-ui'
import _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css'
import CommentVue from './comment-editor.vue'
import CommentComponent from './component.vue'

Vue.use(ElementUI)

const CommentEditorConstructor = Vue.extend(CommentVue)

CommentEditorConstructor.prototype.create = () => {}

const types = ['message', 'reply']

const defaults = {
  propsData: {
    editorType: 'reply',
  },
}

const createComment = options => {
  const defaultOptions = { propsData: {} }

  if (options && options.editorType) {
    _.defaults
  }

  options = _.defaults({}, defaults, options)

  const instance = new CommentEditorConstructor({
    data: options,
  })

  instance.$mount()

  return instance
}

types.forEach(type => {
  createComment[type] = options => {
    return createComment(
      _.defaults({ propsData: { editorType: type } }, options)
    )
  }
})

export default {
  install(Vue) {
    Vue.component(CommentComponent.name, CommentComponent)
    Vue.prototype.$createComment = createComment
  },
}
