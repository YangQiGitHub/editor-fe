<template>
  <div class="menu-item">
    <div class="menu-item-text">
      {{menuInfo.menuText}}
    </div>
    <div class="menu-item-del" @click="delModel(blockId)"><Icon type="ios-trash-outline" size="16" /></div>
    <add-panel :block-id="blockId"></add-panel>
  </div>
</template>

<script>
import {initBlockId, initModelDefaultData} from '@/lib/utils'
import { MODEL_NAME } from '@/lib/constants'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'
import AddPanel from '@/components/add-panel.vue'

export default {
  name: 'menu-item',
  props: {
    menuInfo: {
      type: Object,
      default: function () {
        return {}
      }
    },
    blockId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      MODEL_NAME
    }
  },
  components: {
    AddPanel
  },
  methods: {
    ...mapMutationsEditor([
      'delModel'
    ]),
  },
  computed: {
    
  },
  created () {}
}
</script>

<style scoped lang="less">
.menu-item{
  position: relative;
  &-text{
    padding: 10px;
    border-bottom: 1px solid #e1e3e6;
  }
  &-del{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
