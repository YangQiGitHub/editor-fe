<template>
  <div class="remark">
    <div class="remark-title">备注</div>
    <div class="remark-area" ref="remark"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

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

      this.editor = new Quill(this.$refs.remark, option)

      if (this.model.blockInfo.richText1) {
        this.$refs.remark.querySelector('.ql-editor').innerHTML = this.model.blockInfo.richText1;
      }

      this.editor.on('text-change', (delta, oldDelta, source) => {
        const dom = this.$refs.remark.querySelector('.ql-editor')
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
.remark{
    line-height: 2;
    background: rgb(239, 247, 240);
    border-radius: 5px;
    border: 1px solid rgb(0, 169, 95);
    padding: 12px 28px;
    color: rgb(0, 169, 95);
  &-area{
  }
}
</style>
