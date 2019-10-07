<template>
  <div class="note">
    <div class="note-title">笔记区</div>
    <div class="note-area" ref="note"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'note',
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

      this.editor = new Quill(this.$refs.note, option)
      console.log(this.model.blockInfo.richText1)
      if (this.model.blockInfo.richText1) {
        this.$refs.note.querySelector('.ql-editor').innerHTML = this.model.blockInfo.richText1;
      }

      this.editor.on('text-change', (delta, oldDelta, source) => {
        const dom = this.$refs.note.querySelector('.ql-editor')
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
.note{
  line-height: 2;
  background: rgb(246, 247, 247);
  padding: 10px 16px;
  color: rgb(0, 168, 95);
  min-height: 64px;
  font-size: 12px;
  &-area{

  }
}
</style>
