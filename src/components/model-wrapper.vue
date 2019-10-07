<template>
  <div class="wrapper" :style="wrapperStyle">
    <div class="model-container">
      <slot></slot>
    </div>
    <div @mousedown="handDown('paddingTop', $event)" :style="handShankTopStyle" class="hand-shank hand-shank-top"></div>
    <div @mousedown="handDown('paddingBottom', $event)" class="hand-shank hand-shank-bottom"></div>
  </div>
</template>

<script>
import { mapStateEditor, mapMutationsEditor } from '@/store/modules/editor'
import { MODEL_NAME } from '@/lib/constants'

export default {
  name: 'wrapper',
  props: {
    pageInfo: [Object],
    blockId: [Number, String]
  },
  data () {
    return {
      MODEL_NAME,
      tempXY: {x: 0, y: 0, topOrBottom: ''}
    }
  },
  components: {
    
  },
  computed: {
    ...mapStateEditor([
      'models'
    ]),
    wrapperStyle () {
      const {paddingTop, paddingBottom} = this.pageInfo;
      return {
        'padding-top': `${paddingTop}px`,
        'padding-bottom': `${paddingBottom}px`
      }
    },
    handShankTopStyle () {
      const {paddingTop} = this.pageInfo;
      return {
        top: `${paddingTop}px`
      }
    }
  },
  methods: {
    ...mapMutationsEditor([
      'changeModelInfo'
    ]),
    handDown(who, evt) {
      const {clientY: y} = evt
      this.tempXY = { y, topOrBottom: who }
      document.documentElement.addEventListener('mousemove', this.mouseMove, false)
      document.documentElement.addEventListener('mouseup', () => {
        document.documentElement.removeEventListener('mousemove', this.mouseMove, false)
      }, false);
    },
    mouseMove (evt) {
      const { clientY } = evt
      // console.log(clientY - this.tempXY.y)
      const val = this.pageInfo[this.tempXY.topOrBottom] + (clientY - this.tempXY.y)
      if (val >= 0) {
        this.tempXY.y = clientY;
        this.changeModelInfo({
          blockId: this.blockId,
          prop: `pageInfo.${this.tempXY.topOrBottom}`,
          val
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrapper{
  // padding: 20px;
  position: relative;
  &:hover{
    border: 1px solid blue;
    .hand-shank{
      display: block;
    }
  }
  .hand-shank{
    width: 100%;
    position: absolute;
    height: 10px;
    opacity: 0.1;
    display: none;
    &-bottom{
      bottom: 0;
      background-color: green;
    }
    &-top{
      background-color: red;
      // top: 0;
    }
  }
}
</style>

