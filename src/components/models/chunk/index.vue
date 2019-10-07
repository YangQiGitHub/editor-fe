<template>
  <div class="chunk">
    <div class="chunk-area" ref="chunk"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'chunk',
  props: {
    model: Object
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    ...mapMutationsEditor([
      'changeModelInfo'
    ]),
    initEditor () {
      const option = {
        placeholder: '请输入内容...'
      }

      this.editor = new Quill(this.$refs.chunk, option)
      if (this.model.blockInfo.richText1) {
        this.$refs.chunk.querySelector('.ql-editor').innerHTML = this.model.blockInfo.richText1;
      }

      this.editor.on('text-change', (delta, oldDelta, source) => {
        const dom = this.$refs.chunk.querySelector('.ql-editor')
        this.sendNoteText(dom.innerHTML)
      })

    },
    sendNoteText (val) {
      this.changeModelInfo({
        blockId: this.model.blockId,
        prop: 'blockInfo.richText1',
        val
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chunk{
  &-area{
    padding: 4px 10px;
    background-color: antiquewhite;
    color: #333;
    line-height: 1.6;
  }
}
</style>
