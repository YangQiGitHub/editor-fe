<template>
  <div class="about">
    <h1>This is an about page</h1>
    <menu-bar></menu-bar>
    <div class="single-page" :style="singlePageStyle">
      <div class="page-container">
        <div class="inner">
          <model-wrapper v-for="item in models" :key="item.blockId" :page-info="item.pageInfo" :block-id="item.blockId">
            <chapter class="content" v-if="item.blockInfo.type === MODEL_NAME['CHAPTER']" :model="item"></chapter>
            <note class="content" v-if="item.blockInfo.type === MODEL_NAME['NOTE']" :model="item"></note>
            <chunk class="content" v-if="item.blockInfo.type === MODEL_NAME['CHUNK']" :model="item"></chunk>
            <unit class="content" v-if="item.blockInfo.type === MODEL_NAME['UNIT']" :model="item"></unit>
            <remark class="content" v-if="item.blockInfo.type === MODEL_NAME['REMARK']" :model="item"></remark>
          </model-wrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Chapter from '@/components/models/chapter/index'
import Note from '@/components/models/notearea/index'
import Chunk from '@/components/models/chunk/index'
import Unit from '@/components/models/unit/index'
import Remark from '@/components/models/remark/index'
import MenuBar from '@/components/menu-bar.vue'
import ModelWrapper from '@/components/model-wrapper.vue'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'
import { MODEL_NAME, PAGE_ATTR } from '@/lib/constants'

export default {
  name: 'editor',
  components: {
    MenuBar,
    ModelWrapper,
    Chapter,
    Note,
    Chunk,
    Unit,
    Remark
  },
  data () {
    return {
      MODEL_NAME
    }
  },
  created () {
    this.getDocData();
  },
  computed: {
    ...mapStateEditor([
      'models'
    ]),
    singlePageStyle () {
      const { width, height, paddingTop, paddingBottom, paddingLeft, paddingRight } = PAGE_ATTR
      console.log('==============', PAGE_ATTR)
      return {
        width: `${width}px`,
        height: `${height}px`,
        'padding-top': `${paddingTop}px`,
        'padding-bottom': `${paddingBottom}px`,
        'padding-left': `${paddingLeft}px`,
        'padding-right': `${paddingRight}px`
      }
    }
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
  }
}
</script>

<style lang="less" scoped>
.about{
  .single-page{
    box-sizing: border-box;
    width: 630px;
    height: 891px;
    padding: 80px 0;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(57,60,64,.1);
  }
  .page-container{
    height: 100%;
    width: 100%;
    overflow: hidden;
    // outline: 1px dashed blueviolet;
    .inner{
      // border: 1px solid transparent;
    }
  }
}
</style>