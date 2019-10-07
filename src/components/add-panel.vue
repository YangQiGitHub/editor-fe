<template>
  <div class="add-panel">
    <div class="add-panel-icon">+</div>
    <div class="add-panel-content">
      <div class="item-wrap">
        <div class="item" v-for="(val, key) in MODEL_NAME" :key="key" @click="addModel(key)">{{val}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { initBlockId, initModelDefaultData } from '@/lib/utils'
import { MODEL_NAME } from '@/lib/constants'
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'

export default {
  name: 'add-panel',
  props: {
    blockId: [Number, String]
  },
  data () {
    return {
      MODEL_NAME
    }
  },
  methods: {
    ...mapMutationsEditor([
      'appendModel',
      'insertModelAfter'
    ]),
    addModel(key) {
      const initData = initModelDefaultData({name: key})
      // console.log(initData, this.blockId)
      // this.appendModel([initData])
      this.insertModelAfter({blockId: this.blockId, model: initData})
    },
  },
  created () {}
}
</script>

<style scoped lang="less">
.add-panel{
  position: relative;
  &:hover{
    .add-panel-content{
      display: block;
    }
  }
  &-icon{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 16px;
    height: 16px;
    margin: -8px auto auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1px solid rgba(57, 60, 64, 0.5);
    box-shadow: 0 2px 10px 0 rgba(57, 60, 64, 0.1);
  }
  &-content{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding-top: 10px;
    width: 80%;
    box-sizing: border-box;
    display: none;
    .item-wrap{
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      width: 100%;
      box-shadow: 0 2px 10px 0 rgba(57, 60, 64, 0.1);
    }
    .item{
      width: 25%;
      box-sizing: border-box;
      padding: 10px;
      text-align: center;
      &:hover{
        box-shadow: 0 2px 10px 0 rgba(57, 60, 64, 0.1);
      }
    }
  }
}
</style>
