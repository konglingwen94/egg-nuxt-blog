import _ from 'lodash'

export default {
  name: 'CommentEditor',

  data() {
    return {
      form: {
        nickname: '',
        content: '',
        email: '',
      },
      elMountedIntoDocument: false,
    }
  },
  props: {
    requiredItemFields: {
      type: Array,
      validator(value) {
        return value.every(item => _.keys(this.form).includes(item))
      },
      default: () => ['content', 'nickname', 'email'],
    },
    editorType: {
      type: String,

      validator(value) {
        return ['message', 'reply'].includes(value)
      },
      default: 'message',
    },
  },
  computed: {
    editorTitle() {
      return this.editorType === 'message'
        ? '评论'
        : this.editorType === 'reply'
        ? '回复'
        : '无类型'
    },
  },
  methods: {
    clearForm() {
      this.form.content = ''
      this.form.email = ''
      this.form.nickname = ''
    },
    activate() {
      this.$refs.contentInput.focus()
    },
  },
  mounted() {
    this.$el.addEventListener('DOMNodeRemovedFromDocument', (...args) => {
      console.log('DOMNodeRemovedFromDocument', args)
      this.elMountedIntoDocument = false
    })
    this.$el.addEventListener('DOMNodeInsertedIntoDocument', (...args) => {
      console.log('DOMNodeRemovedFromDocument', args)
      this.elMountedIntoDocument = true
    })
  },
  destroyed() {
    if (this.$el.parentNode && this.$el) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
}
