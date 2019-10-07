<template>
  <div class="menu">
    <div class="menu-title">目录树</div>
    <add-panel></add-panel>
    <menu-item v-for="(item, idx) in models" :key="idx" :menu-info="item.menuInfo" :block-id="item.blockId">hh</menu-item>
  </div>
</template>

<script>
import {initBlockId, initModelDefaultData} from '@/lib/utils'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'
import AddPanel from '@/components/add-panel.vue'
import MenuItem from '@/components/menu-item.vue'

export default {
  name: 'menu-bar',
  props: {},
  components: {
    AddPanel,
    MenuItem
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapStateEditor([
      'models'
    ])
  },
  methods: {
    ...mapMutationsEditor([
      'appendModel'
    ])
  },
  created () {
    // console.log(initBlockId(), '------------fss----------', initModelDefaultData({name: 'CHAPTER'}))
  }
}
</script>

<style scoped lang="less">
.menu{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
  background-color: #fff;
  &-title{
    padding: 10px;
    border-bottom: 1px solid #e1e3e6;
  }
  // &-add{
  //   padding: 10px;
  //   text-align: center;
  //   // border-bottom: 1px solid #e1e3e6;
  //   &:hover{
  //     background-color: #e5f4ea;
  //   }
  // }
}
</style>
