<template>
  <div class="page" :style="pageStyle">
    <div class="page-inner">
      <div class="model-wrap" v-for="item in models" :key="item.blockId">
        <chapter class="content" v-if="item.blockInfo.type === MODEL_NAME['CHAPTER']" :model="item"></chapter>
        <note class="content" v-if="item.blockInfo.type === MODEL_NAME['NOTE']" :model="item"></note>
        <chunk class="content" v-if="item.blockInfo.type === MODEL_NAME['CHUNK']" :model="item"></chunk>
        <unit class="content" v-if="item.blockInfo.type === MODEL_NAME['UNIT']" :model="item"></unit>
        <remark class="content" v-if="item.blockInfo.type === MODEL_NAME['REMARK']" :model="item"></remark>
      </div>
    </div>
  </div>
</template>

<script>
import Chapter from '@/components/models/chapter/index'
import Note from '@/components/models/notearea/index'
import Chunk from '@/components/models/chunk/index'
import Unit from '@/components/models/unit/index'
import Remark from '@/components/models/remark/index'
import { 
  mapStateEditor,
  // mapMutationsEditor
} from '@/store/modules/editor'
import { MODEL_NAME, PAGE_ATTR } from '@/lib/constants'

export default {
  name: 'page',
  props: {},
  data () {
    return {
      MODEL_NAME
    }
  },
  components: {
    Chapter,
    Note,
    Chunk,
    Unit,
    Remark
  },
  computed: {
    ...mapStateEditor([
      'models'
    ]),
    pageStyle () {
      const { width, height, paddingTop, paddingBottom, paddingLeft, paddingRight } = PAGE_ATTR
      return {
        width: `${width}px`,
        'min-height': `${height}px`,
        'padding-top': `${paddingTop}px`,
        'padding-bottom': `${paddingBottom}px`,
        'padding-left': `${paddingLeft}px`,
        'padding-right': `${paddingRight}px`
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.page{
  box-sizing: border-box;
  width: 630px;
  min-height: 891px;
  padding: 80px 60px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(57,60,64,.1);
  &-inner{
    .model-wrap{
      padding: 30px 0;
      // outline: dashed 1px blueviolet;
      .content{
        // outline: dashed 1px darkgoldenrod;
      }
    }
  }
}
</style>
