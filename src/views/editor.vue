<template>
  <div class="editor">
    <menu-bar></menu-bar>
    <page></page>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import MenuBar from '@/components/menu-bar.vue'
import Page from '@/components/page.vue'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'editor',
  components: {
    MenuBar,
    Page
  },
  methods: {
    ...mapMutationsEditor([
      'appendModel'
    ]),
    listenModelChange () {
      // this.$store.subscribe(_.throttle(this.subscribeMutation, 3000))
      this.$store.subscribe(_.debounce(this.subscribeMutation, 1000))
    },
    subscribeMutation ({type}, state) {
      const list = ['editor/insertModelAfter', 'editor/changeModelInfo', 'editor/delModel']
      if (list.includes(type)) {
        console.log(type)
        const models = state.editor.models
        this.sendDocData(models)
      }
    },
    sendDocData (models) {
      this.axios.post('/ajax/docInfo', { models }).then((response) => {
        console.log('success', response)
        this.$Message.success('保存成功');
      }).catch((response) => {
        console.log('fail', response)
        this.$Message.error('保存信息失败');
      }).finally(() => {})
    },
    getDocData () {
      this.axios.get('/ajax/docInfo').then(({data: {models}}) => {
        this.appendModel(models)
        this.listenModelChange();
      }).catch(() => {
        this.$Message.error('获取信息失败');
      })
    }
  },
  computed: {
    ...mapStateEditor([
      'a'
    ])
  },
  created () {
    console.log('--------------created editor-----------')
    // this.listenModelChange();
    this.getDocData()
  }
}

</script>

<style scoped lang="less">
.editor{
  padding: 20px;
}
</style>