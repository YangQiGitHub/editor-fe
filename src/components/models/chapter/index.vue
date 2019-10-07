<template>
  <div class="chapter">
    <div class="chapter-content1" ref="chapter1"></div>
    <div class="chapter-content2" ref="chapter2"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'chapter',
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
        placeholder: '请章节输入内容...'
      }

      this.editor1 = new Quill(this.$refs.chapter1, option)
      console.log(this.model.blockInfo.richText1, this.$refs.chapter1)
      if (this.model.blockInfo.richText1) {
        this.$refs.chapter1.querySelector('.ql-editor').innerHTML = this.model.blockInfo.richText1;
      }

      this.editor1.on('text-change', (delta, oldDelta, source) => {
        const dom = this.$refs.chapter1.querySelector('.ql-editor')
        this.sendChapterText({val: dom.innerHTML, prop: 'blockInfo.richText1'})
      })

      this.editor2 = new Quill(this.$refs.chapter2, option)
      console.log(this.model.blockInfo.richText2, this.$refs.chapter2)
      if (this.model.blockInfo.richText2) {
        this.$refs.chapter2.querySelector('.ql-editor').innerHTML = this.model.blockInfo.richText2;
      }

      this.editor2.on('text-change', (delta, oldDelta, source) => {
        const dom = this.$refs.chapter2.querySelector('.ql-editor')
        this.sendChapterText({val: dom.innerHTML, prop: 'blockInfo.richText2'})
      })
    },
    sendChapterText ({val, prop}) {
      this.changeModelInfo({
        blockId: this.model.blockId,
        prop,
        val
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chapter{
  font-size: 20px;
  padding: 10px 40px 40px;
  border-radius: 10px;
  border: 1px solid #333;
  &-content1{
    font-weight: 900;
    text-align: center;
  }
  &-content2{
    color: #333;
    text-align: center;
    font-weight: normal;
  }
}
</style>
