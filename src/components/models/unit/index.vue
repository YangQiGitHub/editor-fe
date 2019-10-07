<template>
  <div class="unit">
    <div class="unit-area" ref="unit"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import { 
  // mapStateEditor,
  mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'unit',
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
        placeholder: '请输入笔记内容...'
      }

      this.editor = new Quill(this.$refs.unit, option)
      if (this.model.blockInfo.richText1) {
        this.$refs.unit.querySelector('.ql-editor').innerHTML = this.model.blockInfo.richText1;
      }

      this.editor.on('text-change', () => {
        const dom = this.$refs.unit.querySelector('.ql-editor')
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
.unit{
  // border: 1px solid green;
  &-area{
    line-height: 1.5;
    // outline: 1px dashed orange;
  }
}
</style>
