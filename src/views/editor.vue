<template>
  <div class="editor">
    <menu-bar></menu-bar>
    <page></page>
    <!-- <div class="btn-split" @click="goSplit">分页</div> -->
    <Button class="btn-split" type="primary" :loading="loading" icon="ios-power" @click="goSplit">
        <span v-if="!loading">分页</span>
        <span v-else>Loading...</span>
    </Button>
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
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutationsEditor([
      'appendModel',
      'changeModelInfo',
      'makePageList'
    ]),
    goSplit () {
      this.loading = true;
      const nodeList = document.querySelectorAll('.model-wrap .content')
      const nodeArray = Array.from(nodeList)
      nodeArray.forEach((item) => {
        const {dataset:{blockid}, offsetHeight} = item
        this.changeModelInfo({
          blockId: blockid,
          prop: 'pageInfo.height',
          val: offsetHeight
        })
      })
      this.makePageList()
      this.$router.push('about')
    },
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
  .btn-split{
    position: fixed;
    top: 20px;
    right: 20px;
    // width: 60px;
    // height: 30px;
    // background-color: burlywood;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
</style>