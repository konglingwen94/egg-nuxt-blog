<template>
  <div>
    <upload @success="onSuccess" ref="uploadFile" v-show="false"></upload>
    <div ref="pell"></div>
  </div>
</template>

<script>
import pell from 'pell'
function getTextFromHtml(html) {
  const dom = document.createElement('div')
  dom.innerHTML = html
  return dom.innerText
}

export default {
  name: 'Pell',
  props: {
    initialMarkdown: {
      type: Object,
      default() {
        return {
          html: '',
          text: ''
        }
      }
    }
  },
  created() {
    const unwatch = this.$watch(
      'initialMarkdown',
      function(value) {
        console.log('initialMarkdown',value.html)
        this.editor.content.innerHTML = value.html
        typeof unwatch === 'function' && unwatch()
      },
      { deep: true }
    )
  },

  mounted() {
    const self = this
    this.editor = pell.init({
      element: this.$refs.pell,

      actions: [
        'italic',
        'bold',
        'heading1',
        'heading2',
        'underline',
        'paragraph',
        'strikethrough',
        'quote',
        'ulist',
        'olist',
        'line',
        'link',
        'code',
        {
          name: 'image',
          result() {
            self.$refs.uploadFile.$refs.upload.$refs[
              'upload-inner'
            ].handleClick()
          }
        }
      ],
      onChange(html) {
        self.$emit('change', { html, text: getTextFromHtml(html) })
      }
    })
  },
  methods: {
    clearContent(){
this.editor.content.innerHTML=''
    },
    onSuccess(file) {
      pell.exec('insertImage', file.path)
    }
  }
}
</script>
<style lang="less">
.pell {
  border: 1px solid rgba(10, 10, 10, 0.1);
  box-sizing: border-box;
}

.pell-content {
  box-sizing: border-box;
  height: 300px;
  border: 1px solid rgba(10, 10, 10, 0.1);
  outline: 0;
  overflow-y: auto;
  padding: 10px;
  background: white;
  img {
    width: 200px;
  }
}

.pell-content ul {
  list-style: disc;
  padding-left: 40px;
}

.pell-actionbar {
  background-color: #fff;
  border: 1px solid rgba(10, 10, 10, 0.1);
}

.pell-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 30px;
  outline: 0;
  width: 30px;
  vertical-align: middle;

  &:hover {
    background: #eee;
  }
}

.pell-button-selected {
  background-color: #f0f0f0;
}

.thumbnail-preview {
  text-align: left;
}

.thumbnail-preview__link {
  margin: 0;
}
</style>
